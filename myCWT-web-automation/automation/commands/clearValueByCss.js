/**
 * clearValueByCss
 */

exports.command = function(selector) {
  const browser = this;

  browser
    .useCss()
    .waitForElementVisible(selector)
    .clearValue(selector);

  return this;
};
