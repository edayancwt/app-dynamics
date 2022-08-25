'use strict';

let roomPrice;
let roomsPriceArr = [];

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
    // Click on find button
    driver.waitAndClickByCss('#nw-search-hotel');
     // Wait for hotel results to load
     driver.pause(12000);

    // Filter  using 'hotel name' input
    driver.waitAndSetValueByCss('.icon-text-field.input-group input', 'hit hotel');
    driver.waitAndClickByCss(' .hotel-result-card a');
    driver.pause(3000);
  },

  //    ----------------------------------Sanity, Room selection page - HOTEL DATA ----------------------------------

  'step 3 -  Room selection page - Rooms: Default sorting' : (driver) => {
    // Validate pin hotel
    driver.waitForElementVisible('.pin.hotel', 'class', 'pin hotel');
    // Validate hotel address
    driver.waitForTextByCss('.map-distance-helper', 'Ulica Ks Ignacego Klopotowskiego 33, Warsaw, 03720, Poland');

    // Validate hotel services
    driver.waitForTextByCss('.cwt-icons-paid-parking + label', 'PARKING');
    driver.waitForTextByCss('.cwt-icons-business-center + label', 'BUSINESS CENTER');
    driver.pause(300);

    // opening Description
    driver.waitAndClickByCss('ul.hotel-paragraphs li:nth-child(1)');
    driver.pause(2000);
    // Validate description data
    // TODO: complete once mock will be ready
    driver.waitForTextByCss('.hotel-paragraph:nth-child(1)', ' ');
    driver.pause(500);
    // closing Description
    driver.waitAndClickByCss('ul.hotel-paragraphs li:nth-child(1)');
    driver.pause(2000);

    // opening Hotel Location
    driver.waitAndClickByCss('ul.hotel-paragraphs li:nth-child(2)');
    driver.pause(2000);
    // Validate Hotel Location data
    driver.waitForTextByCss('.hotel-paragraph:nth-child(2)', 'Ulica Ks Ignacego Klopotowskiego 33, Warsaw, 03720, Poland');
    driver.pause(500);
    // closing Hotel Location
    driver.waitAndClickByCss('ul.hotel-paragraphs li:nth-child(2)');
    driver.pause(2000);

    // opening/closing Hotel Policy
    driver.waitAndClickByCss('ul.hotel-paragraphs li:nth-child(3)');
    driver.pause(2000);
    // Validate Hotel Policy data
    // TODO: complete once mock will be ready
    driver.waitForTextByCss('.hotel-paragraph:nth-child(3)', ' ');
    driver.pause(500);
    driver.waitAndClickByCss('ul.hotel-paragraphs li:nth-child(3)');
    driver.pause(2000);

  },


};