/**
 * selectSpecificUpcomingHotelDates
 * Select Check-in and Check-out days (from current day) only from the valid dates on the second month that presented on the Date-Picker.
 * If the Check-out date is bigger than the month days, it selects the max date for this month (aka if you select 31 for Feb, it selects 28)
 */

exports.command = function(startDate, endDate) {
  const browser = this;

  const execBrowser = function(startDate, endDate) {
    const days = document.querySelectorAll('.CalendarMonth[data-visible="true"] .CalendarDay__default_2');
    const from = days[startDate - 1];

    if (endDate > days.length) {
        endDate = days.length;
    }

    const to = days[endDate - 1];

    from.click();
    to.click();

    return this;
  };

  browser.execute(execBrowser, [startDate, endDate]);

  return this;
};
