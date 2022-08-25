'use strict';

module.exports = {

  '@tags': ['home', 'itinerary', 'navigation'],

  before: function (browser) {
    browser.windowMaximize();
  },

  'step 1 - login to portal': (browser) => {
    const login = browser.page.login();
    login.fillLoginDetails(browser.globals.users.portalUser1);
  },

  'step 2 - navigate right': (browser) => {
    browser.clickToSlide('#itinerary-next', 1);
  },

  'step 3 - navigate left': (browser) => {
    browser.clickToSlide('#itinerary-prev', 1);
  },

  'step 4 - validate left button disabled': (browser) => {
    browser.waitForAttributeContainsByCss("#itinerary-prev", 'class', 'slick-disabled');
  },

  'step 5 - navigate right 5 times': (browser) => {
    browser.clickToSlide('#itinerary-next', 7);
  },

  'step 6 - validate right button disabled': (browser) => {
    browser.waitForAttributeContainsByCss("#itinerary-next", 'class', 'slick-disabled');
  },

  'step 7 - Logout' : (browser) => {
    browser.page.logout().logout();
  },

};