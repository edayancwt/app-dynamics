'use strict';

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


  'step 2 - General Search' : (driver) => {

    driver.pause(2000);
    // Search for location
    driver.waitAndSetValueByCss('.hotel-search-panel .places-auto-complete .Select-control input', 'warsaw');
    driver.pause(2000);
    // Select the first option in the results
    driver.waitAndClickByCss('#cities-1');
    // Select dates (using 2 days)
    driver.selectSpecificHotelDates(12, 14);
    // Save in variables the trip's days
    driver.getText('#DateInput__screen-reader-message-start-date-input + div', function (result) {
      tripDaysStart = result.value;
    });
    driver.getText('#DateInput__screen-reader-message-end-date-input + div', function (result) {
      tripDaysEnd = result.value;
    });
    // Click on find button
    driver.waitAndClickByCss('#nw-search-hotel');
     // Wait for hotel results to load
     driver.pause(12000);

    // Filter  using 'hotel name' input
    driver.waitAndSetValueByCss('.icon-text-field.input-group input', 'hit hotel');
    driver.waitAndClickByCss(' .hotel-result-card a');
    driver.pause(3000);
    // Click 'book room'
    driver.waitAndClickByXpath('//*[@id="additionalRooms"]/div/div[2]/div[1]/div[3]/button');
    driver.pause(1000);
  },

  //    ----------------------------------Sanity, Finalize page - HEADER ----------------------------------

  'step 3 -  Finalize page - Room Details: ' : (driver) => {
    // room details
    // Breakfast
    // TODO: Breakfast - will be fill when mock data will be ready
    // driver.waitForTextByCss('ul.rules li:nth-child(1) .rules__rule-lbl', 'breakfast');
    // TODO: change text when mock data will be ready
    driver.waitForTextByCss('ul.rules li:nth-child(1) .text-toggle-expander-wrapper', ' ');
    // Policies
    driver.waitForTextByCss('ul.rules li:nth-child(2) .rules__rule-lbl', 'policies');
    // TODO: change text when mock data will be ready
    driver.waitForTextByCss('ul.rules li:nth-child(2) .text-toggle-expander-wrapper', ' ');
    // Additional info
    driver.waitForTextByCss('ul.rules li:nth-child(3) .rules__rule-lbl', 'additional info');
    // Click 'Read More' button
    driver.waitAndClickByCss('.toggle-btn');
    driver.pause(1000);
    // TODO: change text when mock data will be ready
    driver.waitForTextByCss('ul.rules li:nth-child(3) .text-toggle-expander-wrapper', ' ');
  },

  'step 4.1 -  Finalize page - Header: Header data after update' : (driver) => {


  },

};