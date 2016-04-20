'use strict';

var _ = require('lodash');
var Ingredients = require('./ingredients.model');

// Get list of ingredientss
exports.index = function(req, res) {
  Ingredients.find(function (err, ingredientss) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(ingredientss);
  });
};

// Get a single ingredients
exports.show = function(req, res) {
  Ingredients.findById(req.params.id, function (err, ingredients) {
    if(err) { return handleError(res, err); }
    if(!ingredients) { return res.status(404).send('Not Found'); }
    return res.json(ingredients);
  });
};

// Creates a new ingredients in the DB.
exports.create = function(req, res) {
  Ingredients.create(req.body, function(err, ingredients) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(ingredients);
  });
};

// Updates an existing ingredients in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Ingredients.findById(req.params.id, function (err, ingredients) {
    if (err) { return handleError(res, err); }
    if(!ingredients) { return res.status(404).send('Not Found'); }
    var updated = _.merge(ingredients, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(ingredients);
    });
  });
};

// Deletes a ingredients from the DB.
exports.destroy = function(req, res) {
  Ingredients.findById(req.params.id, function (err, ingredients) {
    if(err) { return handleError(res, err); }
    if(!ingredients) { return res.status(404).send('Not Found'); }
    ingredients.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}