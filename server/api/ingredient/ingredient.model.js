'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var IngredientSchema = new Schema({
  name: String,
  dbname: String,
  cost: Number,
  units: Number
});

module.exports = mongoose.model('Ingredient', IngredientSchema);