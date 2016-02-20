var express = require('express');
var mongoose = require('mongoose');
var count = require('./config');
var fs = require('fs');
var path = require('path');
var url = require('url');

var app = express();

mongoose.connect('mongodb://localhost/fizzbuzz');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function() {
});

app.use(express.static(__dirname + '/../'));

app.get('/', function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  fs.readFile(__dirname + '/../index.html', function(err, data) {
    if(err) {
      console.log(err);
    }
    res.end(data);
    
  })
});

app.get('/api/count', function(req, res) {
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

app.post('/api/count', function(req, res) {
  count.findOne({}).exec(function(err, result) {
    if(err) {
      res.send(err);
    } else {
      var query = {_id: result._id};
      var update = {counter: result.counter + 1};
      count.update(query, update, function(err, result) {
        if(err) {
          res.send(err);
        } else {
          res.status(200);
          res.send(result);
        }
      });
    }
  });
});

app.listen(8000);

module.exports = app;
