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

  'step 3 -  Finalize page - Header: Header data' : (driver) => {
    // Hotel name
    driver.waitForTextByCss('.logo-top-name', 'Hit Hotel');
    // Class
    driver.waitForAttributeContainsByXpath('//*[@id="container-fluid hotel-header"]/div[2]/div[1]/span[1]/div', 'class', 'dv-star-rating dv-star-rating-non-editable');
    // no. days
    driver.waitForTextByCss('.days-summary span:nth-child(2)', '2 NIGHTS');
    driver.waitForTextByCss('.dates-details span:nth-child(2)', tripDaysStart);
    driver.waitForTextByCss('.dates-details span:nth-child(4)', tripDaysEnd);
    // CWT program
    // TODO: Complete once Mock will be ready
    // Go back
    driver.back();
    driver.pause(3000);
    // Filter  using 'hotel name' input
    driver.waitAndSetValueByCss('.icon-text-field.input-group input', 'qbik loft');
    driver.waitAndClickByCss('#hotel-card-HF513181 .hotel-result-card a');
    driver.pause(3000);
  },

  'step 4.1 -  Finalize page - Header: Header data after update' : (driver) => {
    // Hotel name
    driver.waitForTextByCss('.logo-top-name', 'Qbik Loft Aparts');
    // Class
    driver.waitForAttributeContainsByXpath('//*[@id="container-fluid hotel-header"]/div[2]/div[1]/span[1]/div', 'class', 'dv-star-rating dv-star-rating-non-editable');
    // no. days
    driver.waitForTextByCss('.days-summary span:nth-child(2)', '2 NIGHTS');
    driver.waitForTextByCss('.dates-details span:nth-child(2)', tripDaysStart);
    driver.waitForTextByCss('.dates-details span:nth-child(4)', tripDaysEnd);
    // CWT program
    // TODO: Complete once Mock will be ready

  },

};