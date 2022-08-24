/**
 * Select Check-in and Check-out - 2 days from current date, and for 2 nights long.
 * selectUpcomingHotelDates
 */

exports.command = function() {
  const browser = this;

    const execBrowser = function() {
    const days = document.querySelectorAll('.CalendarMonth[data-visible="true"] .CalendarDay__default_2');
    const from = days[2];
    const to = days[4];

    from.click();
    to.click();

    return true;
  };
  browser.execute(execBrowser);
  return this;
};
