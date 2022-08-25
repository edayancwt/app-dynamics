'use strict';

let markersNumber;
let hotelFilterNumber;

module.exports = {

  '@tags': ['hotel', 'booking', 'sanity'],

  before: function (driver) {
    driver.resizeWindow(1920, 1020);
  },

  'step 1 - login to portal': (driver) => {
    const login = driver.page.login();
    login.fillLoginDetails(driver.globals.users.portalUser58);
  },

    //    ----------------------------------Hotel Booking - Result Page -  MAP/LIST ----------------------------------


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
    // Validate booking page URL
    driver.waitForUrlToContain('travel.stage-mycwt.com/group/selenium-sub-3-selenium-top/book-a-hotel#/hotel-results', 20000);
    // Wait for hotel results to load
    driver.pause(12000);

  },

  'step 3 - Result Page - Map/List - Default' : (driver) => {
    // Validate results is displayed and map view is hidden
    driver.waitForAttributeContainsByXpath('//*[@id="portlet_hotelmainportlet_WAR_cwtportalportlet"]/div/div/div/div/div/div[2]/div/div[2]/div[2]', 'class', 'hotel-result-cards');
    driver.pause(2000);

  },

  'step 4 - Result Page - Map/List - View map' : (driver) => {
      // Click on View Map button
      driver.waitAndClickByCss('#toggle-btn-wrap .btn.text-uppercase');
      // Validate map is displayed and results view is hidden
      driver.pause(1500);
      driver.waitForAttributeContainsByXpath('//*[@id="portlet_hotelmainportlet_WAR_cwtportalportlet"]/div/div/div/div/div/div[2]/div/div[2]/div[3]', 'class', 'hotel-map-results');
      driver.pause(3000);
      // Validate that text change to "VIEW LIST" on button
      driver.waitForTextByCss('#toggle-btn-wrap .btn.text-uppercase span', 'VIEW LIST');
    },

  'step 5 - Result Page - Map/List - View list' : (driver) => {
    driver.waitAndClickByCss('#toggle-btn-wrap .btn.text-uppercase');
    // Validate list is displayed and results view is hidden
    driver.pause(1500);
    driver.waitForAttributeContainsByXpath('//*[@id="portlet_hotelmainportlet_WAR_cwtportalportlet"]/div/div/div/div/div/div[2]/div/div[2]/div[2]', 'class', 'hotel-result-cards');
    driver.pause(3000);
    // Validate that text change to "VIEW LIST" on button
    driver.waitForTextByCss('#toggle-btn-wrap .btn.text-uppercase span', 'VIEW MAP');
  },

  'step 6 - Result Page - Map/List - Switch after filter:' : (driver) => {

    driver.elements('css selector', '.hotel-tooltip', function (elements) {
      console.log('BBBBBB', elements.value.length);
    });

    // Filter  using 'NEIGHBOURHOOD'
    driver.waitForTextByCss('.neighbourhood-section', 'NEIGHBOURHOOD');
    driver.waitAndClickByCss('.list-unstyled li:last-child .cwt-checkbox input');
    driver.pause(1500);
    // Click on View Map button
    driver.waitAndClickByCss('#toggle-btn-wrap .btn.text-uppercase');
    driver.pause(1500);
    // Click on zoom-out
    driver.useCss();
    driver.moveToElement('.H_btn[title="Zoom out"]', 10, 10);
    driver.pause(200);
    driver.mouseButtonDown(0);
    driver.pause(200);
    driver.mouseButtonUp(0);
    driver.pause(2000);

    driver.elements('css selector', '.hotel-tooltip', function (elements) {
      markersNumber = elements.value.length;
    });

    // get the number of hotels on the selected NEIGHBOURHOOD filter
    driver.getText('#sticky-panel > div > div.hotel-result-filter-fields > div.filter-hotel-section.neighbourhood-section > ul > li:nth-child(6) > div > span', function (result) {
      let str = result.value.split('(');
      hotelFilterNumber = parseInt(str[1]);
    });

    // Checking that the number of filtered hotel is equal to the total amount of pin number on the map
    driver.timeoutsAsyncScript(20000, function() {
      driver.assert.equal(hotelFilterNumber, markersNumber);
    });

  },

};