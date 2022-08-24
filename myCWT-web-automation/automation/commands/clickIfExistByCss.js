/**
 * @param {String} selector
 * clickIfExistByCss
 */

exports.command = function(selector) {
  const browser = this;

  browser
    .element('css selector', selector, (isExist) => {                      // Click if exist
      if (isExist.status !== -1) {
        browser
          .waitAndClickByCss(selector);
      }
    });
// this is just comment for test
  return this;
};