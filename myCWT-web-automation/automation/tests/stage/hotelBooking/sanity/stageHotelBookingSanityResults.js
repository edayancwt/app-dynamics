"use strict";
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

  //    ----------------------------------Sanity, Results page ----------------------------------

  "step 2 -  Filter results": driver => {
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

    // Filter  using 'COMPANY PREFERRED'
    driver.waitForTextByCss(
      "div.hotel-result-filter-fields > div:nth-child(4) h2 span",
      "COMPANY PREFERRED"
    );
    driver.waitAndClickByCss("#preferred-checkbox");
    driver.pause(1000);
    driver.waitAndClickByCss("#chk-preferred-checkbox");
    // Filter  using 'NEIGHBOURHOOD'
    // driver.waitForTextByCss('.neighbourhood-section', 'NEIGHBOURHOOD');
    // driver.waitAndClickByCss('.list-unstyled li:last-child .cwt-checkbox input');
    // driver.waitAndClickByCss('.list-unstyled li:last-child .cwt-checkbox input');
    // Filter  using 'HOTEL CLASS'
    driver.waitForTextByCss(".hotel-rates h2 span", "HOTEL CLASS");
    driver.waitAndClickByCss(
      ".list-unstyled li.hotel-star-rate-option:last-child .cwt-checkbox input"
    );
    driver.waitAndClickByCss(
      ".list-unstyled li.hotel-star-rate-option:last-child .cwt-checkbox input"
    );
    // Filter  using 'hotel name' input
    driver.waitAndSetValueByCss(
      ".icon-text-field.input-group input",
      "metropol"
    );
    // use slider
    driver.waitForTextByXpath(
      '//*[@id="sticky-panel"]/div[1]/div[2]/div[3]/h2/span',
      "PRICE"
    );
    driver.usePriceSlider(100, 100);
    // Reset filters
    driver.execute(function() {
      window.scrollBy(0, -600);
    }, []);
    driver.waitAndClickByCss(".pull-right");
    driver.pause(300);
  },

  "step 3 -  Map View": driver => {
    // Filter  using 'hotel name' input
    driver.waitAndSetValueByCss(
      ".icon-text-field.input-group input",
      selectedHotel
    );
    driver.pause(3000);
    // Filter  using 'HOTEL CLASS'
    driver.waitForTextByCss(".hotel-rates h2 span", "HOTEL CLASS");
    // driver.waitAndClickByCss('.list-unstyled li.hotel-star-rate-option:nth-last-child(2) .cwt-checkbox input');
    driver.pause(3000);
    // Scroll up to view button (just in case the element not clicked)
    driver.execute(function() {
      window.scrollBy(0, -600);
    }, []);
    // Click the map button
    driver.waitAndClickByCss("#toggle-btn-wrap .btn.text-uppercase");
    // Validate map is displayed and results view is hidden
    // driver.pause(1500);
    // driver.waitForAttributeContainsByXpath('//*[@id="portlet_hotelmainportlet_WAR_cwtportalportlet"]/div/div/div/div/div/div[2]/div/div[2]/div[3]', 'class', 'hotel-map-results');
    driver.pause(3000);
    // Click on zoom-out
    driver.useCss();
    driver.moveToElement('.H_btn[title="Zoom out"]', 10, 10);
    driver.pause(200);
    driver.mouseButtonDown(0);
    driver.pause(200);
    driver.mouseButtonUp(0);

    // check if the pin or the tooltip with the price display
    driver.element(
      "css selector",
      ".marker.styled-marker.available-pin",
      isExist => {
        if (isExist.status === 0) {
          driver.waitAndClickByCss(".marker.styled-marker.available-pin");
        } else
          driver.waitAndClickByCss(".marker.styled-bubble.available-bubble");
      }
    );

    driver.pause(200);
    driver.mouseButtonDown(0);
    driver.pause(200);
    driver.mouseButtonUp(0);
    driver.pause(200);
    // Click on hotel summery
    driver.pause(3000);
    driver.waitAndClickByCss(".hotel-summary");
    driver.pause(5000);
    // Validate Room selection page URL
    driver.waitForUrlToContain(
      "travel.stage-mycwt.com/book-a-hotel#/hotel-details?checkInDate",
      20000
    );
    // Go back to results page
    driver.back();
    // Click the map button
    driver.waitAndClickByCss("#toggle-btn-wrap .btn.text-uppercase");
    // Validate results is displayed and map view is hidden
    // driver.waitForAttributeContainsByXpath('//*[@id="portlet_hotelmainportlet_WAR_cwtportalportlet"]/div/div/div/div/div/div[2]/div/div[2]/div[2]', 'class', 'hotel-result-cards');
    // driver.pause(2000);
  },

  "step 4 -  Validate Hotel-Banner details": driver => {
    // Filter  using 'hotel name' input
    driver.waitAndSetValueByCss(
      ".icon-text-field.input-group input",
      selectedHotel
    );
    driver.pause(3000);
    // hotel name
    driver.waitForTextByCss("h3.hotel-result-card-header", "Hit Hors");
    // Class
    driver.waitForAttributeContainsByXpath(
      '//*[@id="hotel-card-HH120384"]/li/a/div[2]/div[2]/div[1]',
      "class",
      "hotel-result-card-body-stars-and-popular"
    );
    // Location
    driver.waitForAttributeContainsByXpath(
      '//*[@id="hotel-card-HH120384"]/li/a/div[2]/div[2]/div[2]',
      "class",
      "location-wrapper display-in-two-lines"
    );
    // Policy
    // driver.waitForTextByCss('span.in-policy span', 'IN - POLICY');
    // Currency
    driver.waitForTextByCss("span.price", "PLN");
    driver.pause(2000);
    // Reset filters
    driver.waitAndClickByCss(".pull-right");
    driver.pause(5000);
    // scroll to 'show more' button
    driver.moveToElement(".hotels-show-more-btn", 10, 10);
    // Validate 'show more' button
    driver.waitForTextByCss(".hotels-show-more-btn", "Show More");
    // Click 'show more' button
    driver.waitAndClickByCss(".hotels-show-more-btn");
    driver.pause(3000);
  }
};
