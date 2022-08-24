'use strict';

module.exports = {

  before: function (browser) {
    browser.windowMaximize();
  },

  'step 1 - Login to jenkins': (browser) => {
    browser
      .url('http://jenkins.mobimate.local:8080/job/Deployment/job/Stage/job/Restart-Service/build?delay=0sec')
      .waitAndSetValueByCss('#j_username', 'evyatar.dayan')
      .waitAndSetValueByCss('[name=j_password]', 'Ed2022!!')
      .waitAndClickByCss('[name=Submit]');
  },

  // 'step 2 - Restart ptrt-cls': (browser) => {
  //   browser
  //     // Search for the ptrt-cls service
  //     .waitAndSetValueByCss('.uno_choice_filter', 'ptrt-cls')
  //     // Click on build
  //     .waitAndClickByCss('#yui-gen1-button')
  //     .back().pause(2000);
  // },
  //
  // 'step 3 - Restart ptrt-pls': (browser) => {
  //   browser
  //     // Search for the ptrt-pls service
  //     .waitAndSetValueByCss('.uno_choice_filter', 'ptrt-pls')
  //     // Click on build
  //     .waitAndClickByCss('#yui-gen1-button')
  //     .back().pause(2000);
  // },
  //
  // 'step 4 - Restart ptrt-webmaint': (browser) => {
  //   browser
  //     // Search for the ptrt-webmaint service
  //     .waitAndSetValueByCss('.uno_choice_filter', 'ptrt-webmaint')
  //     // Click on build
  //     .waitAndClickByCss('#yui-gen1-button')
  //     .back().pause(2000);
  // },

  'step 4 - Restart ims (IDM sync)': (browser) => {
    browser
      // Search for the ptrt-webmaint service
      .waitAndSetValueByCss('.uno_choice_filter', 'ims')
      // Click on build
      .waitAndClickByCss('#yui-gen1-button')
      .back().pause(2000);
  },

  'step 5 - Report': () => {
    console.log('--------------- REPORT ---------------');
    console.log('-- ptrt-cls service was restarted');
    console.log('-- ptrt-pls service was restarted');
    console.log('-- ptrt-webmaint service was restarted');
    console.log('-- IMS service was restarted');
    console.log('--------------------------------------\n');
  },

};