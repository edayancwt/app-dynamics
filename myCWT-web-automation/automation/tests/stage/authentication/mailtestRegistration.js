'use strict';

// ------ This will register users created with mailtest.worldmate.com service ------

const globals = require('../../../nightwatch.globals');

//-----------------------------------Users details--------------------------------------------
const usersList = [
  { email:'dobe3@mailtest.worldmate.com' },
  { email:'dobe4@mailtest.worldmate.com' },
  { email:'dobe5@mailtest.worldmate.com' }
];
//-------------------------------------------------------------------------------------------

module.exports = {

  '@tags': ['IDM', 'registration'],

  before: function (browser) {
    browser.windowMaximize();
  },

  'step 1 ----': (browser) => {
      usersList.forEach(email =>{
      // Add email from the list
      browser
        .pause(2000)
      .waitAndSetValueByCss('#email', email.email)
      // Click on create your account next button
      .waitAndClickByCss('#submit-button')
      // Navigate to the registration activation email
      .url(globals.urls.mailtest_url + email.email)
      // Click on activate account button
      .isElementExistWithRefresh('/html/body/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/a', 6, 5000)
      .waitAndClickByXpath('/html/body/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/a')
      // Add valid password
      .switchToTab(1)
      .waitAndSetValueByCss('#newPassword', 'password1')
      // Click on sign up button
      .waitAndClickByXpath('//*[@id="right"]/div[3]/form/div[5]/div/button')
      // Click on continue button (traveler notice)
      .waitAndClickByXpath('//*[@id="right"]/div[1]/form/div[2]/button')
      // Validate login page display
      .waitForUrlToContain('https://www.mycwt.com/group/us-oi-test-carlson-wagonlit-travel#/', 20000)
      // logout
      .waitAndClickByCss('#header-my-account-menu')
      .waitAndClickByCss('#header-logout')
        .closeWindow()
        .switchToTab(0)
      // go to sign up
      .url(globals.urls.prod_sign_up_url);
      });
  },
};