'use strict';

const json_pt_BR = require('../../../translations/pt_BR');
const locaMainTest = require('./localizationMain');

module.exports = {

    '@tags': ['localization', 'language', 'Portuguese', 'Brasil'],

    before: function (driver) {
      driver.windowMaximize();
    },

    'step 1 - login': (driver) => {
      const login = driver.page.login();
      login.fillLoginDetails(driver.globals.users.portalUser38.username, driver.globals.users.portalUser38.password);
    },

    'step 2 - call for test': (driver) => {
      locaMainTest.LocalizationMainTest(driver, json_pt_BR);
    }
};