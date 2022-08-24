/**
 * @param {waitAndClickOnText} selector
 * This will find text using xpath and click on it
 */

exports.command = function(text) {
  const browser = this;

  browser

    .useXpath()
    .click('//*[contains(text(), \''+text+'\')]');

  return this;
};
