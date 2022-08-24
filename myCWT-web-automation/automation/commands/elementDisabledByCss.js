/**
 * @param {elementDisabledByCss} selector
 * Check if element disabled
 */

exports.command = function(selector) {
  const browser = this;

  browser
    .useCss()
      .assert.not.enabled(selector);

  return this;
};
