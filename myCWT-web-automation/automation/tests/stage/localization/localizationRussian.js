'use strict';

const json_ru_RU = require('../../../translations/ru_RU');
const locaMainTest = require('./localizationMain');

module.exports = {

    '@tags': ['localization', 'language', 'Russia', 'Russian'],

    before: function (driver) {
      driver.windowMaximize();
    },

    'step 1 - login': (driver) => {
      const login = driver.page.login();
      login.fillLoginDetails(driver.globals.users.portalUser41.username, driver.globals.users.portalUser41.password);
    },

    'step 2 - call for test': (driver) => {
      locaMainTest.LocalizationMainTest(driver, json_ru_RU);
    }
};