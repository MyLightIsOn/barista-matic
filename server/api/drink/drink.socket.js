/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Drink = require('./drink.model');

exports.register = function(socket) {
  Drink.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Drink.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('drink:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('drink:remove', doc);
}