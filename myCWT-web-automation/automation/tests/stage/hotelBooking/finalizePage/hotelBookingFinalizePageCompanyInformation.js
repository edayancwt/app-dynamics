'use strict';

let totalPrice = '';
let hotelBannerPrice = '';
let avgPrice;
let totalNights = '';

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
// TODO: complete and uncomment once mock will be ready (for now I can't see "company information" in stage)
/*
  'step 2 - General Search' : (driver) => {

    // // Select traveler
    // driver.waitAndClickByCss('.travelers-auto-complete div.Select-input > input');
    // driver.pause(2000);
    // // Select the first option in the results
    // driver.waitAndClickByCss('.travelers-auto-complete  div:nth-child(1) > div.Select-option');
    // driver.pause(2000);
    // Search for location
    driver.waitAndSetValueByCss('.hotel-search-panel .places-auto-complete .Select-control input', 'warsaw');
    driver.pause(2000);
    // Select the first option in the results
    driver.waitAndClickByCss('.Select .Select-option:nth-child(1)'); // #cities-1
    // Select dates (using 2 days)
    driver.selectSpecificHotelDates(12, 14);
    // Click on find button
    driver.waitAndClickByCss('#nw-search-hotel');
     // Wait for hotel results to load
     driver.pause(12000);

    // Filter  using 'hotel name' input
    driver.waitAndSetValueByCss('.icon-text-field.input-group input', 'hit hotel');
    driver.pause(2000);
    driver.waitAndClickByCss(' .hotel-result-card a');
    driver.pause(3000);

    driver.getText('#additionalRooms > div > div:nth-child(2) > div.room-desc-panel > div.price-wrapper > div > div > div > div > span', function (result) {
      let str = result.value.split(' ');
      hotelBannerPrice = parseInt(str[1]);
    });
    // Click 'book room'
    driver.waitAndClickByXpath('//*[@id="additionalRooms"]/div/div[2]/div[1]/div[3]/button');
    driver.pause(5000);
  },

  //    ----------------------------------Sanity, Finalize page - COMPANY INFORMATION ----------------------------------

  'step 3 -  Finalize page - COMPANY INFORMATION: text-fields' : (driver) => {
    driver.pause(5000);
    driver.useCss();
    // click on first input
    driver.waitAndClickByCss('input[name="WCM-14:C5450-14:10B331"]');
    driver.pause(500);
    // click on second input
    driver.waitAndClickByCss('input[name="WCM-14:C5450-14:10B6C1"]');
    driver.pause(500);
    // validate first input state
    driver.assert.cssProperty('.checkout__payment-info > form > div.cdr-fields > fieldset > div:nth-child(2) > div > div > div', 'border-top-color', 'rgba(255, 0, 58, 1)');
    // Search for location
    driver.waitAndSetValueByCss('input[name="WCM-14:C5450-14:10B331"]', '1234');
    // click on second input
    driver.waitAndClickByCss('input[name="WCM-14:C5450-14:10B6C1"]');
    driver.pause(500);
    // validate first input state
    driver.waitForAttributeContainsByCss('.checkout__payment-info > form > div.cdr-fields > fieldset > div:nth-child(2) > div > div > div', 'class', '');

  },

  'step 4 -  Finalize page - COMPANY INFORMATION: drop-down lists' : (driver) => {
    // click on drop-down
    driver.waitAndClickByCss('.Select-placeholder');
    driver.pause(500);
    // click on second input
    driver.waitAndClickByCss('input[name="WCM-14:C5450-14:10B6C1"]');
    driver.pause(500);
    // validate first input state
    driver.assert.cssProperty('.checkout > div.checkout__payment-info > form > div.cdr-fields > fieldset > div.field-wrapper > div > div > div', 'border-top-color', 'rgba(255, 0, 58, 1)');
    // Search for location

  },

*/

};