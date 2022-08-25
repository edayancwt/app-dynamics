'use strict';

const json_fr_FR  = require('../../../translations/fr_FR');
const locaMainTest = require('./localizationMain');

module.exports = {

    '@tags': ['localization', 'language', 'french', 'france'],

    before: function (driver) {
      driver.windowMaximize();
    },

    'step 1 - login': (driver) => {
      const login = driver.page.login();
      login.fillLoginDetails(driver.globals.users.portalUser34.username, driver.globals.users.portalUser34.password);
    },

    'step 2 - call for test': (driver) => {
      locaMainTest.LocalizationMainTest(driver, json_fr_FR);
    }
};