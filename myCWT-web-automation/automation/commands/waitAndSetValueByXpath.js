/**
 * @param {Wait for xpath element and set value} selector
 * combination of waitForElementVisible & setValue functions.
 */

exports.command = function(selector, inputValue) {
  const browser = this;

  browser
    .useXpath()
    .waitForElementVisible(selector)
    .setValue(selector, inputValue);

  return this;
};
