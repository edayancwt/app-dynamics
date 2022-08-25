'use strict';

const json_nl_NL = require('../../../translations/nl_NL');
const locaMainTest = require('./localizationMain');

module.exports = {

    '@tags': ['localization', 'language', 'Netherlands', 'Holand'],

    before: function (driver) {
      driver.windowMaximize();
    },

    'step 1 - login': (driver) => {
      const login = driver.page.login();
      login.fillLoginDetails(driver.globals.users.portalUser36.username, driver.globals.users.portalUser36.password);
    },

    'step 2 - call for test': (driver) => {
      locaMainTest.LocalizationMainTest(driver, json_nl_NL);
    }
};