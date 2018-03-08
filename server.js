var express = require('express');
var app = express();
var mysql = require('mysql');

var db_info = require("./database_conf.js");
var connection = db_info();

var PORT = 3000;

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected! from 10");
});

app.get("/", function (req, res){
	res.send("Price comparison Application");
});

app.listen(PORT, function(req, res){
	console.log("Application is listening on port:"+PORT);
})


