/**
 * @param {waitForPropertyNotContainsByCss} selector
 * Check if CSS property exist and validate it's value (contains)
 */

exports.command = function(cssSelector, cssPropertyName, cssPropertyValue) {
  const browser = this;

  browser
    .useCss()
    .expect.element(cssSelector).to.not.have.css(cssPropertyName).which.contains(cssPropertyValue);

  return this;
};
