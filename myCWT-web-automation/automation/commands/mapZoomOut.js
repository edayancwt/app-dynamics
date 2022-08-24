/**
 * @param {Map zoom-out button} numberOfTimes
 * Loop the number of clicks on zoom-out map button
 * mapZoomOut
 */

exports.command = function(numberOfTimes) {
  const browser = this;
  let i = 0;

  for (i = 0; i < numberOfTimes; i++) {
    browser.useXpath();
    browser.waitAndClick('.//*[@title="Zoom out"]');
    browser.pause(1000);
  }

  return this;
};
