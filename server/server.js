var express = require('express');
var mongoose = require('mongoose');
var count = require('./config');

var app = express();

mongoose.connect('mongodb://localhost/fizzbuzz');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function() {
  console.log('mongo db is open');
})

app.get('/', function(req, res) {
  count.findOne({}).exec(function(err, result) {
    if(err) {
      res.send(err);
    } else if(!result) {
      var newCount = new count().save();
      res.send(newCount);
    } else {
      console.log(result);
      res.send(JSON.stringify(result.counter));
    }
  });
});

app.post('/', function(req, res) {
  res.sendStatus = 200;
});

app.listen(8000);

module.exports = app;
