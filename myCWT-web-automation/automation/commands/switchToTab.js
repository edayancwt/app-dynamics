/**
 * @param {switchToTab} tab index
 * switch to specified tab.
 */

exports.command = function(tabNumber) {
  const browser = this;

  browser.windowHandles(function(result) {
    const switchTab = result.value[tabNumber];

    this.switchWindow(switchTab);
  });

  return this;
};
