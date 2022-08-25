'use strict';

const json_en_GB  = require('../../../translations/en_GB.json');
const locaMainTest = require('./localizationMain');

module.exports = {

    '@tags': ['localization', 'language', 'english', 'UK'],

    before: function (driver) {
      driver.windowMaximize();
    },

    'step 1 - login': (driver) => {
      const login = driver.page.login();
      login.fillLoginDetails(driver.globals.users.portalUser29.username, driver.globals.users.portalUser29.password);
    },

    'step 2 - call for test': (driver) => {
      locaMainTest.LocalizationMainTest(driver, json_en_GB);
  }
};