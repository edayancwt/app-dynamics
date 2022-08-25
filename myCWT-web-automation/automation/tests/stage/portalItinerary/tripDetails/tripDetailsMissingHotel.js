'use strict';

module.exports = {

  '@tags': ['trip', 'details', 'missing', 'hotel'],

  before: function (driver) {
    driver.windowMaximize();
  },

  'step 1 - login to portal': (driver) => {
    const login = driver.page.login();
    login.fillLoginDetails(driver.globals.users.portalUser2);
  },

  'step 2 - Navigate to the trip': (driver) => {
    driver.waitAndClick('#layout_2');
    driver.useXpath();
    driver.waitAndClick('//*[@id="my-trips"]/div/div[1]/ul/li/div/div[1]');
  },

  'step 3 - Validate missing hotel starting date': (driver) => {
    driver.useXpath();
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[4]/div/div/p', 'THU, JUN 5');
    driver.scrollToLocation(0, 1087);
  },

  'step 4 - Validate trip details missing hotel icon': (driver) => {
    driver.waitForAttributeContains('//*[@id="tripDetails"]/div[2]/div/ul/li[4]/div/div/div/div[2]/i', 'class', 'cwt-icon cwt-icon-hotel');
  },

  'step 5 - Validate trip details missing hotel main title': (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[4]/div/div/div/div[2]/h6', 'Aportal Two, your itinerary is missing a hotel');
  },

  // 'step 6 - Validate trip details missing hotel main text': (driver) => {
  //    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[4]/div/div/div/p', 'If you already have booked a hotel simply forward the confirmation email to plans@cwttogo.com'); // TODO: DE9445
  // },
  //
  // 'step 7 - Validate trip details missing hotel cwt email address': (driver) => {
  //   driver.waitForAttributeContains('//*[@id="tripDetails"]/div[2]/div/ul/li[4]/div/div/div/p/a', 'href', 'mailto:plans@cwttogo.com');
  // },

  'step 8 - Validate trip details missing hotel dismiss button': (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[4]/div/div/div/button', 'DISMISS');
  },

  'step 9 - Logout' : (driver) => {
    driver.page.logout().logout();
  },

};