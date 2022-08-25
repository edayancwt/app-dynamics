'use strict';

module.exports = {

  '@tags': ['hotel', 'booking', 'sanity'],

  before: function (driver) {
    driver.resizeWindow(1920, 1020);
  },

  'step 1 - login to portal': (driver) => {
    const login = driver.page.login();
    login.fillLoginDetails(driver.globals.users.portalUser58);
  },

    //    ----------------------------------Hotel Booking - Result Page -  Search Results ----------------------------------


  'step 2 - general search': (driver) => {
    driver.pause(4000);
    // Search for location
    driver.waitAndSetValueByCss('.hotel-search-panel .places-auto-complete .Select-control input', 'warsaw');
    driver.pause(2000);
    // Select the first option in the results
    driver.waitAndClickByCss('#cities-1');
    // Select dates (using 2 days)
    driver.selectSpecificHotelDates(12, 14);
    // Click on find button
    driver.waitAndClickByCss('#nw-search-hotel');

  },

  'step 3 - Search Results - Result Page - Upcoming trips - no upcoming trips' : (driver) => {
    // Wait for hotel results to load
    driver.pause(5000);
    driver.waitAndSetValueByCss('.hotel-search-panel .places-auto-complete .Select-control input', 'j');
    driver.pause(2000);
    // Validate that Results list display no upcoming trips
    //////////////////////////// ------ NOTE -----//////////////////////////////////////
    //  The fact that 'Recent Search' list is with the selector                      //
    // .Select-option-group:nth-child(1) and not .Select-option-group:nth-child(2)   //
    // is indicating that there is no 'Upcoming Trips' section                       //
    ///////////////////////////////////////////////////////////////////////////////////
    driver.waitForTextByCss('.Select .Select-option-group:nth-child(1) .Select-option-group-label', 'RECENT SEARCHES');

  },

  'step 4 - Search Results - Result Page - Upcoming trips - 1 upcoming trips' : (driver) => {
      //Logout in order to login with user that has an '1 upcoming-trip'
      driver.waitAndClickByCss('#header-my-account-menu');
      driver.waitAndClickByCss('#header-logout');
      const login = driver.page.login();
      login.fillLoginDetails(driver.globals.users.portalUser57);
      driver.pause(5000);

      // Validate autocomplete
      driver.moveToElement('.hotel-search-panel-autocomplete', 10, 10);
      driver.pause(200);
      driver.mouseButtonDown(0);
      driver.pause(200);
      driver.mouseButtonUp(0);
      driver.pause(2000);
      // Search for location
      driver.waitAndSetValueByCss('.hotel-search-panel .places-auto-complete .Select-control input', 'warsaw');
      driver.pause(2000);
      // Select the first option in the results
      driver.waitAndClickByCss('#cities-1');
      // Select dates (using 2 days)
      driver.selectSpecificHotelDates(12, 14);
      // Select traveler
      driver.waitAndClickByCss('.travelers-auto-complete div.Select-input > input');
      driver.pause(2000);
      // Select the first option in the results
      driver.waitAndClickByCss('.travelers-auto-complete  div:nth-child(1) > div.Select-option');
      driver.pause(2000);
    // Click on find button
      driver.waitAndClickByCss('#nw-search-hotel');
      // Wait for hotel results to load
      driver.pause(5000);

      // Validate autocomplete
      driver.moveToElement('.hotel-search-panel .places-auto-complete .Select-control input', 10, 10);
      driver.pause(200);
      driver.mouseButtonDown(0);
      driver.pause(200);
      driver.mouseButtonUp(0);
      driver.pause(2000);
      // Validate first upcoming trip
      driver.waitForTextByCss('.Select .Select-option:nth-child(2)', 'Trip to Tokyo');

    },

  'step 5 - Search Results - Result Page - Upcoming trips - Multiple trips' : (driver) => {
      // Logout
       driver.waitAndClickByCss('#header-my-account-menu');
       driver.waitAndClickByCss('#header-logout');
      // Login with user with multiple upcoming trips
      const login = driver.page.login();
      login.fillLoginDetails(driver.globals.users.portalUser59);
      driver.pause(5000);

      // Validate autocomplete
      driver.moveToElement('.hotel-search-panel-autocomplete', 10, 10);
      driver.pause(200);
      driver.mouseButtonDown(0);
      driver.pause(200);
      driver.mouseButtonUp(0);
      driver.pause(2000);
      // Search for location
      driver.waitAndSetValueByCss('.hotel-search-panel .places-auto-complete .Select-control input', 'warsaw');
      driver.pause(2000);
      // Select the first option in the results
      driver.waitAndClickByCss('#cities-1');
      // Select dates (using 2 days)
      driver.selectSpecificHotelDates(12, 14);
      // Click on find button
      driver.waitAndClickByCss('#nw-search-hotel');
      // Wait for hotel results to load
      driver.pause(5000);

      // Validate autocomplete
      driver.moveToElement('.hotel-search-panel-autocomplete', 10, 10);
      driver.pause(200);
      driver.mouseButtonDown(0);
      driver.pause(200);
      driver.mouseButtonUp(0);
      driver.pause(2000);

      //Results list display all trips
      driver.waitForTextByCss('.Select .Select-option-group:nth-child(1) .Select-option:nth-child(2)', 'Trip to San Diego');
      driver.waitForTextByCss('.Select .Select-option-group:nth-child(1) .Select-option:nth-child(3)', 'Trip to Croton-on-Hudson');

    },

  'step 6 - Search Results - Result Page - Upcoming trips - 6 upcoming trips' : (driver) => {
    // Logout
    driver.waitAndClickByCss('#header-my-account-menu');
    driver.waitAndClickByCss('#header-logout');
    // Login with user with 6 upcoming trips
    const login = driver.page.login();
    login.fillLoginDetails(driver.globals.users.portalUser60);
    driver.pause(5000);

    // Search for location
    driver.waitAndSetValueByCss('.hotel-search-panel .places-auto-complete .Select-control input', 'warsaw');
    driver.pause(2000);
    // Select the first option in the results
    driver.waitAndClickByCss('#cities-1');
    // Select dates (using 2 days)
    driver.selectSpecificHotelDates(12, 14);
    // Click on find button
    driver.waitAndClickByCss('#nw-search-hotel');
    // Wait for hotel results to load
    driver.pause(5000);

    // Validate autocomplete
    driver.moveToElement('.hotel-search-panel-autocomplete', 10, 10);
    driver.pause(200);
    driver.mouseButtonDown(0);
    driver.pause(200);
    driver.mouseButtonUp(0);
    driver.pause(2000);

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

  'step 7 - Search Results - Result Page - Recent searches' : (driver) => {
    //Logout in order to login with user that has '1 upcoming-trip'
      driver.waitAndClickByCss('#header-my-account-menu');
      driver.waitAndClickByCss('#header-logout');
    const login = driver.page.login();
    login.fillLoginDetails(driver.globals.users.portalUser58);
    driver.pause(5000);
    // Validate autocomplete
    driver.moveToElement('.hotel-search-panel-autocomplete', 10, 10);
    driver.pause(200);
    driver.mouseButtonDown(0);
    driver.pause(200);
    driver.mouseButtonUp(0);
    driver.pause(2000);
    // Validate that no search is performed
    driver.waitAndSetValueByCss('.hotel-search-panel .places-auto-complete .Select-control input', 'jerusalem');
    driver.pause(3000);
    // Select the first option in the results
    driver.waitAndClickByCss('#cities-1');
    // Select dates (using 2 days)
    driver.selectSpecificHotelDates(12, 14);
    // Click on find button
    driver.waitAndClickByCss('#nw-search-hotel');
    driver.pause(5000);

    // ----------------------Search for a couple of places ---------------------------------- //
    // Search for second place
    driver.waitAndSetValueByCss('.hotel-search-panel .places-auto-complete .Select-control input', 'berlin');
    driver.pause(3000);
    // Select the first option in the results
    driver.waitAndClickByCss('#cities-1');
    // Click on find button
    driver.waitAndClickByCss('#nw-search-hotel');
    driver.pause(5000);

    // Search for third place
    driver.waitAndSetValueByCss('.hotel-search-panel .places-auto-complete .Select-control input', 'london');
    driver.pause(3000);
    // Select the first option in the results
    driver.waitAndClickByCss('#cities-1');
    // Click on find button
    driver.waitAndClickByCss('#nw-search-hotel');
    driver.pause(5000);

    // Search for forth place
    driver.waitAndSetValueByCss('.hotel-search-panel .places-auto-complete .Select-control input', 'lodz');
    driver.pause(3000);
    // Select the first option in the results
    driver.waitAndClickByCss('#cities-1');
    // Click on find button
    driver.waitAndClickByCss('#nw-search-hotel');
    driver.pause(5000);

    // Search for fifth place
    driver.waitAndSetValueByCss('.hotel-search-panel .places-auto-complete .Select-control input', 'stockholm');
    driver.pause(3000);
    // Select the first option in the results
    driver.waitAndClickByCss('#cities-1');
    // Click on find button
    driver.waitAndClickByCss('#nw-search-hotel');
    driver.pause(5000);

    // Search for sixth place
    driver.waitAndSetValueByCss('.hotel-search-panel .places-auto-complete .Select-control input', 'rome');
    driver.pause(3000);
    // Select the first option in the results
    driver.waitAndClickByCss('#cities-1');
    // Click on find button
    driver.waitAndClickByCss('#nw-search-hotel');
    driver.pause(5000);

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
    // Validate that the recent search is on top of the list
    driver.waitForTextByCss('.Select .Select-option:nth-child(2)', 'Rome, Italy');
    // Validate that only the first 5 searches appear on list (aka 'jerusalem' search isn't appear)
    driver.waitForTextByCss('.Select .Select-option:nth-child(3)', 'Stockholm, Sweden');
    driver.waitForTextByCss('.Select .Select-option:nth-child(4)', 'Lodz, Poland');
    driver.waitForTextByCss('.Select .Select-option:nth-child(5', 'London, United Kingdom');
    driver.waitForTextByCss('.Select .Select-option:nth-child(6)', 'Berlin, Germany');
    // TODO: 2.F  Make sure recent search that check-in date is in the past don't display - According to Evyater there is an open bug about it:


    // Validate autocomplete
    driver.moveToElement('.hotel-search-panel-autocomplete', 10, 10);
    driver.pause(200);
    driver.mouseButtonDown(0);
    driver.pause(200);
    driver.mouseButtonUp(0);
    driver.pause(2000);
    // Search for "tel aviv" and check results
    driver.waitAndSetValueByCss('.hotel-search-panel .places-auto-complete .Select-control input', 'tel aviv');
    driver.pause(2000);
    // Select the first option in the results
    driver.waitAndClickByCss('#cities-1');
    driver.pause(1000);
    // Click on Date-Picker
    driver.moveToElement('#start-date-input', 10, 10);
    driver.pause(200);
    driver.mouseButtonDown(0);
    driver.pause(200);
    driver.mouseButtonUp(0);
    driver.pause(1000);
    // Click on previous month button
    driver.moveToElement('.DayPickerNavigation__prev', 10, 10);
    driver.pause(200);
    driver.mouseButtonDown(0);
    driver.pause(200);
    driver.mouseButtonUp(0);
    driver.pause(1000);
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
    driver.waitForTextByCss('.Select .Select-option:nth-child(4)', 'Lodz, Poland');
    driver.waitForTextByCss('.Select .Select-option:nth-child(5', 'London, United Kingdom');
    driver.waitForTextByCss('.Select .Select-option:nth-child(6)', 'Berlin, Germany');
  },

  'step 8 - Search Results - Result Page - ' : (driver) => {
    //Logout in order to login again and check if recent list still exist
      driver.waitAndClickByCss('#header-my-account-menu');
      driver.waitAndClickByCss('#header-logout');
      const login = driver.page.login();
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
      driver.waitForTextByCss('.Select .Select-option:nth-child(4)', 'Lodz, Poland');
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

  'step 9 - Search Results - Result Page - Upcoming trips vs Recent searches - 5 upcoming trips' : (driver) => {
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
    driver.pause(1000);
    // Scroll up to prevent unvisible elements
    driver.execute(function() { window.scrollBy(0, -500); }, []);
    driver.pause(1000);
    // Click on find button
    driver.waitAndClickByCss('#nw-search-hotel');
    driver.pause(5000);
    // click on input field
    driver.moveToElement('.click-helper', 10, 10);
    driver.pause(200);
    driver.mouseButtonDown(0);
    driver.pause(200);
    driver.mouseButtonUp(0);
    driver.pause(200);
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
    driver.waitForTextByCss('.Select .Select-option-group:nth-child(2) .Select-option:nth-child(4)', 'Lodz, Poland');
    driver.waitForTextByCss('.Select .Select-option-group:nth-child(2) .Select-option:nth-child(5', 'London, United Kingdom');
    driver.waitForTextByCss('.Select .Select-option-group:nth-child(2) .Select-option:nth-child(6)', 'Berlin, Germany');

  },

  'step 10 - Search Results - Result Page - Upcoming trips vs Recent searches - 1 upcoming trips' : (driver) => {
    // Logout
    driver.waitAndClickByCss('#header-my-account-menu');
    driver.waitAndClickByCss('#header-logout');
    // Login with user with 1 upcoming trips
    const login = driver.page.login();
    login.fillLoginDetails(driver.globals.users.portalUser57);
    driver.pause(3000);

    // click on input field
    driver.moveToElement('.hotel-search-panel .places-auto-complete .Select-control input', 10, 10);
    driver.pause(200);
    driver.mouseButtonDown(0);
    driver.pause(200);
    driver.mouseButtonUp(0);
    driver.pause(200);

    driver.waitForTextByCss('.Select .Select-option-group:nth-child(1) .Select-option:nth-child(2)', 'Trip to Tokyo');
    // Validate Upcoming trips header is appear
    driver.waitForTextByCss('.Select .Select-option-group:nth-child(2) .Select-option-group-label', 'RECENT SEARCHES');
    // Validate that upcoming Trips list
    driver.waitForTextByCss('.Select .Select-option-group:nth-child(2) .Select-option:nth-child(2)', 'Rome, Italy');
    driver.waitForTextByCss('.Select .Select-option-group:nth-child(2) .Select-option:nth-child(3)', 'Stockholm, Sweden');
    driver.waitForTextByCss('.Select .Select-option-group:nth-child(2) .Select-option:nth-child(4)', 'Lodz, Poland');
    driver.waitForTextByCss('.Select .Select-option-group:nth-child(2) .Select-option:nth-child(5', 'London, United Kingdom');
    driver.waitForTextByCss('.Select .Select-option-group:nth-child(2) .Select-option:nth-child(6)', 'Berlin, Germany');
  },

  'step 11 - Search Results - Result Page - Upcoming trips vs Recent searches - 2 upcoming trips' : (driver) => {
    // Logout
    driver.waitAndClickByCss('#header-my-account-menu');
    driver.waitAndClickByCss('#header-logout');
    // Login with user with 2 upcoming trips
    const login = driver.page.login();
    login.fillLoginDetails(driver.globals.users.portalUser59);
    driver.pause(3000);

    // click on input field
    driver.moveToElement('.click-helper', 10, 10);
    driver.pause(200);
    driver.mouseButtonDown(0);
    driver.pause(200);
    driver.mouseButtonUp(0);
    driver.pause(200);

    driver.waitForTextByCss('.Select .Select-option-group:nth-child(1) .Select-option:nth-child(2)', 'Trip to San Diego');
    driver.waitForTextByCss('.Select .Select-option-group:nth-child(1) .Select-option:nth-child(3)', 'Trip to Croton-on-Hudson');
    // Validate Upcoming trips header is appear
    driver.waitForTextByCss('.Select .Select-option-group:nth-child(2) .Select-option-group-label', 'RECENT SEARCHES');
    // Validate that upcoming Trips list
    driver.waitForTextByCss('.Select .Select-option-group:nth-child(2) .Select-option:nth-child(2)', 'Rome, Italy');
    driver.waitForTextByCss('.Select .Select-option-group:nth-child(2) .Select-option:nth-child(3)', 'Stockholm, Sweden');
    driver.waitForTextByCss('.Select .Select-option-group:nth-child(2) .Select-option:nth-child(4)', 'Lodz, Poland');
    driver.waitForTextByCss('.Select .Select-option-group:nth-child(2) .Select-option:nth-child(5', 'London, United Kingdom');
    driver.waitForTextByCss('.Select .Select-option-group:nth-child(2) .Select-option:nth-child(6)', 'Berlin, Germany');
  },

  'step 12 - Search Results - Result Page - Upcoming trips vs Recent searches - no upcoming trips' : (driver) => {
    // Logout
    driver.waitAndClickByCss('#header-my-account-menu');
    driver.waitAndClickByCss('#header-logout');
    // Login with user with no upcoming trips
    const login = driver.page.login();
    login.fillLoginDetails(driver.globals.users.portalUser58);
    driver.pause(3000);

    // click on input field
    driver.moveToElement('.click-helper', 10, 10);
    driver.pause(200);
    driver.mouseButtonDown(0);
    driver.pause(200);
    driver.mouseButtonUp(0);
    driver.pause(200);

                  // Validate Upcoming trips header is appear
    //////////////////////////// ------ NOTE -----//////////////////////////////////////
    //  The fact that 'Recent Search' list is with the selector                      //
    // .Select-option-group:nth-child(1) and not .Select-option-group:nth-child(2)   //
    // is indicating that there is no 'Upcoming Trips' section                       //
    ///////////////////////////////////////////////////////////////////////////////////
    driver.waitForTextByCss('.Select .Select-option-group:nth-child(1) .Select-option-group-label', 'RECENT SEARCHES');
    // Validate that upcoming Trips list
    driver.waitForTextByCss('.Select .Select-option-group:nth-child(1) .Select-option:nth-child(2)', 'Rome, Italy');
    driver.waitForTextByCss('.Select .Select-option-group:nth-child(1) .Select-option:nth-child(3)', 'Stockholm, Sweden');
    driver.waitForTextByCss('.Select .Select-option-group:nth-child(1) .Select-option:nth-child(4)', 'Lodz, Poland');
    driver.waitForTextByCss('.Select .Select-option-group:nth-child(1) .Select-option:nth-child(5', 'London, United Kingdom');
    driver.waitForTextByCss('.Select .Select-option-group:nth-child(1) .Select-option:nth-child(6)', 'Berlin, Germany');
  },

  'step 13 - Search Results - Result Page - Highlight results' : (driver) => {
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

  'step 14 - Search Results - Result Page - Display order ' : (driver) => {
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