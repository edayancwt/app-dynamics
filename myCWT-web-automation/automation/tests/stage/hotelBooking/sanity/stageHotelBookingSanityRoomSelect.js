"use strict";

let tripDaysStart = "";
let tripDaysEnd = "";
let minRoomPrice = "";
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
    // Validate booking page
    driver.waitForElementPresent('[class="hotel-result-cards"]');
    driver.assert.urlContains(
      "travel.stage-mycwt.com/book-a-hotel#/hotel-results"
    );

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
    // Validate Room selection header section
    driver.pause(2000);
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
    // Click 'hotel photos button'
    driver.waitAndClickByCss(".hotel-details-open-gallery-button");
    driver.pause(300);
    // Validate photos hotel modal is open
    driver.waitForAttributeContainsByCss(
      ".ReactModalPortal",
      "class",
      "ReactModalPortal"
    );
    // Click 'hotel photos button'
    driver.waitAndClickByCss(".ril-close ");
    driver.pause(1000);
    driver.keys([driver.Keys.ESCAPE]);
    // Validate pin hotel
    driver.waitForElementVisible(".pin.hotel", "class", "pin hotel");
    // Validate hotel address
    driver.waitForTextByCss(
      ".map-distance-helper",
      "Ulica Ks Ignacego Klopotowskiego 33, Warsaw, 03720, Poland"
    );
    // Validate hotel services
    driver.waitForTextByCss(".cwt-icons-paid-parking + label", "PARKING");
    driver.waitForTextByCss(
      ".cwt-icons-business-center + label",
      "BUSINESS CENTER"
    );
    driver.pause(300);
    // opening/closing Description
    driver.waitAndClickByCss("ul.hotel-paragraphs li:nth-child(1)");
    driver.pause(2000);
    driver.waitAndClickByCss("ul.hotel-paragraphs li:nth-child(1)");
    driver.pause(2000);
    // opening/closing Hotel Location
    driver.waitAndClickByCss("ul.hotel-paragraphs li:nth-child(2)");
    driver.pause(2000);
    driver.waitAndClickByCss("ul.hotel-paragraphs li:nth-child(2)");
    driver.pause(2000);
    // opening/closing Hotel Policy
    driver.waitAndClickByCss("ul.hotel-paragraphs li:nth-child(3)");
    driver.pause(2000);
    driver.waitAndClickByCss("ul.hotel-paragraphs li:nth-child(3)");
    driver.pause(2000);
    // Validate Room banner
    // Header
    driver.waitForTextByCss(
      ".hotel-room-item:nth-of-type(2) .room-type",
      "Room"
    );
    // Policy
    // driver.waitForTextByCss('span.in-policy span', 'IN - POLICY');
    // Currency
    driver.waitForTextByCss("span.price", "PLN");
    // Per Night + Taxes
    driver.waitForTextByCss(
      ".per-night-with-taxes .per-night-label span",
      "Per night"
    );
    driver.waitForTextByCss(
      ".per-night-with-taxes .tax-included-label span",
      "Includes taxes"
    );
    // Attribute section
    // TODO: Breakfast - will be fill when mock data will be ready ('Refundable'/'Loyalty benefits apply'/'Breakfast included')
    driver.waitForTextByXpath(
      '//*[@id="additionalRooms"]/div/div[2]/div[1]/div[2]/div/ul/li[1]/label',
      " "
    );
    driver.waitForTextByXpath(
      '//*[@id="additionalRooms"]/div/div[2]/div[1]/div[2]/div/ul/li[2]/label',
      " "
    );
    driver.waitForTextByXpath(
      '//*[@id="additionalRooms"]/div/div[2]/div[1]/div[2]/div/ul/li[3]/label',
      " "
    );
    // opening/closing Room Details and Validate details
    driver.waitAndClickByXpath(
      '//*[@id="additionalRooms"]/div/div[2]/div[1]/div[1]/div[2]/div'
    );
    driver.pause(2000);
    // Breakfast
    // TODO: Breakfast - will be fill when mock data will be ready
    //driver.waitForTextByCss('ul.rules li:nth-child(1) .rules__rule-lbl', 'breakfast');
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
    // TODO: change text when mock data will be ready
    driver.waitForTextByCss(
      "ul.rules li:nth-child(3) .text-toggle-expander-wrapper",
      " "
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
    driver.waitAndClickByXpath(
      '//*[@id="additionalRooms"]/div/div[2]/div[1]/div[3]/button'
    );
    // driver.pause(1000);
    // // Validate Room selection --> Checkout page URL
    // driver.waitForUrlToContain('travel.stage-mycwt.com/group/selenium-sub-3-selenium-top/book-a-hotel#/hotel-details/checkout', 20000);
  }
};