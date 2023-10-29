var express = require('express');
var app = express();
var fs = require("fs");

app.get('/listOfItems', function (req, res) {
   fs.readFile( __dirname + "/" + "data.json", 'utf8', function (err, data) {
      if (err)
      {
        console.log(err);
      }
      else{
        console.log(data);
        res.end(data);
      }
   });
});

app.get('/item/:name/:price', function (req, res) {
    fs.readFile( __dirname + "/" + "data.json", 'utf8', function (err, data) {
       if (err)
       {
         console.log(err);
       }
       else{
        let myItem = JSON.parse(data)
        let name = req.params.name;
        let price = Number(req.params.price);
        let newItem = myItem.filter((item) => item.name === name && item.price === price);
        res.json(newItem);
       }
    });
});

var server = app.listen(3000, function () {
   console.log("Ok");
});