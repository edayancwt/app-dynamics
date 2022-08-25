'use strict';
const dateFormat = require('dateformat');
const formattedYearMonth = dateFormat(new Date(),'mmmm yyyy');
let now = new Date();
let now2 = new Date();
let nextMonthFormatted;
let nextTwoMonthFormatted;
let lastMonthFormatted;
let lastTwoMonthFormatted;

if (now.getMonth() == 11) {
   nextMonthFormatted = new Date(now.getFullYear() + 1, 0, 1);
   nextMonthFormatted = dateFormat(nextMonthFormatted,'mmmm yyyy');

  nextTwoMonthFormatted = new Date(now.getFullYear() + 1, 1, 1);
  nextTwoMonthFormatted = dateFormat(nextTwoMonthFormatted,'mmmm yyyy');
} else {
   nextMonthFormatted = new Date(now.getFullYear(), now.getMonth() + 1, 1);
   nextMonthFormatted = dateFormat(nextMonthFormatted,'mmmm yyyy');

   nextTwoMonthFormatted = new Date(now.getFullYear(), now.getMonth() + 2, 1);
   nextTwoMonthFormatted = dateFormat(nextTwoMonthFormatted,'mmmm yyyy');
}

lastMonthFormatted = new Date(now.setMonth(now.getMonth() - 1));
lastMonthFormatted = dateFormat(lastMonthFormatted,'mmmm yyyy');

lastTwoMonthFormatted = new Date(now2.setMonth(now2.getMonth() - 2));
lastTwoMonthFormatted = dateFormat(lastTwoMonthFormatted,'mmmm yyyy');



let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
// let monthsShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
let currentMonth = new Date().getMonth();
let currentMonthStr = months[currentMonth];
let upcomingTripMonthStr = '';
let generalMonth = '';
let farFutureMonth= '';
let todayDate = '';
let tomorrowDate = '';
let selectedStart;
let selectedEnd;
let totalNights;
let tripDaysStart = '';
let tripDaysEnd = '';

module.exports = {

  '@tags': ['hotel', 'booking', 'sanity'],

  before: function (driver) {
    driver.resizeWindow(1920, 1020);
    driver.windowMaximize();
  },

  'step 1 - login to portal': (driver) => {
    const login = driver.page.login();
    login.fillLoginDetails(driver.globals.users.portalUser58);
  },

  'step 2 - general search': (driver) => {
    driver.pause(2000);
    // Search for location
    driver.waitAndSetValueByCss('.hotel-search-panel .places-auto-complete .Select-control input', 'warsaw');
    driver.pause(2000);
    // Select the first option in the results
    driver.waitAndClickByCss('#cities-1');
    // Select dates (using 2 days)
    driver.selectDatesInSearchHotelBar();
    // Save in variables the trip's days
    driver.getText('#DateInput__screen-reader-message-start-date-input + div', function (result) {
      tripDaysStart = result.value;
    });
    driver.getText('#DateInput__screen-reader-message-end-date-input + div', function (result) {
      tripDaysEnd = result.value;
    });
    // Click on find button
    driver.waitAndClickByCss('#nw-search-hotel');
    // Validate booking page URL
    driver.waitForUrlToContain('travel.stage-mycwt.com/group/selenium-sub-3-selenium-top/book-a-hotel#/hotel-results', 20000);
    // Wait for hotel results to load
    driver.pause(12000);
  },

  //    ----------------------------------Hotel Booking - Result Page - Dates Field ----------------------------------


  'step 3 - Dates Field - Validate home booking panel - dates' : (driver) => {
    // scroll to top
    driver.execute(function() { window.scrollBy(0, 0); }, []);
    driver.pause(2000);
    // Check in
    driver.waitForTextByCss('#check-in-title', 'CHECK IN');
    driver.waitForTextByXpath('//*[@id="hotel-search-panel-row"]/aside[1]/div[1]/div[2]/div/div[1]/div[1]/div', tripDaysStart);
    driver.waitForAttributeContainsByXpath('//*[@id="hotel-search-panel-row"]/aside[1]/div[1]/div[1]/i[1]', 'class', 'cwt-icons-checkIn');
    // Check out
    driver.waitForTextByXpath('//*[@id="hotel-search-panel-row"]/aside[1]/div[1]/div[1]/div[2]', 'CHECK OUT');
    driver.waitForTextByXpath('//*[@id="hotel-search-panel-row"]/aside[1]/div[1]/div[2]/div/div[1]/div[3]/div', tripDaysEnd);
    driver.waitForAttributeContainsByXpath('//*[@id="hotel-search-panel-row"]/aside[1]/div[1]/div[1]/i[2]', 'class', 'cwt-icons-checkOut');

  },

  'step 4 - Dates Field - Validate Dates field is open automatically' : (driver) => {
    driver.pause(2000);
    // Search for "berlin" and check results
    driver.waitAndSetValueByCss('.hotel-search-panel .places-auto-complete .Select-control input', 'berl');
    driver.pause(2000);
    // Select the third option in the results
    driver.waitAndClickByCss('.Select .Select-option:nth-child(3)');
    // Check in
    driver.waitForTextByCss('#check-in-title', 'CHECK IN');
    driver.waitForTextByXpath('//*[@id="hotel-search-panel-row"]/aside[1]/div[1]/div[2]/div/div[1]/div[1]/div', tripDaysStart);
    driver.waitForAttributeContainsByXpath('//*[@id="hotel-search-panel-row"]/aside[1]/div[1]/div[1]/i[1]', 'class', 'cwt-icons-checkIn');
    // Check out
    driver.waitForTextByXpath('//*[@id="hotel-search-panel-row"]/aside[1]/div[1]/div[1]/div[2]', 'CHECK OUT');
    driver.waitForTextByXpath('//*[@id="hotel-search-panel-row"]/aside[1]/div[1]/div[2]/div/div[1]/div[3]/div', tripDaysEnd);
    driver.waitForAttributeContainsByXpath('//*[@id="hotel-search-panel-row"]/aside[1]/div[1]/div[1]/i[2]', 'class', 'cwt-icons-checkOut');
    driver.pause(1000);

  },

  'step 5 - Dates Field - Validate default date - another login and general search ' : (driver) => {
    // Click on 'check-in' to open dialog (no trip)
    driver.useCss();
    driver.click('#start-date-input');
    driver.waitForTextByCss('.CalendarMonth[data-visible="true"] #CalendarMonth__caption strong', currentMonthStr);

    //Logout in order to login with user that has an 'upcoming-trip'
    driver.waitAndClickByCss('#header-my-account-menu');
    driver.waitAndClickByCss('#header-logout');
    const login = driver.page.login();
    login.fillLoginDetails(driver.globals.users.portalUser59);

    // General search
    driver.pause(2000);
    // Search for location
    driver.waitAndSetValueByCss('.hotel-search-panel .places-auto-complete .Select-control input', 'warsaw');
    driver.pause(2000);
    // Select the first option in the results
    driver.waitAndClickByCss('#cities-1');
    // Select dates (using 2 days)
    driver.selectDatesInSearchHotelBar();
    // Save in variables the trip's days
    driver.getText('#DateInput__screen-reader-message-start-date-input + div', function (result) {
      tripDaysStart = result.value;
    });
    driver.getText('#DateInput__screen-reader-message-end-date-input + div', function (result) {
      tripDaysEnd = result.value;
    });
    // // Select traveler
    // driver.waitAndClickByCss('.travelers-auto-complete div.Select-input > input');
    // driver.pause(2000);
    // // Select the first option in the results
    // driver.waitAndClickByCss('.travelers-auto-complete  div:nth-child(1) > div.Select-option');
    // driver.pause(2000);
    // Click on find button
    driver.waitAndClickByCss('#nw-search-hotel');
    // Wait for hotel results to load
    driver.pause(12000);


    // Click on 'check-in' to open dialog (upcoming trip)
    driver.useCss();
    driver.click('.hotel-search-panel .places-auto-complete .Select-control input');
    driver.pause(4000);
    // Save in variables the trip's days
    driver.getText('.goingto-autocomplete-item-dates', function (result) {
      let regex = /\W\S\w\D/g;
      let whiteSpaceReg = /\S/g;
      let firstLetter;
      let restOfLetters;
      upcomingTripMonthStr = result.value;
      upcomingTripMonthStr = upcomingTripMonthStr.match(regex);
      upcomingTripMonthStr = upcomingTripMonthStr[0].match(whiteSpaceReg).join("");
      firstLetter = upcomingTripMonthStr.charAt(0).toUpperCase();
      restOfLetters = upcomingTripMonthStr.slice(1).toLowerCase();
      upcomingTripMonthStr = firstLetter + restOfLetters;
      driver.pause(1000);
      driver.waitAndClickByCss('.hotel-search-panel-autocomplete');
      driver.pause(1000);
      //  Select the first option in the results
      driver.waitAndClickByCss('.Select div.Select-option');
      driver.pause(500);
      // Click on date input
      driver.moveToElement('#start-date-input', 10, 10);
      driver.pause(200);
      driver.mouseButtonDown(0);
      driver.pause(200);
      driver.mouseButtonUp(0);
      driver.pause(200);

      // Click on 'check-in' to open dialog (with trip) and check month's name
      driver.waitForTextByCss('.CalendarMonth[data-visible="true"] #CalendarMonth__caption strong', upcomingTripMonthStr);
    });
  },

  'step 6 - Dates Field - Invalid dates - Past days' : (driver) => {
    driver.refresh();
    driver.pause(4000);
    // Click on Date-Picker
    driver.moveToElement('#start-date-input', 10, 10);
    driver.pause(200);
    driver.mouseButtonDown(0);
    driver.pause(200);
    driver.mouseButtonUp(0);
    driver.pause(2000);
    // Click on previous month button in order to pick invalid dates
    driver.moveToElement('.DayPickerNavigation__prev', 10, 10);
    driver.pause(200);
    driver.mouseButtonDown(0);
    driver.pause(200);
    driver.mouseButtonUp(0);
    driver.pause(200);
    // Click on greyed date
    driver.moveToElement('.CalendarMonth[data-visible="true"] tbody.js-CalendarMonth__grid tr td.CalendarDay--blocked-out-of-range', 10, 10);
    driver.pause(200);
    driver.mouseButtonDown(0);
    driver.pause(200);
    driver.mouseButtonUp(0);
    driver.pause(200);
  },

  'step 7 - Dates Field - Invalid dates - more than 28 days' : (driver) => {
    driver.refresh();
    driver.pause(4000);
    // Click on Date-Picker
    driver.moveToElement('#start-date-input', 10, 10);
    driver.pause(200);
    driver.mouseButtonDown(0);
    driver.pause(200);
    driver.mouseButtonUp(0);
    driver.pause(2000);
    // Select the current day
    driver.waitAndClickByCss('.CalendarDay--today');
    // Click on next month button (twice) in order to pick more than 28 days trip
    driver.moveToElement('.DayPickerNavigation__next', 10, 10);
    driver.pause(200);
    driver.mouseButtonDown(0);
    driver.pause(200);
    driver.mouseButtonUp(0);
    driver.pause(200);
    driver.moveToElement('.DayPickerNavigation__next', 10, 10);
    driver.pause(200);
    driver.mouseButtonDown(0);
    driver.pause(200);
    driver.mouseButtonUp(0);
    driver.pause(200);
    // Select the first valid day in the right side of the date picker
    driver.waitAndClickByCss('.CalendarMonth[data-visible="true"]:nth-child(3) tr:first-child td.CalendarDay--valid');
    driver.pause(200);
    // Click on find button
    driver.waitAndClickByCss('#nw-search-hotel');
    // Validate proper message
    driver.waitForTextByCss('.dates-error-label', 'Reservations cannot be longer than 28 days');

  },

    'step 8 - Dates Field - Date selection' : (driver) => {
      driver.refresh();
      driver.pause(4000);
      // Click on Date-Picker
      driver.moveToElement('#start-date-input', 10, 10);
      driver.pause(200);
      driver.mouseButtonDown(0);
      driver.pause(200);
      driver.mouseButtonUp(0);
      driver.pause(2000);
      // Select the current day
      driver.waitAndClickByCss('.CalendarDay--today');
      // Validate that 'CHECK OUT' input is focused and highlighted  end-date-input
      driver.waitForAttributeContainsByXpath('//*[@id="hotel-search-panel-row"]/aside[1]/div[1]/div[2]/div/div[1]/div[3]/div', 'class', 'DateInput__display-text--focused');
      // Select the next valid day in the left side of the date picker
      driver.waitAndClickByCss('.CalendarDay--today + td.CalendarDay--valid');
      // Validate that Date inputs filled with text
      driver.waitForTextByCss('#start-date-input ~ .DateInput__display-text.DateInput__display-text--has-input', ' ');
      driver.waitForTextByCss('#end-date-input ~ .DateInput__display-text.DateInput__display-text--has-input', ' ');
      // Click on date input
      driver.moveToElement('#start-date-input', 10, 10);
      driver.pause(200);
      driver.mouseButtonDown(0);
      driver.pause(200);
      driver.mouseButtonUp(0);
      driver.pause(200);
      driver.assert.cssProperty('.CalendarDay--selected-start', 'background-color', 'rgba(255, 96, 64, 1)');
      driver.assert.cssProperty('.CalendarDay--selected-end', 'background-color', 'rgba(255, 96, 64, 1)');

    },

      'step 9 - Dates Field - Date selection - Check In update - part I' : (driver) => {
        driver.refresh();
        driver.pause(4000);
        // Click on Date-Picker
        driver.moveToElement('#start-date-input', 10, 10);
        driver.pause(200);
        driver.mouseButtonDown(0);
        driver.pause(200);
        driver.mouseButtonUp(0);
        driver.pause(2000);
        // Save in variable the date of today and tomorrow
        driver.getText('.CalendarDay--today button', function (result) {
          todayDate = result.value;

          driver.getText('.CalendarDay--today + td button', function (result) {
            tomorrowDate = result.value;
          });
          // Select the tomorrow date
          driver.waitAndClickByCss('.CalendarDay--today + td');
          driver.pause(1000);
          // Select today's date
          driver.waitAndClickByCss('.CalendarDay--today');
          driver.pause(1000);
          // Check that check-in input is filled with today's date
          driver.waitForTextByCss('#start-date-input ~ .DateInput__display-text.DateInput__display-text--has-input', todayDate);
          // Select the tomorrow date
          driver.waitAndClickByCss('.CalendarDay--today + td');
          driver.pause(1000);
        });
      },

      'step 10 - Dates Field - Date selection - Check In update - part II' : (driver) => {
        // Click on date input
        driver.moveToElement('#end-date-input', 10, 10);
        driver.pause(200);
        driver.mouseButtonDown(0);
        driver.pause(200);
        driver.mouseButtonUp(0);
        driver.pause(200);
        // Select date in near future
        driver.waitAndClickByCss('.CalendarMonth[data-visible="true"]:nth-child(3) tr:nth-child(3) td');
        driver.pause(1000);
        // Click on date input
        driver.moveToElement('#start-date-input', 10, 10);
        driver.pause(200);
        driver.mouseButtonDown(0);
        driver.pause(200);
        driver.mouseButtonUp(0);
        driver.pause(200);
        // Select the tomorrow date
        driver.waitAndClickByCss('.CalendarDay--today + td');
        driver.pause(1000);
        // Check that input is filled with tomorrow's date
        driver.waitForTextByCss('#start-date-input ~ .DateInput__display-text.DateInput__display-text--has-input', tomorrowDate);
        // Validate that the date-picker is open
        driver.waitForAttributeContainsByXpath('//*[@id="hotel-search-panel-row"]/aside[1]/div[1]/div[2]/div/div[2]/div/div/div[2]/div[2]', 'class', 'transition-container');
        driver.pause(1000);
      },

      'step 11 - Dates Field - Date selection - Check Out update' : (driver) => {
        // Select date more in the future
        driver.waitAndClickByCss('.CalendarMonth[data-visible="true"]:nth-child(3) tr:nth-child(4) td');
        driver.pause(1000);
        // Validate that Date Picker is closed
        driver.useXpath();
        driver.waitForElementNotPresent('//*[@id="hotel-search-panel-row"]/aside[1]/div[1]/div[2]/div/div[2]/div/div/div[2]/div[2]', 1000);
        // Validate that Date inputs filled with text
        driver.waitForTextByCss('#start-date-input ~ .DateInput__display-text.DateInput__display-text--has-input', ' ');
        driver.waitForTextByCss('#end-date-input ~ .DateInput__display-text.DateInput__display-text--has-input', ' ');

      },

      'step 12 - Dates Field - Number of nights' : (driver) => {
        driver.refresh();
        driver.pause(4000);
        // Click on Date-Picker
        driver.moveToElement('#start-date-input', 10, 10);
        driver.pause(200);
        driver.mouseButtonDown(0);
        driver.pause(200);
        driver.mouseButtonUp(0);
        driver.pause(2000);
        // Select good amount of days in order to calculate number of nights
        driver.execute(function () {
            const days = document.document.querySelectorAll('.CalendarMonth[data-visible="true"]:nth-child(3) .CalendarDay--valid');
            const from = days[10].children[0];
            const to = days[23].children[0];

            from.click();
            to.click();

            return true;
          }, []);
        // Click on date input
        driver.moveToElement('#start-date-input', 10, 10);
        driver.pause(200);
        driver.mouseButtonDown(0);
        driver.pause(200);
        driver.mouseButtonUp(0);
        driver.pause(200);
        // Saving both start and end dates as a variables
        driver.getText('.CalendarDay--selected-start button', function (result) {
          selectedStart = parseInt(result.value);
        });
        driver.getText('.CalendarDay--selected-end button', function (result) {
          selectedEnd = parseInt(result.value);
        });
        // Saving total nights as a variable
        driver.getText('#calendar-summary', function (result) {
          totalNights = parseInt(result.value);
        });
        // Checking that the number of dates are equal to the total amount of night
        driver.timeoutsAsyncScript(20000, function() {
          driver.assert.equal(selectedEnd - selectedStart, totalNights);
        });


       // ----------------- Changes both dates and calculate again ---------- //
        // Click on date input
        driver.moveToElement('#start-date-input', 10, 10);
        driver.pause(200);
        driver.mouseButtonDown(0);
        driver.pause(200);
        driver.mouseButtonUp(0);
        driver.pause(200);
        // Select good amount of days in order to calculate number of nights
        driver.execute(function () {
          const days = document.document.querySelectorAll('.CalendarMonth[data-visible="true"]:nth-child(3) .CalendarDay--valid');
          const from = days[9].children[0];
          const to = days[24].children[0];

          from.click();
          to.click();

          return true;
        }, []);
        // Click on date input
        driver.moveToElement('#start-date-input', 10, 10);
        driver.pause(200);
        driver.mouseButtonDown(0);
        driver.pause(200);
        driver.mouseButtonUp(0);
        driver.pause(200);
        // Saving both start and end dates as a variables
        driver.getText('.CalendarDay--selected-start button', function (result) {
          selectedStart = parseInt(result.value);
        });
        driver.getText('.CalendarDay--selected-end button', function (result) {
          selectedEnd = parseInt(result.value);
        });
        // Saving total nights as a variable
        driver.getText('#calendar-summary', function (result) {
          totalNights = parseInt(result.value);
        });

        // Saving Month's Name as a variable for step 12
        driver.getText('#start-date-input ~ .DateInput__display-text.DateInput__display-text--has-input', function (result) {
          let regex = /\W\S\w\D/g;
          let whiteSpaceReg = /\S/g;
          let firstLetter;
          let restOfLetters;
          generalMonth = result.value;
          generalMonth = generalMonth.match(regex);
          generalMonth = generalMonth[0].match(whiteSpaceReg).join("");
          firstLetter = generalMonth.charAt(0).toUpperCase();
          restOfLetters = generalMonth.slice(1).toLowerCase();
          generalMonth = firstLetter + restOfLetters;
        });
        // Checking that the number of dates are equal to the total amount of night
        driver.timeoutsAsyncScript(20000, function() {
          driver.assert.equal(selectedEnd - selectedStart, totalNights);
        });

      },

      'step 13 - Dates Field - Navigation' : (driver) => {
        // Click on date input
        driver.moveToElement('#start-date-input', 10, 10);
        driver.pause(200);
        driver.mouseButtonDown(0);
        driver.pause(200);
        driver.mouseButtonUp(0);
        driver.pause(200);
        // Click the 'next month' button in order to check the next two months
        driver.waitAndClickByCss('.DayPickerNavigation__next');
        driver.waitForTextByCss('.CalendarMonth[data-visible="true"]:nth-child(2) #CalendarMonth__caption strong', nextMonthFormatted);
        driver.waitForTextByCss('.CalendarMonth[data-visible="true"]:nth-child(3) #CalendarMonth__caption strong', nextTwoMonthFormatted);
        // Validate that Date inputs filled with text
        driver.waitForTextByCss('#start-date-input ~ .DateInput__display-text.DateInput__display-text--has-input', ' ');
        driver.waitForTextByCss('#end-date-input ~ .DateInput__display-text.DateInput__display-text--has-input', ' ');
        // Validate that Date input is highlighted during scrolling through the Date-Picker
        driver.assert.cssProperty('.CalendarDay--selected-start', 'background-color', 'rgba(255, 96, 64, 1)');
        // Click the 'previous month' button
        driver.pause(2000);
        driver.waitAndClickByCss('.DayPickerNavigation__prev');
        driver.pause(1000);
        driver.waitAndClickByCss('.DayPickerNavigation__prev');
        driver.pause(1000);
        driver.waitAndClickByCss('.DayPickerNavigation__prev');
        driver.pause(1000);
        // Validate that Date inputs filled with text
        driver.waitForTextByCss('#start-date-input ~ .DateInput__display-text.DateInput__display-text--has-input', ' ');
        driver.waitForTextByCss('#end-date-input ~ .DateInput__display-text.DateInput__display-text--has-input', ' ');
        // Validate that Date input is highlighted during scrolling through the Date-Picker
        driver.assert.cssProperty('.CalendarDay--selected-start', 'background-color', 'rgba(255, 96, 64, 1)');
        // Check the last two months
        /*
        driver.waitForTextByCss('.CalendarMonth[data-visible="true"]:nth-child(2) #CalendarMonth__caption strong', lastTwoMonthFormatted);
        driver.waitForTextByCss('.CalendarMonth[data-visible="true"]:nth-child(3) #CalendarMonth__caption strong', lastMonthFormatted);
        */
        // Click outside the Date-Picker in order to close it
        driver.moveToElement('#toggle-btn-wrap', 10, 10);
        driver.pause(200);
        driver.mouseButtonDown(0);
        driver.pause(200);
        driver.mouseButtonUp(0);
        driver.pause(200);
        // Click on Date-Picker
        driver.moveToElement('#start-date-input', 10, 10);
        driver.pause(200);
        driver.mouseButtonDown(0);
        driver.pause(200);
        driver.mouseButtonUp(0);
        driver.pause(200);
        // Validate that focused month is the same as the selected date
        /*
        driver.waitForTextByCss('.CalendarMonth[data-visible="true"]:nth-child(2) #CalendarMonth__caption strong', generalMonth);
        */
        // Navigate to a far future date
        driver.perform(function () {
          for (let i = 0; i < 18; i++) {
            driver.waitAndClickByCss('.DayPickerNavigation__next');
          }
        });
        driver.pause(1000);
        // Select dates (using 2 days)
        driver.selectDatesInSearchHotelBar();
        driver.pause(1000);
        // Saving Month's Name as a variable
        driver.getText('#start-date-input ~ .DateInput__display-text.DateInput__display-text--has-input', function (result) {
          let regex = /\W\S\w\D/g;
          let whiteSpaceReg = /\S/g;
          let firstLetter;
          let restOfLetters;
          farFutureMonth = result.value;
          farFutureMonth = farFutureMonth.match(regex);
          farFutureMonth = farFutureMonth[0].match(whiteSpaceReg).join("");
          firstLetter = farFutureMonth.charAt(0).toUpperCase();
          restOfLetters = farFutureMonth.slice(1).toLowerCase();
          farFutureMonth = firstLetter + restOfLetters;
          // Click on Date-Picker
          driver.moveToElement('#start-date-input', 10, 10);
          driver.pause(200);
          driver.mouseButtonDown(0);
          driver.pause(200);
          driver.mouseButtonUp(0);
          driver.pause(2000);
          // Validate that focused month is the same as the selected date
          /*
          driver.waitForTextByCss('.CalendarMonth[data-visible="true"]:nth-child(2) #CalendarMonth__caption strong', farFutureMonth);
          */
        });
        driver.pause(2000);
      },

};