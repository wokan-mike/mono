const express = require('express');
const http = require('http');
const url = require('url'); 
const bodyParser = require('body-parser');
const fs = require('fs');
const AWS = require('aws-sdk');
const path = require('path');


AWS.config.update({
    accessKeyId: "AKIAIHQT54MVDMVJTAKA",
    secretAccessKey: "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"
  });

var s3 = new AWS.S3();
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// let base64String ='' ;
// let base64Image = base64String.split(';base64,').pop();

// fs.writeFile('image.gif', base64Image, {encoding: 'base64'}, function(err) {
//     console.log('File created');
// });


app.get('/', function(req, res) {
    
    res.send('heeeejejejej');
});

app.post('/create', function(req, res) {

    function guid() {
        return "ss-s-s-s-sss".replace(/s/g, s4);
      }
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }

    var name = guid();
    let base64String = req.body.base;
    let base64Image = base64String.split(';base64,').pop();

    fs.writeFile(__dirname + '/gifs/' + name + '.gif', base64Image, {encoding: 'base64'}, function(err) {
        console.log('File created');
        console.log(err);
        
    });

    var filePath =__dirname + '/gifs/' + name + '.gif';
    

    var params = {
        Bucket: 'navidadatt2018',
        Body : fs.createReadStream(filePath),
        Key : "gifs/"+Date.now()+"_"+path.basename(filePath)
      };
    
    s3.upload(params, function (err, data) {
    //handle error
    if (err) {
        console.log("Error", err);
    }
    
    //success
    if (data) {
        console.log("Uploaded in:", data.Location);
        // urlaws = data.location;
        res.send(data.Location)
    }else{
        res.send("no guardo")
    }
    });

    
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});