'use strict';

module.exports = {

  '@tags': ['home', 'header'],

  before: function (driver) {
    driver.windowMaximize();
  },

  'step 1 - login to portal': (driver) => {
    const login = driver.page.login();
    login.fillLoginDetails(driver.globals.users.portalUser1);
  },

  'step 2 - header - validate user name display in the header': (driver) => {
    driver.waitForTextByCss('#heroMsgUsername', "Aportal One");
  },

  'step 3 - header - validate help title': (driver) => {
    driver.waitForTextByCss('#heroMsgBody', "how can we help with your travel plans?");
  },

  'step 4 - header - validate home trip title': (driver) => {
    driver.waitForTextByXpath('//*[@id="featuredTrip"]/span/div/div/div[1]/div/p/span', "Your upcoming trip: Denver, Colorado | Jun 4 - Sep 3 (92 days)");
  },

  'step 5 - header - validate map icon': (driver) => {
    driver.waitForAttributeContainsByXpath("//*[@id='itinerary-map-open']/i", 'class', 'cwt-icon cwt-icon-location m-r-xs');
  },

  'step 6 - header - validate map title': (driver) => {
    driver.waitForTextByCss("#itinerary-map-open", "MAP");
  },

  'step 7 - header - navigation buttons': (driver) => {
    driver.clickToSlide('#itinerary-next', 1);
    driver.clickToSlide('#itinerary-prev', 1);
  },

};