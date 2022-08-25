'use strict';

module.exports = {

  '@tags': ['my', 'trips', 'search'],

  before: function (driver) {
    driver.windowMaximize();
  },

  'step 1 - login to portal': (driver) => {
    const login = driver.page.login();
    login.fillLoginDetails(driver.globals.users.portalUser1);
  },

  'step 2 - Click on my trips link': (driver) => {
    driver.waitAndClickByCss('#layout_2');
  },

  'step 3 - Search for "Santa ana" that exist in the past trips list': (driver) => {
    driver.useXpath();
    driver.waitForElementVisible('//*[@id="my-trips"]/div/div[2]/div[1]/input');
    driver.waitAndSetValueByCss('#my-trips-search-input', 'Santa Ana');
  },

  'step 4 - Validate past trip existing results after search': (driver) => {
    // trip title
    driver.waitForTextByXpath('//*[@id="my-trips"]/div/div[2]/ul/li/div/div/div/div/h3/span', 'Trip to Santa Ana, CA');
    // trips count display 1
    driver.waitForTextByCss('#my-trips-past-trips-title', 'My past trips (1)');
    // search button change to X
    driver.waitForAttributeContainsByCss('#my-trips-past-search-button','class','cwt-icon-remove');
  },

  'step 5 - Click on search clear button': (driver) => {
    driver.waitAndClickByCss('#my-trips-past-search-button');
  },

  'step 6 - Search for "Bla Bla" that does not exist in the past trips list': (driver) => {
    driver.waitAndSetValueByCss('#my-trips-search-input', 'Bla Bla');
  },

  'step 7 - Validate state of no results': (driver) => {
    // trips count change to 0
    driver.waitForTextByCss('#my-trips-past-trips-title', 'My past trips (0)');
    // no result text
    driver.waitForTextByXpath('//*[@id="my-trips"]/div/div[2]/ul/div/figcaption', "No trips found for 'Bla Bla'");
    // suitcase image
    driver.waitForAttributeContainsByXpath('//*[@id="my-trips"]/div/div[2]/ul/div/figure','class','empty-img');
    // search button change to X
    driver.waitForAttributeContainsByCss('#my-trips-past-search-button','class','cwt-icon-remove');
  },

  'step 8 - Logout': (driver) => {
    driver.page.logout().logout();
  },

};