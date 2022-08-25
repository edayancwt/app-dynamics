const moment = require("moment");

module.exports = {
  selectDate: (browser, date) => {
    if (!date) {
      return;
    }
    const day = date.date();
    const month = date.month();
    const formattedMonth = moment(month + 1, "MM").format("MMMM");
    const year = moment(date).year();

    const selector = `[aria-label*="${formattedMonth} ${day}, ${year}"]`;

    browser
      .waitForElementPresent(selector)
      .waitForElementVisible(selector)
      .click(selector);
  }
};
