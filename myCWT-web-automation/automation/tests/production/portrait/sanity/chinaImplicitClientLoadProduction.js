'use strict';

//-------------------------------------------------------------------------------------------------

const globals = require('../../../../nightwatch.globals');
module.exports = {

  '@tags': ['clientLoad', 'HRFeeds', 'portrait', 'ongoing'],

  before: function (browser) {
    browser.windowMaximize();
  },

  'step 0 - Create files': (browser) => {
    browser
      .url('https://secure-ede.mycwt.com/human.aspx?ep=!EP!ef3!W6fHthuUQeNqOHVy3Tv4uN7XXsGrYdgM4UdNCV63NTUuxRU67_LdcaaWwoYQ9_bCovaus2iBBvkv!A$$');
  },
};