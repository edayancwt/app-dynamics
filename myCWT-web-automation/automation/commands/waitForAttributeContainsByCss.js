/**
 * @param selector, path to element (by css)
 * combination of waitForElementVisible & assert.attributeContains.
 */

exports.command = function(selector, attrName, attrValue) {
  const browser = this;

  browser
    .useCss()
    .waitForElementVisible(selector, 30000)
    .assert.attributeContains(selector, attrName, attrValue);

  return this;
};
