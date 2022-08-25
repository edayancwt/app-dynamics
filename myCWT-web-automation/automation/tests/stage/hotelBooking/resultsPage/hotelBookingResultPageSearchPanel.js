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

  'step 2 - general search': (driver) => {
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
    // Validate booking page URL
    driver.waitForUrlToContain('travel.stage-mycwt.com/group/selenium-sub-3-selenium-top/book-a-hotel#/hotel-results', 20000);
    // Wait for hotel results to load
    driver.pause(12000);
  },

  //    ----------------------------------Hotel Booking - Result Page - Search Field ----------------------------------

  'step 3 - Result Page - Search Field - Validate home booking panel - search input' : (driver) => {
    // scroll to top
    driver.execute(function() { window.scrollBy(0, 0); }, []);
    driver.pause(2000);
    // 'Going to' field
    driver.waitForTextByCss('#going-to-title', 'GOING TO');
    driver.waitForTextByCss('.select-value-label', 'Warsaw, Poland');

  },

  'step 4 - Result Page -  Search Field - Validate no search is performed' : (driver) => {

    driver.waitAndClickByCss('.hotel-search-panel-autocomplete');
    // Validate that no search is performed (aka - only the recent search appear)
    driver.waitAndSetValueByCss('.hotel-search-panel .places-auto-complete .Select-control input', 'ro');
    driver.pause(2000);
    // By not seeing the 'cwt-icons-city' icon - it's approving that no search occured
    driver.waitForElementNotPresent('.Select .Select-option:nth-child(1) i', 1000);

  },

  'step 5 - Result Page - Search Field - Validate "No results" ' : (driver) => {
    // TODO: make as a function --> use input.length loop
    driver.keys([driver.Keys.BACK_SPACE]);
    driver.keys([driver.Keys.BACK_SPACE]);
    driver.keys([driver.Keys.BACK_SPACE]);
    // Search for none existing location and validate proper message
    driver.pause(5000);
    driver.waitAndSetValueByCss('.hotel-search-panel .places-auto-complete .Select-control input', 'zzz');
    driver.pause(1000);
    driver.waitForTextByCss('.autocomplete-no-results', 'No results');

  },

  'step 6 - Result Page - Search Field - Remove all search characters and validate pre-text display' : (driver) => {

    driver.waitAndClickByCss('.hotel-search-panel-autocomplete');
    driver.pause(2000);
    // TODO: make as a function --> use input.length loop
    driver.keys([driver.Keys.BACK_SPACE]);
    driver.keys([driver.Keys.BACK_SPACE]);
    driver.keys([driver.Keys.BACK_SPACE]);
    driver.pause(2000);
    // 'Going to' field
    driver.waitForTextByCss('#going-to-title', 'GOING TO');
    driver.waitForTextByCss('.autocomplete-placeholder', 'Search for city, airport or landmark');

  },

  'step 7 - Result Page - Search Field - Validate partial search results' : (driver) => {

    // Search for "New orleans" and check results
    driver.pause(5000);
    driver.waitAndSetValueByCss('.hotel-search-panel .places-auto-complete .Select-control input', 'New  orleans ');
    driver.pause(3000);
    driver.elements('css selector', '.Select-menu > .Select-option > span > span > span', function (elements) {
      for (let i = 0; i < elements.value.length; i++) {
        let elementCss = 'div.Select-option:nth-child(' + (i + 1) + ') > span > span > span';
        driver.assert.containsText(elementCss, 'New Orleans');
      }
    });
    // TODO: make as a function --> use input.length loop
    driver.perform(function () {
      let str = 'Orleans ';
      for (let i = 0; i < str.length; i++) {
        driver.keys([driver.Keys.BACK_SPACE]);
      }
    });
    driver.pause(2000);
    // Search for "New" and check results
    driver.elements('css selector', '.Select-menu > .Select-option > span > span > span', function (elements) {
      for (let i = 0; i < elements.value.length; i++) {
        let elementCss = 'div.Select-option:nth-child(' + (i + 1) + ') > span > span > span';
        driver.assert.containsText(elementCss, 'New');
      }
    });
    // TODO: make as a function --> use input.length loop
    driver.perform(function () {
      let str = 'New  Orleans';
      for (let i = 0; i < str.length; i++) {
        driver.keys([driver.Keys.BACK_SPACE]);
      }
    });
  },

  'step 8 - Result Page - Search Field - Change search characters' : (driver) => {

    driver.pause(2000);
    // Search for "berlin" and check results
    driver.waitAndSetValueByCss('.hotel-search-panel .places-auto-complete .Select-control input', 'berlin  ');
    driver.pause(2000);
    driver.elements('css selector', '.Select-menu > .Select-option > span > span > span', function (elements) {
      for(let i=0;i<elements.value.length;i++){
        let elementCss = 'div.Select-option:nth-child(' + (i+1) + ') > span > span > span';
        driver.assert.containsText(elementCss,'Berlin');
      }
    });
    // Select the first option in the results
    driver.waitAndClickByCss('#cities-1');
    // Validate that the input field's value is equal to the input
    driver.waitForTextByCss('.select-value-label', 'Berlin, Germany');
    // Validate the dates fields are filled
    driver.waitForTextByCss('#start-date-input ~ .DateInput__display-text.DateInput__display-text--has-input', ' ');
    driver.waitForTextByCss('#end-date-input ~ .DateInput__display-text.DateInput__display-text--has-input', ' ');
    driver.pause(2000);

  },

  'step 9 - Result Page - Search results - result selection' : (driver) => {
    // Select a flight
    driver.waitAndClickByCss('.hotel-search-panel .places-auto-complete .Select-control input');
    driver.pause(500);
    // Select the third option in the results
    driver.waitAndClickByCss('.Select .Select-option:nth-child(3)');
    // Validate that the input field's value is equal to the input
    driver.waitForTextByCss('.select-value-label', 'Schoenefeld Airport (SXF), Berlin, Germany');
    // Validate the dates fields are filled
    driver.waitForTextByCss('#start-date-input ~ .DateInput__display-text.DateInput__display-text--has-input', ' ');
    driver.waitForTextByCss('#end-date-input ~ .DateInput__display-text.DateInput__display-text--has-input', ' ');
    driver.pause(1000);

    // Select a neighborhood
    driver.waitAndClickByCss('.hotel-search-panel .places-auto-complete .Select-control input');
    driver.pause(500);
    // Select the sixth option in the results
    driver.waitAndClickByCss('.Select .Select-option:nth-child(6)');
    // Validate that the input field's value is equal to the input
    driver.waitForTextByCss('.select-value-label', 'Friedrichshain, Berlin, Germany');
    // Validate the dates fields are filled
    driver.waitForTextByCss('#start-date-input ~ .DateInput__display-text.DateInput__display-text--has-input', ' ');
    driver.waitForTextByCss('#end-date-input ~ .DateInput__display-text.DateInput__display-text--has-input', ' ');
    driver.pause(1000);

  },
};