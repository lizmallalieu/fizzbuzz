// backend model
var mongoose = require('mongoose');

var counterSchema = mongoose.Schema({
  counter: {type: Number, default: 0}
});

var Count = mongoose.model('Count', counterSchema);

module.exports = Count;