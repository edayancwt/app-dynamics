'use strict';

const json_da_DK  = require('../../../translations/da_DK.json');
const locaMainTest = require('./localizationMain');

module.exports = {

    '@tags': ['localization', 'language', 'danish'],

    before: function (driver) {
      driver.windowMaximize();
    },

    'step 1 - login': (driver) => {
      const login = driver.page.login();
      login.fillLoginDetails(driver.globals.users.portalUser26.username, driver.globals.users.portalUser26.password);
    },

    'step 2 - call for test': (driver) => {
      locaMainTest.LocalizationMainTest(driver, json_da_DK);
    }
};