var express = require('express');
var app = express.Router();
var multer  =   require('multer');

var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
});

var upload = multer({ storage : storage}).single('userPhoto');


/* GET home page. */
app.get('/', function(req, res, next) {
  res.sendFile('uploadMultipleFiles.html', {root :'./htmlViews'});
});

app.post('/api/photo',function(req,res){
  upload(req,res,function(err) {
      if(err) {
          return res.end("Error uploading file.", err);
      }
      setTimeout(()=>{res.end("File is uploaded!");}, 8000);
  });
});

module.exports = app;
