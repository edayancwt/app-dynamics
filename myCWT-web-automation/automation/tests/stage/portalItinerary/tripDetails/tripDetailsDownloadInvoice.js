'use strict';

module.exports = {

  '@tags': ['download', 'invoice'],

  before: function (driver) {
    driver.windowMaximize();
  },

  'step 1 - login': (driver) => {
    const login = driver.page.login();
    login.fillLoginDetails(driver.globals.users.portalUser47);
  },

//   ---------------------------------- Trip with download invoice ----------------------------------

  'step 1 - Navigate to trip with download invoice': (driver) => {
    driver.waitAndClick('#layout_3');
    driver.useXpath();
    driver.waitAndClick('//*[@id="my-trips"]/div/div[1]/ul/li/div/div[1]');
  },

  'step 2 - Click on download invoice': (driver) => {
    driver.pause(1000);
    driver.waitAndClick('//*[@id="header-download-invoice-link"]/button');
  },

  'step 3 - Validate PDF open': (driver) => {
    driver.pause(4000);
    driver.switchToTab(1);
    // Validate second tab URL
    driver.waitForUrlToContain('travel.stage-mycwt.com/cbr-proxy/v1/download', 20000);
    // Close second tab
    driver.closeWindow();
    driver.pause(1000);
    // Switch back to the first tab [0]
    driver.switchToTab(0);
  },

//   ---------------------------------- Trip with no download invoice ----------------------------------

  'step 4 - Navigate to trip with no download invoice': (driver) => {
    driver.useCss();
    driver.waitAndClick('#layout_3');
    driver.useXpath();
    driver.waitAndClick('//*[@id="my-trips"]/div/div[1]/ul/li[1]/div/div[1]');
  },

  'step 5 - Validate download invoice button display disabled': (driver) => {
    driver.waitForAttributeContains('//*[@id="header-download-invoice-link"]/button', 'class', 'download-itinerary-btn disabled');
  },

  'step 6 - Logout' : (driver) => {
    driver.page.logout().logout();
  },

};