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
      .waitAndSetValueByCss(pageHome.selectors.flightBookingPanel.flyingFromInput, 'New york');
      // .stop();
    // let locations = document.querySelectorAll('.css-11unzgr');
    //   console.log(locations);

    const runThis = function() {
      const locations = document.querySelectorAll('.css-kf6otk-menu');
      console.log('>>>>>>>>>>>>>>>'+locations);
      const first = locations[0];

      first.click();
      return true;
    };
    browser.execute(runThis);
  },

  'step 3 - Login': (browser) => {
    browser
      .stop();
  },
};