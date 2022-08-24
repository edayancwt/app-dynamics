/**
 * clearValueByXpath
 * test test
 */

exports.command = function(selector) {
  const browser = this;

  browser
    .useXpath()
    .waitForElementVisible(selector)
    .clearValue(selector);

  return this;
};
