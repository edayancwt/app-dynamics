'use strict';

const globals = require('../../../../nightwatch.globals');
const pageHome = require('../../../../pages/page-home');
const pageLogin = require('../../../../pages/page-login');
const pageHeader = require('../../../../pages/page-header');

module.exports = {

  '@tags': ['IDM', 'login'],

  before: function (browser) {
    browser.windowMaximize();
  },

  'step 1 - Login': (browser) => {
    browser
      .loginToPortalStage(globals.users.growthUser1.username, globals.users.growthUser1.password)
      // Accept cookies
      .waitAndClickByCss(pageHome.selectors.cookies.acceptCookiesButton, 30000);
  },

  'step 2 - Search': (browser) => {
    browser
      // Add from location
      .waitAndSetValueByCss(pageHome.selectors.flightBookingPanel.flyingFromInput, 'New york')

      .stop();
  },
};