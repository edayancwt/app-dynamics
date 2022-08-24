'use strict';

const globals = require('../nightwatch.globals');

let NWTools = require('nightwatch-tools');
let randomNumber = NWTools.randomString(4,'1234567890');

module.exports = {

    '@tags': ['sanity', 'portal'],

    before: function (browser) {
        browser.windowMaximize();
    },

    //    ----------------------------------Sanity, home----------------------------------

    'step 1 - Login': (browser) => {
        browser
            .loginToPortalStage(globals.users.portalUser1.username, globals.users.portalUser1.password);
    },

};