let express = require('express');
let app = express();
let fileUpload = require('express-fileupload');
const path = require('path');
const port = 8000;

app.get("/", function (req, res) {
    res.sendFile(__dirname + '/index.html');
    fs.readFile('1.txt', function (err, data) {
        if (err) {
            return console.error(err);
        }
        console.log("Asynchronous read: " + data.toString());
    });
})

app.use(fileUpload({
    safeFileNames: true,
    preserveExtension: true
}));

app.post('/upload', function (req, res) {
    console.log(req.files);

    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.foo;

    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(path.join('/server', sampleFile.name), function (err) {
        if (err)
            return res.status(500).send(err);

        res.send('File uploaded!');
    });
});

app.listen(port, function (error) {
    if (error) {
        console.error(error)
    } else {
        console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
    }
})