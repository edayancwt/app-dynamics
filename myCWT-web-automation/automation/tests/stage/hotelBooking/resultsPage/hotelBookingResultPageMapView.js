'use strict';

let markersNumber;
let markersNumberSoldOut;
let markersNumberCompanyPreferred;
let hotelFilterNumber;
let hotelFilterNumberCompanyPreferred;



module.exports = {

  '@tags': ['hotel', 'booking', 'sanity'],

  before: function (driver) {
    driver.resizeWindow(1920, 1020);
  },

  'step 1 - login to portal': (driver) => {
    const login = driver.page.login();
    login.fillLoginDetails(driver.globals.users.portalUser59);
  },

    //    ----------------------------------Hotel Booking - Result Page -  MAP VIEW ----------------------------------


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

  'step 3 - Result Page - Map View - Default' : (driver) => {
    // Validate results is displayed and map view is hidden
    driver.waitForAttributeContainsByXpath('//*[@id="portlet_hotelmainportlet_WAR_cwtportalportlet"]/div/div/div/div/div/div[2]/div/div[2]/div[2]', 'class', 'hotel-result-cards');
    driver.pause(2000);

  },

  'step 4 - Result Page - Map View - View map' : (driver) => {
      // Click on View Map button
      driver.waitAndClickByCss('#toggle-btn-wrap .btn.text-uppercase');
      // Validate map is displayed and results view is hidden
      driver.pause(1500);
      driver.waitForAttributeContainsByXpath('//*[@id="portlet_hotelmainportlet_WAR_cwtportalportlet"]/div/div/div/div/div/div[2]/div/div[2]/div[3]', 'class', 'hotel-map-results');
      driver.pause(3000);
      // Validate that text change to "VIEW LIST" on button
      driver.waitForTextByCss('#toggle-btn-wrap .btn.text-uppercase span', 'VIEW LIST');
    },

  'step 5.1 - Result Page - Map View - Map display vs list: reduce results number with filter' : (driver) => {
    //*************************Change any of the filters to reduce the number of hotels.**************** //
    driver.elements('css selector', '.hotel-tooltip', function (elements) {
      console.log('BBBBBB', elements.value.length);
    });
    // Click on zoom-out twice
    driver.useCss();
    driver.moveToElement('.H_btn[title="Zoom out"]', 10, 10);
    driver.pause(200);
    driver.mouseButtonDown(0);
    driver.pause(200);
    driver.mouseButtonUp(0);
    driver.pause(2000);
    driver.moveToElement('.H_btn[title="Zoom out"]', 10, 10);
    driver.pause(200);
    driver.mouseButtonDown(0);
    driver.pause(200);
    driver.mouseButtonUp(0);
    driver.pause(2000);

    // Filter  using 'HOTEL CLASS (4 stars)'
    driver.waitAndClickByCss('.hotel-star-rate-option:nth-child(2) input');
    driver.pause(5000);

    driver.elements('css selector', '.hotel-tooltip', function (elements) {
      markersNumber = elements.value.length;
    });

    // get the number of hotels on the selected NEIGHBOURHOOD filter
    driver.getText('#sticky-panel > div > div.hotel-result-filter-fields > div.filter-hotel-section.hotel-rates > ul > li:nth-child(2) > div > span', function (result) {
      let str = result.value.split('(');
      hotelFilterNumber = parseInt(str[1]);
    });

    // Checking that the number of filtered hotel is equal to the total amount of pin number on the map
    driver.timeoutsAsyncScript(20000, function() {
      driver.assert.equal(hotelFilterNumber, markersNumber);
    });
    // Reset filters
    driver.waitAndClickByCss('.pull-right');
  },

  'step 5.2 - Result Page - Map View - Map display vs list: sold out validation' : (driver) => {
    // TODO: Complete "sold out" validation when mock will be ready
/*
    driver.elements('css selector', '.soldout-pin .hotel-tooltip', function (elements) {
      markersNumberSoldOut = elements.value.length;
    });

     driver.waitAndClickByCss('.pull-right');
*/
  },

  'step 5.3 - Result Page - Map View - Map display vs list: exceeds allowance' : (driver) => {
    // TODO: Complete "exceeds allowance" validation when mock will be ready

    //  driver.waitAndClickByCss('.pull-right');
  },

  'step 6 - Result Page - Map View - Hotels state on the map: COMPANY PREFERRED with availability' : (driver) => {
    // TODO: Complete "COMPANY PREFERRED with availability" validation when mock will be ready
/*
    // Zoom Out twice
    driver.useCss();
    driver.moveToElement('.H_btn[title="Zoom out"]', 10, 10);
    driver.pause(200);
    driver.mouseButtonDown(0);
    driver.pause(200);
    driver.mouseButtonUp(0);
    driver.pause(2000);
    driver.moveToElement('.H_btn[title="Zoom out"]', 10, 10);
    driver.pause(200);
    driver.mouseButtonDown(0);
    driver.pause(200);
    driver.mouseButtonUp(0);
    driver.pause(2000);
    // Filter by COMPANY PREFERRED
    driver.waitAndClickByCss('#preferred-checkbox');
    driver.pause(2000);

    // hover to reveal one of the hotels
    driver.moveToElement('styled-bubble-wrapper',5,5);
    // Validate that tooltip is open
    driver.assert.cssProperty('.styled-bubble-wrapper:hover .hotel-tooltip', 'display', 'block');
    // Check that tooltip contains 'company preferred' text
    driver.waitForTextByCss('.styled-bubble-wrapper:hover .hotel-tooltip .text-uppercase span', 'company preferred');


    //  driver.waitAndClickByCss('.pull-right');
*/
  },

  'step 6.1 - Result Page - Map View - Hotels state on the map: hotels with availability' : (driver) => {

    // Filter  using 'NEIGHBOURHOOD'
    driver.waitAndClickByCss('#Ochota');
    driver.pause(1500);
    driver.moveToElement('.H_btn[title="Zoom in"]', 10, 10);
    driver.pause(200);
    driver.mouseButtonDown(0);
    driver.pause(200);
    driver.mouseButtonUp(0);
    driver.pause(2000);
    driver.moveToElement('.bubble-offset:nth-child(1) .styled-bubble-wrapper',5,5);
    // Validate that tooltip is open
    driver.assert.cssProperty('.styled-bubble-wrapper:hover .hotel-tooltip', 'display', 'block');
    // click on available hotel
    driver.moveToElement('.bubble-offset:nth-child(1) .styled-bubble-wrapper',5,5);
    driver.pause(200);
    driver.mouseButtonDown(0);
    driver.pause(200);
    driver.mouseButtonUp(0);
    // Validate that state in active (on click)
    driver.assert.cssProperty('.hotel-map-results .styled-bubble-wrapper.active-bubble .styled-bubble.active-bubble', 'background-color', 'rgba(91, 101, 108, 1)');
    driver.pause(3000);
    // click on another available hotel
    driver.moveToElement('.bubble-offset:nth-child(2) .styled-bubble-wrapper',5,5);
    driver.pause(200);
    driver.mouseButtonDown(0);
    driver.pause(200);
    driver.mouseButtonUp(0);
    driver.pause(3000);
    // Validate that state after click on another bubble
    driver.assert.cssProperty('.bubble-offset:nth-child(1)  .styled-bubble', 'background-color', 'rgba(204, 66, 38, 1)');

    // hover the active bubble to see if tooltip still opening
    driver.moveToElement('.hotel-map-results .here-map-container .styled-bubble.visited-bubble',5,5);
    // Validate that tooltip is open
    driver.assert.cssProperty('.bubble-offset.active  .hotel-tooltip', 'display', 'block');
    // Reset filter
   driver.waitAndClickByCss('.pull-right');

  },

  'step 6.2 - Result Page - Map View - Hotels state on the map: hotels without availability' : (driver) => {

    // Filter  using 'NEIGHBOURHOOD'
    driver.waitAndClickByCss('#Ochota');
    driver.pause(1500);
    driver.moveToElement('.H_btn[title="Zoom in"]', 10, 10);
    driver.pause(200);
    driver.mouseButtonDown(0);
    driver.pause(200);
    driver.mouseButtonUp(0);
    driver.pause(2000);
    driver.moveToElement('.pin-offset:nth-child(1) .available-pin',5,5);
    // Validate that tooltip is open
    driver.assert.cssProperty('.styled-marker:hover .hotel-tooltip', 'display', 'block');
    // click on available hotel
    driver.moveToElement('.pin-offset:nth-child(1) .styled-marker',5,5);
    driver.pause(200);
    driver.mouseButtonDown(0);
    driver.pause(200);
    driver.mouseButtonUp(0);
    // Validate that state in active (on click)
    driver.assert.cssProperty('.active-pin', 'background-image', 'url("https://travel.stage-mycwt.com/o/cwt-portal-theme/images/_/node_modules/cwt-booking-web-core/dist/assets/images/black-marker.6a61db9a795724b19dcf185327c1308d.svg")');
    driver.pause(3000);
    // click on another available hotel
    driver.moveToElement('.pin-offset:nth-child(2) .styled-marker',5,5);
    driver.pause(200);
    driver.mouseButtonDown(0);
    driver.pause(200);
    driver.mouseButtonUp(0);
    driver.pause(3000);
    // Validate that state after click on another pin
    driver.assert.cssProperty('.bubble-offset:nth-child(1)  .visited-pin','background-image', 'url("https://travel.stage-mycwt.com/o/cwt-portal-theme/images/_/node_modules/cwt-hotel-booking-spa/dist/assets/images/red-marker.f64ba22270ab62168a4c85123f2c7f86.svg")');

    // hover the active bubble to see if tooltip still opening
    driver.moveToElement('.hotel-map-results .here-map-container .styled-bubble.visited-pin',5,5);
    // Validate that tooltip is open
    driver.assert.cssProperty('.bubble-offset.active  .hotel-tooltip', 'display', 'block');


    //  driver.waitAndClickByCss('.pull-right');

  },

  'step 6.3 - Result Page - Map View - Hotels state on the map: COMPANY PREFERRED without availability' : (driver) => {
    // TODO: Complete "COMPANY PREFERRED without availability" validation when mock will be ready
    /*
        // Zoom Out twice
        driver.useCss();
        driver.moveToElement('.H_btn[title="Zoom out"]', 10, 10);
        driver.pause(200);
        driver.mouseButtonDown(0);
        driver.pause(200);
        driver.mouseButtonUp(0);
        driver.pause(2000);
        driver.moveToElement('.H_btn[title="Zoom out"]', 10, 10);
        driver.pause(200);
        driver.mouseButtonDown(0);
        driver.pause(200);
        driver.mouseButtonUp(0);
        driver.pause(2000);
        // Filter by COMPANY PREFERRED
        driver.waitAndClickByCss('#preferred-checkbox');
        driver.pause(2000);

        // hover to reveal one of the hotels
        driver.moveToElement('styled-bubble-wrapper',5,5);
        // Validate that tooltip is open
        driver.assert.cssProperty('.styled-bubble-wrapper:hover .hotel-tooltip', 'display', 'block');
        // Check that ctooltip contains 'company preferred' text
        driver.waitForTextByCss('.styled-bubble-wrapper:hover .hotel-tooltip .text-uppercase span', 'company preferred');


        //  driver.waitAndClickByCss('.pull-right');
    */
  },

  'step 6.4 - Result Page - Map View - Hotels state on the map: SOLD OUT HOTELS' : (driver) => {
// TODO: Complete "SOLD OUT HOTELS" validation when mock will be ready
    /*
        // Filter  using 'NEIGHBOURHOOD'
        driver.waitAndClickByCss('#Ochota');
        driver.pause(1500);
        driver.moveToElement('.H_btn[title="Zoom in"]', 10, 10);
        driver.pause(200);
        driver.mouseButtonDown(0);
        driver.pause(200);
        driver.mouseButtonUp(0);
        driver.pause(2000);
        driver.moveToElement('.bubble-offset:nth-child(1) .styled-bubble-wrapper',5,5);
        // Validate that tooltip is open
        driver.assert.cssProperty('.styled-bubble-wrapper:hover .hotel-tooltip', 'display', 'block');
        // click on available hotel
        driver.moveToElement('.bubble-offset:nth-child(1) .styled-bubble-wrapper',5,5);
        driver.pause(200);
        driver.mouseButtonDown(0);
        driver.pause(200);
        driver.mouseButtonUp(0);
        // Validate that state in active (on click)
        driver.assert.cssProperty('.hotel-map-results .styled-bubble-wrapper.active-bubble .styled-bubble.active-bubble', 'background-color', 'rgba(91, 101, 108, 1)');
        driver.pause(3000);
        // click on another available hotel
        driver.moveToElement('.bubble-offset:nth-child(2) .styled-bubble-wrapper',5,5);
        driver.pause(200);
        driver.mouseButtonDown(0);
        driver.pause(200);
        driver.mouseButtonUp(0);
        driver.pause(3000);
        // Validate that state in active (on click)
        driver.assert.cssProperty('.bubble-offset:nth-child(1)  .styled-bubble', 'background-color', 'rgba(204, 66, 38, 1)');

        // hover the active bubble to see if tooltip still opening
        driver.moveToElement('.hotel-map-results .here-map-container .styled-bubble.visited-bubble',5,5);
        // Validate that tooltip is open
        driver.assert.cssProperty('.bubble-offset.active  .hotel-tooltip', 'display', 'block');


        //  driver.waitAndClickByCss('.pull-right');
    */
  },

  'step 6.5 - Result Page - Map View - Hotels state on the map: SOLD OUT COMPANY PREFERRED' : (driver) => {
    // TODO: Complete "SOLD OUT COMPANY PREFERRED" validation when mock will be ready
    /*
        // Zoom Out twice
        driver.useCss();
        driver.moveToElement('.H_btn[title="Zoom out"]', 10, 10);
        driver.pause(200);
        driver.mouseButtonDown(0);
        driver.pause(200);
        driver.mouseButtonUp(0);
        driver.pause(2000);
        driver.moveToElement('.H_btn[title="Zoom out"]', 10, 10);
        driver.pause(200);
        driver.mouseButtonDown(0);
        driver.pause(200);
        driver.mouseButtonUp(0);
        driver.pause(2000);
        // Filter by COMPANY PREFERRED
        driver.waitAndClickByCss('#preferred-checkbox');
        driver.pause(2000);

        // hover to reveal one of the hotels
        driver.moveToElement('styled-bubble-wrapper',5,5);
        // Validate that tooltip is open
        driver.assert.cssProperty('.styled-bubble-wrapper:hover .hotel-tooltip', 'display', 'block');
        // Check that ctooltip contains 'company preferred' text
        driver.waitForTextByCss('.styled-bubble-wrapper:hover .hotel-tooltip .text-uppercase span', 'company preferred');


        //  driver.waitAndClickByCss('.pull-right');
    */
  },

  'step 7 - Result Page - Map View - Location pins on the map: TRAIN STATION' : (driver) => {
    // Search for a train station
    driver.waitAndSetValueByCss('.hotel-search-panel .places-auto-complete .Select-control input', 'sydney kingsford smith');
    driver.pause(3000);
    // Select the first option in the results
    driver.waitAndClickByCss('#trainStations-1');
    // Click on find button
    driver.waitAndClickByCss('#nw-search-hotel');
    driver.pause(5000);
    // Validate that train pin is visible
    driver.assert.cssProperty('.train-stations', 'background-image', 'url("https://travel.stage-mycwt.com/o/cwt-portal-theme/images/_/node_modules/cwt-booking-web-core/dist/assets/images/map-pin-train.6f597e1ed3966cc9c156129a6f713bf8.svg")');
  },

  'step 7.1 - Result Page - Map View - Location pins on the map: AIRPORT' : (driver) => {
    // Search for an airport
    driver.waitAndSetValueByCss('.hotel-search-panel .places-auto-complete .Select-control input', 'charles de gaulle');
    driver.pause(3000);
    // Select the first option in the results
    driver.waitAndClickByCss('#airports-1');
    // Click on find button
    driver.waitAndClickByCss('#nw-search-hotel');
    driver.pause(5000);
    // Validate that train pin is visible
    driver.assert.cssProperty('.airports', 'background-image', 'url("https://travel.stage-mycwt.com/o/cwt-portal-theme/images/_/node_modules/cwt-booking-web-core/dist/assets/images/map-pin-flight.07348d30ac34596c0e1f404d09a62b5e.svg")');
  },

  'step 7.2 - Result Page - Map View - Location pins on the map: LANDMARK' : (driver) => {
    // Search for a landmark
    driver.waitAndSetValueByCss('.hotel-search-panel .places-auto-complete .Select-control input', 'Eiffel tower');
    driver.pause(3000);
    // Select the first option in the results
    driver.waitAndClickByCss('#districts-1');
    // Click on find button
    driver.waitAndClickByCss('#nw-search-hotel');
    driver.pause(5000);
    // Validate that train pin is visible
    driver.assert.cssProperty('.landmarks', 'background-image', 'url("https://travel.stage-mycwt.com/o/cwt-portal-theme/images/_/node_modules/cwt-booking-web-core/dist/assets/images/map-pin-location.4fbc356da1df865962a726978b8a0349.svg")');
  },

  'step 7.3 - Result Page - Map View - Location pins on the map: SPECIFIC ADDRESS' : (driver) => {
    // TODO: There is a bug about the address marker - it's not appear
/*
    // Search for a train station
    driver.waitAndSetValueByCss('.hotel-search-panel .places-auto-complete .Select-control input', '19 Florentin st');
    driver.pause(3000);
    // Select the first option in the results
    driver.waitAndClickByCss('.Select .Select-option:nth-child(1)');
    // Click on find button
    driver.waitAndClickByCss('#nw-search-hotel');
    driver.pause(5000);
    // Validate that train pin is visible
    //  TODO: Change class name and url
    driver.assert.cssProperty('.airports', 'background-image', 'url("https://travel.stage-mycwt.com/o/cwt-portal-theme/./images/_/node_modules/cwt-booking-web-core/dist/assets/images/map-pin-flight.07348d3….svg")');
*/
  },

  'step 8 - Result Page - Map View - Actions on the map: Company preferred with availability' : (driver) => {

  },

  'step 8.1 - Result Page - Map View - Actions on the map: Hotels with availability' : (driver) => {
    // Search for a landmark
    driver.waitAndSetValueByCss('.hotel-search-panel .places-auto-complete .Select-control input', 'warsaw');
    driver.pause(3000);
    // Select the first option in the results
    driver.waitAndClickByCss('#cities-1');
    // Click on find button
    driver.waitAndClickByCss('#nw-search-hotel');
    driver.pause(12000);
    // Filter  using 'hotel name' input
    driver.waitAndSetValueByCss('.icon-text-field.input-group input', 'hit');
    driver.pause(2000);
    // hover on availble pin/bubble
    driver.moveToElement('.hotel-map-results .here-map-container .styled-bubble.visited-bubble',5,5);
    // Validate tooltip content
    // Hotel's name
    driver.waitForTextByCss('.styled-bubble-wrapper:hover .hotel-tooltip h3', 'Hit Hotel');
    // Hotel's rating
    driver.waitForAttributeContainsByCss('.styled-bubble-wrapper:hover .hotel-tooltip .dv-star-rating input', 'value', '2');
    // Select the first option in the results
    driver.waitAndClickByCss('.styled-bubble-wrapper > div[class*="available-"]');
    driver.pause(50000);
  },

  'step 8.2 - Result Page - Map View - Actions on the map: Hotels without availability' : (driver) => {

  },

  'step 8.3 - Result Page - Map View - Actions on the map: Company preferred hotels without availability' : (driver) => {

  },

  'step 8.4 - Result Page - Map View - Actions on the map: Sold out hotels' : (driver) => {

  },

  'step 8.5 - Result Page - Map View - Actions on the map: Company preferred sold out hotels' : (driver) => {

  },

};