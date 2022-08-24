/**
 * @param {String} selector
 * Get element text value by Css and print it to the console
 */

exports.command = function (selector) {
  const browser = this;
  browser
    .useCss()
    .waitForElementVisible(selector)
    .getText(selector, function (result) {
      const myValue = result.value;
      console.log('This is the text you need >>>>>>>>>>>>>: '+myValue);
    })
    .pause(5000000);
  return this;
};