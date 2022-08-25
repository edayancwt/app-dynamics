'use strict';

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

    //    ----------------------------------Hotel Booking - Search Results ----------------------------------

    'step 2 - Search Results - Upcoming trips' : (driver) => {

      driver.pause(3000);
      // Validate autocomplete
      driver.waitAndClickByCss('.hotel-search-panel-autocomplete');
      driver.pause(1000);
      // Validate that Results list display no upcoming trips
      driver.useCss();
      driver.waitForElementNotPresent('.Select-menu-outer', 1000);

      //Logout in order to login with user that has an '1 upcoming-trip'
      driver.waitAndClickByCss('#header-my-account-menu');
      driver.waitAndClickByCss('#header-logout');
      const login = driver.page.login();
      login.fillLoginDetails(driver.globals.users.portalUser57);
      driver.pause(5000);
      // Validate autocomplete
      driver.waitAndClickByCss('.hotel-search-panel .places-auto-complete .Select-control input');
      driver.pause(1000);
      // Validate that  Results list display this single trip.
      driver.waitForTextByCss('.Select-menu-outer .Select-option-group .Select-option-group-label', 'UPCOMING TRIPS');
      // Validate first upcoming trip
      driver.waitForTextByCss('.Select .Select-option:nth-child(2)', 'Trip to Tokyo');
      //Logout in order to login with user that has an '1 upcoming-trip'
      driver.waitAndClickByCss('#header-my-account-menu');
      driver.waitAndClickByCss('#header-logout');
      driver.page.login();
      login.fillLoginDetails(driver.globals.users.portalUser59);
      driver.pause(3000);
      // Validate autocomplete
      driver.waitAndClickByCss('.hotel-search-panel-autocomplete');
      driver.pause(1000);
      // Validate that  Results list display this single trip.
      driver.waitForTextByCss('.Select-menu-outer .Select-option-group .Select-option-group-label', 'UPCOMING TRIPS');
      // Validate first upcoming trip
      driver.waitForTextByCss('.Select .Select-option:nth-child(2)', 'Trip to San Diego');
      driver.waitForTextByCss('.Select .Select-option:nth-child(3)', 'Trip to Croton-on-Hudson');

    },

    'step 3 - Search Results - Upcoming trips - Multiple trips' : (driver) => {
      // Logout
       driver.waitAndClickByCss('#header-my-account-menu');
       driver.waitAndClickByCss('#header-logout');
      // Login with user with multiple upcoming trips
      const login = driver.page.login();
      login.fillLoginDetails(driver.globals.users.portalUser59);
      driver.pause(3000);
      // click on input field
      driver.waitAndClickByXpath('//*[@id="react-select-6--value"]/div[2]/input');
      driver.pause(500);
      //Results list display all trips
      driver.waitForTextByCss('.Select .Select-option-group:nth-child(1) .Select-option:nth-child(2)', 'Trip to San Diego');
      driver.waitForTextByCss('.Select .Select-option-group:nth-child(1) .Select-option:nth-child(3)', 'Trip to Croton-on-Hudson');
      // TODO: Validate upcoming trips order after update 1.e

    },

  'step 4 - Search Results - Upcoming trips - 6 upcoming trips' : (driver) => {
    // Logout
    driver.waitAndClickByCss('#header-my-account-menu');
    driver.waitAndClickByCss('#header-logout');
    // Login with user with 6 upcoming trips
    const login = driver.page.login();
    login.fillLoginDetails(driver.globals.users.portalUser60);
    driver.pause(3000);
    // click on input field
    driver.waitAndClickByXpath('//*[@id="react-select-6--value"]/div[2]/input');
    driver.pause(500);
    // Validate Upcoming trips header is appear
    driver.waitForTextByCss('.Select .Select-option-group:nth-child(1) .Select-option-group-label', 'UPCOMING TRIPS');
    // Validate that upcoming Trips list
    driver.waitForTextByCss('.Select .Select-option-group:nth-child(1) .Select-option:nth-child(2)', 'Trip to Philadelphia');
    driver.waitForTextByCss('.Select .Select-option-group:nth-child(1) .Select-option:nth-child(3)', 'Trip to Orlando');
    driver.waitForTextByCss('.Select .Select-option-group:nth-child(1) .Select-option:nth-child(4)', 'Trip to Bangkok');
    driver.waitForTextByCss('.Select .Select-option-group:nth-child(1) .Select-option:nth-child(5', 'Trip to Orlando');
    driver.waitForTextByCss('.Select .Select-option-group:nth-child(1) .Select-option:nth-child(6)', 'Trip to San Diego');
    // Validate that there is no past trip presented
    driver.waitForElementNotPresent('.Select .Select-option-group:nth-child(1) .Select-option:nth-child(7)', 1000);
    // Select the first option in the results
    driver.waitAndClickByCss('.Select .Select-option-group:nth-child(1) .Select-option:nth-child(2)');
    // Validate that the input field's value is equal to the input
    driver.waitForTextByCss('.select-value-label', 'Philadelphia, PA, USA');
    // Validate that Date inputs filled with text
    driver.waitForTextByCss('#start-date-input ~ .DateInput__display-text.DateInput__display-text--has-input', 'Sat, Jan 29');
    driver.waitForTextByCss('#end-date-input ~ .DateInput__display-text.DateInput__display-text--has-input', 'Thu, Oct 20');

  },

    'step 5 - Search Results - Recent searches' : (driver) => {
      //Logout in order to login with user that has an '1 upcoming-trip'
      driver.waitAndClickByCss('#header-my-account-menu');
      driver.waitAndClickByCss('#header-logout');
      const login = driver.page.login();
      login.fillLoginDetails(driver.globals.users.portalUser58);
      driver.pause(2000);
      // Validate that Results list display no upcoming trips
      driver.waitAndClickByCss('.hotel-search-panel-autocomplete');
      driver.pause(1000);
      driver.useCss();
      driver.waitForElementNotPresent('.Select-menu-outer', 1000);
      // Validate that no search is performed
      driver.waitAndSetValueByCss('.hotel-search-panel .places-auto-complete .Select-control input', 'jerusalem');
      driver.pause(3000);
      // Select the first option in the results
      driver.waitAndClickByCss('#cities-1');
      // Select dates (using 2 days)
      driver.selectSpecificHotelDates(12, 14);
      // Click on find button
      driver.waitAndClickByCss('#nw-search-hotel');
      // Go back to homepage
      driver.pause(5000);
      driver.waitAndClickByCss('#heading');
      // Validate recent searches and upcoming trips
      driver.pause(5000);
      driver.waitAndClickByXpath('//*[@id="react-select-6--value"]/div[2]/input');
      driver.waitForTextByXpath('//*[@id="react-select-6--list"]/div[1]/div[1]', 'RECENT SEARCHES');
      driver.waitForTextByCss('.Select .Select-option:nth-child(2)', 'Jerusalem, Israel');
      // ----------------------Search for a couple of places ---------------------------------- //
      // Search for second place
      driver.waitAndSetValueByCss('.hotel-search-panel .places-auto-complete .Select-control input', 'berlin');
      driver.pause(3000);
      // Select the first option in the results
      driver.waitAndClickByCss('#cities-1');
      // Select dates (using 2 days)
      driver.selectSpecificHotelDates(12, 14);
      // Click on find button
      driver.waitAndClickByCss('#nw-search-hotel');
      // Go back to homepage
      driver.pause(5000);
      driver.waitAndClickByCss('#heading');
      // Validate recent searches and upcoming trips
      driver.pause(5000);
      driver.waitAndClickByXpath('//*[@id="react-select-6--value"]/div[2]/input');
      driver.waitForTextByXpath('//*[@id="react-select-6--list"]/div[1]/div[1]', 'RECENT SEARCHES');
      driver.waitForTextByCss('.Select .Select-option:nth-child(2)', 'Berlin, Germany');
      // Search for third place
      driver.waitAndSetValueByCss('.hotel-search-panel .places-auto-complete .Select-control input', 'london');
      driver.pause(3000);
      // Select the first option in the results
      driver.waitAndClickByCss('#cities-1');
      // Select dates (using 2 days)
      driver.selectSpecificHotelDates(12, 14);
      // Click on find button
      driver.waitAndClickByCss('#nw-search-hotel');
      // Go back to homepage
      driver.pause(5000);
      driver.waitAndClickByCss('#heading');
      // Validate recent searches and upcoming trips
      driver.pause(5000);
      driver.waitAndClickByXpath('//*[@id="react-select-6--value"]/div[2]/input');
      driver.waitForTextByXpath('//*[@id="react-select-6--list"]/div[1]/div[1]', 'RECENT SEARCHES');
      driver.waitForTextByCss('.Select .Select-option:nth-child(2)', 'London, United Kingdom');
      // Search for forth place
      driver.waitAndSetValueByCss('.hotel-search-panel .places-auto-complete .Select-control input', 'warsaw');
      driver.pause(3000);
      // Select the first option in the results
      driver.waitAndClickByCss('#cities-1');
      // Select dates (using 2 days)
      driver.selectSpecificHotelDates(12, 14);
      // Click on find button
      driver.waitAndClickByCss('#nw-search-hotel');
      // Go back to homepage
      driver.pause(5000);
      driver.waitAndClickByCss('#heading');
      // Validate recent searches and upcoming trips
      driver.pause(5000);
      driver.waitAndClickByXpath('//*[@id="react-select-6--value"]/div[2]/input');
      driver.waitForTextByXpath('//*[@id="react-select-6--list"]/div[1]/div[1]', 'RECENT SEARCHES');
      driver.waitForTextByCss('.Select .Select-option:nth-child(2)', 'Warsaw, Poland');
      // Search for fifth place
      driver.waitAndSetValueByCss('.hotel-search-panel .places-auto-complete .Select-control input', 'stockholm');
      driver.pause(3000);
      // Select the first option in the results
      driver.waitAndClickByCss('#cities-1');
      // Select dates (using 2 days)
      driver.selectSpecificHotelDates(12, 14);
      // Click on find button
      driver.waitAndClickByCss('#nw-search-hotel');
      // Go back to homepage
      driver.pause(5000);
      driver.waitAndClickByCss('#heading');
      // Validate recent searches and upcoming trips
      driver.pause(5000);
      driver.waitAndClickByXpath('//*[@id="react-select-6--value"]/div[2]/input');
      driver.waitForTextByXpath('//*[@id="react-select-6--list"]/div[1]/div[1]', 'RECENT SEARCHES');
      driver.waitForTextByCss('.Select .Select-option:nth-child(2)', 'Stockholm, Sweden');
      // Search for sixth place
      driver.waitAndSetValueByCss('.hotel-search-panel .places-auto-complete .Select-control input', 'rome');
      driver.pause(3000);
      // Select the first option in the results
      driver.waitAndClickByCss('#cities-1');
      // Select dates (using 2 days)
      driver.selectSpecificHotelDates(12, 14);
      // Click on find button
      driver.waitAndClickByCss('#nw-search-hotel');
      // Go back to homepage
      driver.pause(5000);
      driver.waitAndClickByCss('#heading');
      // Validate recent searches and upcoming trips
      driver.pause(5000);
      driver.waitAndClickByXpath('//*[@id="react-select-6--value"]/div[2]/input');
      driver.waitForTextByXpath('//*[@id="react-select-6--list"]/div[1]/div[1]', 'RECENT SEARCHES');
      // Validate that the recent search is on top of the list
      driver.waitForTextByCss('.Select .Select-option:nth-child(2)', 'Rome, Italy');
      // Validate that only the first 5 searches appear on list (aka 'jerusalem' search isn't appear)
      driver.waitForTextByCss('.Select .Select-option:nth-child(3)', 'Stockholm, Sweden');
      driver.waitForTextByCss('.Select .Select-option:nth-child(4)', 'Warsaw, Poland');
      driver.waitForTextByCss('.Select .Select-option:nth-child(5', 'London, United Kingdom');
      driver.waitForTextByCss('.Select .Select-option:nth-child(6)', 'Berlin, Germany');
      // TODO: 2.F  Make sure recent search that check-in date is in the past don't display - According to Evyater there is an open bug about it:
      // Validate autocomplete
      driver.waitAndClickByCss('.hotel-search-panel-autocomplete');
      driver.pause(1000);
      // Search for "tel aviv" and check results
      driver.waitAndSetValueByCss('.hotel-search-panel .places-auto-complete .Select-control input', 'tel aviv');
      driver.pause(2000);
      // Select the first option in the results
      driver.waitAndClickByCss('#cities-1');
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
      driver.pause(2000);
      // click on search input
      driver.useCss();
      driver.moveToElement('.hotel-search-panel .places-auto-complete .Select-control input', 10, 10);
      driver.pause(200);
      driver.mouseButtonDown(0);
      driver.pause(200);
      driver.mouseButtonUp(0);
      driver.pause(2000);
      driver.perform(function () {
        let str = 'tel aviv ';
        for (let i = 0; i < str.length; i++) {
          driver.keys([driver.Keys.BACK_SPACE]);
        }
      });
      driver.waitAndSetValueByCss('.hotel-search-panel .places-auto-complete .Select-control input', 'j');
      driver.keys([driver.Keys.BACK_SPACE]);
      driver.pause(2000);
      // Validate that the same list from last check is still presented (aka the tel-aviv search isn't appear on the recent search list)
      driver.waitForTextByCss('.Select .Select-option:nth-child(2)', 'Rome, Italy');
      driver.waitForTextByCss('.Select .Select-option:nth-child(3)', 'Stockholm, Sweden');
      driver.waitForTextByCss('.Select .Select-option:nth-child(4)', 'Warsaw, Poland');
      driver.waitForTextByCss('.Select .Select-option:nth-child(5', 'London, United Kingdom');
      driver.waitForTextByCss('.Select .Select-option:nth-child(6)', 'Berlin, Germany');
      //Logout in order to login again and check if recent list still exist
      driver.waitAndClickByCss('#header-my-account-menu');
      driver.waitAndClickByCss('#header-logout');
      driver.page.login();
      login.fillLoginDetails(driver.globals.users.portalUser58);
      driver.pause(4000);
      // click on input field
      driver.moveToElement('.click-helper', 10, 10);
      driver.pause(200);
      driver.mouseButtonDown(0);
      driver.pause(200);
      driver.mouseButtonUp(0);
      driver.pause(200);
      driver.waitForTextByXpath('//*[@id="react-select-6--list"]/div[1]/div[1]', 'RECENT SEARCHES');
      // Validate that list is still appear after logout
      driver.waitForTextByCss('.Select .Select-option:nth-child(2)', 'Rome, Italy');
      driver.waitForTextByCss('.Select .Select-option:nth-child(3)', 'Stockholm, Sweden');
      driver.waitForTextByCss('.Select .Select-option:nth-child(4)', 'Warsaw, Poland');
      driver.waitForTextByCss('.Select .Select-option:nth-child(5', 'London, United Kingdom');
      driver.waitForTextByCss('.Select .Select-option:nth-child(6)', 'Berlin, Germany');
      // Select the third option in the results
      driver.waitAndClickByCss('.Select .Select-option:nth-child(3)');
      // Validate that the input field's value is equal to the input
      driver.waitForTextByCss('.select-value-label', 'Stockholm, Sweden');
      // Validate that Date inputs filled with text
      driver.waitForTextByCss('#start-date-input ~ .DateInput__display-text.DateInput__display-text--has-input', ' ');
      driver.waitForTextByCss('#end-date-input ~ .DateInput__display-text.DateInput__display-text--has-input', ' ');
      driver.pause(2000);
    },

  'step 6 - Search Results - Upcoming trips vs Recent searches - 5 upcoming trips' : (driver) => {
    // Logout
     driver.waitAndClickByCss('#header-my-account-menu');
     driver.waitAndClickByCss('#header-logout');
    // Login with user with 5 upcoming trips
    const login = driver.page.login();
    login.fillLoginDetails(driver.globals.users.portalUser60);
    driver.pause(3000);
    // Search for a location that not on the upcoming trip
    driver.waitAndSetValueByCss('.hotel-search-panel .places-auto-complete .Select-control input', 'stockholm');
    driver.pause(1500);
    // Select the first option in the results
    driver.waitAndClickByCss('#cities-1');
    // Select dates (using 2 days)
    driver.selectSpecificHotelDates(12, 14);
    // Click on find button
    driver.waitAndClickByCss('#nw-search-hotel');
    // Go back to homepage
    driver.pause(5000);
    driver.waitAndClickByCss('#heading');
    driver.pause(2000);
    // click on input field
    driver.waitAndClickByXpath('//*[@id="react-select-6--value"]/div[2]/input');
    driver.pause(500);
    // Validate Upcoming trips header is appear
    driver.waitForTextByCss('.Select .Select-option-group:nth-child(1) .Select-option-group-label', 'UPCOMING TRIPS');
    // Validate that upcoming Trips list
    driver.waitForTextByCss('.Select .Select-option-group:nth-child(1) .Select-option:nth-child(2)', 'Trip to Philadelphia');
    driver.waitForTextByCss('.Select .Select-option-group:nth-child(1) .Select-option:nth-child(3)', 'Trip to Orlando');
    driver.waitForTextByCss('.Select .Select-option-group:nth-child(1) .Select-option:nth-child(4)', 'Trip to Bangkok');
    driver.waitForTextByCss('.Select .Select-option-group:nth-child(1) .Select-option:nth-child(5', 'Trip to Orlando');
    driver.waitForTextByCss('.Select .Select-option-group:nth-child(1) .Select-option:nth-child(6)', 'Trip to San Diego');
    // Validate Recent Searches header is appear
    driver.waitForTextByCss('.Select .Select-option-group:nth-child(2) .Select-option-group-label', 'RECENT SEARCHES');
    // Validate that list is still appear after logout
    driver.waitForTextByCss('.Select .Select-option-group:nth-child(2) .Select-option:nth-child(2)', 'Rome, Italy');
    driver.waitForTextByCss('.Select .Select-option-group:nth-child(2) .Select-option:nth-child(3)', 'Stockholm, Sweden');
    driver.waitForTextByCss('.Select .Select-option-group:nth-child(2) .Select-option:nth-child(4)', 'Warsaw, Poland');
    driver.waitForTextByCss('.Select .Select-option-group:nth-child(2) .Select-option:nth-child(5', 'London, United Kingdom');
    driver.waitForTextByCss('.Select .Select-option-group:nth-child(2) .Select-option:nth-child(6)', 'Berlin, Germany');
 /*
    // Searching 4 more location in order to check if both Upcoming Trips and Recent Search lists are appearing
    // Search for second place
    driver.waitAndSetValueByCss('.hotel-search-panel .places-auto-complete .Select-control input', 'berlin');
    driver.pause(3000);
    // Select the first option in the results
    driver.waitAndClickByCss('#cities-1');
    // Select dates (using 2 days)
    driver.selectSpecificHotelDates(12, 14);
    // Click on find button
    driver.waitAndClickByCss('#nw-search-hotel');
    // Go back to homepage
    driver.pause(5000);
    driver.waitAndClickByCss('#heading');
    // Validate recent searches and upcoming trips
    driver.pause(5000);
    driver.waitAndClickByXpath('//*[@id="react-select-6--value"]/div[2]/input');

    // Search for third place
    driver.waitAndSetValueByCss('.hotel-search-panel .places-auto-complete .Select-control input', 'london');
    driver.pause(3000);
    // Select the first option in the results
    driver.waitAndClickByCss('#cities-1');
    // Select dates (using 2 days)
    driver.selectSpecificHotelDates(12, 14);
    // Click on find button
    driver.waitAndClickByCss('#nw-search-hotel');
    // Go back to homepage
    driver.pause(5000);
    driver.waitAndClickByCss('#heading');
    // Validate recent searches and upcoming trips
    driver.pause(5000);
    driver.waitAndClickByXpath('//*[@id="react-select-6--value"]/div[2]/input');
    // Search for forth place
    driver.waitAndSetValueByCss('.hotel-search-panel .places-auto-complete .Select-control input', 'warsaw');
    driver.pause(3000);
    // Select the first option in the results
    driver.waitAndClickByCss('#cities-1');
    // Select dates (using 2 days)
    driver.selectSpecificHotelDates(12, 14);
    // Click on find button
    driver.waitAndClickByCss('#nw-search-hotel');
    // Go back to homepage
    driver.pause(5000);
    driver.waitAndClickByCss('#heading');
    // Validate recent searches and upcoming trips
    driver.pause(5000);
    driver.waitAndClickByXpath('//*[@id="react-select-6--value"]/div[2]/input');
    // Search for fifth place
    driver.waitAndSetValueByCss('.hotel-search-panel .places-auto-complete .Select-control input', 'rome');
    driver.pause(3000);
    // Select the first option in the results
    driver.waitAndClickByCss('#cities-1');
    // Select dates (using 2 days)
    driver.selectSpecificHotelDates(12, 14);
    // Click on find button
    driver.waitAndClickByCss('#nw-search-hotel');
    // Go back to homepage
    driver.pause(5000);
    driver.waitAndClickByCss('#heading');
    // Validate recent searches and upcoming trips
    driver.pause(5000);

    // click on input field
    driver.waitAndClickByXpath('//*[@id="react-select-6--value"]/div[2]/input');
    driver.pause(500);
    // Validate Upcoming trips header is appear
    driver.waitForTextByCss('.Select .Select-option-group:nth-child(1) .Select-option-group-label', 'UPCOMING TRIPS');
    // Validate that upcoming Trips list
    driver.waitForTextByCss('.Select .Select-option-group:nth-child(1) .Select-option:nth-child(2)', 'Trip to Philadelphia');
    driver.waitForTextByCss('.Select .Select-option-group:nth-child(1) .Select-option:nth-child(3)', 'Trip to Orlando');
    driver.waitForTextByCss('.Select .Select-option-group:nth-child(1) .Select-option:nth-child(4)', 'Trip to Bangkok');
    driver.waitForTextByCss('.Select .Select-option-group:nth-child(1) .Select-option:nth-child(5', 'Trip to Orlando');
    driver.waitForTextByCss('.Select .Select-option-group:nth-child(1) .Select-option:nth-child(6)', 'Trip to San Diego');
    // Validate Upcoming trips header is appear
    driver.waitForTextByCss('.Select .Select-option-group:nth-child(2) .Select-option-group-label', 'RECENT SEARCHES');
    // Validate that upcoming Trips list
    driver.waitForTextByCss('.Select .Select-option-group:nth-child(2) .Select-option:nth-child(2)', 'Rome, Italy');
    driver.waitForTextByCss('.Select .Select-option-group:nth-child(2) .Select-option:nth-child(3)', 'Warsaw, Poland');
    driver.waitForTextByCss('.Select .Select-option-group:nth-child(2) .Select-option:nth-child(4)', 'London, United Kingdom');
    driver.waitForTextByCss('.Select .Select-option-group:nth-child(2) .Select-option:nth-child(5', 'Berlin, Germany');
    driver.waitForTextByCss('.Select .Select-option-group:nth-child(2) .Select-option:nth-child(6)', 'Stockholm, Sweden');
*/
  },

  'step 7 - Search Results - Upcoming trips vs Recent searches - 1 upcoming trips' : (driver) => {
    // Logout
    driver.waitAndClickByCss('#header-my-account-menu');
    driver.waitAndClickByCss('#header-logout');
    // Login with user with 1 upcoming trips
    const login = driver.page.login();
    login.fillLoginDetails(driver.globals.users.portalUser57);
    driver.pause(3000);

    // click on input field
    driver.waitAndClickByCss('.hotel-search-panel .places-auto-complete .Select-control input');
    driver.pause(500);

    driver.waitForTextByCss('.Select .Select-option-group:nth-child(1) .Select-option:nth-child(2)', 'Trip to Tokyo');
    // Validate Upcoming trips header is appear
    driver.waitForTextByCss('.Select .Select-option-group:nth-child(2) .Select-option-group-label', 'RECENT SEARCHES');
    // Validate that upcoming Trips list
    driver.waitForTextByCss('.Select .Select-option-group:nth-child(2) .Select-option:nth-child(2)', 'Rome, Italy');
    driver.waitForTextByCss('.Select .Select-option-group:nth-child(2) .Select-option:nth-child(3)', 'Stockholm, Sweden');
    driver.waitForTextByCss('.Select .Select-option-group:nth-child(2) .Select-option:nth-child(4)', 'Warsaw, Poland');
    driver.waitForTextByCss('.Select .Select-option-group:nth-child(2) .Select-option:nth-child(5', 'London, United Kingdom');
    driver.waitForTextByCss('.Select .Select-option-group:nth-child(2) .Select-option:nth-child(6)', 'Berlin, Germany');
  },

  'step 8 - Search Results - Upcoming trips vs Recent searches - 2 upcoming trips' : (driver) => {
    // Logout
    driver.waitAndClickByCss('#header-my-account-menu');
    driver.waitAndClickByCss('#header-logout');
    // Login with user with 2 upcoming trips
    const login = driver.page.login();
    login.fillLoginDetails(driver.globals.users.portalUser59);
    driver.pause(3000);

    // click on input field
    driver.waitAndClickByCss('.hotel-search-panel .places-auto-complete .Select-control input');
    driver.pause(500);

    driver.waitForTextByCss('.Select .Select-option-group:nth-child(1) .Select-option:nth-child(2)', 'Trip to San Diego');
    driver.waitForTextByCss('.Select .Select-option-group:nth-child(1) .Select-option:nth-child(3)', 'Trip to Croton-on-Hudson');
    // Validate Upcoming trips header is appear
    driver.waitForTextByCss('.Select .Select-option-group:nth-child(2) .Select-option-group-label', 'RECENT SEARCHES');
    // Validate that upcoming Trips list
    driver.waitForTextByCss('.Select .Select-option-group:nth-child(2) .Select-option:nth-child(2)', 'Rome, Italy');
    driver.waitForTextByCss('.Select .Select-option-group:nth-child(2) .Select-option:nth-child(3)', 'Stockholm, Sweden');
    driver.waitForTextByCss('.Select .Select-option-group:nth-child(2) .Select-option:nth-child(4)', 'Warsaw, Poland');
    driver.waitForTextByCss('.Select .Select-option-group:nth-child(2) .Select-option:nth-child(5', 'London, United Kingdom');
    driver.waitForTextByCss('.Select .Select-option-group:nth-child(2) .Select-option:nth-child(6)', 'Berlin, Germany');
  },

  'step 9 - Search Results - Upcoming trips vs Recent searches - no upcoming trips' : (driver) => {
    // Logout
    driver.waitAndClickByCss('#header-my-account-menu');
    driver.waitAndClickByCss('#header-logout');
    // Login with user with no upcoming trips
    const login = driver.page.login();
    login.fillLoginDetails(driver.globals.users.portalUser58);
    driver.pause(3000);

    // click on input field
    driver.waitAndClickByCss('.hotel-search-panel .places-auto-complete .Select-control input');
    driver.pause(500);

                  // Validate Upcoming trips header is not appear
    //////////////////////////// ------ NOTE -----//////////////////////////////////////
    //  The fact that 'Recent Search' list is with the selector                      //
    // .Select-option-group:nth-child(1) and not .Select-option-group:nth-child(2)   //
    // is indicating that there is no 'Upcoming Trips' section                       //
    ///////////////////////////////////////////////////////////////////////////////////
    driver.waitForTextByCss('.Select .Select-option-group:nth-child(1) .Select-option-group-label', 'RECENT SEARCHES');
    // Validate that upcoming Trips list
    driver.waitForTextByCss('.Select .Select-option-group:nth-child(1) .Select-option:nth-child(2)', 'Rome, Italy');
    driver.waitForTextByCss('.Select .Select-option-group:nth-child(1) .Select-option:nth-child(3)', 'Stockholm, Sweden');
    driver.waitForTextByCss('.Select .Select-option-group:nth-child(1) .Select-option:nth-child(4)', 'Warsaw, Poland');
    driver.waitForTextByCss('.Select .Select-option-group:nth-child(1) .Select-option:nth-child(5', 'London, United Kingdom');
    driver.waitForTextByCss('.Select .Select-option-group:nth-child(1) .Select-option:nth-child(6)', 'Berlin, Germany');
  },

  'step 10 - Search Results - Highlight results' : (driver) => {
    driver.pause(5000);
    // Search for location (with 3 characters)
    driver.waitAndSetValueByCss('.hotel-search-panel .places-auto-complete .Select-control input', 'ber');
    driver.pause(3000);
    // Check if results are highlighted
    driver.elements('css selector', '.Select-menu > .Select-option > span > span > mark', function (elements) {
      for (let i = 0; i < 10 ; i++) {
        let elementCss = 'div.Select-option:nth-child(' + (i + 1) + ') > span > span > mark';
        driver.assert.cssProperty(elementCss, 'color', 'rgba(200, 53, 22, 1)');
      }
    });
    driver.pause(500);
    //a dd some of the charcters and check highlighted results again
    driver.waitAndSetValueByCss('.hotel-search-panel .places-auto-complete .Select-control input', 'lin');
    driver.pause(1500);
    // Check if results are highlighted
    driver.elements('css selector', '.Select-menu > .Select-option > span > span > mark', function (elements) {
      for (let i = 0; i < 10 ; i++) {
        let elementCss = 'div.Select-option:nth-child(' + (i + 1) + ') > span > span > mark';
        driver.assert.cssProperty(elementCss, 'color', 'rgba(200, 53, 22, 1)');
      }
    });
    driver.pause(1500);
    // remove some of the charcters and check highlighted results again
    driver.keys([driver.Keys.BACK_SPACE]);
    driver.keys([driver.Keys.BACK_SPACE]);
    driver.pause(1500);
    // Check if results are highlighted
    driver.elements('css selector', '.Select-menu > .Select-option > span > span > mark', function (elements) {
      for (let i = 0; i < 10 ; i++) {
        let elementCss = 'div.Select-option:nth-child(' + (i + 1) + ') > span > span > mark';
        driver.assert.cssProperty(elementCss, 'color', 'rgba(200, 53, 22, 1)');
      }
    });


  },

  'step 11 - Search Results - Display order ' : (driver) => {
    // remove some of the charcters and check highlighted results again
    driver.keys([driver.Keys.BACK_SPACE]);
    driver.keys([driver.Keys.BACK_SPACE]);
    driver.keys([driver.Keys.BACK_SPACE]);
    driver.keys([driver.Keys.BACK_SPACE]);
    driver.pause(500);
    driver.waitAndSetValueByCss('.hotel-search-panel .places-auto-complete .Select-control input', 'rome');
    driver.pause(1500);
    // Check results types
    driver.waitForAttributeContainsByCss('.Select .Select-option:nth-child(1) i', 'class', 'cwt-icons-city');
    driver.waitForAttributeContainsByCss('.Select .Select-option:nth-child(2) i', 'class', 'cwt-icons-plane');
    driver.waitForAttributeContainsByCss('.Select .Select-option:nth-child(3) i', 'class', 'cwt-icons-plane');
    driver.waitForAttributeContainsByCss('.Select .Select-option:nth-child(4) i', 'class', 'cwt-icons-city');
    driver.waitForAttributeContainsByCss('.Select .Select-option:nth-child(5) i', 'class', 'cwt-icons-city');
    driver.waitForAttributeContainsByCss('.Select .Select-option:nth-child(6) i', 'class', 'cwt-icons-neighbourhood');
    driver.waitForAttributeContainsByCss('.Select .Select-option:nth-child(7) i', 'class', 'cwt-icons-neighbourhood');
    driver.waitForAttributeContainsByCss('.Select .Select-option:nth-child(8) i', 'class', 'cwt-icons-train');
    driver.waitForAttributeContainsByCss('.Select .Select-option:nth-child(9) i', 'class', 'cwt-icons-train');
    driver.waitForAttributeContainsByCss('.Select .Select-option:nth-child(10) i', 'class', 'cwt-icons-landmark');
    // Partial search
    // TODO: make as a function
    driver.perform(function () {
      let str = 'rome ';
      for (let i = 0; i < str.length; i++) {
        driver.keys([driver.Keys.BACK_SPACE]);
      }
    });
    driver.pause(500);
    driver.waitAndSetValueByCss('.hotel-search-panel .places-auto-complete .Select-control input', 'netivot');
    driver.pause(1500);
    // Check results types
    driver.waitForAttributeContainsByCss('.Select .Select-option:nth-child(1) i', 'class', 'cwt-icons-city');
    driver.waitForAttributeContainsByCss('.Select .Select-option:nth-child(2) i', 'class', 'cwt-icons-landmark');
    driver.waitForAttributeContainsByCss('.Select .Select-option:nth-child(3) i', 'class', 'cwt-icons-street');
    driver.waitForAttributeContainsByCss('.Select .Select-option:nth-child(4) i', 'class', 'cwt-icons-street');
    driver.waitForAttributeContainsByCss('.Select .Select-option:nth-child(5) i', 'class', 'cwt-icons-street');
    driver.waitForAttributeContainsByCss('.Select .Select-option:nth-child(6) i', 'class', 'cwt-icons-street');
    driver.waitForAttributeContainsByCss('.Select .Select-option:nth-child(7) i', 'class', 'cwt-icons-street');
    // Partial search
    // TODO: make as a function
    driver.perform(function () {
      let str = 'netivot ';
      for (let i = 0; i < str.length; i++) {
        driver.keys([driver.Keys.BACK_SPACE]);
      }
    });
    // Search an address (using google API)
    driver.pause(500);
    driver.waitAndSetValueByCss('.hotel-search-panel .places-auto-complete .Select-control input', '19 florentin street');
    driver.pause(1500);
    // Check results type
    driver.waitForAttributeContainsByCss('.Select .Select-option:nth-child(1) i', 'class', 'cwt-icons-street');
    driver.waitForAttributeContainsByCss('.Select .Select-option:nth-child(2) i', 'class', 'cwt-icons-street');
  },

};