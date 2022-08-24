/**
 * @param {waitForPropertyContainsByCss} selector
 * Check if CSS property exist and validate it's value (contains)
 */

exports.command = function(cssSelector, cssPropertyName, cssPropertyValue) {
  const browser = this;

  browser
    .useCss()
    .waitForElementVisible(cssSelector, 20000)
    .expect.element(cssSelector).to.have.css(cssPropertyName).which.contains(cssPropertyValue);

  return this;
};
