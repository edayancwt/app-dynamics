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

  //    ----------------------------------Hotel Booking - Search Field ----------------------------------

  'step 2 - Search Field - Validate home booking panel - search input' : (driver) => {
    // Click on 'Book A Hotel' btn
    driver.waitAndClickByCss('#header-navigation-link-0');
    driver.pause(5000);
    // 'Going to' field
    driver.waitForTextByCss('#going-to-title', 'GOING TO');
    driver.waitForTextByCss('.autocomplete-placeholder', 'Search for city, airport or landmark');
    driver.waitForAttributeContainsByXpath('//*[@id="cwt-icons-search"]', 'class', 'cwt-icons-search');

  },

  'step 3 - Search Field - Validate no search is performed' : (driver) => {

    driver.waitAndClickByCss('.hotel-search-panel-autocomplete');
    // Validate that no search is performed
    driver.waitAndSetValueByCss('.hotel-search-panel .places-auto-complete .Select-control input', 'ro');
    driver.pause(2000);
    driver.waitForTextByCss('.autocomplete-no-results', 'No results');
    driver.waitForElementNotPresent('.Select-option', 1000);

  },

  'step 4 - Search Field - Validate "No results" ' : (driver) => {
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

  'step 5 - Search Field - Remove all search characters and validate pre-text display' : (driver) => {

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
    driver.waitForAttributeContainsByXpath('//*[@id="cwt-icons-search"]', 'class', 'cwt-icons-search');

  },

  'step 6 - Search Field - Validate partial search results' : (driver) => {

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

  'step 7 - Search Field - Change search characters' : (driver) => {

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
    // Validate that the date-picker is open
    driver.waitForAttributeContainsByXpath('//*[@id="hotel-search-panel-row"]/aside[1]/div[1]/div[2]/div/div[2]/div/div/div[2]/div[2]', 'class', 'transition-container');
    driver.pause(2000);

  },

  'step 8 - Search results - result selection' : (driver) => {
    // Select a flight
    driver.waitAndClickByCss('.hotel-search-panel .places-auto-complete .Select-control input');
    driver.pause(500);
    // Select the third option in the results
    driver.waitAndClickByCss('.Select .Select-option:nth-child(3)');
    // Validate that the input field's value is equal to the input
    driver.waitForTextByCss('.select-value-label', 'Schoenefeld Airport (SXF), Berlin, Germany');
    // Validate that the date-picker is open
    driver.waitForAttributeContainsByXpath('//*[@id="hotel-search-panel-row"]/aside[1]/div[1]/div[2]/div/div[2]/div/div/div[2]/div[2]', 'class', 'transition-container');
    driver.pause(1000);

    // Select a neighborhood
    driver.waitAndClickByCss('.hotel-search-panel .places-auto-complete .Select-control input');
    driver.pause(500);
    // Select the sixth option in the results
    driver.waitAndClickByCss('.Select .Select-option:nth-child(6)');
    // Validate that the input field's value is equal to the input
    driver.waitForTextByCss('.select-value-label', 'Friedrichshain, Berlin, Germany');
    // Validate that the date-picker is open
    driver.waitForAttributeContainsByXpath('//*[@id="hotel-search-panel-row"]/aside[1]/div[1]/div[2]/div/div[2]/div/div/div[2]/div[2]', 'class', 'transition-container');
    driver.pause(1000);

  },
};