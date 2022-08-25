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

  //    ----------------------------------Sanity, Finalize page - PRICE BREAKDOWN ----------------------------------

  'step 3 -  Finalize page - Price Breakdown: AVG. per night' : (driver) => {
    driver.pause(5000);
    driver.useCss();
    driver.getText('#portlet_hotelmainportlet_WAR_cwtportalportlet > div > div > div > div > div > div:nth-child(2) > div > div > section > div.checkout > div.checkout__estimated-cost > table > tbody > tr:nth-child(1) > td.ledger__amount > span', function (result) {
      let str = result.value.split(' ');
      let roundAvgPrice;
      avgPrice = parseFloat(str[1]);
      roundAvgPrice = Math.round(avgPrice);
      console.log('>>>>>>>>>>>', hotelBannerPrice);
      console.log('<<<<<<<<<<<<<<', avgPrice);
      // Validate that banner price is equal to avg price
      driver.assert.equal(roundAvgPrice, hotelBannerPrice );
    });
  },

  'step 4 -  Finalize page - Price Breakdown: Nights list' : (driver) => {
    driver.getText('.days-summary > span:last-of-type', function (result) {
      let str = result.value.split(' ');
      totalNights = parseInt(str[0]);
    });

    driver.elements('css selector', '.ledger__row--empty ~ .ledger__row[tabindex="0"]', function (elements) {
      for (let i = 0; i < totalNights; i++) {
        let element = '.ledger__row--empty ~ tr:nth-of-type(' + (i + 3) + ')';
        driver.waitForTextByCss(element, avgPrice);
      }
    });

  },

  'step 5 -  Finalize page - Price Breakdown: no tax' : (driver) => {
    // Validate that tax amount is with no tax (0.00)
    driver.waitForTextByCss('.ledger__row--subsection .ledger__amount span', '0.00');
  },

  'step 6 -  Finalize page - Price Breakdown: total price' : (driver) => {
    // check total price
    driver.getText('.big-price__amount > span', function (result) {
      let str = result.value.split(' ');
      totalPrice = parseFloat(str[1]);
      driver.assert.equal(avgPrice * totalNights, totalPrice );
    });
  },

  'step 7 -  Finalize page - Price Breakdown: in policy' : (driver) => {
    // Validate that tin policy is appear
    driver.waitForTextByCss('.big-price__message', 'IN - POLICY');
  }
  // TODO: Complete steps C (total taxes) + G (no policy) once mock will be ready
};