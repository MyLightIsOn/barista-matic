'use strict';

var _ = require('lodash');
var Drink = require('./drink.model');

// Get list of drinks
exports.index = function(req, res) {
  Drink.find(function (err, drinks) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(drinks);
  });
};

// Get a single drink
exports.show = function(req, res) {
  Drink.findById(req.params.id, function (err, drink) {
    if(err) { return handleError(res, err); }
    if(!drink) { return res.status(404).send('Not Found'); }
    return res.json(drink);
  });
};

// Creates a new drink in the DB.
exports.create = function(req, res) {
  Drink.create(req.body, function(err, drink) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(drink);
  });
};

// Updates an existing drink in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Drink.findById(req.params.id, function (err, drink) {
    if (err) { return handleError(res, err); }
    if(!drink) { return res.status(404).send('Not Found'); }
    var updated = _.merge(drink, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(drink);
    });
  });
};

// Deletes a drink from the DB.
exports.destroy = function(req, res) {
  Drink.findById(req.params.id, function (err, drink) {
    if(err) { return handleError(res, err); }
    if(!drink) { return res.status(404).send('Not Found'); }
    drink.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}