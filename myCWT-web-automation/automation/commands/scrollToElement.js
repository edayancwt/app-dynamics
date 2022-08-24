/**
 * @param {scrollToElement} selector
 * scroll to element found by selector.
 */

exports.command = function(selector) {
  const browser = this;
  const offset = 65;

  browser.getLocationInView(selector, function(result) {
    browser.logger('scroll to ' + selector);
    browser.execute('scrollTo(' + result.value.x + ',' + (result.value.y - offset) + ')');
  });
};
