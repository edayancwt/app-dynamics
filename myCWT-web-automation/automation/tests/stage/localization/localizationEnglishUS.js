'use strict';

const json_en_US  = require('../../../translations/en_US.json');
const locaMainTest = require('./localizationMain');

module.exports = {

    '@tags': ['localization', 'language', 'english', 'US'],

    before: function (driver) {
      driver.windowMaximize();
    },

    'step 1 - login': (driver) => {
      const login = driver.page.login();
      login.fillLoginDetails(driver.globals.users.portalUser30.username, driver.globals.users.portalUser30.password);
    },

    'step 2 - call for test': (driver) => {
      locaMainTest.LocalizationMainTest(driver, json_en_US);
  }
};