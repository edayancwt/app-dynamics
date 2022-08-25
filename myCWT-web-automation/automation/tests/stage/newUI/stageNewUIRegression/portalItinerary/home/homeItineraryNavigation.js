'use strict';

module.exports = {

  '@tags': ['home', 'itinerary', 'navigation'],

  before: function (driver) {
    driver.windowMaximize();
  },

  'step 1 - login to portal': (driver) => {
    const login = driver.page.login();
    login.fillLoginDetails(driver.globals.users.portalUser1);
  },

  'step 2 - navigate right': (driver) => {
    driver.clickToSlide('#itinerary-next', 1);
  },

  'step 3 - navigate left': (driver) => {
    driver.clickToSlide('#itinerary-prev', 1);
  },

  'step 4 - validate left button disabled': (driver) => {
    driver.waitForAttributeContainsByCss("#itinerary-prev", 'class', 'slick-disabled');
  },

  'step 5 - navigate right 5 times': (driver) => {
    driver.clickToSlide('#itinerary-next', 7);
  },

  'step 6 - validate right button disabled': (driver) => {
    driver.waitForAttributeContainsByCss("#itinerary-next", 'class', 'slick-disabled');
  },

  'step 7 - Logout' : (driver) => {
    driver.page.logout().logout();
  },

};