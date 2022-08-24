/**
 * @param {Map zoom-in button} numberOfTimes
 * Loop the number of clicks on zoom-in map button
 * mapZoomIn
 */

exports.command = function(numberOfTimes) {
  const browser = this;
  let i = 0;

  for (i = 0; i < numberOfTimes; i++) {
    browser.useXpath();
    browser.waitAndClick('.//*[@title="Zoom in"]');
    browser.pause(1000);
  }

  return this;
};
