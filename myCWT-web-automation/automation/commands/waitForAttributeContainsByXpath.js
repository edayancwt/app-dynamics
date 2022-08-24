/**
 * @param selector, path to element (by xpath)
 * combination of waitForElementVisible & assert.attributeContains.
 */

exports.command = function(selector, attrName, attrValue) {
  const browser = this;

  browser
    .useXpath()
    .waitForElementVisible(selector, 30000)
    .assert.attributeContains(selector, attrName, attrValue);

  return this;
};
