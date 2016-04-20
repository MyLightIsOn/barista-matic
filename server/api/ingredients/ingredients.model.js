'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var IngredientsSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Ingredients', IngredientsSchema);