/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Ingredients = require('./ingredients.model');

exports.register = function(socket) {
  Ingredients.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Ingredients.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('ingredients:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('ingredients:remove', doc);
}