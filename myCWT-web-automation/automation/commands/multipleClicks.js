/**
 * @param {home slider right/left buttons} numberOfTimes
 * Loop the number of clicks on home slider left or right button
 */

exports.command = function(selector, numberOfTimes) {
  const browser = this;
  let i = 0;

  for (i = 0; i < numberOfTimes; i++) {
    browser.waitAndClickByCss(selector);
    browser.pause(500);
  }

  return this;
};
