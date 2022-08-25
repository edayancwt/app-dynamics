"use strict";

let tripDaysStart = "";
let tripDaysEnd = "";
let e2eDayTwoPrice = "";
let e2eDayOnePrice = "";
let e2eTotalPrice = "";
let selectedCity = "warsaw";
let selectedHotel = "hit";

const moment = require("moment");
const { selectDate } = require("./selectDate");
const from = moment();
const to = moment().add(2, "days");

module.exports = {
  "@tags": ["hotel", "booking", "sanity"],

  before: function(driver) {
    driver.resizeWindow(1920, 1020);
    driver.windowMaximize();
    driver.globals.waitForConditionTimeout = 50000;
  },

  "step 1 - login to portal": driver => {
    const login = driver.page.login();
    login.fillLoginDetails(driver.globals.users.portalUser58);
  },

  "step 2 - E2E - Case 1": driver => {
    // Search for location
    driver.waitForElementPresent('[class*="TabsBar"] button:nth-of-type(2)');
    driver.waitForElementVisible('[class*="TabsBar"] button:nth-of-type(2)');
    driver.pause(1000);
    driver.click('[class*="TabsBar"] button:nth-of-type(2)');
    driver.waitAndSetValueByCss(
      "[data-testid=search-bar-location] input",
      selectedCity
    );

    // Select the first option in the results
    driver.waitForElementVisible(
      '[class*="menu"] [id*="react-select"]:nth-of-type(1)'
    );
    driver.click('[class*="menu"] [id*="react-select"]:nth-of-type(1)');

    // Select dates
    driver.keys([driver.Keys.TAB]);
    // driver.waitAndSetValueByCss(
    //   "#cwt-date-range-start-date",
    //   homePageStartDate
    // );
    selectDate(driver, from);

    // driver.keys([driver.Keys.TAB]);
    // driver.waitAndSetValueByCss("#cwt-date-range-end-date", homePageEndDate);
    selectDate(driver, to);

    // Click on find button
    driver.click("[data-testid=search-bar-search-btn]");

    // Validate booking page URL
    driver.waitForUrlToContain(
      "travel.stage-mycwt.com/book-a-hotel#/hotel-results",
      20000
    );
    // Filter  using 'hotel name' input
    driver.waitAndClickByCss(".icon-text-field.input-group input");
    driver.pause(1000);
    driver.waitAndSetValueByCss(
      ".icon-text-field.input-group input",
      selectedHotel
    );

    driver.waitAndClickByCss("#hotel-result-card-image");
    // Click on 'show room details' button
    // driver.waitAndClickByXpath('//*[@id="additionalRooms"]/div/div[2]/div[1]/div[1]/div[2]/div/button');
    driver.waitAndClickByCss(
      "[class^=hotel-rooms-list] div[id^=additionalRooms] div[class^=hotel-room-item] div[class^=room-desc-panel] div[class^=desc-wrapper] div[class^=room-footer] div[class^=room-view-more] button[class^=show-more]"
    );

    driver.pause(1000);
    // Click 'book room'
    // driver.waitAndClickByXpath('//*[@id="additionalRooms"]/div/div[2]/div[1]/div[3]/button/span/span');
    driver.waitAndClickByCss(
      "[class^=hotel-rooms-list] div[id^=additionalRooms] div[class^=hotel-room-item] div[class^=room-desc-panel] div[class^=price-wrapper] button[class^=main-cwt-button]"
    );

    // Validate Room selection --> Checkout page URL
    driver.waitForUrlToContain(
      "travel.stage-mycwt.com/book-a-hotel#/hotel-details/checkout",
      20000
    );

    // Save day 1 & 2 price from the PRICE BREAKDOWN
    driver.useCss();
    driver.getText(
      "div.checkout__estimated-cost > table > tbody > tr:nth-child(4) > td.ledger__amount > span",
      function(result) {
        e2eDayTwoPrice = result.value;
      }
    );
    driver.getText(
      "div.checkout__estimated-cost > table > tbody > tr:nth-child(3) > td.ledger__amount > span",
      function(result) {
        e2eDayOnePrice = result.value;
      }
    );
    // Save total price from the PRICE BREAKDOWN
    driver.getText(
      "div.checkout__estimated-cost > table > tfoot > tr > td > div > div.big-price__wrapper > div.big-price__amount > span",
      function(result) {
        e2eTotalPrice = result.value;
      }
    );

    // Separate the number of the price from the string
    driver.execute(
      function(e2eDayOnePrice) {
        e2eDayOnePrice = parseFloat(e2eDayOnePrice.match(/[\d\.]+/));
        return e2eDayOnePrice;
      },
      [e2eDayOnePrice],
      function() {
        e2eDayOnePrice = parseFloat(e2eDayOnePrice.match(/[\d\.]+/));
      }
    );

    driver.execute(
      function(e2eDayTwoPrice) {
        e2eDayTwoPrice = parseFloat(e2eDayTwoPrice.match(/[\d\.]+/));
        return e2eDayTwoPrice;
      },
      [e2eDayTwoPrice],
      function() {
        e2eDayTwoPrice = parseFloat(e2eDayTwoPrice.match(/[\d\.]+/));
      }
    );

    driver.execute(
      function(e2eTotalPrice) {
        e2eTotalPrice = parseFloat(e2eTotalPrice.match(/[\d\.]+/));
        return e2eTotalPrice;
      },
      [e2eTotalPrice],
      function() {
        e2eTotalPrice = parseFloat(e2eTotalPrice.match(/[\d\.]+/));
      }
    );

    // Validate that the total price is equal to dayOnePrice + dayTwoPrice in PRICE BREAKDOWN
    driver.timeoutsAsyncScript(20000, function() {
      driver.assert.equal(e2eDayOnePrice + e2eDayTwoPrice, e2eTotalPrice);
    });

    // Validate hotel details
    // room type
    driver.waitForTextByCss(".room-type", "Room");
    // room description
    // driver.waitForTextByCss('.room-description', 'Corporate');   // TODO: validate when mock is up
    // room attributes
    // TODO: Breakfast - will be fill when mock data will be ready ('Refundable'/'Loyalty benefits apply'/'Breakfast included')
    driver.waitForTextByCss(
      ".room-description-footer .room-attributes ul li:first-child label",
      " "
    );
    driver.waitForTextByCss(
      ".room-description-footer .room-attributes ul li:nth-child(2) label",
      " "
    );
    driver.waitForTextByCss(
      ".room-description-footer .room-attributes ul li:last-child label",
      " "
    );
    // room details
    // Policies
    // TODO: change text when mock data will be ready (The order changes all the time - Should be Breakfast/Policies/Additional info)
    //  driver.waitForTextByCss('ul.rules li:nth-child(1) .rules__rule-lbl', ' ');
    //  driver.waitForTextByCss('ul.rules li:nth-child(1) .text-toggle-expander-wrapper', ' ');
    // Additional info
    //  driver.waitForTextByCss('ul.rules li:nth-child(2) .rules__rule-lbl', 'additional info');
    // Validate header section
    // Hotel name
    driver.waitForTextByCss(".logo-top-name", "Hit Hors");
    // Class
    driver.waitForAttributeContainsByXpath(
      '//*[@id="container-fluid hotel-header"]/div[2]/div[1]/span[1]/div',
      "class",
      "dv-star-rating dv-star-rating-non-editable"
    );
    // no. days
    driver.waitForTextByCss(".days-summary span:nth-child(2)", "2 NIGHTS");
    driver.waitForTextByCss(".dates-details span:nth-child(2)", tripDaysStart);
    driver.waitForTextByCss(".dates-details span:nth-child(4)", tripDaysEnd);
    driver.pause(2000);
  },

  "step 3 - E2E - Case 2": driver => {
    // Click "BOOK A HOTEL" on navbar
    driver.waitForElementPresent("[data-testid=header-navigation-bookHotel]");
    driver.pause(1000);
    driver.waitAndClickByCss("[data-testid=header-navigation-bookHotel]");

    // Validate book a hotel page URL
    driver.waitForUrlToContain("travel.stage-mycwt.com/book-a-hotel#/", 20000);

    driver.waitForElementPresent(
      ".hotel-search-panel .places-auto-complete .Select-control input"
    );

    driver.pause(2000);
    // Search for location
    driver.waitAndSetValueByCss(
      ".hotel-search-panel .places-auto-complete .Select-control input",
      selectedCity
    );

    driver.pause(2000);

    // Select the first option in the results
    // driver.waitAndClickByCss('#cities-1');
    driver.keys([driver.Keys.ENTER]);

    // Select dates
    driver.waitAndClickByCss(
      "#DateInput__screen-reader-message-start-date-input"
    );
    selectDate(driver, from);
    selectDate(driver, to);

    // Select dates (using 2 days)
    // driver.selectSpecificHotelDates(12, 14);
    // Click on find button
    driver.waitAndClickByCss("#nw-search-hotel");

    // Validate book a hotel page URL
    driver.waitForUrlToContain(
      "travel.stage-mycwt.com/book-a-hotel#/hotel-results",
      20000
    );

    // Filter  using 'HOTEL CLASS'
    driver.waitAndClickByCss(
      ".list-unstyled li.hotel-star-rate-option:nth-child(4) .cwt-checkbox input"
    );
    driver.pause(1000);
    // Filter  using 'hotel name' input
    driver.waitAndSetValueByCss(
      ".icon-text-field.input-group input",
      selectedHotel
    );
    driver.pause(1000);
    // select a hotel
    driver.waitAndClickByCss("#hotel-card-HH120384 .hotel-result-card a");
    driver.pause(1000);
    // Click on 'show room details' button
    driver.waitAndClickByCss(
      "#additionalRooms > div > div:nth-child(2) > div.room-desc-panel > div.desc-wrapper > div.room-footer.col-lg-12.col-md-12.col-xs-12 > div > button"
    );
    // Click 'book room'
    driver.waitAndClickByXpath(
      '//*[@id="additionalRooms"]/div/div[2]/div[1]/div[3]/button'
    );
    // Validate Room selection --> Checkout page URL
    driver.waitForUrlToContain(
      "travel.stage-mycwt.com/book-a-hotel#/hotel-details/checkout",
      20000
    );

    // Save day 1 & 2 price from the PRICE BREAKDOWN
    driver.useCss();
    driver.getText(
      "div.checkout__estimated-cost > table > tbody > tr:nth-child(4) > td.ledger__amount > span",
      function(result) {
        e2eDayTwoPrice = result.value;
      }
    );
    driver.useCss();
    driver.getText(
      "div.checkout__estimated-cost > table > tbody > tr:nth-child(3) > td.ledger__amount > span",
      function(result) {
        e2eDayOnePrice = result.value;
      }
    );
    // Save total price from the PRICE BREAKDOWN
    driver.useCss();
    driver.getText(
      "div.checkout__estimated-cost > table > tfoot > tr > td > div > div.big-price__wrapper > div.big-price__amount > span",
      function(result) {
        e2eTotalPrice = result.value;
      }
    );

    // Separate the number of the price from the string
    driver.execute(
      function(e2eDayOnePrice) {
        e2eDayOnePrice = parseFloat(e2eDayOnePrice.match(/[\d\.]+/));
        return e2eDayOnePrice;
      },
      [e2eDayOnePrice],
      function() {
        e2eDayOnePrice = parseFloat(e2eDayOnePrice.match(/[\d\.]+/));
      }
    );

    driver.execute(
      function(e2eDayTwoPrice) {
        e2eDayTwoPrice = parseFloat(e2eDayTwoPrice.match(/[\d\.]+/));
        return e2eDayTwoPrice;
      },
      [e2eDayTwoPrice],
      function() {
        e2eDayTwoPrice = parseFloat(e2eDayTwoPrice.match(/[\d\.]+/));
      }
    );

    driver.execute(
      function(e2eTotalPrice) {
        e2eTotalPrice = parseFloat(e2eTotalPrice.match(/[\d\.]+/));
        return e2eTotalPrice;
      },
      [e2eTotalPrice],
      function() {
        e2eTotalPrice = parseFloat(e2eTotalPrice.match(/[\d\.]+/));
      }
    );

    // Validate that the total price is equal to dayOnePrice + dayTwoPrice in PRICE BREAKDOWN
    driver.timeoutsAsyncScript(20000, function() {
      driver.assert.equal(e2eDayOnePrice + e2eDayTwoPrice, e2eTotalPrice);
    });

    // Validate hotel details
    // room type
    driver.waitForTextByCss(".room-type", "Room");
    // room description
    // TODO: change text when mock data will be ready
    driver.waitForTextByCss(".room-description", " ");
    // room attributes
    // TODO: Breakfast - will be fill when mock data will be ready ('Refundable'/'Loyalty benefits apply'/'Breakfast included')
    driver.waitForTextByCss(
      ".room-description-footer .room-attributes ul li:first-child label",
      " "
    );
    driver.waitForTextByCss(
      ".room-description-footer .room-attributes ul li:nth-child(2) label",
      " "
    );
    driver.waitForTextByCss(
      ".room-description-footer .room-attributes ul li:last-child label",
      " "
    );
    // room details
    // TODO: change text when mock data will be ready (The order changes all the time - Should be Breakfast/Policies/Additional info)
    // Breakfast
    // driver.waitForTextByCss('ul.rules li:nth-child(1) .rules__rule-lbl', 'breakfast');
    //driver.waitForTextByCss('ul.rules li:nth-child(1) .text-toggle-expander-wrapper', ' ');
    // Policies
    //driver.waitForTextByCss('ul.rules li:nth-child(2) .rules__rule-lbl', 'policies');
    //driver.waitForTextByCss('ul.rules li:nth-child(2) .text-toggle-expander-wrapper', ' ');
    // Additional info
    //driver.waitForTextByCss('ul.rules li:nth-child(3) .rules__rule-lbl', 'additional info');
    // Validate header section
    // Hotel name
    driver.waitForTextByCss(".logo-top-name", "Hit Hors");
    // Class
    driver.waitForAttributeContainsByXpath(
      '//*[@id="container-fluid hotel-header"]/div[2]/div[1]/span[1]/div',
      "class",
      "dv-star-rating dv-star-rating-non-editable"
    );
    // no. days
    driver.waitForTextByCss(".days-summary span:nth-child(2)", "2 NIGHTS");
    driver.waitForTextByCss(".dates-details span:nth-child(2)", tripDaysStart);
    driver.waitForTextByCss(".dates-details span:nth-child(4)", tripDaysEnd);
  }
};
