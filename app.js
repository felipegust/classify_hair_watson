const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');
const VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');
const fs = require('fs');

const visualRecognition = new VisualRecognitionV3({
  version: '2018-03-19',
  api_key: 'e3c233a145aef69bc904ddaed02f3e5e23b24dd4'
});

app.use(express.static('public'));
app.use(fileUpload());

function classifica(){
  var images_file= fs.createReadStream('public/filename.jpg');
  var classifier_ids = ["DefaultCustomModel_149238511"];
  var threshold = 0.6;

  var params = {
    images_file: images_file,
    classifier_ids: classifier_ids,
    threshold: threshold
  };

  visualRecognition.classify(params, function(err, response) {
    if (err)
      console.log(err);
    else
      fs.writeFile('public/json.json', JSON.stringify(response, null, 2), 'utf8');

  });

}

app.post('/upload', function(req, res) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile;

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv('public/filename.jpg', function(err) {
    if (err)
      return res.status(500).send(err);

    //renderiza página nova
    classifica()
    res.sendFile(__dirname + '/upload.html');

  });
});

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index.html');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});