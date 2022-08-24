/**
 * @param {Wait for css element and set value} selector
 * combination of waitForElementVisible & setValue functions.
 */

exports.command = function(selector, inputValue) {
  const browser = this;

  browser
    .useCss()
    .waitForElementVisible(selector, 30000)
    .setValue(selector, inputValue);

  return this;
};
