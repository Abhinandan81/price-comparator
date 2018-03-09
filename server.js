var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser')

var db_info = require("./database_conf.js");
var connection = db_info();

var PORT = 3000;

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected! from 10");
});


// Database setup

connection.query('CREATE DATABASE IF NOT EXISTS price_comparator', function (err) {
    if (err) throw err;
    connection.query('USE price_comparator', function (err) {
        if (err) throw err;
        
        console.log("Database created successfully!!!");

        connection.query('CREATE TABLE IF NOT EXISTS price_details('
            + 'id INT NOT NULL AUTO_INCREMENT,'
            + 'PRIMARY KEY(id),'
            + 'shopping_site VARCHAR(30),'
            + 'item_name VARCHAR(30),'
            + 'price int(10)'
            +  ')', function (err) {
                if (err) throw err;
                
                console.log("Table price_details created successfully!!!");
            });
    });
});

var jsonParser = bodyParser.json()


app.get("/", function (req, res){
	res.send("Price comparison Application");
});

// Update MySQL database

app.post('/addDetails', jsonParser, function (req, res) {

	let query = 'INSERT INTO price_details (shopping_site, item_name, price) values ("' + req.body.shopping_site + '", "'+ req.body.item_name + '", "'+ req.body.price + '")'
	
    connection.query(query, 
        function (err, result) {
            if (err) throw err;
            res.send('price_details added to database with ID: ' + result.insertId);
        }
    );


});

app.get('/getAllDetails', jsonParser, function (req, res) {

	let query = 'Select * from price_details;'
	
    connection.query(query, 
        function (err, result) {
            if (err) throw err;
            res.send(result);
        }
    );


});


app.listen(PORT, function(req, res){
	console.log("Application is listening on port:"+PORT);
})


