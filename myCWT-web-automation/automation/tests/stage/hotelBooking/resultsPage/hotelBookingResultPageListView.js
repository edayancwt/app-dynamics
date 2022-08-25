'use strict';

let cardsNumber;
let cardsNumberUpdated;

module.exports = {

  '@tags': ['hotel', 'booking', 'sanity'],

  before: function (driver) {
    driver.resizeWindow(1920, 1020);
  },

  'step 1 - login to portal': (driver) => {
    const login = driver.page.login();
    login.fillLoginDetails(driver.globals.users.portalUser59);
  },

    //    ----------------------------------Hotel Booking - Result Page -  LIST VIEW ----------------------------------


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
    // Filter  using 'hotel name' input
    driver.waitAndSetValueByCss('.icon-text-field.input-group input', 'Hampton By Hilton Warsaw');

  },

  'step 3.1 - Result Page - List View - Hotel details: general ' : (driver) => {
    driver.pause(3000);
    // Validate hotel image is displayed
    driver.waitForAttributeContainsByCss('#hotel-result-card-image img', 'src', 'http');
    // Validate hotel name is displayed
    driver.waitForTextByCss('.hotel-result-card-header', 'Hampton By Hilton Warsaw');
    // Validate class
    driver.waitForAttributeContainsByCss('#hotel-card-HF311459 > li > a > div.hotel-result-card-content > div.hotel-result-card-body > div.hotel-result-card-body-stars-and-popular > span:nth-child(1) > div', 'class', 'dv-star-rating dv-star-rating-non-editable');
    // Validate location//*[@id="hotel-card-HF311459"]/li/a/div[2]/div[2]/div[1]/span[1]/div
    // icon
    driver.waitForAttributeContainsByCss('#hotel-card-HF311459 > li > a > div.hotel-result-card-content > div.hotel-result-card-body > div.location-wrapper.display-in-two-lines > i', 'class', 'cwt-icons cwt-icons-location');
    // distance
    driver.waitForTextByCss('.location-distance span', 'mile');
    driver.waitForTextByCss('.location-from span', 'from city center');
    // Currency
    driver.waitForTextByCss('span.price', 'PLN');
    // Policy
    // Icon
    driver.waitForAttributeContainsByCss('#hotel-card-HF311459 > li > a > div.hotel-result-card-content > div.hotel-result-card-footer > div.hotel-result-card-price > div > div > div.cap-rate.in-policy > span > i', 'class', 'cwt-icons cwt-icons-positive');
    // Text
    driver.waitForTextByCss('span.in-policy span', 'IN - POLICY');
    // Reset filters
    driver.waitAndClickByCss('.pull-right');
  },

  'step 3.2 - Result Page - List View - Hotel details: SOLD OUT / CWT PROGRAM / EXCEEDS ALLOWANCES ' : (driver) => {
// TODO: Complete "exceeds allowance etc.." validation when mock will be ready
  },

  'step 4 - Result Page - List View - Select hotels for comparison: Hover several available hotels' : (driver) => {
    driver.pause(5000);
    driver.elements('css selector', '.hotel-list-item-wrapper li.hotel-result-card .cwt-checkbox', function (elements) {
      for (let i=0; i < elements.value.length ; i++ ) {
        let elem = '.hotel-list-item-wrapper:nth-child(' + (i + 1) + ') li.hotel-result-card .cwt-checkbox';
         driver.element('css selector', elem , (isExist) => {
           // if element is not exist, do nothing else hover over it
          if (isExist.status === -1) {

          } else if (isExist.status === 0) {
            driver.execute(function() { window.scrollBy(0, 100); }, []);
            driver.pause(1000);
            driver.moveToElement(elem, 5, 5);
            driver.pause(1000);
            driver.assert.cssProperty('.hotel-list-item-wrapper:nth-child(' + (i + 1) + ') li.hotel-result-card .cwt-checkbox', 'visibility', 'visible');
          }
        });
      }
    });
  },

  'step 4.1 - Result Page - List View - Select hotels for comparison: Hover several sold out hotels' : (driver) => {
    driver.elements('css selector', '.hotel-list-item-wrapper li.hotel-result-card .cwt-checkbox', function (elements) {
      for (let i=0; i < elements.value.length ; i++ ) {
        let elem = '.hotel-list-item-wrapper:nth-child(' + (i + 1) + ') li.hotel-result-card .sold-out';

        driver.element('css selector', elem , (isExist) => {
          // if element is not exist, do nothing else hover over it
          if (isExist.status === -1) {

          } else if (isExist.status === 0) {
            driver.execute(function() { window.scrollBy(0, 200); }, []);
            driver.pause(1000);
            driver.moveToElement(elem, 5, 5);
            // Validate that when hovering on 'sold out' card, the checkbox is not presented
            driver.useCss();
            driver.waitForElementNotPresent('.hotel-list-item-wrapper:nth-child(' + (i + 1) + ') li.hotel-result-card .cwt-checkbox', 1000);
          }
        });
      }
    });
  },

  'step 4.2 - Result Page - List View - Select hotels for comparison: Hover several exceeds allowance hotels' : (driver) => {
  // TODO: Complete "exceeds allowance etc.." validation when mock will be ready
/*
    driver.pause(3000);
    driver.elements('css selector', '.hotel-list-item-wrapper li.hotel-result-card .cwt-checkbox', function (elements) {
      for (let i=0; i < elements.value.length ; i++ ) {
        let elem = '.hotel-list-item-wrapper:nth-child(' + (i + 1) + ') li.hotel-result-card .sold-out';

        driver.element('css selector', elem , (isExist) => {
          // if element is not exist, do nothing else hover over it
          if (isExist.status === -1) {

          } else if (isExist.status === 0) {
            driver.execute(function() { window.scrollBy(0, 200); }, []);
            driver.pause(1000);
            driver.moveToElement(elem, 5, 5);
            // Validate that when hovering on 'sold out' card, the checkbox is not presented
            driver.useCss();
            driver.waitForElementNotPresent('.hotel-list-item-wrapper:nth-child(' + (i + 1) + ') li.hotel-result-card .cwt-checkbox', 1000);
          }
        });
      }
    });
*/
  },

  'step 4.3 - Result Page - List View - Select hotels for comparison: Select one of the hotels for comparison' : (driver) => {
    driver.elements('css selector', '.hotel-list-item-wrapper li.hotel-result-card .cwt-checkbox', function (elements) {
      for (let i=0; i < elements.value.length ; i++ ) {
        let elem = '.hotel-list-item-wrapper:nth-child(' + (i + 1) + ') li.hotel-result-card .cwt-checkbox';
        driver.element('css selector', elem , (isExist) => {
          // if element is not exist, do nothing else hover over it
          if (isExist.status === -1) {

          } else if (isExist.status === 0) {
            driver.execute(function() { window.scrollBy(0, 200); }, []);
            driver.pause(1000);
            // click on comparison checkbox
            driver.moveToElement(elem, 5, 5);
            driver.pause(200);
            driver.mouseButtonDown(0);
            driver.pause(100);
            driver.mouseButtonUp(0);
            driver.pause(100);
          }
        });
      }
      // Check if comparison panel is displayed (if class name EQUALS [hotels-compare-banner] and not only CONTAIN - it should have 'hide' class
      driver.pause(2000);
      driver.useCss();
      driver.waitForElementVisible('.hotels-compare-banner');
      driver.assert.attributeEquals('.hotels-compare-banner', 'class', 'hotels-compare-banner');
    });
  },

  'step 5 - Result Page - List View - Show more link:' : (driver) => {
    // Search for location
    driver.waitAndSetValueByCss('.hotel-search-panel .places-auto-complete .Select-control input', 'london');
    driver.pause(2000);
    // Select the first option in the results
    driver.waitAndClickByCss('#cities-1');
    // Select dates (using 2 days)
    driver.selectSpecificHotelDates(12, 14);
    // Click on find button
    driver.waitAndClickByCss('#nw-search-hotel');
    driver.pause(12000);

    // scroll to 'show more' button
    driver.moveToElement('.hotels-show-more-btn', 10, 10);
    // Validate 'show more' button
    driver.waitForTextByCss('.hotels-show-more-btn', 'Show More');
    driver.pause(4000);

    // Save in a variable the number of cards before clicking on 'show more' button
    driver.elements('css selector', '.hotel-list-item-wrapper', function (elements) {
      cardsNumber = elements.value.length;
    });
    // Checking that the number of hotel cards is equal to the 25
    driver.timeoutsAsyncScript(20000, function() {
      driver.assert.equal(cardsNumber, 25);
    });

    // Click 'show more' button
    driver.waitAndClickByCss('.hotels-show-more-btn');
    driver.pause(3000);

    // Save in a variable the number of cards before clicking on 'show more' button
    driver.elements('css selector', '.hotel-list-item-wrapper', function (elements) {
      cardsNumberUpdated = elements.value.length;
    });
    // Checking that the number of hotel cards is equal to the 25
    driver.timeoutsAsyncScript(20000, function() {
      driver.assert.equal(cardsNumberUpdated, 50);
    });

    // scroll again to validate 'show more' button
    driver.moveToElement('.hotels-show-more-btn', 10, 10);
    // Validate 'show more' button still appear
    driver.waitForTextByCss('.hotels-show-more-btn', 'Show More');
    driver.pause(2000);

    // Click on find button
    driver.waitAndClickByCss('#nw-search-hotel');
    driver.pause(2000);

    // filter for 5 - 10 results
    driver.waitAndSetValueByCss('.icon-text-field.input-group input', 'mont');
    driver.pause(2000);

    // Validate that 'show more' is not presented
    driver.useCss();
    driver.waitForElementNotPresent('.hotels-show-more-btn', 1000);
    driver.pause(2000);

    // Search for location with less than 25 hotels
    driver.waitAndSetValueByCss('.hotel-search-panel .places-auto-complete .Select-control input', 'beersheba israel');
    driver.pause(2000);
    // Select the first option in the results
    driver.waitAndClickByCss('#cities-1');
    // Select dates (using 2 days)
    driver.selectSpecificHotelDates(12, 14);
    // Click on find button
    driver.waitAndClickByCss('#nw-search-hotel');
    driver.pause(4000);

    // Validate that 'show more' is not presented
    driver.useCss();
    driver.waitForElementNotPresent('.hotels-show-more-btn', 1000);
  },

};