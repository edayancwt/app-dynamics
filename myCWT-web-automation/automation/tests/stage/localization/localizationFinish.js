'use strict';

const json_fi_FI  = require('../../../translations/fi_FI');
const locaMainTest = require('./localizationMain');

module.exports = {

    '@tags': ['localization', 'language', 'finish'],

    before: function (driver) {
      driver.windowMaximize();
    },

    'step 1 - login': (driver) => {
      const login = driver.page.login();
      login.fillLoginDetails(driver.globals.users.portalUser39.username, driver.globals.users.portalUser39.password);
    },

    'step 2 - call for test': (driver) => {
      locaMainTest.LocalizationMainTest(driver, json_fi_FI);
  }
};