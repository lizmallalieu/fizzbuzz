var express = require('express');
var mongoose = require('mongoose');

var app = express();


mongoose.connect('mongodb://localhost/fizzbuzz');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error'));
db.once('open', function() {
  console.log('mongo db is open');
})

app.get('/', function(req, res) {
  res.send('Hello World');
});

app.post('/', function(req, res) {
  res.sendStatus = 200;
});

app.listen(8000);

module.exports = app;
