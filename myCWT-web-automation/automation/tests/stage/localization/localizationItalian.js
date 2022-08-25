'use strict';

const json_it_IT = require('../../../translations/it_IT');
const locaMainTest = require('./localizationMain');

module.exports = {

    '@tags': ['localization', 'language', 'italian'],

    before: function (driver) {
      driver.windowMaximize();
    },

    'step 1 - login': (driver) => {
      const login = driver.page.login();
      login.fillLoginDetails(driver.globals.users.portalUser35.username, driver.globals.users.portalUser35.password);
    },

    'step 2 - call for test': (driver) => {
      locaMainTest.LocalizationMainTest(driver, json_it_IT);
    }
};