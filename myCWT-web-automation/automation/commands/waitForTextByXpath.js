/**
 * @param {Wait for text by xpath} selector
 * combination of waitForElementVisible & assert.containsText.
 */

exports.command = function(selector, textValue) {
  const browser = this;

  browser
    .useXpath()
    .waitForElementVisible(selector, 30000)
    .assert.containsText(selector, textValue);

  return this;
};
