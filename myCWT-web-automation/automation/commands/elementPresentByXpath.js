/**
 * @param {elementPresentByXpath} selector
 * Check if element present
 */

exports.command = function(selector) {
  const browser = this;

  browser
    .useXpath()
    .waitForElementVisible(selector, 30000)
    .expect.element(selector).to.be.present;

  return this;
};
