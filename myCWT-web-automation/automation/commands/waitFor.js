/**
 * @param {Number} ms
 * @param {Function} cb
 * wait for ms Milliseconds then execute callback.
 */

const util = require('util');
const events = require('events');

const waitFor = function() {
  events.EventEmitter.call(this);
};

util.inherits(waitFor, events.EventEmitter);

waitFor.prototype.command = function(ms, cb) {
  const self = this;

  ms = ms || 1000;

  setTimeout(function() {
    // if we have a callback, call it right before the complete event
    if (cb) {
      cb.call(self.client.api);
    }

    self.emit('complete');
  }, ms);

  return this;
};

module.exports = waitFor;
