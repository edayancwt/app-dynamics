'use strict';

const json_sv_SE = require('../../../translations/sv_SE');
const locaMainTest = require('./localizationMain');

module.exports = {

    '@tags': ['localization', 'language', 'Swedish', 'Svenska'],

    before: function (driver) {
      driver.windowMaximize();
    },

    'step 1 - login': (driver) => {
      const login = driver.page.login();
      login.fillLoginDetails(driver.globals.users.portalUser40.username, driver.globals.users.portalUser40.password);
    },

    'step 2 - call for test': (driver) => {
      locaMainTest.LocalizationMainTest(driver, json_sv_SE);
    }
};