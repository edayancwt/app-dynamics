'use strict';

// ------ This will register users created with Yopmail service ------

//-----------------------------------Users details--------------------------------------------
const usersList = [
  { email:'nilson4@yopmail.com' },
  { email:'nilson5@yopmail.com' },
];
//-------------------------------------------------------------------------------------------

module.exports = {

  '@tags': ['IDM', 'registration'],

  before: function (browser) {
    browser.windowMaximize();

  },

  'step 1 - IDM side': (browser) => {
    usersList.forEach(email =>{
      browser
        .url('https://accounts.mycwt.com/ext/reg/Registration?adapterId=UserReg')
        .waitAndSetValueByCss('#email', email.email)
        .waitAndClickByCss('#submit-button')
        .waitForElementVisible('#registration-check-email-title')
        .back();
      });
  },

  'step 2 - Yopmail side': (browser) => {
      browser
        .url('http://www.yopmail.com')
        .waitAndClickByCss('#accept');

    usersList.forEach(email =>{
      browser
        .waitAndSetValueByCss('#login', email.email)
        .waitAndClickByCss('#refreshbut')
        .frame('ifmail')
        .waitAndClickByXpath('//*[@id="mail"]/div/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/a')
        .switchToTab(1)
        .waitAndSetValueByCss('#newPassword', 'Password1!')
        .waitAndClickByCss('#submit-button')
        .pause(2000)
        .closeWindow()
        .switchToTab(0)
        .back()
        .clearValue('#login');
    });
  },
};