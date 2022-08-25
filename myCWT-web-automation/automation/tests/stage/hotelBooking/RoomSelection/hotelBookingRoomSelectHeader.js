'use strict';

let tripDaysStart = '';
let tripDaysEnd = '';
let mainImageUrl = 'https://q-xx.bstatic.com/xdata/images/hotel/max300/67465255.jpg?k=4d4193788c8ca3203a8e3b78999d6d3a92fdb8c0e2ed715f9521fe653a1f3656&o=';
let imagesNumber;

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
    driver.waitAndClickByCss('.Select .Select-option:nth-child(1)');
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
    // Validate booking page URL
     driver.waitForUrlToContain('travel.stage-mycwt.com/group/selenium-sub-3-selenium-top/book-a-hotel#/hotel-results', 20000);
     // Wait for hotel results to load
     driver.pause(12000);

    // Filter  using 'hotel name' input
    driver.waitAndSetValueByCss('.icon-text-field.input-group input', 'hit');
    driver.waitAndClickByCss('#hotel-card-HH120384 .hotel-result-card a');
    driver.pause(3000);
    // Validate Room selection page URL
    driver.waitForUrlToContain('travel.stage-mycwt.com/group/selenium-sub-3-selenium-top/book-a-hotel#/hotel-details', 20000);
  },

  //    ----------------------------------Sanity, Room selection page - Header ----------------------------------

  'step 3 -  Room selection page - Header: Hotel photos' : (driver) => {
    // Validate that header's image is the same as on the card (previous page)
    driver.useCss();
    driver.assert.attributeContains('div.header-background > img', 'src', mainImageUrl);
    // Click 'hotel photos button'
    driver.waitAndClickByCss('.hotel-details-open-gallery-button');
    driver.pause(300);
    // Validate photos hotel modal is open
    driver.waitForAttributeContainsByCss('.ReactModalPortal', 'class', 'ReactModalPortal');
    // get the number images
    driver.getText('.ril-caption-content', function (result) {
      let str = result.value.split('/');
      imagesNumber = parseInt(str[1]);
    });
    // Navigate through images
    driver.perform(function () {
      for (let i = 0; i < imagesNumber; i++) {
        driver.waitAndClickByCss('.ril-next-button');
      }
    });
    // Zoom in on pictures
    driver.waitAndClickByCss('.ril-zoom-in');
    driver.pause(300);
    // Zoom out on pictures
    driver.waitAndClickByCss('.ril-zoom-out');
    driver.pause(300);
    // close 'hotel photos'
    driver.waitAndClickByCss('.ril-close ');
    driver.pause(1000);
  },

  'step 4 -  Room selection page - Header: Header data' : (driver) => {
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

  'step 4.1 -  Room selection page - Header: Header data after update' : (driver) => {
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

  'step 5 -  Room selection page - Header: Header collapsed/expand' : (driver) => {
    // scroll down in order to change header state
    driver.execute(function() { window.scrollBy(0, 750); }, []);
    driver.pause(1500);
    // Validate that image is not visible (aka opacity is 0)
    driver.assert.cssProperty('.header-background', 'opacity', '0');
    driver.pause(2000);
    // scroll up in order to change header state
    driver.execute(function() { window.scrollBy(0, -750); }, []);
    driver.pause(1500);
    // Validate that image is  visible (aka opacity is 1)
    driver.assert.cssProperty('.header-background', 'opacity', '1');
  },

};