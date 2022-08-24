'use strict';

// const globals = require('../nightwatch.globals');
// const pageIDM = require('../pages/page-idm');
const pageSSO = require('../pages/page-sso');

// let NWTools = require('nightwatch-tools');
// let randomNumber = NWTools.randomString(4,'1234567890');

module.exports = {

    '@tags': ['sanity', 'portal'],

    before: function (browser) {
        browser.windowMaximize();
    },

    //    ----------------------------------Sanity, home----------------------------------

    'step 2 - Search none-exiting traveller': (browser) => {
        browser
            .url('https://idm-ui-stage.int.carlsonwagonlit.com')
            .waitAndSetValueByCss(pageSSO.selectors.main.username, 'u043exd')
            .waitAndSetValueByCss(pageSSO.selectors.main.password, 'EdEdEd2022!!')
            .waitAndClickByCss(pageSSO.selectors.main.loginButton);
    },


    // 'step 2 - Search none-exiting traveller': (browser) => {
    //     browser
    //         .url('https://idm-ui-stage.int.carlsonwagonlit.com')
    //         .useCss()
    //         .waitForElementVisible(pageSSO.selectors.main.username, 30000)
    //         .setValue(pageSSO.selectors.main.username, 'u043exd')
    //
    //         .setValue(pageSSO.selectors.main.password, 'EdEdEd2022!!')
    //         .click(pageSSO.selectors.main.loginButton);
    // },

};