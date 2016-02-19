// backend model
var mongoose = require('mongoose');

var counterSchema = mongoose.Schema( {
  counter: Number
});

var Count = mongoose.model('Count', counterSchema);

module.exports = Count;