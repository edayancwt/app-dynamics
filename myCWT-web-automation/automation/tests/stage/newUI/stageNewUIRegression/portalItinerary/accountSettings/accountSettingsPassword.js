'use strict';

let NWTools = require('nightwatch-tools');
let randomString = NWTools.randomString(3,'1234567890');
let originalUsername = "automation-account1";
let originalPassword = "password1";
let passwordBase = "password";
let passwordChanges = [];

module.exports = {

  '@tags': ['accountSettings'],

  before: function (driver) {
    driver.windowMaximize();
  },

  'step 1 - login': (driver) => {
    const login = driver.page.login();
    login.fillLoginDetails(driver.globals.users.portalUser14);
  },

//----------------------------------------------------------------------------------------------------------------------------------------------------
//  IMPORTANT - account settings password test email is "automation-account@mailtest.worldmate.com" (username is "automation-account1")
//----------------------------------------------------------------------------------------------------------------------------------------------------

  'step 2 - Go to account settings page': (driver) => {
    driver.refresh();
    driver.waitAndClickByCss('#header-my-account-menu');
    driver.waitAndClickByCss('#header-login-settings');
  },

  'step 3 - Missing new password': (driver) => {
    // Add "current" password
    driver.waitAndSetValueByXpath('//*[@id="accountSettings"]/div/div[3]/div[2]/div[1]/div/input', originalPassword);
    // validate save button disabled
    driver.waitForCssContains('//*[@id="accountSettings"]/div/div[4]/div[1]/button', 'background-color', '143, 152, 163');
  },

  'step 4 - Missing current password': (driver) => {
    // Add "new" password.
    driver.waitAndSetValueByXpath('//*[@id="accountSettings"]/div/div[3]/div[2]/div[2]/div/input', originalPassword);
    // clear "current" password
    driver.clearValue('//*[@id="accountSettings"]/div/div[3]/div[2]/div[1]/div/input');
    driver.waitAndClickByXpath('//*[@id="accountSettings"]/div/div[4]/div[1]/button');
    // validate save button disabled
    driver.waitForCssContains('//*[@id="accountSettings"]/div/div[4]/div[1]/button', 'background-color', '143, 152, 163');
  },

  'step 5 - Wrong current password': (driver) => {
    // clear "current" password
    driver.clearValue('//*[@id="accountSettings"]/div/div[3]/div[2]/div[1]/div/input');
    // Add wrong current password
    let randomPassword = passwordBase+randomString;
    driver.waitAndSetValueByXpath('//*[@id="accountSettings"]/div/div[3]/div[2]/div[1]/div/input', randomPassword);
    // clear "new" password
    driver.clearValue('//*[@id="accountSettings"]/div/div[3]/div[2]/div[2]/div/input');
    // Add password in new password
    driver.waitAndSetValueByXpath('//*[@id="accountSettings"]/div/div[3]/div[2]/div[2]/div/input', randomPassword+"-blabla");
    // click on save button
    driver.waitAndClickByXpath('//*[@id="accountSettings"]/div/div[4]/div[1]/button');
    // validate error message
    driver.waitForAttributeContains('//*[@id="newPasswordFormGroup"]/p/i','class', 'cwt-icon-alert');
    driver.waitForTextByXpath('//*[@id="newPasswordFormGroup"]/p/span', 'Failed to change password');
    driver.waitForCssContains('//*[@id="newPasswordFormGroup"]/p/span', 'color', '(236, 21, 97');
  },

  'step 6 - Less than 8 characters': (driver) => {
    driver.refresh();      // this will clear all passwords (clearValue function have a defect)
    // Add correct password in "current" password
    driver.waitAndSetValueByXpath('//*[@id="accountSettings"]/div/div[3]/div[2]/div[1]/div/input', originalPassword);
    // add less than 8 characters in "new" password
    driver.waitAndSetValueByXpath('//*[@id="accountSettings"]/div/div[3]/div[2]/div[2]/div/input', "123abc");

    // validate policy text color
    driver.waitForCssContains('//*[@id="accountSettings"]/div/div[3]/div[1]/div/ul/li[1]/span', 'color', '(47, 72, 80');   //black
    driver.waitForCssContains('//*[@id="accountSettings"]/div/div[3]/div[1]/div/ul/li[2]/span', 'color', '(11, 189, 15');  //green
    driver.waitForCssContains('//*[@id="accountSettings"]/div/div[3]/div[1]/div/ul/li[3]/span', 'color', '(11, 189, 15');  //green
    // V icons
    driver.waitForAttributeContains('//*[@id="accountSettings"]/div/div[3]/div[1]/div/ul/li[2]/i','class', 'cwt-icon-checked');
    driver.waitForAttributeContains('//*[@id="accountSettings"]/div/div[3]/div[1]/div/ul/li[3]/i','class', 'cwt-icon-checked');

    // click on save button
    driver.waitAndClickByXpath('//*[@id="accountSettings"]/div/div[4]/div[1]/button');
    // validate error message
    driver.waitForAttributeContains('//*[@id="newPasswordFormGroup"]/div[2]/p/i','class', 'cwt-icon-alert');
    driver.waitForTextByXpath('//*[@id="newPasswordFormGroup"]/div[2]/p/span', 'Invalid password');
    driver.waitForCssContains('//*[@id="newPasswordFormGroup"]/div[2]/p/span', 'color', '236, 21, 97');
  },

  'step 7 - More than 32 characters': (driver) => {
    driver.refresh();      // this will clear all passwords (clearValue function have a defect)
    // Add correct password in current password
    driver.waitAndSetValueByXpath('//*[@id="accountSettings"]/div/div[3]/div[2]/div[1]/div/input', originalPassword);
    // add more than 32 characters in new password
    driver.waitAndSetValueByXpath('//*[@id="accountSettings"]/div/div[3]/div[2]/div[2]/div/input', "12345abcde12345abcde12345abcde12345abcde");

    // validate policy text color
    driver.waitForCssContains('//*[@id="accountSettings"]/div/div[3]/div[1]/div/ul/li[1]/span', 'color', '47, 72, 80');   //black
    driver.waitForCssContains('//*[@id="accountSettings"]/div/div[3]/div[1]/div/ul/li[2]/span', 'color', '11, 189, 15');  //green
    driver.waitForCssContains('//*[@id="accountSettings"]/div/div[3]/div[1]/div/ul/li[3]/span', 'color', '11, 189, 15');  //green
    // V icons
    driver.waitForAttributeContains('//*[@id="accountSettings"]/div/div[3]/div[1]/div/ul/li[2]/i','class', 'cwt-icon-checked');
    driver.waitForAttributeContains('//*[@id="accountSettings"]/div/div[3]/div[1]/div/ul/li[3]/i','class', 'cwt-icon-checked');

    // click on save button
    driver.waitAndClickByXpath('//*[@id="accountSettings"]/div/div[4]/div[1]/button');
    // validate error message
    driver.waitForAttributeContains('//*[@id="newPasswordFormGroup"]/div[2]/p/i','class', 'cwt-icon-alert');
    driver.waitForTextByXpath('//*[@id="newPasswordFormGroup"]/div[2]/p/span', 'Invalid password');
    driver.waitForCssContains('//*[@id="newPasswordFormGroup"]/div[2]/p/span', 'color', '236, 21, 97');
  },

  'step 8 - At least one non-alphabetic character': (driver) => {
    driver.refresh();      // this will clear all passwords (clearValue function have a defect)
    // Add correct password in current password
    driver.waitAndSetValueByXpath('//*[@id="accountSettings"]/div/div[3]/div[2]/div[1]/div/input', originalPassword);
    // add only alphabetic characters in new password
    driver.waitAndSetValueByXpath('//*[@id="accountSettings"]/div/div[3]/div[2]/div[2]/div/input', "abcdefghij");

    // validate policy text color
    driver.waitForCssContains('//*[@id="accountSettings"]/div/div[3]/div[1]/div/ul/li[1]/span', 'color', '11, 189, 15');   //green
    driver.waitForCssContains('//*[@id="accountSettings"]/div/div[3]/div[1]/div/ul/li[2]/span', 'color', '47, 72, 80');  //black
    driver.waitForCssContains('//*[@id="accountSettings"]/div/div[3]/div[1]/div/ul/li[3]/span', 'color', '11, 189, 15');  //green
    // V icons
    driver.waitForAttributeContains('//*[@id="accountSettings"]/div/div[3]/div[1]/div/ul/li[1]/i','class', 'cwt-icon-checked');
    driver.waitForAttributeContains('//*[@id="accountSettings"]/div/div[3]/div[1]/div/ul/li[3]/i','class', 'cwt-icon-checked');

    // click on save button
    driver.waitAndClickByXpath('//*[@id="accountSettings"]/div/div[4]/div[1]/button');
    // validate error message
    driver.waitForAttributeContains('//*[@id="newPasswordFormGroup"]/div[2]/p/i','class', 'cwt-icon-alert');
    driver.waitForTextByXpath('//*[@id="newPasswordFormGroup"]/div[2]/p/span', 'Invalid password');
    driver.waitForCssContains('//*[@id="newPasswordFormGroup"]/div[2]/p/span', 'color', '236, 21, 97');   //red
  },

  'step 9 - Different from username': (driver) => {
    driver.refresh();      // this will clear all passwords (clearValue function have a defect)
    // Add correct password in current password
    driver.waitAndSetValueByXpath('//*[@id="accountSettings"]/div/div[3]/div[2]/div[1]/div/input', originalPassword);
    // add same text as username in new password
    driver.waitAndSetValueByXpath('//*[@id="accountSettings"]/div/div[3]/div[2]/div[2]/div/input', originalUsername);
    // click on save button
    driver.waitAndClickByXpath('//*[@id="accountSettings"]/div/div[4]/div[1]/button');
    // validate policy text color
    driver.waitForCssContains('//*[@id="accountSettings"]/div/div[3]/div[1]/div/ul/li[1]/span', 'color', '11, 189, 15');   //green
    driver.waitForCssContains('//*[@id="accountSettings"]/div/div[3]/div[1]/div/ul/li[2]/span', 'color', '11, 189, 15');  //green
    driver.waitForCssContains('//*[@id="accountSettings"]/div/div[3]/div[1]/div/ul/li[3]/span', 'color', '47, 72, 80');  //black
    // V icons
    driver.waitForAttributeContains('//*[@id="accountSettings"]/div/div[3]/div[1]/div/ul/li[1]/i','class', 'cwt-icon-checked');
    driver.waitForAttributeContains('//*[@id="accountSettings"]/div/div[3]/div[1]/div/ul/li[2]/i','class', 'cwt-icon-checked');

    // click on save button
    driver.waitAndClickByXpath('//*[@id="accountSettings"]/div/div[4]/div[1]/button');
    // validate error message
    driver.waitForAttributeContains('//*[@id="newPasswordFormGroup"]/div[2]/p/i','class', 'cwt-icon-alert');
    driver.waitForTextByXpath('//*[@id="newPasswordFormGroup"]/div[2]/p/span', 'Invalid password');
    driver.waitForCssContains('//*[@id="newPasswordFormGroup"]/div[2]/p/span', 'color', '236, 21, 97');   //red
  },

  'step 10 - Show/hide passwords - Current password': (driver) => {
    driver.refresh();      // this will clear all passwords (clearValue function have a defect)
    // Add any password in current password
    driver.waitAndSetValueByXpath('//*[@id="accountSettings"]/div/div[3]/div[2]/div[1]/div/input', "password8");
    // Validate password is hidden
    driver.waitForAttributeContains('//*[@id="accountSettings"]/div/div[3]/div[2]/div[1]/div/i','class', 'cwt-icon-eye');   //eye icon
    driver.waitForAttributeContains('//*[@id="accountSettings"]/div/div[3]/div[2]/div[1]/div/input','type', 'password');   //hidden characters
    // Click on show password (eye icon)
    driver.waitAndClickByXpath('//*[@id="accountSettings"]/div/div[3]/div[2]/div[1]/div/i');
    // Validate password is shown
    driver.waitForAttributeContains('//*[@id="accountSettings"]/div/div[3]/div[2]/div[1]/div/i','class', 'cwt-icon-hide');   //eye icon
    driver.waitForAttributeContains('//*[@id="accountSettings"]/div/div[3]/div[2]/div[1]/div/input','type', 'text');   //shown characters
  },

  'step 11 - Show/hide passwords - New password': (driver) => {
    // Add any password in current password
    driver.waitAndSetValueByXpath('//*[@id="accountSettings"]/div/div[3]/div[2]/div[2]/div/input', "password9");
    // Validate password is hidden
    driver.waitForAttributeContains('//*[@id="accountSettings"]/div/div[3]/div[2]/div[2]/div/i','class', 'cwt-icon-eye');   //eye icon
    driver.waitForAttributeContains('//*[@id="accountSettings"]/div/div[3]/div[2]/div[2]/div/input','type', 'password');   //hidden characters
    // Click on show password (eye icon)
    driver.waitAndClickByXpath('//*[@id="accountSettings"]/div/div[3]/div[2]/div[2]/div/i');
    // Validate password is shown
    driver.waitForAttributeContains('//*[@id="accountSettings"]/div/div[3]/div[2]/div[2]/div/i','class', 'cwt-icon-hide');   //eye icon
    driver.waitForAttributeContains('//*[@id="accountSettings"]/div/div[3]/div[2]/div[2]/div/input','type', 'text');   //shown characters
  },

//    ---------------------------------- 5 previous passwords used ----------------------------------


  'step 12 - Different from 5 previous passwords - Same password': (driver) => {
    driver.refresh();      // this will clear all passwords (clearValue function have a defect)
    // Add the correct password in "current" field. (password1)
    driver.waitAndSetValueByXpath('//*[@id="accountSettings"]/div/div[3]/div[2]/div[1]/div/input', "password1");
    // Add same password in new (the same as current)
    driver.waitAndSetValueByXpath('//*[@id="accountSettings"]/div/div[3]/div[2]/div[2]/div/input', "password1");
    // click on save button
    driver.waitAndClickByXpath('//*[@id="accountSettings"]/div/div[4]/div[1]/button');
    // Validate error message display
    driver.waitForTextByXpath('//*[@id="newPasswordFormGroup"]/p/span', 'Failed to change password');
    driver.waitForAttributeContains('//*[@id="newPasswordFormGroup"]/p/i','class', 'cwt-icon-alert');
  },

  'step 12.2 - Different from 5 previous passwords - password number 2': (driver) => {
    driver.refresh();      // this will clear all passwords (clearValue function have a defect)
    // Add the correct password in "current" field (password1)
    driver.waitAndSetValueByXpath('//*[@id="accountSettings"]/div/div[3]/div[2]/div[1]/div/input', "password1");
    // Add password 2 in new field.
    driver.waitAndSetValueByXpath('//*[@id="accountSettings"]/div/div[3]/div[2]/div[2]/div/input', "password2");
    // click on save button
    driver.waitAndClickByXpath('//*[@id="accountSettings"]/div/div[4]/div[1]/button');
    // Validate success message display
    driver.waitForTextByXpath('//*[@id="newPasswordFormGroup"]/p/span', 'Password changed successfully!');
    driver.waitForAttributeContains('//*[@id="newPasswordFormGroup"]/p/i','class', 'cwt-icon-checked');
    driver.waitForCssContains('//*[@id="newPasswordFormGroup"]/p/span', 'color', '54, 170, 0');
    console.log('Password changed to: password2');
    passwordChanges.push('step 12.2 - Password changed to: password2');
  },

  'step 12.3 - Different from 5 previous passwords - password number 3': (driver) => {
    driver.refresh();      // this will clear all passwords (clearValue function have a defect)
    // Add the correct password in "current" field (password2)
    driver.waitAndSetValueByXpath('//*[@id="accountSettings"]/div/div[3]/div[2]/div[1]/div/input', "password2");
    // Add password 3 in new field.
    driver.waitAndSetValueByXpath('//*[@id="accountSettings"]/div/div[3]/div[2]/div[2]/div/input', "password3");
    // click on save button
    driver.waitAndClickByXpath('//*[@id="accountSettings"]/div/div[4]/div[1]/button');
    // Validate success message display
    driver.waitForTextByXpath('//*[@id="newPasswordFormGroup"]/p/span', 'Password changed successfully!');
    driver.waitForAttributeContains('//*[@id="newPasswordFormGroup"]/p/i','class', 'cwt-icon-checked');
    driver.waitForCssContains('//*[@id="newPasswordFormGroup"]/p/span', 'color', '54, 170, 0');
    console.log('Password changed to: password3');
    passwordChanges.push('step 12.3 - Password changed to: password3')
  },

  'step 12.4 - Different from 5 previous passwords - password number 4': (driver) => {
    driver.refresh();      // this will clear all passwords (clearValue function have a defect)
    // Add the correct password in "current" field (password3)
    driver.waitAndSetValueByXpath('//*[@id="accountSettings"]/div/div[3]/div[2]/div[1]/div/input', "password3");
    // Add password 4 in new field.
    driver.waitAndSetValueByXpath('//*[@id="accountSettings"]/div/div[3]/div[2]/div[2]/div/input', "password4");
    // click on save button
    driver.waitAndClickByXpath('//*[@id="accountSettings"]/div/div[4]/div[1]/button');
    // Validate success message display
    driver.waitForTextByXpath('//*[@id="newPasswordFormGroup"]/p/span', 'Password changed successfully!');
    driver.waitForAttributeContains('//*[@id="newPasswordFormGroup"]/p/i','class', 'cwt-icon-checked');
    driver.waitForCssContains('//*[@id="newPasswordFormGroup"]/p/span', 'color', '54, 170, 0');
    console.log('Password changed to: password4');
    passwordChanges.push('step 12.4 - Password changed to: password4')
  },

  'step 12.5 - Different from 5 previous passwords - password number 5': (driver) => {
    driver.refresh();      // this will clear all passwords (clearValue function have a defect)
    // Add the correct password in "current" field (password4)
    driver.waitAndSetValueByXpath('//*[@id="accountSettings"]/div/div[3]/div[2]/div[1]/div/input', "password4");
    // Add password 5 in new field.
    driver.waitAndSetValueByXpath('//*[@id="accountSettings"]/div/div[3]/div[2]/div[2]/div/input', "password5");
    // click on save button
    driver.waitAndClickByXpath('//*[@id="accountSettings"]/div/div[4]/div[1]/button');
    // Validate success message display
    driver.waitForTextByXpath('//*[@id="newPasswordFormGroup"]/p/span', 'Password changed successfully!');
    driver.waitForAttributeContains('//*[@id="newPasswordFormGroup"]/p/i','class', 'cwt-icon-checked');
    driver.waitForCssContains('//*[@id="newPasswordFormGroup"]/p/span', 'color', '54, 170, 0');
    console.log('Password changed to: password5');
    passwordChanges.push('step 12.5 - Password changed to: password5')
  },

  'step 12.6 - Different from 5 previous passwords - password number 6': (driver) => {
    driver.refresh();      // this will clear all passwords (clearValue function have a defect)
    // Add the correct password in "current" field (password4)
    driver.waitAndSetValueByXpath('//*[@id="accountSettings"]/div/div[3]/div[2]/div[1]/div/input', "password5");
    // Add password 6 in new field.
    driver.waitAndSetValueByXpath('//*[@id="accountSettings"]/div/div[3]/div[2]/div[2]/div/input', "password6");
    // click on save button
    driver.waitAndClickByXpath('//*[@id="accountSettings"]/div/div[4]/div[1]/button');
    // Validate success message display
    driver.waitForTextByXpath('//*[@id="newPasswordFormGroup"]/p/span', 'Password changed successfully!');
    driver.waitForAttributeContains('//*[@id="newPasswordFormGroup"]/p/i','class', 'cwt-icon-checked');
    driver.waitForCssContains('//*[@id="newPasswordFormGroup"]/p/span', 'color', '54, 170, 0');
    console.log('Password changed to: password6');
    passwordChanges.push('step 12.6 - Password changed to: password6')
  },

  'step 13 - Different from 5 previous passwords - changing to one of the used in the past (2)': (driver) => {
    driver.refresh();      // this will clear all passwords (clearValue function have a defect)
    // Add the correct password in "current" field (password6)
    driver.waitAndSetValueByXpath('//*[@id="accountSettings"]/div/div[3]/div[2]/div[1]/div/input', "password6");
    // Add password 2 that used in the last 5 passwords!!!
    driver.waitAndSetValueByXpath('//*[@id="accountSettings"]/div/div[3]/div[2]/div[2]/div/input', "password2");
    // click on save button
    driver.waitAndClickByXpath('//*[@id="accountSettings"]/div/div[4]/div[1]/button');
    // Validate success message display
    driver.waitForTextByXpath('//*[@id="newPasswordFormGroup"]/p/span', 'Failed to change password');
    driver.waitForAttributeContains('//*[@id="newPasswordFormGroup"]/p/i','class', 'cwt-icon-alert');
    console.log('Password is still password6 (no change)');
    passwordChanges.push('step 13 - Password2 was used in the last 5 previous passwords')
  },

  'step 14 - Different from 5 previous passwords - password number 7': (driver) => {
    driver.refresh();      // this will clear all passwords (clearValue function have a defect)
    // Add the correct password in "current" field (password4)
    driver.waitAndSetValueByXpath('//*[@id="accountSettings"]/div/div[3]/div[2]/div[1]/div/input', "password6");
    // Add password 7 in new field.
    driver.waitAndSetValueByXpath('//*[@id="accountSettings"]/div/div[3]/div[2]/div[2]/div/input', "password7");
    // click on save button
    driver.waitAndClickByXpath('//*[@id="accountSettings"]/div/div[4]/div[1]/button');
    // Validate success message display
    driver.waitForTextByXpath('//*[@id="newPasswordFormGroup"]/p/span', 'Password changed successfully!');
    driver.waitForAttributeContains('//*[@id="newPasswordFormGroup"]/p/i','class', 'cwt-icon-checked');
    driver.waitForCssContains('//*[@id="newPasswordFormGroup"]/p/span', 'color', '54, 170, 0');
    console.log('Password changed to: password7');
    passwordChanges.push('step 14 - Password changed to: password7')
  },

  'step 15 - Different from 5 previous passwords - back to the first password (1)': (driver) => {
    driver.refresh();      // this will clear all passwords (clearValue function have a defect)
    // Add the correct password in "current" field (password4)
    driver.waitAndSetValueByXpath('//*[@id="accountSettings"]/div/div[3]/div[2]/div[1]/div/input', "password7");
    // Add password 1 in new field. (that used in the first, not in the last 5 passwords)
    driver.waitAndSetValueByXpath('//*[@id="accountSettings"]/div/div[3]/div[2]/div[2]/div/input', "password1");
    // click on save button
    driver.waitAndClickByXpath('//*[@id="accountSettings"]/div/div[4]/div[1]/button');
    // Validate success message display
    driver.waitForTextByXpath('//*[@id="newPasswordFormGroup"]/p/span', 'Password changed successfully!');
    driver.waitForAttributeContains('//*[@id="newPasswordFormGroup"]/p/i','class', 'cwt-icon-checked');
    driver.waitForCssContains('//*[@id="newPasswordFormGroup"]/p/span', 'color', '54, 170, 0');
    console.log('Password changed to: password1 (back to original)');
    passwordChanges.push('step 15 - Password changed to: password1')
  },

  'step 16 - Logout user 1 again' : (driver) => {
    driver.page.logout().logout();
  },

  'step 17 - login and validate': (driver) => {
    const login = driver.page.login();
    login.fillLoginDetails(driver.globals.users.portalUser14);
    // Validate URL
    driver.waitForUrlToContain('travel.stage-mycwt.com/group/selenium-sub-selenium-top#/',20000);
    // Validate user welcome message
    driver.waitForTextByCss('#heroMsgUsername', 'Automation');
  },

  'step 18 - Password change list' : () => {
    console.log('------------------------------------------------------------------\nPassword changes list:\n------------------------------------------------------------------');
    let passL = passwordChanges.length;
    for (let i=0 ; i < passL ; i++){
      console.log(passwordChanges[i]);
    }
    console.log('------------------------------------------------------------------');
  },
};