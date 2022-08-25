"use strict";

let tripDaysStart = "";
let tripDaysEnd = "";
let minRoomPrice = "";
let dayOnePrice = "";
let dayTwoPrice = "";
let totalPrice = "";
let selectedCity = "warsaw";
let selectedHotel = "Hit";

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

  "step 2 - Validate home booking panel - Required fields": driver => {
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
    selectDate(driver, from);
    selectDate(driver, to);

    // Click on find button
    driver.click("[data-testid=search-bar-search-btn]");
  },

  //    ----------------------------------Sanity, Room selection page ----------------------------------

  "step 3 -  Room selection page": driver => {
    // Filter  using 'hotel name' input
    driver.waitAndSetValueByCss(
      ".icon-text-field.input-group input",
      selectedHotel
    );
    driver.waitAndClickByCss("#hotel-card-HH120384 .hotel-result-card a");
    driver.pause(3000);
    // Validate Room selection page URL
    driver.waitForUrlToContain(
      "travel.stage-mycwt.com/book-a-hotel#/hotel-details",
      20000
    );
    // Separate the number of the price from the string
    driver.execute(
      function(minRoomPrice) {
        minRoomPrice = parseFloat(minRoomPrice.match(/[\d\.]+/));
        return minRoomPrice;
      },
      [minRoomPrice],
      function(result) {
        minRoomPrice = result.value;
      }
    );
    // Click 'book room'
    driver.pause(3000);
    driver.waitAndClickByXpath(
      '//*[@id="additionalRooms"]/div/div[2]/div[1]/div[3]/button'
    );
    driver.pause(1000);
    // Validate Room selection --> Checkout page URL
    driver.waitForUrlToContain(
      "travel.stage-mycwt.com/book-a-hotel#/hotel-details/checkout",
      20000
    );
  },

  //    ----------------------------------Sanity, Finalize page ----------------------------------

  "step 4 -  Finalize page": driver => {
    // PRICE BREAKDOWN
    // Save day 1 & 2 price from the PRICE BREAKDOWN
    driver.useCss();
    driver.getText(
      "div.checkout__estimated-cost > table > tbody > tr:nth-child(4) > td.ledger__amount > span",
      function(result) {
        dayTwoPrice = result.value;
      }
    );
    driver.getText(
      "div.checkout__estimated-cost > table > tbody > tr:nth-child(3) > td.ledger__amount > span",
      function(result) {
        dayOnePrice = result.value;
      }
    );
    // Save total price from the PRICE BREAKDOWN
    driver.getText(
      "div.checkout__estimated-cost > table > tfoot > tr > td > div > div.big-price__wrapper > div.big-price__amount > span",
      function(result) {
        totalPrice = result.value;
      }
    );
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
    // Breakfast
    // TODO: Breakfast - will be fill when mock data will be ready
    // driver.waitForTextByCss('ul.rules li:nth-child(1) .rules__rule-lbl', 'breakfast');
    // TODO: change text when mock data will be ready
    driver.waitForTextByCss(
      "ul.rules li:nth-child(1) .text-toggle-expander-wrapper",
      " "
    );
    // Policies
    driver.waitForTextByCss(
      "ul.rules li:nth-child(2) .rules__rule-lbl",
      "policies"
    );
    // TODO: change text when mock data will be ready
    driver.waitForTextByCss(
      "ul.rules li:nth-child(2) .text-toggle-expander-wrapper",
      " "
    );
    // Additional info
    driver.waitForTextByCss(
      "ul.rules li:nth-child(3) .rules__rule-lbl",
      "additional info"
    );
    // Click 'Read More' button
    driver.waitAndClickByCss(".toggle-btn");
    driver.pause(1000);
    // TODO: change text when mock data will be ready
    driver.waitForTextByCss(
      "ul.rules li:nth-child(3) .text-toggle-expander-wrapper",
      " "
    );
    // click Payment Information select box
    driver.useCss();
    driver.moveToElement("#react-select-4--value-item", 10, 10);
    driver.pause(200);
    driver.mouseButtonDown(0);
    driver.pause(200);
    driver.mouseButtonUp(0);
    driver.pause(700);
    // select 'Book with a new card' option
    driver.useCss();
    driver.moveToElement(".Select-option.new-card", 10, 10);
    driver.pause(200);
    driver.mouseButtonDown(0);
    driver.pause(200);
    driver.mouseButtonUp(0);
    driver.pause(200);

    // Click 'Finalize Booking' button without filling fields
    driver.waitAndClickByCss(".main-cwt-button");

    // Validate required fields marked
    // Card type
    driver.waitForAttributeContainsByXpath(
      '//*[@id="shell"]/div[2]/div/section/div/div[2]/div/div/section/div[3]/div[2]/form/div[1]/fieldset/div/div[1]/div/div[2]/div/div/div',
      "class",
      "field-validator-children"
    );
    // Card Number
    driver.waitForAttributeContainsByXpath(
      '//*[@id="shell"]/div[2]/div/section/div/div[2]/div/div/section/div[3]/div[2]/form/div[1]/fieldset/div/div[1]/div/div[3]/div/div/div',
      "class",
      "field-validator-children"
    );
    // Exp. date fields
    driver.waitForAttributeContainsByXpath(
      '//*[@id="shell"]/div[2]/div/section/div/div[2]/div/div/section/div[3]/div[2]/form/div[1]/fieldset/div/div[2]/div[1]/div[2]/div/div/div',
      "class",
      "field-validator-children"
    );
    driver.waitForAttributeContainsByXpath(
      '//*[@id="shell"]/div[2]/div/section/div/div[2]/div/div/section/div[3]/div[2]/form/div[1]/fieldset/div/div[2]/div[1]/div[3]/div/div/div',
      "class",
      "field-validator-children"
    );
    // Separate the number of the price from the string
    driver.execute(
      function(dayOnePrice) {
        dayOnePrice = parseFloat(dayOnePrice.match(/[\d\.]+/));
        return dayOnePrice;
      },
      [dayOnePrice],
      function() {
        dayOnePrice = parseFloat(dayOnePrice.match(/[\d\.]+/));
      }
    );

    driver.execute(
      function(dayTwoPrice) {
        dayTwoPrice = parseFloat(dayTwoPrice.match(/[\d\.]+/));
        return dayTwoPrice;
      },
      [dayTwoPrice],
      function() {
        dayTwoPrice = parseFloat(dayTwoPrice.match(/[\d\.]+/));
      }
    );

    driver.execute(
      function(totalPrice) {
        totalPrice = parseFloat(totalPrice.match(/[\d\.]+/));
        return totalPrice;
      },
      [totalPrice],
      function() {
        totalPrice = parseFloat(totalPrice.match(/[\d\.]+/));
      }
    );

    // // Validate that the total price is equal to dayOnePrice + dayTwoPrice in PRICE BREAKDOWN      //TODO: validate only when mock is up
    // driver.timeoutsAsyncScript(20000, function() {
    //   driver.assert.equal(dayOnePrice + dayTwoPrice, totalPrice);
    // });
  }
};
