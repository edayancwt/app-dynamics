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
    login.fillLoginDetails(driver.globals.users.portalUser57);
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
    // Select traveler
    driver.waitAndClickByCss('.travelers-auto-complete div.Select-input > input');
    driver.pause(2000);
    // Select the first option in the results
    driver.waitAndClickByCss('.travelers-auto-complete  div:nth-child(1) > div.Select-option');
    driver.pause(2000);
    // Click on find button
    driver.waitAndClickByCss('#nw-search-hotel');
    // Wait for hotel results to load
    driver.pause(12000);

    // Filter  using 'hotel name' input
    driver.waitAndSetValueByCss('.icon-text-field.input-group input', 'hit hotel');
    driver.waitAndClickByCss(' .hotel-result-card a');
    driver.pause(3000);
  },

  //    ----------------------------------Sanity, Room selection page - ROOM ----------------------------------

  'step 3 -  Room selection page - Rooms: Default sorting' : (driver) => {
    driver.elements('css selector', '.hotel-room-item', function (elements) {
      for (let i = 0; i < elements.value.length; i++) {
        let element = '.hotel-room-item:nth-child(' + (i + 2) + ') .price';
        // collect all prices to array
        driver.getText(element, function (result) {
          let str = result.value.split(' ');
          str = parseInt(str[1]);
          roomsPriceArr.push(str);
          driver.pause(1000);
          driver.execute(function() { window.scrollBy(0, 300); }, []);
        });
      }
    });
    // Check that every price is smaller than the next one
    driver.perform(function() {
      for (let i = 0; i < roomsPriceArr.length - 1; i++) {
        if (roomsPriceArr[i] < roomsPriceArr[i+1]) {
          console.log('OK!');
        } else {
          driver.waitForTextByCss('.hotel-list-item-wrapper:nth-child(1) h3', 'fail this test');
        }
      }
    });

    // Save in a variable one room price for step 6
    driver.getText('.hotel-room-item:nth-child(2) .price', function (result) {
      let str = result.value.split(' ');
      roomPrice = parseInt(str[1]);
    });
    // TODO: sorting by 'company preferred' - complete once there's a mock
  },

  'step 4 -  Room selection page - Room: Activate sorting' : (driver) => {
    // TODO: Activate sorting - complete once feature is ready
  },

  'step 5 -  Room selection page - Room: Collapse/expand room details' : (driver) => {
    driver.execute(function() { window.scrollBy(0, -700); }, []);
    driver.useCss();
    driver.assert.attributeContains('.show-more', 'aria-expanded', 'false');
    // Clicking on View-room-details - to open
    driver.waitAndClickByCss('.show-more');
    driver.pause(2000);
    // Validate that room details is expand + Text = "hide room details"
    driver.assert.attributeContains('.show-more', 'aria-expanded', 'true');
    driver.waitForTextByCss('.show-more span', 'Hide room details');
    // Clicking again on hide-room-details - to close
    driver.waitAndClickByCss('.show-more');
    driver.pause(2000);
    // Validate that room details is expand + Text = "hide room details"
    driver.assert.attributeContains('.show-more', 'aria-expanded', 'false');
    driver.waitForTextByCss('.show-more span', 'View room details');
    // Clicking again on view-room-detail
    driver.waitAndClickByCss('.show-more');
    driver.pause(2000);
    // scroll in order to check if room-details still expanded
    driver.execute(function() { window.scrollBy(0, -700); }, []);
    driver.assert.attributeContains('.show-more', 'aria-expanded', 'true');
  },


  'step 6 -  Room selection page - Room: Room data collapsed mode (available room):' : (driver) => {
    // Clicking again on hide-room-detail
    driver.waitAndClickByCss('.show-more');
    driver.pause(2000);
    // Validate room's name
    driver.waitForTextByCss('.room-type', 'Standard Room');
    // Validate room labels
    // TODO: change text when mock data will be ready (Refundable/non-Refundable, Breakfast included/not-included,Loyalty benefits apply)
    driver.waitForTextByCss('#additionalRooms > div > div:nth-child(2) > div.room-desc-panel > div.attributes-wrapper > div > ul > li:nth-child(1) > label', ' ');
    driver.waitForTextByCss('#additionalRooms > div > div:nth-child(2) > div.room-desc-panel > div.attributes-wrapper > div > ul > li:nth-child(2) > label', ' ');
    driver.waitForTextByCss('#additionalRooms > div > div:nth-child(2) > div.room-desc-panel > div.attributes-wrapper > div > ul > li:nth-child(3) > label', ' ');
    // Policy
    driver.waitForTextByCss('span.in-policy span', 'IN - POLICY');
    // Currency
    driver.waitForTextByCss('span.price', 'PLN');
    // price
    driver.waitForTextByCss('span.price', roomPrice);
    // Per Night + Taxes
    driver.waitForTextByCss('.per-night-with-taxes .per-night-label span', 'Per Night');
    driver.waitForTextByCss('.per-night-with-taxes .tax-included-label span', 'Includes Taxes');
    // Validate button is enabled
    driver.assert.cssProperty('#additionalRooms > div > div:nth-child(2) > div.room-desc-panel > div.price-wrapper > button', 'background-color', 'rgba(255, 96, 64, 1)');
  },

  'step 7 -  Room selection page - Room: Room data expanded mode (available room):' : (driver) => {
    // Clicking again on view-room-detail
    driver.waitAndClickByCss('.show-more');
    driver.pause(2000);
    // Validate room's name
    driver.waitForTextByCss('.room-type', 'Standard Room');
    // Validate room labels
    // TODO: change text when mock data will be ready (Refundable/non-Refundable, Breakfast included/not-included,Loyalty benefits apply)
    driver.waitForTextByCss('#additionalRooms > div > div:nth-child(2) > div.room-desc-panel > div.attributes-wrapper > div > ul > li:nth-child(1) > label', ' ');
    driver.waitForTextByCss('#additionalRooms > div > div:nth-child(2) > div.room-desc-panel > div.attributes-wrapper > div > ul > li:nth-child(2) > label', ' ');
    driver.waitForTextByCss('#additionalRooms > div > div:nth-child(2) > div.room-desc-panel > div.attributes-wrapper > div > ul > li:nth-child(3) > label', ' ');
    // Policy
    driver.waitForTextByCss('span.in-policy span', 'IN - POLICY');
    // Currency
    driver.waitForTextByCss('span.price', 'PLN');
    // price
    driver.waitForTextByCss('span.price', roomPrice);
    // Per Night + Taxes
    driver.waitForTextByCss('.per-night-with-taxes .per-night-label span', 'Per Night');
    driver.waitForTextByCss('.per-night-with-taxes .tax-included-label span', 'Includes Taxes');
    // Validate button is enabled
    driver.assert.cssProperty('#additionalRooms > div > div:nth-child(2) > div.room-desc-panel > div.price-wrapper > button', 'background-color', 'rgba(255, 96, 64, 1)');
    // Breakfast
    // TODO: Breakfast - will be fill when mock data will be ready
    //driver.waitForTextByCss('ul.rules li:nth-child(1) .rules__rule-lbl', 'breakfast');
    // TODO: change text when mock data will be ready
    driver.waitForTextByCss('ul.rules li:nth-child(1) .text-toggle-expander-wrapper', ' ');
    // Policies
    driver.waitForTextByCss('ul.rules li:nth-child(2) .rules__rule-lbl', 'policies');
    // TODO: change text when mock data will be ready
    driver.waitForTextByCss('ul.rules li:nth-child(2) .text-toggle-expander-wrapper', ' ');
    // Additional info
    driver.waitForTextByCss('ul.rules li:nth-child(3) .rules__rule-lbl', 'additional info');
    // TODO: change text when mock data will be ready
    driver.waitForTextByCss('ul.rules li:nth-child(3) .text-toggle-expander-wrapper', ' ');
  },
  // TODO: All the next steps are related to 'company preferred' - need to complete once mock will be ready
  // Company preferred rooms + Collapse/expand rooms + Room data- Collapsed mode + Room data- Collapsed mode
};