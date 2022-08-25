'use strict';

module.exports = {

  '@tags': ['home', 'itinerary', 'navigation'],

  before: function (driver) {
    driver.windowMaximize();
  },

  'step 1 - login to portal': (driver) => {
    const login = driver.page.login();
    login.fillLoginDetails(driver.globals.users.portalUser8);
  },

  'step 2 - navigate right': (driver) => {
    driver.clickToSlide('#slider-nav-Forward', 1);
  },

  'step 3 - navigate left': (driver) => {
    driver.clickToSlide('#slider-nav-Back', 1);
  },

  'step 4 - navigate forward 3 times': (driver) => {
    driver.clickToSlide('#slider-nav-Forward', 4);
  },

  'step 5 - validate forward button disabled': (driver) => {
    driver.waitForAttributeContainsByXpath("//*[@id=\"shell\"]/div/div[1]/div/div/section/div[2]/div[2]", 'class', 'space');
  },

  'step 6 - navigate left': (driver) => {
    driver.useCss();
    driver.clickToSlide('#slider-nav-Back', 4);
  },

  'step 7 - validate backwards button disabled': (driver) => {
    driver.waitForElementPresent('[data-testid=no-button]', 3000);
  },

  // 'step 7 - Logout' : (driver) => {
  //   driver.page.logout().logout();   //TODO: logout still not working
  // },

};