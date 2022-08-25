'use strict';

module.exports = {

  '@tags': ['download', 'itinerary'],

  before: function (driver) {
    driver.windowMaximize();
  },

  'step 1 - login': (driver) => {
    const login = driver.page.login();
    login.fillLoginDetails(driver.globals.users.portalUser43);
  },

//   ---------------------------------- Trip with single download itinerary ----------------------------------

  'step 1 - Navigate to trip with download itinerary': (driver) => {
    driver.waitAndClick('#layout_2');
    driver.useXpath();
    driver.waitAndClick('//*[@id="my-trips"]/div/div[1]/ul/li[2]/div/div[1]');
  },

  'step 2 - Click on download itinerary button': (driver) => {
    driver.useCss();
    driver.pause(1000);
    driver.waitAndClick('[data-id=action-download-button]');
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

//   ---------------------------------- Trip with no download itinerary ----------------------------------

  'step 4 - Navigate to trip with no download itinerary': (driver) => {
    driver.useCss();
    driver.waitAndClick('#layout_2');
    driver.useXpath();
    driver.waitAndClick('//*[@id="my-trips"]/div/div[1]/ul/li[1]/div/div[1]');
  },

  'step 5 - Validate download itinerary button display disabled': (driver) => {
    driver.waitForAttributeContains('//*[@id="tripDetails"]/div[1]/div[1]/div[2]/ul/li[2]/button', 'class', 'download-itinerary-btn disabled');
  },

  'step 5.1 - Logout' : (driver) => {
    driver.page.logout().logout();
  },

//   ---------------------------------- Trip with multiple download itinerary ----------------------------------

  // 'step 6 - login': (driver) => {
  //   const login = driver.page.login();
  //   login.fillLoginDetails(driver.globals.users.portalUser44);
  // },
  //
  // 'step 7 - Navigate to trip with download itinerary': (driver) => {
  //   driver.useCss();
  //   driver.waitAndClick('#layout_2');
  //   driver.useXpath();
  //   driver.waitAndClick('//*[@id="my-trips"]/div/div[1]/ul/li[2]/div/div[1]');
  // },
  //
  // 'step 8 - Click on download itinerary button': (driver) => {
  //   driver.useCss();
  //   driver.pause(1000);
  //   driver.waitAndClick('[data-id=action-download-button]');
  // },
  //
  // 'step 9 - validate download dialog open': (driver) => {
  //   driver.useXpath();
  //   // Titles
  //   driver.waitForText('//*[@id="itinerary-download-popover"]/div[2]/div/div[1]/div[1]', 'RESERVATIONS');
  //   driver.waitForText('//*[@id="itinerary-download-popover"]/div[2]/div/div[1]/div[2]', 'DOWNLOAD');

    //TODO: cannot be tested until multiple PDFs will be presented in a fixed order (now its random order)
    // First PDF
    // driver.waitForText('//*[@id="itinerary-download-popover"]/div[2]/div/div[2]/div[1]', 'YHPNPG2');
    // driver.waitForText('//*[@id="itinerary-download-popover"]/div[2]/div/div[2]/div[2]', 'N/A');
    // // Second PDF
    // driver.waitForText('//*[@id="itinerary-download-popover"]/div[2]/div/div[3]/div[1]', 'YHPNPG');
    // driver.waitForAttributeContains('//*[@id="itinerary-download-popover"]/div[2]/div/div[3]/div[2]/button/i', 'class', 'cwt-icon-download');
  // },

};