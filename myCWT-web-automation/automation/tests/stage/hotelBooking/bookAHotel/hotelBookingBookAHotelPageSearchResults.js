'use strict';

const globals = require('../../../nightwatch.globals');
const pageHome = require('../../../pages/page-home');
const pageHeader = require('../../../pages/page-header');
const pageMyTrips = require('../../../pages/page-my-trips');
const pageTripDetails = require('../../../pages/page-trip-details');
const pageFooter = require('../../../pages/page-footer');
const pageTechnicalAssistance = require('../../../pages/page-technical-assistance');

module.exports = {

  '@tags': ['hotel', 'booking', 'sanity'],

  before: function (browser) {
    browser.resizeWindow(1920, 1020);
   // browser.windowMaximize();
  },

    'step 1 - login to portal': (browser) => {
      browser
        .loginToPortalStage(globals.users.portalUser58.username, globals.users.portalUser58.password);
    },

    //    ----------------------------------Hotel Booking - Search Results ----------------------------------

    'step 2 - Search Results - Upcoming trips' : (browser) => {
      browser.pause(3000);
      // Click on 'Book A Hotel' btn
      browser.waitAndClickByCss('#header-navigation-link-0');
      browser.pause(5000);
      // Validate autocomplete
      browser.waitAndClickByCss('.hotel-search-panel .places-auto-complete .Select-control input');
      browser.pause(1000);
      // Validate that Results list display no upcoming trips
      browser.useCss();
      browser.waitForElementNotPresent('.Select-menu-outer', 1000);

      //Logout in order to login with user that has an '1 upcoming-trip'
      browser.waitAndClickByCss('#header-my-account-menu');
      browser.waitAndClickByCss('#header-logout');
      const login = browser.page.login();
      login.fillLoginDetails(browser.globals.users.portalUser57);
      browser.pause(3000);
      // Click on 'Book A Hotel' btn
      browser.waitAndClickByCss('#header-navigation-link-0');
      browser.pause(5000);
      // Validate autocomplete
      browser.waitAndClickByCss('.hotel-search-panel .places-auto-complete .Select-control input');
      browser.pause(1000);
      // Validate that  Results list display this single trip.
      browser.waitForTextByCss('.Select-menu-outer .Select-option-group .Select-option-group-label', 'UPCOMING TRIPS');
      // Validate first upcoming trip
      browser.waitForTextByCss('.Select .Select-option:nth-child(2)', 'Trip to Tokyo');
      //Logout in order to login with user that has an '1 upcoming-trip'
      browser.waitAndClickByCss('#header-my-account-menu');
      browser.waitAndClickByCss('#header-logout');
      browser.page.login();
      login.fillLoginDetails(browser.globals.users.portalUser59);
      browser.pause(3000);
      // Click on 'Book A Hotel' btn
      browser.waitAndClickByCss('#header-navigation-link-0');
      browser.pause(5000);
      // Validate autocomplete
      browser.waitAndClickByCss('.hotel-search-panel .places-auto-complete .Select-control input');
      browser.pause(1000);
      // Validate that  Results list display this single trip.
      browser.waitForTextByCss('.Select-menu-outer .Select-option-group .Select-option-group-label', 'UPCOMING TRIPS');
      // Validate first upcoming trip
      browser.waitForTextByCss('.Select .Select-option:nth-child(2)', 'Trip to San Diego');
      browser.waitForTextByCss('.Select .Select-option:nth-child(3)', 'Trip to Croton-on-Hudson');

    },

    'step 3 - Search Results - Upcoming trips - Multiple trips' : (browser) => {
      // Logout
       browser.waitAndClickByCss('#header-my-account-menu');
       browser.waitAndClickByCss('#header-logout');
      // Login with user with multiple upcoming trips
      const login = browser.page.login();
      login.fillLoginDetails(browser.globals.users.portalUser59);
      browser.pause(3000);
      // Click on 'Book A Hotel' btn
      browser.waitAndClickByCss('#header-navigation-link-0');
      browser.pause(5000);
      // click on input field
      browser.waitAndClickByCss('.hotel-search-panel .places-auto-complete .Select-control input');
      browser.pause(500);
      //Results list display all trips
      browser.waitForTextByCss('.Select .Select-option-group:nth-child(1) .Select-option:nth-child(2)', 'Trip to San Diego');
      browser.waitForTextByCss('.Select .Select-option-group:nth-child(1) .Select-option:nth-child(3)', 'Trip to Croton-on-Hudson');
      // TODO: Validate upcoming trips order after update 1.e

    },

  'step 4 - Search Results - Upcoming trips - 6 upcoming trips' : (browser) => {
    // Logout
    browser.waitAndClickByCss('#header-my-account-menu');
    browser.waitAndClickByCss('#header-logout');
    // Login with user with 6 upcoming trips
    const login = browser.page.login();
    login.fillLoginDetails(browser.globals.users.portalUser60);
    browser.pause(3000);
    // Click on 'Book A Hotel' btn
    browser.waitAndClickByCss('#header-navigation-link-0');
    browser.pause(5000);
    // click on input field
    browser.waitAndClickByCss('.hotel-search-panel .places-auto-complete .Select-control input');
    browser.pause(500);
    // Validate Upcoming trips header is appear
    browser.waitForTextByCss('.Select .Select-option-group:nth-child(1) .Select-option-group-label', 'UPCOMING TRIPS');
    // Validate that upcoming Trips list
    browser.waitForTextByCss('.Select .Select-option-group:nth-child(1) .Select-option:nth-child(2)', 'Trip to Philadelphia');
    browser.waitForTextByCss('.Select .Select-option-group:nth-child(1) .Select-option:nth-child(3)', 'Trip to Orlando');
    browser.waitForTextByCss('.Select .Select-option-group:nth-child(1) .Select-option:nth-child(4)', 'Trip to Bangkok');
    browser.waitForTextByCss('.Select .Select-option-group:nth-child(1) .Select-option:nth-child(5', 'Trip to Orlando');
    browser.waitForTextByCss('.Select .Select-option-group:nth-child(1) .Select-option:nth-child(6)', 'Trip to San Diego');
    // Validate that there is no past trip presented
    browser.waitForElementNotPresent('.Select .Select-option-group:nth-child(1) .Select-option:nth-child(7)', 1000);
    // Select the first option in the results
    browser.waitAndClickByCss('.Select .Select-option-group:nth-child(1) .Select-option:nth-child(2)');
    // Validate that the input field's value is equal to the input
    browser.waitForTextByCss('.select-value-label', 'Philadelphia, PA, USA');
    // Validate that Date inputs filled with text
    browser.waitForTextByCss('#start-date-input ~ .DateInput__display-text.DateInput__display-text--has-input', 'Sat, Jan 29');
    browser.waitForTextByCss('#end-date-input ~ .DateInput__display-text.DateInput__display-text--has-input', 'Thu, Oct 20');

  },

    'step 5 - Search Results - Recent searches' : (browser) => {
      //Logout in order to login with user that has an '0 upcoming-trip'
      browser.waitAndClickByCss('#header-my-account-menu');
      browser.waitAndClickByCss('#header-logout');
      const login = browser.page.login();
      login.fillLoginDetails(browser.globals.users.portalUser58);
      browser.pause(3000);
      // Click on 'Book A Hotel' btn
      browser.waitAndClickByCss('#header-navigation-link-0');
      browser.pause(5000);
      // Validate that no search is performed
      browser.waitAndSetValueByCss('.hotel-search-panel .places-auto-complete .Select-control input', 'jerusalem');
      browser.pause(3000);
      // Select the first option in the results
      browser.waitAndClickByCss('#cities-1');
      // Select dates (using 2 days)
      browser.selectSpecificHotelDates(12, 14);
      // Click on find button
      browser.waitAndClickByCss('#nw-search-hotel');
      // Go back to homepage
      browser.pause(5000);
      browser.waitAndClickByCss('#heading');
      // Validate recent searches and upcoming trips
      browser.pause(5000);
      browser.waitAndClickByCss('.hotel-search-panel .places-auto-complete .Select-control input');
      browser.pause(1000);
      browser.waitForTextByCss('.Select .Select-option-group:nth-child(1) .Select-option-group-label', 'RECENT SEARCHES');
      browser.waitForTextByCss('.Select .Select-option:nth-child(2)', 'Jerusalem, Israel');
      // ----------------------Search for a couple of places ---------------------------------- //
      // Search for second place
      browser.pause(5000);
      browser.waitAndSetValueByCss('.hotel-search-panel .places-auto-complete .Select-control input', 'berlin');
      browser.pause(3000);
      // Select the first option in the results
      browser.waitAndClickByCss('#cities-1');
      // Select dates (using 2 days)
      browser.selectSpecificHotelDates(12, 14);
      // Click on find button
      browser.waitAndClickByCss('#nw-search-hotel');
      // Go back to homepage
      browser.pause(5000);
      browser.waitAndClickByCss('#heading');
      // Validate recent searches and upcoming trips
      browser.pause(5000);
      browser.waitAndClickByCss('.hotel-search-panel .places-auto-complete .Select-control input');
      browser.waitForTextByCss('.Select .Select-option-group:nth-child(1) .Select-option-group-label', 'RECENT SEARCHES');
      browser.waitForTextByCss('.Select .Select-option:nth-child(2)', 'Berlin, Germany');
      // Search for third place
      browser.pause(5000);
      browser.waitAndSetValueByCss('.hotel-search-panel .places-auto-complete .Select-control input', 'london');
      browser.pause(3000);
      // Select the first option in the results
      browser.waitAndClickByCss('#cities-1');
      // Select dates (using 2 days)
      browser.selectSpecificHotelDates(12, 14);
      // Click on find button
      browser.waitAndClickByCss('#nw-search-hotel');
      // Go back to homepage
      browser.pause(5000);
      browser.waitAndClickByCss('#heading');
      // Validate recent searches and upcoming trips
      browser.pause(5000);
      browser.waitAndClickByCss('.hotel-search-panel .places-auto-complete .Select-control input');
      browser.waitForTextByCss('.Select .Select-option-group:nth-child(1) .Select-option-group-label', 'RECENT SEARCHES');
      browser.waitForTextByCss('.Select .Select-option:nth-child(2)', 'London, United Kingdom');
      // Search for forth place
      browser.pause(5000);
      browser.waitAndSetValueByCss('.hotel-search-panel .places-auto-complete .Select-control input', 'warsaw');
      browser.pause(3000);
      // Select the first option in the results
      browser.waitAndClickByCss('#cities-1');
      // Select dates (using 2 days)
      browser.selectSpecificHotelDates(12, 14);
      // Click on find button
      browser.waitAndClickByCss('#nw-search-hotel');
      // Go back to homepage
      browser.pause(5000);
      browser.waitAndClickByCss('#heading');
      // Validate recent searches and upcoming trips
      browser.pause(5000);
      browser.waitAndClickByCss('.hotel-search-panel .places-auto-complete .Select-control input');
      browser.waitForTextByCss('.Select .Select-option-group:nth-child(1) .Select-option-group-label', 'RECENT SEARCHES');
      browser.waitForTextByCss('.Select .Select-option:nth-child(2)', 'Warsaw, Poland');
      // Search for fifth place
      browser.pause(5000);
      browser.waitAndSetValueByCss('.hotel-search-panel .places-auto-complete .Select-control input', 'stockholm');
      browser.pause(3000);
      // Select the first option in the results
      browser.waitAndClickByCss('#cities-1');
      // Select dates (using 2 days)
      browser.selectSpecificHotelDates(12, 14);
      // Click on find button
      browser.waitAndClickByCss('#nw-search-hotel');
      // Go back to homepage
      browser.pause(5000);
      browser.waitAndClickByCss('#heading');
      // Validate recent searches and upcoming trips
      browser.pause(5000);
      browser.waitAndClickByCss('.hotel-search-panel .places-auto-complete .Select-control input');
      browser.waitForTextByCss('.Select .Select-option-group:nth-child(1) .Select-option-group-label', 'RECENT SEARCHES');
      browser.waitForTextByCss('.Select .Select-option:nth-child(2)', 'Stockholm, Sweden');
      // Search for sixth place
      browser.pause(5000);
      browser.waitAndSetValueByCss('.hotel-search-panel .places-auto-complete .Select-control input', 'rome');
      browser.pause(3000);
      // Select the first option in the results
      browser.waitAndClickByCss('#cities-1');
      // Select dates (using 2 days)
      browser.selectSpecificHotelDates(12, 14);
      // Click on find button
      browser.waitAndClickByCss('#nw-search-hotel');
      // Go back to homepage
      browser.pause(5000);
      browser.waitAndClickByCss('#heading');
      // Validate recent searches and upcoming trips
      browser.pause(5000);
      browser.waitAndClickByCss('.hotel-search-panel .places-auto-complete .Select-control input');
      browser.waitForTextByCss('.Select .Select-option-group:nth-child(1) .Select-option-group-label', 'RECENT SEARCHES');
      // Validate that the recent search is on top of the list
      browser.waitForTextByCss('.Select .Select-option:nth-child(2)', 'Rome, Italy');
      // Validate that only the first 5 searches appear on list (aka 'jerusalem' search isn't appear)
      browser.waitForTextByCss('.Select .Select-option:nth-child(3)', 'Stockholm, Sweden');
      browser.waitForTextByCss('.Select .Select-option:nth-child(4)', 'Warsaw, Poland');
      browser.waitForTextByCss('.Select .Select-option:nth-child(5', 'London, United Kingdom');
      browser.waitForTextByCss('.Select .Select-option:nth-child(6)', 'Berlin, Germany');
      // TODO: 2.F  Make sure recent search that check-in date is in the past don't display - According to Evyater there is an open bug about it:
      // Validate autocomplete
      browser.pause(5000);
      browser.waitAndClickByCss('.hotel-search-panel .places-auto-complete .Select-control input');
      browser.pause(3000);
      // Search for "tel aviv" and check results
      browser.waitAndSetValueByCss('.hotel-search-panel .places-auto-complete .Select-control input', 'tel aviv');
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
      // Click on find button
      browser.waitAndClickByCss('#nw-search-hotel');
      browser.pause(2000);
      // click on search input
      browser.useCss();
      browser.moveToElement('.hotel-search-panel .places-auto-complete .Select-control input', 10, 10);
      browser.pause(200);
      browser.mouseButtonDown(0);
      browser.pause(200);
      browser.mouseButtonUp(0);
      browser.pause(2000);
      browser.perform(function () {
        let str = 'tel aviv ';
        for (let i = 0; i < str.length; i++) {
          browser.keys([browser.Keys.BACK_SPACE]);
        }
      });
      browser.pause(5000);
      browser.waitAndSetValueByCss('.hotel-search-panel .places-auto-complete .Select-control input', 'j');
      browser.keys([browser.Keys.BACK_SPACE]);
      browser.pause(2000);
      // Validate that the same list from last check is still presented (aka the tel-aviv search isn't appear on the recent search list)
      browser.waitForTextByCss('.Select .Select-option:nth-child(2)', 'Rome, Italy');
      browser.waitForTextByCss('.Select .Select-option:nth-child(3)', 'Stockholm, Sweden');
      browser.waitForTextByCss('.Select .Select-option:nth-child(4)', 'Warsaw, Poland');
      browser.waitForTextByCss('.Select .Select-option:nth-child(5', 'London, United Kingdom');
      browser.waitForTextByCss('.Select .Select-option:nth-child(6)', 'Berlin, Germany');
      //Logout in order to login again and check if recent list still exist
      browser.waitAndClickByCss('#header-my-account-menu');
      browser.waitAndClickByCss('#header-logout');
      browser.page.login();
      login.fillLoginDetails(browser.globals.users.portalUser58);
      browser.pause(4000);
      // Click on 'Book A Hotel' btn
      browser.waitAndClickByCss('#header-navigation-link-0');
      browser.pause(5000);
      // click on input field
      browser.moveToElement('.hotel-search-panel .places-auto-complete .Select-control input', 10, 10);
      browser.pause(200);
      browser.mouseButtonDown(0);
      browser.pause(200);
      browser.mouseButtonUp(0);
      browser.pause(200);
      browser.waitForTextByCss('.Select .Select-option-group:nth-child(1) .Select-option-group-label', 'RECENT SEARCHES');
      // Validate that list is still appear after logout
      browser.waitForTextByCss('.Select .Select-option:nth-child(2)', 'Rome, Italy');
      browser.waitForTextByCss('.Select .Select-option:nth-child(3)', 'Stockholm, Sweden');
      browser.waitForTextByCss('.Select .Select-option:nth-child(4)', 'Warsaw, Poland');
      browser.waitForTextByCss('.Select .Select-option:nth-child(5', 'London, United Kingdom');
      browser.waitForTextByCss('.Select .Select-option:nth-child(6)', 'Berlin, Germany');
      // Select the third option in the results
      browser.waitAndClickByCss('.Select .Select-option:nth-child(3)');
      // Validate that the input field's value is equal to the input
      browser.waitForTextByCss('.select-value-label', 'Stockholm, Sweden');
      // Validate that Date inputs filled with text
      browser.waitForTextByCss('#start-date-input ~ .DateInput__display-text.DateInput__display-text--has-input', ' ');
      browser.waitForTextByCss('#end-date-input ~ .DateInput__display-text.DateInput__display-text--has-input', ' ');
      browser.pause(2000);
    },

  'step 6 - Search Results - Upcoming trips vs Recent searches - 5 upcoming trips' : (browser) => {
    // Logout
     browser.waitAndClickByCss('#header-my-account-menu');
     browser.waitAndClickByCss('#header-logout');
    // Login with user with 5 upcoming trips
    const login = browser.page.login();
    login.fillLoginDetails(browser.globals.users.portalUser60);
    browser.pause(3000);
    // Click on 'Book A Hotel' btn
    browser.waitAndClickByCss('#header-navigation-link-0');
    browser.pause(5000);
    // Search for a location that not on the upcoming trip
    // browser.waitAndSetValueByCss('.hotel-search-panel .places-auto-complete .Select-control input', 'stockholm');
    // browser.pause(1500);
    // // Select the first option in the results
    // browser.waitAndClickByCss('#cities-1');
    // // Select dates (using 2 days)
    // browser.selectSpecificHotelDates(12, 14);
    // // Click on find button
    // browser.waitAndClickByCss('#nw-search-hotel');
    // // Go back to homepage
    // browser.pause(5000);
    // browser.waitAndClickByCss('#heading');
    // browser.pause(2000);
    // click on input field
    browser.waitAndClickByCss('.hotel-search-panel .places-auto-complete .Select-control input');
    browser.pause(2000);
    // Validate Upcoming trips header is appear
    browser.waitForTextByCss('.Select .Select-option-group:nth-child(1) .Select-option-group-label', 'UPCOMING TRIPS');
    // Validate that upcoming Trips list
    browser.waitForTextByCss('.Select .Select-option-group:nth-child(1) .Select-option:nth-child(2)', 'Trip to Philadelphia');
    browser.waitForTextByCss('.Select .Select-option-group:nth-child(1) .Select-option:nth-child(3)', 'Trip to Orlando');
    browser.waitForTextByCss('.Select .Select-option-group:nth-child(1) .Select-option:nth-child(4)', 'Trip to Bangkok');
    browser.waitForTextByCss('.Select .Select-option-group:nth-child(1) .Select-option:nth-child(5', 'Trip to Orlando');
    browser.waitForTextByCss('.Select .Select-option-group:nth-child(1) .Select-option:nth-child(6)', 'Trip to San Diego');
    // Validate Recent Searches header is appear
    browser.waitForTextByCss('.Select .Select-option-group:nth-child(2) .Select-option-group-label', 'RECENT SEARCHES');
    // Validate that list is still appear after logout
    browser.waitForTextByCss('.Select .Select-option-group:nth-child(2) .Select-option:nth-child(2)', 'Rome, Italy');
    browser.waitForTextByCss('.Select .Select-option-group:nth-child(2) .Select-option:nth-child(3)', 'Stockholm, Sweden');
    browser.waitForTextByCss('.Select .Select-option-group:nth-child(2) .Select-option:nth-child(4)', 'Warsaw, Poland');
    browser.waitForTextByCss('.Select .Select-option-group:nth-child(2) .Select-option:nth-child(5', 'London, United Kingdom');
    browser.waitForTextByCss('.Select .Select-option-group:nth-child(2) .Select-option:nth-child(6)', 'Berlin, Germany');
 /*
    // Searching 4 more location in order to check if both Upcoming Trips and Recent Search lists are appearing
    // Search for second place
    browser.waitAndSetValueByCss('.hotel-search-panel .places-auto-complete .Select-control input', 'berlin');
    browser.pause(3000);
    // Select the first option in the results
    browser.waitAndClickByCss('#cities-1');
    // Select dates (using 2 days)
    browser.selectSpecificHotelDates(12, 14);
    // Click on find button
    browser.waitAndClickByCss('#nw-search-hotel');
    // Go back to homepage
    browser.pause(5000);
    browser.waitAndClickByCss('#heading');
    // Validate recent searches and upcoming trips
    browser.pause(5000);
    browser.waitAndClickByXpath('//*[@id="react-select-6--value"]/div[2]/input');

    // Search for third place
    browser.waitAndSetValueByCss('.hotel-search-panel .places-auto-complete .Select-control input', 'london');
    browser.pause(3000);
    // Select the first option in the results
    browser.waitAndClickByCss('#cities-1');
    // Select dates (using 2 days)
    browser.selectSpecificHotelDates(12, 14);
    // Click on find button
    browser.waitAndClickByCss('#nw-search-hotel');
    // Go back to homepage
    browser.pause(5000);
    browser.waitAndClickByCss('#heading');
    // Validate recent searches and upcoming trips
    browser.pause(5000);
    browser.waitAndClickByXpath('//*[@id="react-select-6--value"]/div[2]/input');
    // Search for forth place
    browser.waitAndSetValueByCss('.hotel-search-panel .places-auto-complete .Select-control input', 'warsaw');
    browser.pause(3000);
    // Select the first option in the results
    browser.waitAndClickByCss('#cities-1');
    // Select dates (using 2 days)
    browser.selectSpecificHotelDates(12, 14);
    // Click on find button
    browser.waitAndClickByCss('#nw-search-hotel');
    // Go back to homepage
    browser.pause(5000);
    browser.waitAndClickByCss('#heading');
    // Validate recent searches and upcoming trips
    browser.pause(5000);
    browser.waitAndClickByXpath('//*[@id="react-select-6--value"]/div[2]/input');
    // Search for fifth place
    browser.waitAndSetValueByCss('.hotel-search-panel .places-auto-complete .Select-control input', 'rome');
    browser.pause(3000);
    // Select the first option in the results
    browser.waitAndClickByCss('#cities-1');
    // Select dates (using 2 days)
    browser.selectSpecificHotelDates(12, 14);
    // Click on find button
    browser.waitAndClickByCss('#nw-search-hotel');
    // Go back to homepage
    browser.pause(5000);
    browser.waitAndClickByCss('#heading');
    // Validate recent searches and upcoming trips
    browser.pause(5000);

    // click on input field
    browser.waitAndClickByXpath('//*[@id="react-select-6--value"]/div[2]/input');
    browser.pause(500);
    // Validate Upcoming trips header is appear
    browser.waitForTextByCss('.Select .Select-option-group:nth-child(1) .Select-option-group-label', 'UPCOMING TRIPS');
    // Validate that upcoming Trips list
    browser.waitForTextByCss('.Select .Select-option-group:nth-child(1) .Select-option:nth-child(2)', 'Trip to Philadelphia');
    browser.waitForTextByCss('.Select .Select-option-group:nth-child(1) .Select-option:nth-child(3)', 'Trip to Orlando');
    browser.waitForTextByCss('.Select .Select-option-group:nth-child(1) .Select-option:nth-child(4)', 'Trip to Bangkok');
    browser.waitForTextByCss('.Select .Select-option-group:nth-child(1) .Select-option:nth-child(5', 'Trip to Orlando');
    browser.waitForTextByCss('.Select .Select-option-group:nth-child(1) .Select-option:nth-child(6)', 'Trip to San Diego');
    // Validate Upcoming trips header is appear
    browser.waitForTextByCss('.Select .Select-option-group:nth-child(2) .Select-option-group-label', 'RECENT SEARCHES');
    // Validate that upcoming Trips list
    browser.waitForTextByCss('.Select .Select-option-group:nth-child(2) .Select-option:nth-child(2)', 'Rome, Italy');
    browser.waitForTextByCss('.Select .Select-option-group:nth-child(2) .Select-option:nth-child(3)', 'Warsaw, Poland');
    browser.waitForTextByCss('.Select .Select-option-group:nth-child(2) .Select-option:nth-child(4)', 'London, United Kingdom');
    browser.waitForTextByCss('.Select .Select-option-group:nth-child(2) .Select-option:nth-child(5', 'Berlin, Germany');
    browser.waitForTextByCss('.Select .Select-option-group:nth-child(2) .Select-option:nth-child(6)', 'Stockholm, Sweden');
*/
  },

  'step 7 - Search Results - Upcoming trips vs Recent searches - 1 upcoming trips' : (browser) => {
    // Logout
    browser.waitAndClickByCss('#header-my-account-menu');
    browser.waitAndClickByCss('#header-logout');
    // Login with user with 1 upcoming trips
    const login = browser.page.login();
    login.fillLoginDetails(browser.globals.users.portalUser57);
    browser.pause(3000);
    // Click on 'Book A Hotel' btn
    browser.waitAndClickByCss('#header-navigation-link-0');
    browser.pause(5000);
    // click on input field
    browser.waitAndClickByCss('.hotel-search-panel .places-auto-complete .Select-control input');
    browser.pause(500);

    browser.waitForTextByCss('.Select .Select-option-group:nth-child(1) .Select-option:nth-child(2)', 'Trip to Tokyo');
    // Validate Upcoming trips header is appear
    browser.waitForTextByCss('.Select .Select-option-group:nth-child(2) .Select-option-group-label', 'RECENT SEARCHES');
    // Validate that upcoming Trips list
    browser.waitForTextByCss('.Select .Select-option-group:nth-child(2) .Select-option:nth-child(2)', 'Rome, Italy');
    browser.waitForTextByCss('.Select .Select-option-group:nth-child(2) .Select-option:nth-child(3)', 'Stockholm, Sweden');
    browser.waitForTextByCss('.Select .Select-option-group:nth-child(2) .Select-option:nth-child(4)', 'Warsaw, Poland');
    browser.waitForTextByCss('.Select .Select-option-group:nth-child(2) .Select-option:nth-child(5', 'London, United Kingdom');
    browser.waitForTextByCss('.Select .Select-option-group:nth-child(2) .Select-option:nth-child(6)', 'Berlin, Germany');
  },

  'step 8 - Search Results - Upcoming trips vs Recent searches - 2 upcoming trips' : (browser) => {
    // Logout
    browser.waitAndClickByCss('#header-my-account-menu');
    browser.waitAndClickByCss('#header-logout');
    // Login with user with 2 upcoming trips
    const login = browser.page.login();
    login.fillLoginDetails(browser.globals.users.portalUser59);
    browser.pause(3000);
    // Click on 'Book A Hotel' btn
    browser.waitAndClickByCss('#header-navigation-link-0');
    browser.pause(5000);
    // click on input field
    browser.waitAndClickByCss('.hotel-search-panel .places-auto-complete .Select-control input');
    browser.pause(500);

    browser.waitForTextByCss('.Select .Select-option-group:nth-child(1) .Select-option:nth-child(2)', 'Trip to San Diego');
    browser.waitForTextByCss('.Select .Select-option-group:nth-child(1) .Select-option:nth-child(3)', 'Trip to Croton-on-Hudson');
    // Validate Upcoming trips header is appear
    browser.waitForTextByCss('.Select .Select-option-group:nth-child(2) .Select-option-group-label', 'RECENT SEARCHES');
    // Validate that upcoming Trips list
    browser.waitForTextByCss('.Select .Select-option-group:nth-child(2) .Select-option:nth-child(2)', 'Rome, Italy');
    browser.waitForTextByCss('.Select .Select-option-group:nth-child(2) .Select-option:nth-child(3)', 'Stockholm, Sweden');
    browser.waitForTextByCss('.Select .Select-option-group:nth-child(2) .Select-option:nth-child(4)', 'Warsaw, Poland');
    browser.waitForTextByCss('.Select .Select-option-group:nth-child(2) .Select-option:nth-child(5', 'London, United Kingdom');
    browser.waitForTextByCss('.Select .Select-option-group:nth-child(2) .Select-option:nth-child(6)', 'Berlin, Germany');
  },

  'step 9 - Search Results - Upcoming trips vs Recent searches - no upcoming trips' : (browser) => {
    // Logout
    browser.waitAndClickByCss('#header-my-account-menu');
    browser.waitAndClickByCss('#header-logout');
    // Login with user with no upcoming trips
    const login = browser.page.login();
    login.fillLoginDetails(browser.globals.users.portalUser58);
    browser.pause(3000);
    // Click on 'Book A Hotel' btn
    browser.waitAndClickByCss('#header-navigation-link-0');
    browser.pause(5000);
    // click on input field
    browser.waitAndClickByCss('.hotel-search-panel .places-auto-complete .Select-control input');
    browser.pause(500);

                  // Validate Upcoming trips header is not appear
    //////////////////////////// ------ NOTE -----//////////////////////////////////////
    //  The fact that 'Recent Search' list is with the selector                      //
    // .Select-option-group:nth-child(1) and not .Select-option-group:nth-child(2)   //
    // is indicating that there is no 'Upcoming Trips' section                       //
    ///////////////////////////////////////////////////////////////////////////////////
    browser.waitForTextByCss('.Select .Select-option-group:nth-child(1) .Select-option-group-label', 'RECENT SEARCHES');
    // Validate that upcoming Trips list
    browser.waitForTextByCss('.Select .Select-option-group:nth-child(1) .Select-option:nth-child(2)', 'Rome, Italy');
    browser.waitForTextByCss('.Select .Select-option-group:nth-child(1) .Select-option:nth-child(3)', 'Stockholm, Sweden');
    browser.waitForTextByCss('.Select .Select-option-group:nth-child(1) .Select-option:nth-child(4)', 'Warsaw, Poland');
    browser.waitForTextByCss('.Select .Select-option-group:nth-child(1) .Select-option:nth-child(5', 'London, United Kingdom');
    browser.waitForTextByCss('.Select .Select-option-group:nth-child(1) .Select-option:nth-child(6)', 'Berlin, Germany');
  },

  'step 10 - Search Results - Highlight results' : (browser) => {
    browser.pause(5000);
    // Search for location (with 3 characters)
    browser.waitAndSetValueByCss('.hotel-search-panel .places-auto-complete .Select-control input', 'ber');
    browser.pause(3000);
    // Check if results are highlighted
    browser.elements('css selector', '.Select-menu > .Select-option > span > span > mark', function (elements) {
      for (let i = 0; i < 10 ; i++) {
        let elementCss = 'div.Select-option:nth-child(' + (i + 1) + ') > span > span > mark';
        browser.assert.cssProperty(elementCss, 'color', 'rgba(200, 53, 22, 1)');
      }
    });
    browser.pause(500);
    //add some of the charcters and check highlighted results again
    browser.pause(5000);
    browser.waitAndSetValueByCss('.hotel-search-panel .places-auto-complete .Select-control input', 'lin');
    browser.pause(1500);
    // Check if results are highlighted
    browser.elements('css selector', '.Select-menu > .Select-option > span > span > mark', function (elements) {
      for (let i = 0; i < 10 ; i++) {
        let elementCss = 'div.Select-option:nth-child(' + (i + 1) + ') > span > span > mark';
        browser.assert.cssProperty(elementCss, 'color', 'rgba(200, 53, 22, 1)');
      }
    });
    browser.pause(1500);
    // remove some of the charcters and check highlighted results again
    browser.keys([browser.Keys.BACK_SPACE]);
    browser.keys([browser.Keys.BACK_SPACE]);
    browser.pause(1500);
    // Check if results are highlighted
    browser.elements('css selector', '.Select-menu > .Select-option > span > span > mark', function (elements) {
      for (let i = 0; i < 10 ; i++) {
        let elementCss = 'div.Select-option:nth-child(' + (i + 1) + ') > span > span > mark';
        browser.assert.cssProperty(elementCss, 'color', 'rgba(200, 53, 22, 1)');
      }
    });


  },

  'step 11 - Search Results - Display order ' : (browser) => {
    // remove some of the charcters and check highlighted results again
    browser.keys([browser.Keys.BACK_SPACE]);
    browser.keys([browser.Keys.BACK_SPACE]);
    browser.keys([browser.Keys.BACK_SPACE]);
    browser.keys([browser.Keys.BACK_SPACE]);
    browser.pause(500);
    browser.waitAndSetValueByCss('.hotel-search-panel .places-auto-complete .Select-control input', 'rome');
    browser.pause(1500);
    // Check results types
    browser.waitForAttributeContainsByCss('.Select .Select-option:nth-child(1) i', 'class', 'cwt-icons-city');
    browser.waitForAttributeContainsByCss('.Select .Select-option:nth-child(2) i', 'class', 'cwt-icons-plane');
    browser.waitForAttributeContainsByCss('.Select .Select-option:nth-child(3) i', 'class', 'cwt-icons-plane');
    browser.waitForAttributeContainsByCss('.Select .Select-option:nth-child(4) i', 'class', 'cwt-icons-city');
    browser.waitForAttributeContainsByCss('.Select .Select-option:nth-child(5) i', 'class', 'cwt-icons-city');
    browser.waitForAttributeContainsByCss('.Select .Select-option:nth-child(6) i', 'class', 'cwt-icons-neighbourhood');
    browser.waitForAttributeContainsByCss('.Select .Select-option:nth-child(7) i', 'class', 'cwt-icons-neighbourhood');
    browser.waitForAttributeContainsByCss('.Select .Select-option:nth-child(8) i', 'class', 'cwt-icons-train');
    browser.waitForAttributeContainsByCss('.Select .Select-option:nth-child(9) i', 'class', 'cwt-icons-train');
    browser.waitForAttributeContainsByCss('.Select .Select-option:nth-child(10) i', 'class', 'cwt-icons-landmark');
    // Partial search
    // TODO: make as a function
    browser.perform(function () {
      let str = 'rome ';
      for (let i = 0; i < str.length; i++) {
        browser.keys([browser.Keys.BACK_SPACE]);
      }
    });
    browser.pause(500);
    browser.waitAndSetValueByCss('.hotel-search-panel .places-auto-complete .Select-control input', 'netivot');
    browser.pause(1500);
    // Check results types
    browser.waitForAttributeContainsByCss('.Select .Select-option:nth-child(1) i', 'class', 'cwt-icons-city');
    browser.waitForAttributeContainsByCss('.Select .Select-option:nth-child(2) i', 'class', 'cwt-icons-landmark');
    browser.waitForAttributeContainsByCss('.Select .Select-option:nth-child(3) i', 'class', 'cwt-icons-street');
    browser.waitForAttributeContainsByCss('.Select .Select-option:nth-child(4) i', 'class', 'cwt-icons-street');
    browser.waitForAttributeContainsByCss('.Select .Select-option:nth-child(5) i', 'class', 'cwt-icons-street');
    browser.waitForAttributeContainsByCss('.Select .Select-option:nth-child(6) i', 'class', 'cwt-icons-street');
    browser.waitForAttributeContainsByCss('.Select .Select-option:nth-child(7) i', 'class', 'cwt-icons-street');
    // Partial search
    // TODO: make as a function
    browser.perform(function () {
      let str = 'netivot ';
      for (let i = 0; i < str.length; i++) {
        browser.keys([browser.Keys.BACK_SPACE]);
      }
    });
    // Search an address (using google API)
    browser.pause(500);
    browser.waitAndSetValueByCss('.hotel-search-panel .places-auto-complete .Select-control input', '19 florentin street');
    browser.pause(1500);
    // Check results type
    browser.waitForAttributeContainsByCss('.Select .Select-option:nth-child(1) i', 'class', 'cwt-icons-street');
    browser.waitForAttributeContainsByCss('.Select .Select-option:nth-child(2) i', 'class', 'cwt-icons-street');
  },

};