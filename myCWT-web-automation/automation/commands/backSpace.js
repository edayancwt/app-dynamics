/**
 * backSpace
 * Since clearValue not always working, I created a function that literally emulate
 * key-press on the back_space button.
 * selector is clicked and delete value (pressing BACKSPACE button str.length + 1 times
 */

exports.command = function(numberOfTimes) {
  const browser = this;

  for (let i = 0; i < numberOfTimes.length + 1; i++) {
    browser.keys(browser.Keys.BACK_SPACE);
  }

  return this;
};
