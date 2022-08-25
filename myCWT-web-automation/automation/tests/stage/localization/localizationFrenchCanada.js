'use strict';

const json_fr_CA  = require('../../translations/fr_CA');
const locaMainTest = require('./localizationMain');

module.exports = {

    '@tags': ['localization', 'language', 'french', 'canada'],

    before: function (driver) {
      driver.windowMaximize();
    },

    'step 1 - login': (driver) => {
      const login = driver.page.login();
      login.fillLoginDetails(driver.globals.users.portalUser33.username, driver.globals.users.portalUser33.password);
    },

    'step 2 - call for test': (driver) => {
      locaMainTest.LocalizationMainTest(driver, json_fr_CA);
    }
};