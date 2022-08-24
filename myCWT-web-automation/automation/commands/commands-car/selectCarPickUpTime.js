/**
 * Select Check-in and Check-out - 2 days from current date, and for 2 nights long.
 * selectCarPickUpTime
 */

exports.command = function() {
  const browser = this;

    const execBrowser = function() {
    const hours = document.querySelectorAll('.CwtPickerstyles__NumbersList-sc-1kuf29y-1');
    const from = hours[4];

    from.click();

    return true;
  };
  browser.execute(execBrowser);
  return this;
};
