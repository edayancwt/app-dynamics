/**
 * @param {elementPresentByCss} selector
 * Check if element present
 */

exports.command = function(selector) {
  const browser = this;

  browser
    .useCss()
    .waitForElementVisible(selector, 30000)
    .expect.element(selector).to.be.present;

  return this;
};
