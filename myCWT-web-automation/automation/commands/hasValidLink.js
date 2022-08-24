/**
* hasValidLink
*/

exports.command = function(selector, timeoutInMilliseconds) {
  const browser = this;

  browser
    .waitForElementPresent(selector, timeoutInMilliseconds)
    .expect.element(selector)
    .to.have.attribute('href')
    .not.equals('');

  return this;
};
