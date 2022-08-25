'use strict';

const json_nb_NO = require('../../../translations/nb_NO');
const locaMainTest = require('./localizationMain');

module.exports = {

    '@tags': ['localization', 'language', 'Norwegian'],

    before: function (driver) {
      driver.windowMaximize();
    },

    'step 1 - login': (driver) => {
      const login = driver.page.login();
      login.fillLoginDetails(driver.globals.users.portalUser37.username, driver.globals.users.portalUser37.password);
    },

    'step 2 - call for test': (driver) => {
      locaMainTest.LocalizationMainTest(driver, json_nb_NO);
    }
};