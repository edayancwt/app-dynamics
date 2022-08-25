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


  'step 2 - General Search' : (driver) => {
    driver.pause(2000);
    driver.waitAndSetValueByCss('.places-auto-complete .Select-control input', 'warsaw');
    driver.pause(2000);
    // Select the first option in the results
    driver.waitAndClickByCss('#cities-1');
    // Select dates (using 2 days)
    driver.selectSpecificHotelDates(12, 14);
    // scroll up (to prevent failed to see the "search hotel" button)
    driver.execute(function() { window.scrollBy(0, -715); }, []);
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

  //    ----------------------------------Sanity, Finalize page - PAYMENT INFORMATION ----------------------------------

  'step 3 -  Finalize page - PAYMENT INFORMATION: New credit card' : (driver) => {
    // click Payment Information select box
    driver.useXpath();
    driver.moveToElement('//*[@id="portlet_hotelmainportlet_WAR_cwtportalportlet"]/div/div/div/div/div/div[2]/div/div/section/div[3]/div[2]/form/div[1]/fieldset/div/div/div/div/div/div/div/div/div', 10, 10);
    driver.pause(200);
    driver.mouseButtonDown(0);
    driver.pause(200);
    driver.mouseButtonUp(0);
    driver.pause(700);
    // select 'Book with a new card' option
    driver.useCss();
    driver.moveToElement('.Select-option.new-card', 10, 10);
    driver.pause(200);
    driver.mouseButtonDown(0);
    driver.pause(200);
    driver.mouseButtonUp(0);
    driver.pause(200);

    // Validate that inputs appear
    driver.waitForTextByCss('.credit-card-type > label', 'Card type');
    driver.waitForTextByCss('.credit-card-number:nth-child(3) > label', 'Card number');
    driver.waitForTextByCss('.credit-card-exp-month > label', 'Exp. date');
    driver.waitForTextByCss('#chk-save-credit-card-checkbox', 'Save credit card details for future use');

    // Validate pre-types
    driver.waitForTextByCss('.credit-card-type .Select-placeholder', 'Required');
    driver.waitForAttributeContainsByCss('.credit-card-number:nth-child(3) #formPayment', 'placeholder', 'Required');
    driver.waitForTextByCss('.date-dropdown-month .Select-placeholder', 'MM');
    driver.waitForTextByCss('.date-dropdown-year .Select-placeholder', 'YY');
    driver.waitForAttributeContainsByCss('#save-credit-card-checkbox', 'value', 'on');

    // Click 'Finalize Booking' button without filling fields
    driver.waitAndClickByCss('.main-cwt-button');
    // Validate required fields marked
    // Card type
    driver.waitForAttributeContainsByXpath('//*[@id="portlet_hotelmainportlet_WAR_cwtportalportlet"]/div/div/div/div/div/div[2]/div/div/section/div[3]/div[2]/form/div[1]/fieldset/div/div[1]/div/div[2]/div/div/div', 'class', 'field-validator-children');
    // Card Number
    driver.waitForAttributeContainsByXpath('//*[@id="portlet_hotelmainportlet_WAR_cwtportalportlet"]/div/div/div/div/div/div[2]/div/div/section/div[3]/div[2]/form/div[1]/fieldset/div/div[1]/div/div[3]/div/div/div', 'class', 'field-validator-children');
    // Exp. date fields
    driver.waitForAttributeContainsByXpath('//*[@id="portlet_hotelmainportlet_WAR_cwtportalportlet"]/div/div/div/div/div/div[2]/div/div/section/div[3]/div[2]/form/div[1]/fieldset/div/div[2]/div[1]/div[1]/div/div/div', 'class', 'field-validator-children');
    driver.waitForAttributeContainsByXpath('//*[@id="portlet_hotelmainportlet_WAR_cwtportalportlet"]/div/div/div/div/div/div[2]/div/div/section/div[3]/div[2]/form/div[1]/fieldset/div/div[2]/div[1]/div[2]/div/div/div', 'class', 'field-validator-children');

    // Click on finalize booking while one of the new card fields is filled//
    // click on card-type input
    driver.waitAndClickByCss('.credit-card-type.select > div > div > div > div.creditcard-vendors-dropdown');
    driver.pause(1000);
    // Select the first option in the results
    driver.waitAndClickByCss('.Select .Select-option:nth-child(1)');
    driver.pause(1000);
    // click on Finalize button
    driver.waitAndClickByCss('.main-cwt-button');
    // Validate required fields marked
    // Card type - without validation class
    driver.waitForAttributeContainsByXpath('//*[@id="portlet_hotelmainportlet_WAR_cwtportalportlet"]/div/div/div/div/div/div[2]/div/div/section/div[3]/div[2]/form/div[1]/fieldset/div/div[1]/div/div[2]/div/div/div', 'class', '');
    // Card Number
    driver.waitForAttributeContainsByXpath('//*[@id="portlet_hotelmainportlet_WAR_cwtportalportlet"]/div/div/div/div/div/div[2]/div/div/section/div[3]/div[2]/form/div[1]/fieldset/div/div[1]/div/div[3]/div/div/div', 'class', 'field-validator-children');
    // Exp. date fields
    driver.waitForAttributeContainsByXpath('//*[@id="portlet_hotelmainportlet_WAR_cwtportalportlet"]/div/div/div/div/div/div[2]/div/div/section/div[3]/div[2]/form/div[1]/fieldset/div/div[2]/div[1]/div[1]/div/div/div', 'class', 'field-validator-children');
    driver.waitForAttributeContainsByXpath('//*[@id="portlet_hotelmainportlet_WAR_cwtportalportlet"]/div/div/div/div/div/div[2]/div/div/section/div[3]/div[2]/form/div[1]/fieldset/div/div[2]/div[1]/div[2]/div/div/div', 'class', 'field-validator-children');

    // Click on finalize booking while some of the new card fields are missing//
    // click on month input
    driver.waitAndClickByCss('.date-dropdown-month');
    driver.pause(1000);
    // Select the first option in the results
    driver.waitAndClickByCss('.Select .Select-option:nth-child(1)');
    driver.pause(1000);
    // click on Finalize button
    driver.waitAndClickByCss('.main-cwt-button');
    // Validate required fields marked
    // Card type - without validation class
    driver.waitForAttributeContainsByXpath('//*[@id="portlet_hotelmainportlet_WAR_cwtportalportlet"]/div/div/div/div/div/div[2]/div/div/section/div[3]/div[2]/form/div[1]/fieldset/div/div[1]/div/div[2]/div/div/div', 'class', '');
    // Card Number
    driver.waitForAttributeContainsByXpath('//*[@id="portlet_hotelmainportlet_WAR_cwtportalportlet"]/div/div/div/div/div/div[2]/div/div/section/div[3]/div[2]/form/div[1]/fieldset/div/div[1]/div/div[3]/div/div/div', 'class', 'field-validator-children');
    // Exp. date fields (month without validation class)
    driver.waitForAttributeContainsByXpath('//*[@id="portlet_hotelmainportlet_WAR_cwtportalportlet"]/div/div/div/div/div/div[2]/div/div/section/div[3]/div[2]/form/div[1]/fieldset/div/div[2]/div[1]/div[1]/div/div/div', 'class', '');
    driver.waitForAttributeContainsByXpath('//*[@id="portlet_hotelmainportlet_WAR_cwtportalportlet"]/div/div/div/div/div/div[2]/div/div/section/div[3]/div[2]/form/div[1]/fieldset/div/div[2]/div[1]/div[2]/div/div/div', 'class', 'field-validator-children');

  },

  'step 4 -  Finalize page - PAYMENT INFORMATION: Saved credit card' : (driver) => {
// TODO: Complete once mock will be ready

  },

  'step 5 -  Finalize page - PAYMENT INFORMATION: Company credit card: ' : (driver) => {
// TODO: Complete once mock will be ready

  },



};