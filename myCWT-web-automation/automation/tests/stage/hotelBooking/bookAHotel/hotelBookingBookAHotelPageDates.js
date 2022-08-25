'use strict';

const globals = require('../../../nightwatch.globals');
const pageHome = require('../../../pages/page-home');
const pageHeader = require('../../../pages/page-header');
const pageMyTrips = require('../../../pages/page-my-trips');
const pageTripDetails = require('../../../pages/page-trip-details');
const pageFooter = require('../../../pages/page-footer');
const pageTechnicalAssistance = require('../../../pages/page-technical-assistance');

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


module.exports = {

  '@tags': ['hotel', 'booking', 'sanity'],

  before: function (browser) {
    browser.resizeWindow(1920, 1020);
    browser.windowMaximize();
  },

  'step 1 - login to portal': (browser) => {
    browser
      .loginToPortalStage(globals.users.portalUser58.username, globals.users.portalUser58.password);
  },

  //    ----------------------------------Hotel Booking - Dates Field ----------------------------------

  'step 2 - Dates Field - Validate home booking panel - dates' : (browser) => {
    // Click on 'Book A Hotel' btn
    browser.waitAndClickByCss('#header-navigation-link-0');
    browser.pause(5000);
    // Check in
    browser.waitForTextByCss('#check-in-title', 'CHECK IN');
    browser.waitForTextByXpath('//*[@id="hotel-search-panel-row"]/aside[1]/div[1]/div[2]/div/div[1]/div[1]/div', 'Select Date');
    browser.waitForAttributeContainsByXpath('//*[@id="hotel-search-panel-row"]/aside[1]/div[1]/div[1]/i[1]', 'class', 'cwt-icons-checkIn');
    // Check out
    browser.waitForTextByXpath('//*[@id="hotel-search-panel-row"]/aside[1]/div[1]/div[1]/div[2]', 'CHECK OUT');
    browser.waitForTextByXpath('//*[@id="hotel-search-panel-row"]/aside[1]/div[1]/div[2]/div/div[1]/div[3]/div', 'Select Date');
    browser.waitForAttributeContainsByXpath('//*[@id="hotel-search-panel-row"]/aside[1]/div[1]/div[1]/i[2]', 'class', 'cwt-icons-checkOut');

  },

  'step 3 - Dates Field - Validate Dates field is open automatically' : (browser) => {
    browser.pause(2000);
    // Search for "berlin" and check results
    browser.waitAndSetValueByCss('.hotel-search-panel .places-auto-complete .Select-control input', 'berl');
    browser.pause(2000);
    // Select the third option in the results
    browser.waitAndClickByCss('.Select .Select-option:nth-child(3)');
    // Validate that the date-picker is open
    browser.waitForAttributeContainsByXpath('//*[@id="hotel-search-panel-row"]/aside[1]/div[1]/div[2]/div/div[2]/div/div/div[2]/div[2]', 'class', 'transition-container');
    browser.pause(1000);

  },

  'step 4 - Dates Field - Validate default date" ' : (browser) => {
    // Click on 'check-in' to open dialog (no trip)
    browser.useCss();
    browser.click('#start-date-input');
    browser.waitForTextByCss('.CalendarMonth[data-visible="true"] #CalendarMonth__caption strong', currentMonthStr);

    //Logout in order to login with user that has an 'upcoming-trip'
    browser.waitAndClickByCss('#header-my-account-menu');
    browser.waitAndClickByCss('#header-logout');
    const login = browser.page.login();
    login.fillLoginDetails(globals.users.portalUser57);

    // Click on 'check-in' to open dialog (upcoming trip)
    browser.useCss();
    browser.click('#start-date-input');
    browser.pause(2000);
    // Save in variables the trip's days
    browser.getText('.slick-slide[data-index="0"] .new-day-start', function (result) {
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
      browser.pause(1000);
      // Click on 'Book A Hotel' btn
      browser.waitAndClickByCss('#header-navigation-link-0');
      browser.pause(5000);
      browser.waitAndClickByCss('.hotel-search-panel .places-auto-complete .Select-control input');
      browser.pause(1000);
      //  Select the first option in the results
      browser.waitAndClickByCss('.Select div.Select-option');
      browser.pause(500);
      // Click on date input
      browser.moveToElement('#start-date-input', 10, 10);
      browser.pause(200);
      browser.mouseButtonDown(0);
      browser.pause(200);
      browser.mouseButtonUp(0);
      browser.pause(200);

      // Click on 'check-in' to open dialog (with trip) and check month's name
      browser.waitForTextByCss('.CalendarMonth[data-visible="true"] #CalendarMonth__caption strong', upcomingTripMonthStr);
    });
  },

  'step 5 - Dates Field - Invalid dates - Past days' : (browser) => {
    browser.refresh();
    browser.pause(4000);
    // Search for "berlin" and check results
    browser.waitAndSetValueByCss('.hotel-search-panel .places-auto-complete .Select-control input', 'berl');
    browser.pause(2000);
    // Select the first option in the results
    browser.waitAndClickByCss('#cities-1');
    // Click on previous month button in order to pick invalid dates
    browser.moveToElement('.DayPickerNavigation__prev', 10, 10);
    browser.pause(200);
    browser.mouseButtonDown(0);
    browser.pause(200);
    browser.mouseButtonUp(0);
    browser.pause(200);
    // Click on greyed date
    browser.moveToElement('.CalendarMonth[data-visible="true"] tbody.js-CalendarMonth__grid tr td.CalendarDay--blocked-out-of-range', 10, 10);
    browser.pause(200);
    browser.mouseButtonDown(0);
    browser.pause(200);
    browser.mouseButtonUp(0);
    browser.pause(200);
  },

  'step 6 - Dates Field - Invalid dates - more than 28 days' : (browser) => {
    browser.refresh();
    browser.pause(4000);
    // Search for "berlin" and check results
    browser.waitAndSetValueByCss('.hotel-search-panel .places-auto-complete .Select-control input', 'berl');
    browser.pause(2000);
    // Select the first option in the results
    browser.waitAndClickByCss('#cities-1');
    // Select the current day
    browser.waitAndClickByCss('.CalendarDay--today');
    // Click on next month button (twice) in order to pick more than 28 days trip
    browser.moveToElement('.DayPickerNavigation__next', 10, 10);
    browser.pause(200);
    browser.mouseButtonDown(0);
    browser.pause(200);
    browser.mouseButtonUp(0);
    browser.pause(200);
    browser.moveToElement('.DayPickerNavigation__next', 10, 10);
    browser.pause(200);
    browser.mouseButtonDown(0);
    browser.pause(200);
    browser.mouseButtonUp(0);
    browser.pause(200);
    // Select the first valid day in the right side of the date picker
    browser.waitAndClickByCss('.CalendarMonth[data-visible="true"]:nth-child(3) tr:first-child td.CalendarDay--valid');
    browser.pause(200);
    // Select traveler
    browser.waitAndClickByCss('.travelers-auto-complete div.Select-input > input');
    browser.pause(2000);
    // Select the first option in the results
    browser.waitAndClickByCss('.travelers-auto-complete  div:nth-child(1) > div.Select-option');
    browser.pause(2000);
    // Click on find button
    browser.waitAndClickByCss('#nw-search-hotel');
    // Validate proper message
    browser.waitForTextByCss('.dates-error-label', 'Reservations cannot be longer than 28 days');

  },

  'step 7 - Dates Field - Date selection' : (browser) => {
    browser.refresh();
    browser.pause(4000);
    // Search for "berlin" and check results
    browser.waitAndSetValueByCss('.hotel-search-panel .places-auto-complete .Select-control input', 'berl');
    browser.pause(2000);
    // Select the first option in the results
    browser.waitAndClickByCss('#cities-1');
    // Select the current day
    browser.waitAndClickByCss('.CalendarDay--today');
    // Validate that 'CHECK OUT' input is focused and highlighted  end-date-input
    browser.waitForAttributeContainsByXpath('//*[@id="hotel-search-panel-row"]/aside[2]/div[1]/div[2]/div/div[1]/div[3]/div', 'class', 'DateInput__display-text--focused');
    // Select the next valid day in the left side of the date picker
    browser.waitAndClickByCss('.CalendarDay--today + td.CalendarDay--valid');
    // Validate that Date inputs filled with text
    browser.waitForTextByCss('#start-date-input ~ .DateInput__display-text.DateInput__display-text--has-input', ' ');
    browser.waitForTextByCss('#end-date-input ~ .DateInput__display-text.DateInput__display-text--has-input', ' ');
    // Click on date input
    browser.moveToElement('#start-date-input', 10, 10);
    browser.pause(200);
    browser.mouseButtonDown(0);
    browser.pause(200);
    browser.mouseButtonUp(0);
    browser.pause(200);
    browser.assert.cssProperty('.CalendarDay--selected-start', 'background-color', 'rgba(255, 96, 64, 1)');
    browser.assert.cssProperty('.CalendarDay--selected-end', 'background-color', 'rgba(255, 96, 64, 1)');

  },

  'step 8 - Dates Field - Date selection - Check In update - part I' : (browser) => {
    browser.refresh();
    browser.pause(4000);
    // Search for "berlin" and check results
    browser.waitAndSetValueByCss('.hotel-search-panel .places-auto-complete .Select-control input', 'berl');
    browser.pause(2000);
    // Select the first option in the results
    browser.waitAndClickByCss('#cities-1');
    // Save in variable the date of today and tomorrow
    browser.getText('.CalendarDay--today button', function (result) {
      todayDate = result.value;

      browser.getText('.CalendarDay--today + td button', function (result) {
        tomorrowDate = result.value;
      });
      // Select the tomorrow date
      browser.waitAndClickByCss('.CalendarDay--today + td');
      browser.pause(1000);
      // Select today's date
      browser.waitAndClickByCss('.CalendarDay--today');
      browser.pause(1000);
      // Check that check-in input is filled with today's date
      browser.waitForTextByCss('#start-date-input ~ .DateInput__display-text.DateInput__display-text--has-input', todayDate);
      // Select the tomorrow date
      browser.waitAndClickByCss('.CalendarDay--today + td');
      browser.pause(1000);
    });
  },

  'step 9 - Dates Field - Date selection - Check In update - part II' : (browser) => {
    // Click on date input
    browser.moveToElement('#end-date-input', 10, 10);
    browser.pause(200);
    browser.mouseButtonDown(0);
    browser.pause(200);
    browser.mouseButtonUp(0);
    browser.pause(200);
    // Select date in near future
    browser.waitAndClickByCss('.CalendarMonth[data-visible="true"]:nth-child(3) tr:nth-child(3) td');
    browser.pause(1000);
    // Click on date input
    browser.moveToElement('#start-date-input', 10, 10);
    browser.pause(200);
    browser.mouseButtonDown(0);
    browser.pause(200);
    browser.mouseButtonUp(0);
    browser.pause(200);
    // Select the tomorrow date
    browser.waitAndClickByCss('.CalendarDay--today + td');
    browser.pause(1000);
    // Check that input is filled with tomorrow's date
    browser.waitForTextByCss('#start-date-input ~ .DateInput__display-text.DateInput__display-text--has-input', tomorrowDate);
    // Validate that the date-picker is open
    browser.waitForAttributeContainsByXpath('//*[@id="hotel-search-panel-row"]/aside[2]/div[1]/div[2]/div/div[2]/div/div/div[2]/div[2]', 'class', 'transition-container'); // old: //*[@id="hotel-search-panel-row"]/aside[1]/div[1]/div[2]/div/div[2]/div/div/div[2]/div[2]
    browser.pause(1000);
  },

  'step 10 - Dates Field - Date selection - Check Out update' : (browser) => {
    // Select date more in the future
    browser.waitAndClickByCss('.CalendarMonth[data-visible="true"]:nth-child(3) tr:nth-child(4) td');
    browser.pause(1000);
    // Validate that Date Picker is closed
    browser.useXpath();
    browser.waitForElementNotPresent('//*[@id="hotel-search-panel-row"]/aside[2]/div[1]/div[2]/div/div[2]/div/div/div[2]/div[2]', 1000); // //*[@id="hotel-search-panel-row"]/aside[1]/div[1]/div[2]/div/div[2]/div/div/div[2]/div[2]
    // Validate that Date inputs filled with text
    browser.waitForTextByCss('#start-date-input ~ .DateInput__display-text.DateInput__display-text--has-input', ' ');
    browser.waitForTextByCss('#end-date-input ~ .DateInput__display-text.DateInput__display-text--has-input', ' ');

  },

  'step 11 - Dates Field - Number of nights' : (browser) => {
    browser.refresh();
    browser.pause(5000);
    // Search for "berlin" and check results
    browser.waitAndSetValueByCss('.hotel-search-panel .places-auto-complete .Select-control input', 'berl');
    browser.pause(2000);
    // Select the first option in the results
    browser.waitAndClickByCss('#cities-1');
    browser.pause(1000);
    // Select good amount of days in order to calculate number of nights
    // browser.execute(function () {
    //   const days = document.document.querySelectorAll('.CalendarMonth[data-visible="true"]:nth-child(3) .CalendarDay--valid');
    //   const from = days[10].children[0];
    //   const to = days[23].children[0];
    //
    //   from.click();
    //   to.click();
    //
    //   return true;
    // }, []);
    browser.selectSpecificHotelDates(10, 23);
    // Click on date input
    browser.moveToElement('#start-date-input', 10, 10);
    browser.pause(200);
    browser.mouseButtonDown(0);
    browser.pause(200);
    browser.mouseButtonUp(0);
    browser.pause(200);
    // Saving both start and end dates as a variables
    browser.getText('.CalendarDay--selected-start button', function (result) {
      selectedStart = parseInt(result.value);
    });
    browser.getText('.CalendarDay--selected-end button', function (result) {
      selectedEnd = parseInt(result.value);
    });
    // Saving total nights as a variable
    browser.getText('#calendar-summary', function (result) {
      totalNights = parseInt(result.value);
    });
    // Checking that the number of dates are equal to the total amount of night
    browser.timeoutsAsyncScript(20000, function() {
      browser.assert.equal(selectedEnd - selectedStart, totalNights);
    });


   // ----------------- Changes both dates and calculate again ---------- //
    // Click on date input
    browser.moveToElement('#start-date-input', 10, 10);
    browser.pause(200);
    browser.mouseButtonDown(0);
    browser.pause(200);
    browser.mouseButtonUp(0);
    browser.pause(200);
    // Select good amount of days in order to calculate number of nights
    // browser.execute(function () {
    //   const days = document.document.querySelectorAll('.CalendarMonth[data-visible="true"]:nth-child(3) .CalendarDay--valid');
    //   const from = days[9].children[0];
    //   const to = days[24].children[0];
    //
    //   from.click();
    //   to.click();
    //
    //   return true;
    // }, []);
    browser.selectSpecificHotelDates(9, 24);
    // Click on date input
    browser.moveToElement('#start-date-input', 10, 10);
    browser.pause(200);
    browser.mouseButtonDown(0);
    browser.pause(200);
    browser.mouseButtonUp(0);
    browser.pause(200);
    // Saving both start and end dates as a variables
    browser.getText('.CalendarDay--selected-start button', function (result) {
      selectedStart = parseInt(result.value);
    });
    browser.getText('.CalendarDay--selected-end button', function (result) {
      selectedEnd = parseInt(result.value);
    });
    // Saving total nights as a variable
    browser.getText('#calendar-summary', function (result) {
      totalNights = parseInt(result.value);
    });

    // Saving Month's Name as a variable for step 12
    browser.getText('#start-date-input ~ .DateInput__display-text.DateInput__display-text--has-input', function (result) {
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
    browser.timeoutsAsyncScript(20000, function() {
      browser.assert.equal(selectedEnd - selectedStart, totalNights);
    });

  },

  'step 12 - Dates Field - Navigation' : (browser) => {
    // Click on date input
    browser.moveToElement('#start-date-input', 10, 10);
    browser.pause(200);
    browser.mouseButtonDown(0);
    browser.pause(200);
    browser.mouseButtonUp(0);
    browser.pause(200);
    // Click the 'next month' button in order to check the next two months
    browser.waitAndClickByCss('.DayPickerNavigation__prev');
   // browser.waitAndClickByCss('.DayPickerNavigation__next');
    browser.pause(1000);
    browser.waitForTextByCss('.CalendarMonth[data-visible="true"]:nth-child(2) #CalendarMonth__caption strong', nextMonthFormatted);
    browser.waitForTextByCss('.CalendarMonth[data-visible="true"]:nth-child(3) #CalendarMonth__caption strong', nextTwoMonthFormatted);
    // Validate that Date inputs filled with text
    browser.waitForTextByCss('#start-date-input ~ .DateInput__display-text.DateInput__display-text--has-input', ' ');
    browser.waitForTextByCss('#end-date-input ~ .DateInput__display-text.DateInput__display-text--has-input', ' ');
    // Validate that Date input is highlighted during scrolling through the Date-Picker
    browser.assert.cssProperty('.CalendarDay--selected-start', 'background-color', 'rgba(255, 96, 64, 1)');
    // Click the 'previous month' button
    browser.pause(2000);
    browser.waitAndClickByCss('.DayPickerNavigation__prev');
    browser.pause(1000);
    browser.waitAndClickByCss('.DayPickerNavigation__prev');
    browser.pause(1000);
    browser.waitAndClickByCss('.DayPickerNavigation__prev');
    browser.pause(1000);
    // Validate that Date inputs filled with text
    browser.waitForTextByCss('#start-date-input ~ .DateInput__display-text.DateInput__display-text--has-input', ' ');
    browser.waitForTextByCss('#end-date-input ~ .DateInput__display-text.DateInput__display-text--has-input', ' ');
    // Validate that Date input is highlighted during scrolling through the Date-Picker
    //browser.assert.cssProperty('.CalendarDay--selected-start', 'background-color', 'rgba(255, 96, 64, 1)');
    // Check the last two months
    browser.waitForTextByCss('.CalendarMonth[data-visible="true"]:nth-child(2) #CalendarMonth__caption strong', lastTwoMonthFormatted);
    browser.waitForTextByCss('.CalendarMonth[data-visible="true"]:nth-child(3) #CalendarMonth__caption strong', lastMonthFormatted);

    // Click outside the Date-Picker in order to close it
    browser.moveToElement('.hotel-suggestions', 10, 10);
    browser.pause(200);
    browser.mouseButtonDown(0);
    browser.pause(200);
    browser.mouseButtonUp(0);
    browser.pause(200);
    // Click on Date-Picker
    browser.moveToElement('#start-date-input', 10, 10);
    browser.pause(200);
    browser.mouseButtonDown(0);
    browser.pause(200);
    browser.mouseButtonUp(0);
    browser.pause(200);
    // Validate that focused month is the same as the selected date
    browser.waitForTextByCss('.CalendarMonth[data-visible="true"]:nth-child(2) #CalendarMonth__caption strong', generalMonth);

    // Navigate to a far future date
    browser.perform(function () {
      for (let i = 0; i < 18; i++) {
        browser.waitAndClickByCss('.DayPickerNavigation__next');
      }
    });
    browser.pause(1000);
    // Select dates (using 2 days)
    browser.selectSpecificHotelDates(12, 14);
    browser.pause(1000);
    // Saving Month's Name as a variable
    browser.getText('#start-date-input ~ .DateInput__display-text.DateInput__display-text--has-input', function (result) {
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
      browser.moveToElement('#start-date-input', 10, 10);
      browser.pause(200);
      browser.mouseButtonDown(0);
      browser.pause(200);
      browser.mouseButtonUp(0);
      browser.pause(2000);
      // Validate that focused month is the same as the selected date
      browser.waitForTextByCss('.CalendarMonth[data-visible="true"]:nth-child(2) #CalendarMonth__caption strong', farFutureMonth);
    });
    browser.pause(2000);
  },

};