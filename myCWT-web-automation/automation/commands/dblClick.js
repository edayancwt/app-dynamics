/**
 * @param {String} selector
 * double click element found by selector.
 * dbClick
 */

exports.command = function(selector) {
  return this.moveToElement(selector, 5, 5).doubleClick();
};
