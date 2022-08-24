/**
 * @param {Wait for text by css} selector
 * combination of waitForElementVisible & assert.containsText.
 */

exports.command = function(selector, textValue) {
  const browser = this;

  browser
    .useCss()
    .waitForElementVisible(selector, 30000)
    .assert.containsText(selector, textValue);

  return this;
};
