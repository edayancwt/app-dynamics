/**
 * @param {elementDisabledByXpath} selector
 * Check if element disabled
 */

exports.command = function(selector) {
  const browser = this;

  browser
    .useXpath()
      .assert.not.enabled(selector);

  return this;
};
