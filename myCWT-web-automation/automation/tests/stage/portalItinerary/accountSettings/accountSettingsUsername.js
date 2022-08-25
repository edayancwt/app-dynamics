'use strict';

let NWTools = require('nightwatch-tools');
let randomString = NWTools.randomString(3,'1234567890');
let randomUsername = "automation-account2"+randomString;
let originalUsername = "automation-account2";
let usernameChanges = [];

module.exports = {

  '@tags': ['accountSettings'],

  before: function (driver) {
    driver.windowMaximize();
  },

  'step 1 - login': (driver) => {
    const login = driver.page.login();
    login.fillLoginDetails(driver.globals.users.portalUser15);
  },

//-------------------------------------------------------------------------------------------------------------------------------
//  IMPORTANT - If this test fail in the middle click on "Forgot username" and use this email "automation-5477@mailtest.worldmate.com"
//  Check the modified username here: https://travel.stage-mycwt.com/mailtest/emails?username=automation-5477@mailtest.worldmate.com
//-------------------------------------------------------------------------------------------------------------------------------

  'step 2 - Go to account settings page': (driver) => {
    driver.waitAndClickByCss('#header-my-account-menu');
    driver.waitAndClickByCss('#header-login-settings');
  },

  'step 3 - Check page UI - username': (driver) => {
    // account settings title
    driver.waitForTextByXpath('//*[@id="accountSettings"]/h1/span', 'Account Settings');
    // username title
    driver.waitForTextByXpath('//*[@id="accountSettings"]/div/div[1]/div/div/label/span', 'Username');
    // username pre-text
    driver.pause(3000);
    driver.waitForAttributeContainsByXpath('//*[@id="accountSettings"]/div/div[1]/div/div/input','value', originalUsername);
    // username icon
    driver.waitForAttributeContainsByXpath('//*[@id="accountSettings"]/div/div[1]/div/div/i','class', 'cwt-icon-user');
    usernameChanges.push("step 3 - Your original username is: "+originalUsername);
  },

  'step 4 - Check page UI - change password': (driver) => {
    // change password title
    driver.waitForTextByXpath('//*[@id="accountSettings"]/div/div[2]/div/div/label/span', 'Change password');
    // current password pre-text
    driver.waitForAttributeContainsByXpath('//*[@id="accountSettings"]/div/div[3]/div[2]/div[1]/div/input','placeholder', 'Current password');
    // new password pre-text
    driver.waitForAttributeContainsByXpath('//*[@id="accountSettings"]/div/div[3]/div[2]/div[2]/div/input','placeholder', 'New password');
    // current password icon
    driver.waitForAttributeContainsByXpath('//*[@id="accountSettings"]/div/div[3]/div[2]/div[1]/div/i','class', 'cwt-icon-lock');
    // new password icon
    driver.waitForAttributeContainsByXpath('//*[@id="accountSettings"]/div/div[3]/div[2]/div[2]/div/i','class', 'cwt-icon-lock');
  },

  'step 5 - Check page UI - password policy': (driver) => {
    // password policy title
    driver.waitForTextByXpath('//*[@id="accountSettings"]/div/div[3]/div[1]/div/span/strong', 'Password policy:');
    // different from previous
    driver.waitForTextByXpath('//*[@id="accountSettings"]/div/div[3]/div[1]/div/div/em/strong', 'Make sure that the password is different from 5 previous passwords');
    // 8-32 characters
    driver.waitForTextByXpath('//*[@id="accountSettings"]/div/div[3]/div[1]/div/ul/li[1]/span', 'Must be 8-32 characters long');
    // non-alphabetic character
    driver.waitForTextByXpath('//*[@id="accountSettings"]/div/div[3]/div[1]/div/ul/li[2]/span', 'Must have at least one non-alphabetic character');
    // non-alphabetic character
    driver.waitForTextByXpath('//*[@id="accountSettings"]/div/div[3]/div[1]/div/ul/li[3]/span', 'Must be different from your username');
    // save button
    driver.waitForTextByXpath('//*[@id="accountSettings"]/div/div[4]/div[1]/button', 'SAVE CHANGES');
    // save button color
    driver.waitForCssContains('//*[@id="accountSettings"]/div/div[4]/div[1]/button', 'background-color', '143, 152, 163');
  },

  'step 6 - Change username to random': (driver) => {
    // Validate original username
    driver.waitForAttributeContainsByXpath('//*[@id="accountSettings"]/div/div[1]/div/div/input','value', originalUsername);
    // clear "original" username
    driver.clearValue('//*[@id="accountSettings"]/div/div[1]/div/div/input');
    // Change to random username
    driver.waitAndSetValueByXpath('//*[@id="accountSettings"]/div/div[1]/div/div/input', randomUsername);
    // Click on save button
    driver.waitAndClickByXpath('//*[@id="accountSettings"]/div/div[4]/div[1]/button', 'SAVE CHANGES');
    // Validate success message (removing "-" from the message).
    const selector = '//*[@id="accountSettings"]/div/div[1]/div/div/p/span';
    driver.waitForElementVisible(selector);
    driver.getText(selector, function(result){
      const textValue = result.value.replace(/[-]/gm,"");
      this.assert.equal(textValue, "Username changed successfully!");
    });
    console.log("-------------------------------------------------"+"\nYour current username is: "+randomUsername+"\n-------------------------------------------------");
    // V sign
    driver.waitForAttributeContainsByXpath('//*[@id="accountSettings"]/div/div[1]/div/div/p/i','class', 'cwt-icon-checked');
    // Color green
    driver.waitForCssContains('//*[@id="accountSettings"]/div/div[1]/div/div/p/span', 'color', '54, 170, 0');
    usernameChanges.push("step 6 - Your random username is: "+randomUsername);
  },

  'step 7 - try to login with the original username(and fail)': (driver) => {
    driver.page.logout().logout();    //logout
    driver.pause(2000);
    // driver.clearValue('#username');
    driver.waitAndSetValueByCss('#username-input', originalUsername);
    // driver.clearValue('#password');
    driver.waitAndSetValueByCss('#password-input', 'password1');
    driver.waitAndClickByCss('#submit-button');
    // Validate error message appear
    driver.waitForTextByCss('#serverError', 'Username or password is invalid. Please try again.\nIf this is your first time accessing this new travel website, you will need to activate your account first.');
  },

  'step 8 - try to login with the random username(and succeed)': (driver) => {
    driver.clearValue('#username-input');
    driver.waitAndSetValueByCss('#username-input', randomUsername);
    driver.clearValue('#password-input');
    driver.waitAndSetValueByCss('#password-input', 'password1');
    // Validate error message appear
    driver.waitAndClickByCss('#submit-button');
  },

  'step 9 - Go to account settings page': (driver) => {
    driver.waitAndClickByCss('#header-my-account-menu');
    driver.waitAndClickByCss('#header-login-settings');
  },

  'step 10 - Change username back to original': (driver) => {
    // Validate random username
    driver.pause(4000);
    driver.waitForAttributeContainsByXpath('//*[@id="accountSettings"]/div/div[1]/div/div/input','value', randomUsername);
    // clear "random" username
    driver.clearValue('//*[@id="accountSettings"]/div/div[1]/div/div/input');
    // Change back to original username
    driver.waitAndSetValueByXpath('//*[@id="accountSettings"]/div/div[1]/div/div/input', originalUsername);
    // Click on save button
    driver.waitAndClickByXpath('//*[@id="accountSettings"]/div/div[4]/div[1]/button', 'SAVE CHANGES');
    // Validate success message (removing "-" from the message).
    const selector = '//*[@id="accountSettings"]/div/div[1]/div/div/p/span';
    driver.waitForElementVisible(selector);
    driver.getText(selector, function(result){
      const textValue = result.value.replace(/[-]/gm,"");
      this.assert.equal(textValue, "Username changed successfully!");
    });
    // V sign
    driver.waitForAttributeContainsByXpath('//*[@id="accountSettings"]/div/div[1]/div/div/p/i','class', 'cwt-icon-checked');
    // Color green
    driver.waitForCssContains('//*[@id="accountSettings"]/div/div[1]/div/div/p/span', 'color', '54, 170, 0');
    usernameChanges.push("step 10 - Your final username is: "+originalUsername);
  },

  'step 11 - Logout' : (driver) => {
    driver.page.logout().logout();
  },

  'step 12 - login again': (driver) => {
    const login = driver.page.login();
    login.fillLoginDetails(driver.globals.users.portalUser15);
  },

  'step 13 - Validate login page display as expected': (driver) => {
    driver.waitForUrlToContain(driver.globals.urls.login_url, 20000);
    console.log('----------------------------------------------------------------\nUsername change history:\n----------------------------------------------------------------');
    for(let i=0 ; i < usernameChanges.length ; i++) {
      console.log(usernameChanges[i]);
    }
    console.log("----------------------------------------------------------------");
  },

};