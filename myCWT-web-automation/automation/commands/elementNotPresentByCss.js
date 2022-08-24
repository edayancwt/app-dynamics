/**
 * @param {elementNotPresentByCss} selector
 * Check if element not present
 */

exports.command = function(selector) {
  const browser = this;

  browser
    .useCss()
    .expect.element(selector).to.not.be.present;

  return this;
};
