'use strict';

const json_es_ES  = require('../../../translations/es_ES.json');
const locaMainTest = require('./localizationMain');

module.exports = {

    '@tags': ['localization', 'language', 'spanish'],

    before: function (driver) {
      driver.windowMaximize();
    },

    'step 1 - login': (driver) => {
      const login = driver.page.login();
      login.fillLoginDetails(driver.globals.users.portalUser32.username, driver.globals.users.portalUser32.password);
    },

    'step 2 - call for test': (driver) => {
      locaMainTest.LocalizationMainTest(driver, json_es_ES);
  }
};