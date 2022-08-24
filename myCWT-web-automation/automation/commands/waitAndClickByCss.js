/**
 * @param {Wait for css element and click} selector
 * combination of waitForElementVisible & waitUntilElementIsClickable & click functions.
 */

exports.command = function(selector) {
  const browser = this;

  browser
    .useCss()
    .waitForElementVisible(selector, 30000)
    .click(selector);

  return this;
};
