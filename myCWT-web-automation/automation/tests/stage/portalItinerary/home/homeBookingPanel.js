'use strict';

module.exports = {

  '@tags': ['home', 'header', 'booking', 'panel'],

  before: function (driver) {
    driver.windowMaximize();
  },

  'step 1 - login to portal': (driver) => {
    const login = driver.page.login();
    login.fillLoginDetails(driver.globals.users.portalUser1);
  },

  'step 2 - Validate booking panel fields and buttons': (driver) => {
    // Going to
    driver.pause(4000);
    driver.waitForTextByCss('.control-label', 'GOING TO');
    driver.waitForTextByCss('.autocomplete-placeholder', 'Search for city, airport or landmark');
    // Check in
    driver.waitForTextByCss('#check-in-title', 'CHECK IN');
    driver.waitForTextByCss('.DateInput__display-text', 'Select Date');
    // Check out
    driver.waitForTextByCss('#check-out-title', 'CHECK OUT');
    driver.waitForTextByCss('.DateInput__display-text', 'Select Date');
    // Find button
    driver.waitForTextByCss('#nw-search-hotel', 'FIND A HOTEL');

  },

  'step 3 - Validate date picker dialog': (driver) => {
      driver.waitAndSetValueByCss('.hotel-search-panel .Select-control input', 'berlin');
      // select the first option in the results
      driver.waitAndClickByCss('.Select .Select-option:nth-child(1)');
      // Select dates (2 nights)
      driver.selectSpecificHotelDates(12, 14);
      driver.pause(2000);
      driver.waitAndClickByCss('.DateRangePicker');
      // Number of nights
      driver.waitForTextByCss('#calendar-summary', '2 nights');
      // Date icons
      //TBD
      // navigation arrows
      driver.waitForAttributeContainsByCss('.DayPickerNavigation__prev', 'class', 'DayPickerNavigation__prev');
      driver.waitForAttributeContainsByCss('.DayPickerNavigation__next', 'class', 'DayPickerNavigation__next');
  },

  'step 4 - Basic search': (driver) => {
    // search for "rome"
    driver.waitAndClickByCss('.hotel-search-panel .Select-control input');
    driver.waitAndSetValueByCss('.hotel-search-panel .Select-control input', 'rome');
    // select the first option in the results
    driver.waitAndClickByCss('.Select .Select-option:nth-child(1)');
    // Select dates
    driver.selectSpecificHotelDates(12, 17);
    // Click on find button
    driver.waitAndClickByCss('#nw-search-hotel');
  },

  'step 5 - Validate hotel page open': (driver) => {
    driver.waitForUrlToContain('travel.stage-mycwt.com/group/selenium-sub-selenium-top/book-a-hotel#/', 20000);
  },

  'step 6 - Logout' : (driver) => {
    driver.page.logout().logout();
  },
};