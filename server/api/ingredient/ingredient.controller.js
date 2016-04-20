'use strict';

var _ = require('lodash');
var Ingredient = require('./ingredient.model');

// Get list of ingredients
exports.index = function(req, res) {
  Ingredient.find(function (err, ingredients) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(ingredients);
  });
};

// Get a single ingredient
exports.show = function(req, res) {
  Ingredient.findById(req.params.id, function (err, ingredient) {
    if(err) { return handleError(res, err); }
    if(!ingredient) { return res.status(404).send('Not Found'); }
    return res.json(ingredient);
  });
};

// Creates a new ingredient in the DB.
exports.create = function(req, res) {
  Ingredient.create(req.body, function(err, ingredient) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(ingredient);
  });
};

// Updates an existing ingredient in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Ingredient.findById(req.params.id, function (err, ingredient) {
    if (err) { return handleError(res, err); }
    if(!ingredient) { return res.status(404).send('Not Found'); }
    var updated = _.merge(ingredient, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(ingredient);
    });
  });
};

// Deletes a ingredient from the DB.
exports.destroy = function(req, res) {
  Ingredient.findById(req.params.id, function (err, ingredient) {
    if(err) { return handleError(res, err); }
    if(!ingredient) { return res.status(404).send('Not Found'); }
    ingredient.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}