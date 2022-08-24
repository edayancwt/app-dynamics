/**
 * @param {String} selector
 * @param {String} value
 * set value to element found by selector.
 */

exports.command = function(selector, value) {
  return this.clearValue(selector)
    .setValue(selector, value)
    .trigger(selector, 'keyup', 13);
};
