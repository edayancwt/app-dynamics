/**
 * @param {String} selector
 * clickIfExistByXpath
 */

exports.command = function(selector) {
  const browser = this;

  browser
    .element('xpath', selector, (isExist) => {                      // Click if exist
      if (isExist.status !== -1) {
        browser
          .waitAndClickByXpath(selector);
      }
    });

  return this;
};