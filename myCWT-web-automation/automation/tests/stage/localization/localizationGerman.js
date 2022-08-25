'use strict';

const json_de_DE  = require('../../../translations/de_DE.json');
const locaMainTest = require('./localizationMain');

module.exports = {

    '@tags': ['localization', 'language', 'german'],

    before: function (driver) {
      driver.windowMaximize();
    },

    'step 1 - login': (driver) => {
      const login = driver.page.login();
      login.fillLoginDetails(driver.globals.users.portalUser27.username, driver.globals.users.portalUser27.password);
    },

    'step 2 - call for test': (driver) => {
      locaMainTest.LocalizationMainTest(driver, json_de_DE);
    }
};