/**
 * validateUrlOnSecondTab
 */

exports.command = function(selector, url) {
  const browser = this;

browser.waitAndClickByCss(selector)
    .switchToTab(1)
    .waitForUrlToContain(url, 20000)
    .closeWindow()
    .pause(1500)
    .switchToTab(0);

  return this;
};