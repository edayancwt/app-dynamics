'use strict';

let alreadyRegistered = 'automation-5477@mailtest.worldmate.com';
let multipleAccounts = 'automation-6269@mailtest.worldmate.com';
let unregisteredAccount = 'automation-1234@mailtest.worldmate.com';
let fakeAccount = 'fake-email@mailtest.worldmate.com';
let existAccount = 'automation-8669@mailtest.worldmate.com';
let expiredAccount = 'automation-expired@mailtest.worldmate.com';

module.exports = {

  '@tags': ['IDM', 'login'],

  before: function (driver) {
    driver.windowMaximize();
  },

  'step 1 - Navigate to stage registration URL': (driver) => {
    driver.waitAndClick('#signup-link');
  },

//    ---------------------------------- UI Check ----------------------------------

  'step 2 - Validate registration icons': (driver) => {
    //cwt logo
    driver.useXpath();
    driver.waitForAttributeContains('//*[@id="left"]/div[2]/div[1]/div/div/img', 'src', 'https://cdn.worldmate.com/ping-images/my-cwt-logo-2019.svg');
    //email icon
    driver.waitForAttributeContains('//*[@id="pfRegEmail"]/i', 'class', 'cwt-icon-email');
  },

  'step 3 - Validate registration main title text': (driver) => {
    driver.waitForText('//*[@id="left"]/div[2]/div[1]/div/div/h1', 'Welcome to myCWT,\nyour gateway to business travel');
  },

  'step 4 - Validate registration up login text': (driver) => {
    driver.waitForTextByCss('#locale-selection-dropdown', 'English (US)');
  },

  'step 5 - Validate registration create account title': (driver) => {
    driver.waitForTextByCss('#registration-title', 'Create your account');
  },

  'step 6 - Validate registration email pre text': (driver) => {
    driver.waitForAttributeContainsByCss('#email', 'placeholder', 'Enter your work email');
  },

  'step 7 - Validate registration next button text': (driver) => {
    driver.waitForTextByCss('#submit-button', 'NEXT');
  },

  'step 8 - Validate registration already registered text': (driver) => {
    driver.waitForTextByCss('#already-registered', 'Already registered?Log in');
  },

  'step 9 - Validate registration general links': (driver) => {
    driver.waitForTextByCss('#help-center-link', 'Help Center');
    driver.waitForTextByCss('#terms-of-use-link', 'Terms of Use');
    driver.waitForTextByCss('#privacy-policy-link', 'Global Privacy Policy');
    driver.waitForTextByCss('#copyrights', '©2019 CWT');
  },

//    ---------------------------------- Active links ----------------------------------

  'step 11 - Click on registration down login link': (driver) => {
    driver.waitAndClickByCss('#already-registered-login-link');
    // validate login URL
    driver.waitForUrlToContain('https://accounts.stage-mycwt.com',20000);
    // and back to registration
    driver.url(driver.globals.urls.sign_up_url);
  },

  'step 12 - Validate registration help center link': (driver) => {
    driver.useCss();
    driver.waitForAttributeContains('#help-center-link', 'href', 'http://help.mycwt.com/');
  },

  'step 13 - Validate registration terms of use link': (driver) => {
    // driver.waitForAttributeContains('#terms-of-use-link', 'href', 'www.carlsonwagonlit.com/global/en/legal/platform-terms-of-use/'); //TODO: links are not updates at the moment.
  },

  'step 14 - Validate registration global privacy policy link': (driver) => {
    // driver.waitForAttributeContains('#privacy-policy-link', 'href', 'www.carlsonwagonlit.com/content/cwt/global/en/legal/global-privacy-policy.html'); //TODO: links are not updates at the moment.
  },

  // TODO: Cannot find chat element at the moment
  // 'step 15 - Click on support chat button': (driver) => {
  //   driver.waitAndClick('//*[@id="right"]/div[3]/form/p/a');
  // },
  //
  // 'step 16 - Validate support chat dialog': (driver) => {
  //   driver.waitForText('//*[@id="right"]/div[4]/ul/li[7]', '©2018 CWT');
  // },

//    ---------------------------------- Validations ----------------------------------

  'step 17 - Click on registration next button': (driver) => {
    driver.waitAndClickByCss('#submit-button');
  },

  'step 18 - Validate registration valid email is required message appear': (driver) => {
    driver.useXpath();
    driver.waitForText('//*[@id="pfRegEmail"]/p', 'Please enter a valid email address.');
  },

  'step 19 - Add invalid email address in the email field': (driver) => {
    driver.waitAndSetValue('//*[@id="email"]', 'blabla');
  },

  'step 20 - Click on registration next button': (driver) => {
    driver.waitAndClickByCss('#submit-button');
  },

  'step 21 - Validate registration valid email is required message appear': (driver) => {
    driver.useXpath();
    driver.waitForText('//*[@id="pfRegEmail"]/p', 'Please enter a valid email address.');
  },

  'step 22 - Add non existing email address in the email field': (driver) => {
    driver.clearValue('//*[@id="email"]');
    driver.waitAndSetValue('//*[@id="email"]', fakeAccount);
  },

  'step 23 - Click on registration next button': (driver) => {
    driver.waitAndClickByCss('#submit-button');
  },

  'step 24 - Validate registration non existing email message appear': (driver) => {
    driver.useXpath();
    driver.waitForAttributeContains('//*[@id="right"]/div[2]/div/i', 'class', 'icon-email-sent');
    driver.waitForText('//*[@id="right"]/div[2]/div/h3', 'Check your email');
    driver.waitForText('//*[@id="right"]/div[2]/div/p[1]', 'We sent you an email\nwith instructions on how to register your account.\nIt may take few minutes to come through.');
    driver.waitForText('//*[@id="right"]/div[2]/div/p[2]', 'Didn\'t get the email?\nCheck your spam folder or re-send email');
    // Click on re-send button
    driver.waitAndClick('//*[@id="right"]/div[2]/div/p[2]/a');
    // TODO: need to discover "Email sent" element. (sergey fix, wait for IDM deploy)
    // driver.useCss();
    // driver.waitForText('#emailSentMsg', "Email sent");
    driver.useXpath();
    driver.waitForText('//*[@id="right"]/div[2]/div/p[2]/a', "re-send email");
    // and back to registration
    driver.url(driver.globals.urls.sign_up_url);
  },

  'step 25 - Navigate browser to the non existing email': (driver) => {
    driver.url(driver.globals.urls.mailtest_url + fakeAccount);
  },

  'step 26 - Validate non existing email display': (driver) => {
    driver.useXpath();
    driver.isElementExistWithRefresh('/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[1]/td/p/img', 6, 5000);
    driver.waitForAttributeContains('/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[1]/td/p/img', 'src', 'https://cdn.worldmate.com/ping-images/mycwt-logo-rebranded.png');
    driver.waitForText('/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[2]/td/h2', 'Hi Traveler');
    driver.waitForText('/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[2]/td/p[1]', "You are receiving this email because you recently tried to register for a myCWT account. Unfortunately, we couldn't find your email address in our records.");
    driver.waitForText('/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[2]/td/p[2]', 'To resolve this issue, please contact your corporate travel manager or the person who normally arranges your travel and ask them to verify the work email address in your myCWT Portrait profile.');
    driver.waitForText('/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[2]/td/p[3]', 'If you encounter issues registering your myCWT account, please contact our Help Center team for assistance.');
    driver.waitForText('/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[2]/td/p[4]', "If you didn't try to create an account for "+fakeAccount+", don't worry - we haven't done anything, and you can safely ignore this message.");
    driver.waitForText('/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[2]/td/p[5]', 'Thank you,\nThe myCWT Team');
    driver.waitForText('/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr[1]/td', 'Need help?\nContact our Help Center and we’ll be happy to answer your questions');
    driver.waitForText('/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr[2]/td/span', "You are receiving this email because your company uses CWT as its travel management company. CWT is committed to protecting the personal data of our clients' travelers. Your company has authorized the use of this data.");
    driver.waitForText('/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr[3]/td/a[1]', 'Terms of use');
    driver.waitForAttributeContains('/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr[3]/td/a[1]', 'href', 'http://www.carlsonwagonlit.com/content/cwt/global/en/legal/terms-of-use.html');
    driver.waitForText('/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr[3]/td/a[2]', 'Global Privacy Policy');
    driver.waitForAttributeContains('/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr[3]/td/a[2]', 'href', 'http://www.carlsonwagonlit.com/content/cwt/global/en/legal/global-privacy-policy.html');
    // and back to registration
    driver.url(driver.globals.urls.sign_up_url);
  },

  'step 27 - Add already registered email address': (driver) => {
    driver.waitAndSetValue('//*[@id="email"]', alreadyRegistered);
  },

  'step 28 - Click on registration next button': (driver) => {
    driver.waitAndClickByCss('#submit-button');
  },

  'step 29 - Validate registration already registered message appear': (driver) => {
    driver.waitForAttributeContainsByXpath('//*[@id="right"]/div[2]/div/i', 'class', 'icon-email-sent');
    driver.waitForTextByCss('#registration-check-email-title', 'Check your email');
    driver.waitForTextByCss('#registration-page-check-email-description', 'We sent you an email to\n'+alreadyRegistered+'\nwith instructions on how to register your account.\nIt may take few minutes to come through.');
    driver.waitForTextByXpath('//*[@id="right"]/div[2]/div/p[2]', "Didn't get the email?\nCheck your spam folder or re-send email");
  },

  'step 30 - Navigate browser to the already registered account': (driver) => {
    driver.url(driver.globals.urls.mailtest_url + alreadyRegistered);
  },

  'step 31 - Validate already registered account email': (driver) => {
    driver.isElementExistWithRefresh('/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[2]/td/div/p[1]/span[2]', 6, 5000);
    driver.waitForAttributeContains('/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[1]/td/p/img', 'src', 'https://cdn.worldmate.com/ping-images/mycwt-logo-rebranded.png');
    driver.waitForText('/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[2]/td/h2', 'Hi FirstName PPWa');
    driver.waitForText('/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[2]/td/p[1]', "You recently tried to create an account with myCWT but your email address, "+alreadyRegistered+", is already registered for the following account:");
    driver.waitForText('/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[2]/td/div/p[1]/span[1]', 'Employee name:');
    driver.waitForText('/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[2]/td/div/p[1]/span[2]', 'FirstName PPWa LastName hMyo');
    driver.waitForText('/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[2]/td/div/p[2]/span[1]', "Username:");
    driver.waitForText('/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[2]/td/div/p[2]/span[2]', 'automation-account2');
    driver.waitForText('/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[2]/td/p[2]', 'Login to your account If you forgot the password for this account, please follow the instruction on the Password Reset page.');
    driver.waitForText('/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[2]/td/p[3]', "If you still encounter issues logging into your account, please contact our Help Center team for assistance.");
    driver.waitForText('/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[2]/td/p[4]', "If you didn't try to create an account for "+ alreadyRegistered+", don't worry - we haven't done anything, and you can safely ignore this message.");
    driver.waitForText('/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[2]/td/p[5]', 'Thank you,\nThe myCWT Team');
    driver.waitForText('/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr[1]/td', 'Need help?\nContact our Help Center and we’ll be happy to answer your questions');
    driver.waitForText('/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr[2]/td/span', "You are receiving this email because your company uses CWT as its travel management company. CWT is committed to protecting the personal data of our clients' travellers. Your company has authorized the use of this data.");
    driver.waitForText('/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr[3]/td/a[1]', 'Terms of use');
    driver.waitForAttributeContains('/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr[3]/td/a[1]', 'href', 'http://www.carlsonwagonlit.com/content/cwt/global/en/legal/terms-of-use.html');
    driver.waitForText('/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr[3]/td/a[2]', 'Global Privacy Policy');
    driver.waitForAttributeContains('/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr[3]/td/a[2]', 'href', 'http://www.carlsonwagonlit.com/content/cwt/global/en/legal/global-privacy-policy.html');
    // and back to registration
    driver.url(driver.globals.urls.sign_up_url);
  },

//    ---------------------------------- Multiple account user ----------------------------------

  'step 31.1 - Add multiple accounts email address in the email field': (driver) => {      //TODO: Multiple account not working at the moment.
    driver.waitAndSetValueByCss('#email', multipleAccounts);
  },

  'step 32 - Click on registration next button': (driver) => {
    driver.waitAndClickByCss('#submit-button');
  },

  'step 33 - Validate check your email message appear': (driver) => {
    driver.waitForAttributeContainsByXpath('//*[@id="right"]/div[2]/div/i', 'class', 'icon-email-sent');
    driver.waitForTextByCss('#registration-check-email-title', 'Check your email');
    driver.waitForTextByCss('#registration-page-check-email-description', 'We sent you an email to\n'+multipleAccounts+'\nwith instructions on how to register your account.\nIt may take few minutes to come through.');
    driver.waitForTextByXpath('//*[@id="right"]/div[2]/div/p[2]', "Didn't get the email?\nCheck your spam folder or re-send email");
  },

  'step 34 - Navigate browser to the multiple accounts email': (driver) => {
    driver.url(driver.globals.urls.mailtest_url + multipleAccounts);
  },

  'step 35 - Validate multiple accounts email': (driver) => {
    // TODO: Pause and refresh temporary until we can find uniq element on multiple account email content.
    driver.pause(5000);
    driver.refresh();
    driver.isElementExistWithRefresh('/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[1]/td/p/img', 6, 5000);
    driver.waitForAttributeContains('/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[1]/td/p/img', 'src', 'https://cdn.worldmate.com/ping-images/mycwt-logo-rebranded.png');
    // TODO: have a defect, some of the text is not in the email. (DE9085)
    // driver.waitForText('/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[2]/td/p[1]', 'You recently requested registration for a CWT Account. However, your email address, '+multipleAccounts+', is associated with multiple accounts.');
    driver.waitForText('/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[2]/td/p[2]', "In order to continue, check the list of your accounts and choose the ones you would like to register.");
    driver.waitForText('/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/a', 'SHOW ACCOUNTS');
    driver.waitForText('/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[2]/td/p[4]', "If you didn't try to create an account for "+multipleAccounts+", don't worry - we haven't done anything, and you can safely ignore this message.");
    driver.waitForText('/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[2]/td/p[5]', "Thank you,\n" + "The myCWT Team");
    driver.waitForText('/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr[1]/td', 'Need help?\nContact our Help Center and we’ll be happy to answer your questions');
    driver.waitForText('/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr[2]/td/span', "You are receiving this email because your company uses CWT as its travel management company. CWT is committed to protecting the personal data of our clients' travelers. Your company has authorized the use of this data.");
    driver.waitForText('/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr[3]/td/a[1]', "Terms of use");
    driver.waitForText('/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr[3]/td/a[2]', "Global Privacy Policy");
    driver.waitForAttributeContains('/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr[3]/td/a[1]', 'href', 'http://www.carlsonwagonlit.com/content/cwt/global/en/legal/terms-of-use.html');
    driver.waitForAttributeContains('/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr[3]/td/a[2]', 'href', 'http://www.carlsonwagonlit.com/content/cwt/global/en/legal/global-privacy-policy.html');
    driver.waitForText('/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[2]/td/h2', 'Hi Traveler');
  },

  'step 36 - Click on show accounts button in the email': (driver) => {
    driver.useCss();
    driver.waitAndClick('.activation-button');
    driver.switchToTab(1);
  },

  'step 37 - Validate multiple accounts registration screen': (driver) => {
    driver.useXpath();
    driver.waitForText('//*[@id="right"]/div[1]/ul/li/a/span', 'Log in');
    driver.waitForAttributeContains('//*[@id="right"]/div[1]/ul/li/a', 'href', 'https://travel.stage-mycwt.com');
    driver.waitForAttributeContains('//*[@id="right"]/div[2]/div[1]/p[1]/i', 'class', 'icon-accounts');
    driver.waitForText('//*[@id="right"]/div[2]/div[1]/h3/span', 'Multiple accounts registration');
    driver.waitForText('//*[@id="right"]/div[2]/div[1]/p[2]/span', 'Your email address is associated with multiple travel accounts. Please select the account you wish to register.');
    driver.waitForText('//*[@id="right"]/div[2]/div[1]/p[3]/span', 'You will be able to come back to this page and register any of the remaining accounts listed below.');
    driver.waitForText('//*[@id="right"]/div[3]/ul/li[1]/a', 'Help Center');
    driver.waitForAttributeContains('//*[@id="right"]/div[3]/ul/li[1]/a', 'href', 'http://help.mycwt.com/');
    driver.waitForText('//*[@id="right"]/div[3]/ul/li[3]/a', 'Terms of Use');
    driver.waitForAttributeContains('//*[@id="right"]/div[3]/ul/li[3]/a', 'href', '//www.carlsonwagonlit.com/content/cwt/global/en/legal/terms-of-use.html');
    driver.waitForText('//*[@id="right"]/div[3]/ul/li[5]/a/span', 'Global Privacy Policy');
    driver.waitForAttributeContains('//*[@id="right"]/div[3]/ul/li[5]/a', 'href', '//www.carlsonwagonlit.com/content/cwt/global/en/legal/global-privacy-policy.html');
    driver.waitForText('//*[@id="right"]/div[3]/ul/li[7]', '©2017 CWT');
  },

  'step 38 - Validate all user accounts display in the accounts list': (driver) => {
    // First user full check
    driver.waitForText('//*[@id="right"]/div[2]/div[2]/div[1]/h3/span', 'Suggested account');
    driver.waitForAttributeContains('//*[@id="right"]/div[2]/div[2]/div[1]/div/div/div/div[1]/i', 'class', 'icon-userGrey');
    driver.waitForText('//*[@id="right"]/div[2]/div[2]/div[1]/div/div/div/div[2]/h3', 'FirstName new LastName new');
    driver.waitForText('//*[@id="right"]/div[2]/div[2]/div[1]/div/div/div/div[2]/div[1]', 'Selenium top\nSelenium sub');
    driver.waitForText('//*[@id="right"]/div[2]/div[2]/div[1]/div/div/div/div[2]/div[2]', 'Employee ID:\nUserName: '+multipleAccounts);
    // All other users
    driver.waitForText('//*[@id="right"]/div[2]/div[2]/div[2]/div[1]/div/div/div[2]/h3', 'FirstName pwIM LastName MorW');
    driver.waitForText('//*[@id="right"]/div[2]/div[2]/div[2]/div[2]/div/div/div[2]/h3', 'Multiple Four');
    driver.waitForText('//*[@id="right"]/div[2]/div[2]/div[2]/div[3]/div/div/div[2]/h3', 'Multiple Five Five');
    driver.waitForText('//*[@id="right"]/div[2]/div[2]/div[2]/div[4]/div/div/div[2]/h3', 'Multiple Six Six');
    driver.waitForText('//*[@id="right"]/div[2]/div[2]/div[2]/div[5]/div/div/div[2]/h3', 'Multiple Seven Seven');
  },

  'step 39 - Validate all accounts current state': (driver) => {
    // First active account
    driver.waitForAttributeContains('//*[@id="right"]/div[2]/div[2]/div[1]/div/span/i', 'class', 'cwt-icon-checked');
    driver.waitForText('//*[@id="right"]/div[2]/div[2]/div[1]/div/span', 'Registered');
    // Second active account
    driver.waitForAttributeContains('//*[@id="right"]/div[2]/div[2]/div[2]/div[1]/span/i', 'class', 'cwt-icon-checked');
    driver.waitForText('//*[@id="right"]/div[2]/div[2]/div[2]/div[1]/span', 'Registered');
    // Inactive account
    // driver.waitForAttributeContains('//*[@id="right"]/div[2]/div[2]/div[2]/div[5]/span/i', 'class', 'cwt-icon-non-active');
    // driver.waitForText('//*[@id="right"]/div[2]/div[2]/div[2]/div[5]/span', 'Inactive');
  },

  'step 40 - Click on one of the available for registration accounts': (driver) => {
    driver.waitAndClick('//*[@id="right"]/div[2]/div[2]/div[2]/div[2]/div/div[1]');
  },

  'step 41 - Validate getting we sent you an email message on the account box': (driver) => {
    driver.waitForAttributeContains('//*[@id="right"]/div[2]/div[2]/div[2]/div[2]/span/i', 'class', 'cwt-icon-email');
    driver.waitForText('//*[@id="right"]/div[2]/div[2]/div[2]/div[2]/span/span[1]', 'We sent you an email with instructions on how to register this account.');
    driver.waitForText('//*[@id="right"]/div[2]/div[2]/div[2]/div[2]/span/a/span', 'Re-send email');
  },

  'step 42 - Navigate browser to the activate specific account email': (driver) => {
    driver.url(driver.globals.urls.mailtest_url + multipleAccounts);
  },

  'step 43 - Validate activate account email display as expected': (driver) => {
    driver.isElementExistWithRefresh('/html/body/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[2]/td/h2', 6, 5000);
    driver.waitForAttributeContains('/html/body/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[1]/td/p/img', 'src', 'https://cdn.worldmate.com/ping-images/mycwt-logo-rebranded.png');
    driver.waitForText('/html/body/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[2]/td/h2', 'Hi Multiple');
    driver.waitForText('/html/body/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[2]/td/p[1]', 'Welcome to myCWT. Please click the button below to verify your email address and activate your account.');
    driver.waitForText('/html/body/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[2]/td/div/p/span[1]', 'Employee name:');
    driver.waitForText('/html/body/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[2]/td/div/p/span[2]', 'Multiple Four');
    driver.waitForText('/html/body/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/a', 'ACTIVATE ACCOUNT');
    driver.waitForText('/html/body/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[2]/td/p[3]', "If you didn't try to create an account for "+multipleAccounts+", don't worry - we haven't done anything, and you can safely ignore this message.");
    driver.waitForText('/html/body/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[2]/td/p[4]', 'Thank you,\nThe myCWT Team');
    driver.waitForText('/html/body/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr[1]/td', "Need help?\nContact our Help Center and we’ll be happy to answer your questions");
    driver.waitForText('/html/body/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr[2]/td/span', "You are receiving this email because your company uses CWT as its travel management company. CWT is committed to protecting the personal data of our clients' travelers. Your company has authorized the use of this data.");
    driver.waitForText('/html/body/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr[3]/td/a[1]', 'Terms of use');
    driver.waitForText('/html/body/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr[3]/td/a[2]', 'Global Privacy Policy');
    driver.waitForAttributeContains('/html/body/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr[3]/td/a[1]', 'href', 'http://www.carlsonwagonlit.com/content/cwt/global/en/legal/terms-of-use.html');
    driver.waitForAttributeContains('/html/body/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr[3]/td/a[2]', 'href', 'http://www.carlsonwagonlit.com/content/cwt/global/en/legal/global-privacy-policy.html');
    driver.back();
  },

  'step 44 - Click on one of the available for registration account': (driver) => {
    driver.waitAndClick('//*[@id="right"]/div[2]/div[2]/div[2]/div[2]/div/div[1]');
  },

  'step 45 - Click on re-send email button on the account box': (driver) => {
    driver.waitAndClick('//*[@id="right"]/div[2]/div[2]/div[2]/div[2]/span/a/span');
    driver.pause(1000);
  },

  'step 46 - Validate "email sent" message appear for 3 seconds': (driver) => {
    driver.waitForText('//*[@id="right"]/div[2]/div[2]/div[2]/div[2]/span', 'Email sent');
    driver.closeWindow();
    driver.switchToTab(0);
  },

  'step 47 - Validate activate account email content': (driver) => {
    driver.isElementExistWithRefresh('/html/body/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[2]/td/h2', 6, 5000);
    driver.waitForText('/html/body/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[2]/td/h2', 'Hi Multiple');
    // back to registration
    driver.url(driver.globals.urls.sign_up_url);
  },

//    ---------------------------------- Set username and password screen - invalid username ----------------------------------

  'step 48 - Add unregistered account in the registration email field': (driver) => {
    driver.waitAndSetValueByCss('#email', unregisteredAccount);
  },

  'step 49 - Click on registration next button': (driver) => {
    driver.waitAndClickByCss('#submit-button');
  },

  'step 50 - Navigate browser to the unregistered account activation email': (driver) => {
    driver.pause(3000);
    driver.url(driver.globals.urls.mailtest_url + unregisteredAccount);
  },

  'step 51 - Click on activate account button in the unregistered activation email': (driver) => {
    // TODO: Pause and refresh temporary until we can find unique element on multiple account email content.
    driver.pause(5000);
    driver.refresh();
    driver.isElementExistWithRefresh('/html/body/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/a', 6, 5000);
    driver.useCss();
    driver.waitAndClick(".activation-button");
    driver.switchToTab(1);
  },

  'step 52 - Validate user email display in username field': (driver) => {
    driver.useXpath();
    driver.waitForAttributeContains('//*[@id="newUsername"]', 'value', unregisteredAccount);
  },

  'step 53 - Clear username field from the existing username': (driver) => {
    driver.useCss();
    driver.clearValue('#newUsername');
  },

  'step 54 - Validate username pre-text display': (driver) => {
    driver.waitForAttributeContains('#newUsername', 'placeholder', 'Six or more characters long');
  },

  'step 55 - Click on username field': (driver) => {
    driver.waitAndClick('#newUsername');
  },

  // 'step 56 - Validate changing your username tooltip appear': (driver) => {
  //   driver.waitForText('.m-b-xs', 'Changing your username');
  //   driver.waitForText('.m-b-0', 'Username other than your work email will prevent you from using myCWT.');
  // },

  'step 57 - Add valid password in password field': (driver) => {
    driver.waitAndSetValue('#newPassword', 'pa$$word1');
  },

  'step 58 - Add less than 6 characters in the username field': (driver) => {
    driver.waitAndSetValue('#newUsername', 'user');
  },

  'step 59 - Click on registration sign up button': (driver) => {
    driver.useXpath();
    driver.waitAndClick('//*[@id="right"]/div[3]/form/div[5]/div/button');
  },

  'step 60 - Validate at least 6 characters message appear': (driver) => {
    // message icon
    driver.waitForAttributeContains('//*[@id="pfRegUsername"]/p/i', 'class', 'cwt-icon-alert');
    // message text
    driver.waitForText('//*[@id="pfRegUsername"]/p', 'Your username should be at least 6 characters long.');
  },

  'step 61 - Clear username field from the existing username': (driver) => {
    driver.useCss();
    driver.clearValue('#newUsername');
  },

  'step 62 - Add already existing username in the username field': (driver) => {
    driver.waitAndSetValue('#newUsername', existAccount);
  },

  'step 63 - Click on registration sign up button': (driver) => {
    driver.useXpath();
    driver.waitAndClick('//*[@id="right"]/div[3]/form/div[5]/div/button');
  },

  'step 64 - Validate username already exists message appear': (driver) => {
    // message icon
    // driver.waitForAttributeContains('//*[@id="newPass-help-block"]/i', 'class', 'cwt-icon');   //TODO: missing this message, did we remove it?
    // // message text
    // driver.useCss();
    // driver.waitForTextByCss('#newPass-help-block', 'This username already exists. Please choose a different one.');
    //back to registration
    driver.url(driver.globals.urls.sign_up_url);
  },

//    ---------------------------------- Set username and password screen - invalid password ----------------------------------

  'step 65 - Add unregistered account in the registration email field': (driver) => {
    driver.waitAndSetValueByCss('#email', unregisteredAccount);
  },

  'step 66 - Click on registration next button': (driver) => {
    driver.waitAndClickByCss('#submit-button');
  },

  'step 67 - Navigate browser to the unregistered account activation email': (driver) => {
    driver.url(driver.globals.urls.mailtest_url + unregisteredAccount);
  },

  'step 68 - Click on activate account button in the unregistered activation email': (driver) => {
    // TODO: Pause and refresh temporary until we can find unique element on multiple account email content.
    driver.pause(5000);
    driver.refresh();
    driver.isElementExistWithRefresh('/html/body/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/a', 6, 5000);
    driver.useCss();
    driver.waitAndClick(".activation-button");
    driver.switchToTab(2);
  },

  'step 69 - Validate user email display in username field': (driver) => {
    driver.useXpath();
    driver.waitForAttributeContains('//*[@id="newUsername"]', 'value', unregisteredAccount);
  },

// ---- Empty password ----

  'step 70 - Click on registration sign up button': (driver) => {
    driver.waitAndClick('//*[@id="right"]/div[3]/form/div[5]/div/button');
  },

  'step 71 - Validate user email display in username field': (driver) => {
    driver.waitForAttributeContains('//*[@id="pfRegPassword"]/p/i', 'class', 'cwt-icon-alert');
    driver.waitForText('//*[@id="pfRegPassword"]/p', 'Your password does not meet the password policy');
  },

  'step 72 - Click on on password field': (driver) => {
    driver.useCss();
    driver.waitAndClick('#newPassword');
  },

  'step 73 - Validate password policy tooltip appear': (driver) => {
    driver.waitAndClick('#newPassword');
    driver.waitForText('.popover', "Password policy\nMust be 8-32 characters long\nMust contain a combination of letters, numbers and symbols.\nMust be different from your username\nMust be different from 5 previous passwords");
  },

// ---- Less than 8 characters ----

  'step 74 - Add less than 8 characters in the password field': (driver) => {
    driver.waitAndSetValue('#newPassword', 'pass1@');
  },

  'step 75 - Click on registration sign up button': (driver) => {
    driver.useXpath();
    driver.waitAndClick('//*[@id="right"]/div[3]/form/div[5]/div/button');
  },

  'step 76 - Validate password policy message appear': (driver) => {
    // message icon
    driver.waitForAttributeContains('//*[@id="pfRegPassword"]/p/i', 'class', "cwt-icon-alert");
    // message text
    driver.waitForText('//*[@id="pfRegPassword"]/p', 'Your password does not meet the password policy');
  },

// ---- More than 32 characters ----

  'step 77 - Add more than 32 characters in the password field': (driver) => {
    driver.useCss();
    driver.clearValue('#newPassword');
    driver.waitAndSetValue('#newPassword', 'password1@password1@password1@password1@');
  },

  'step 78 - Click on registration sign up button': (driver) => {
    driver.useXpath();
    driver.waitAndClick('//*[@id="right"]/div[3]/form/div[5]/div/button');
  },

  'step 79 - Validate password policy message appear': (driver) => {
    // message icon
    driver.waitForAttributeContains('//*[@id="pfRegPassword"]/p/i', 'class', "cwt-icon-alert");
    // message text
    driver.waitForText('//*[@id="pfRegPassword"]/p', 'Your password does not meet the password policy');
  },
// TODO: change to non-alphnumeric
// ---- Missing special characters ----

  'step 80 - Add password missing numbers or special characters in the password field': (driver) => {
    driver.useCss();
    driver.clearValue('#newPassword');
    driver.waitAndSetValue('#newPassword', 'onlycharpass');
  },

  'step 81 - Click on registration sign up button': (driver) => {
    driver.useXpath();
    driver.waitAndClick('//*[@id="right"]/div[3]/form/div[5]/div/button');
  },

  'step 82 - Validate password policy message appear': (driver) => {
    // message icon
    driver.waitForAttributeContains('//*[@id="newPass-help-block"]/i', 'class', "icon-alert");
    // message text
    driver.waitForTextByCss('#newPass-help-block', 'Your password does not meet the password policy');
  },

// ---- Using username as password ----

  'step 83 - Add password missing numbers or special characters in the password field': (driver) => {
    driver.useCss();
    driver.clearValue('#newPassword');
    driver.waitAndSetValue('#newPassword', unregisteredAccount);
  },

  'step 84 - Click on registration sign up button': (driver) => {
    driver.useXpath();
    driver.waitAndClick('//*[@id="right"]/div[3]/form/div[5]/div/button');
  },

  'step 85 - Validate password policy message appear': (driver) => {
    // message icon
    driver.waitForAttributeContains('//*[@id="newPass-help-block"]/i', 'class', "icon-alert");
    // message text
    driver.waitForTextByCss('#newPass-help-block', 'Your password does not meet the password policy');
  },

//    ---------------------------------- Activate account link expiration ----------------------------------

  // TODO: need to validate why expired email no longer expired (talk to roy)
  // TODO: validate we have a test for more than 1 click on the link + expiration with time.
  // 'step 86 - Navigate browser to the expired account activation email': (driver) => {
  //   driver.url(driver.globals.urls.mailtest_url + expiredAccount);
  // },
  //
  // 'step 87 - Click on activate account button in the expired account activation email': (driver) => {
  //   driver.useCss();
  //   driver.isElementExistWithRefresh('.activation-button', 6, 5000);
  //   driver.waitAndClick('.activation-button');
  //   driver.switchToTab(1);
  // },
  //
  // 'step 88 - Validate expired activation screen display as expected': (driver) => {
  //   driver.useXpath();
  //   driver.isElementExistWithRefresh('//*[@id="right"]/div[1]/div/i', 6, 5000);
  //   driver.waitForAttributeContains('//*[@id="right"]/div[1]/div/i', 'class', "icon-big-alert");
  //   driver.waitForText('//*[@id="right"]/div[1]/div/h3', 'This email link has expired');
  //   driver.waitForText('//*[@id="right"]/div[1]/div/p[1]', 'Looks like the link you clicked on expired. Click the button below to get a new link');
  //   driver.waitForText('//*[@id="right"]/div[1]/div/div/button', 'RESEND LINK');
  //   driver.waitForText('//*[@id="right"]/div[1]/div/p[2]/a', 'Return to signup');
  //   driver.waitForAttributeContains('//*[@id="right"]/div[1]/div/p[2]/a', 'href', "/ext/reg/Registration?adapterId=UserReg");
  //   // Down links
  //   driver.waitForText('//*[@id="right"]/div[2]/ul/li[1]/a', 'Help Center');
  //   driver.waitForAttributeContains('//*[@id="right"]/div[2]/ul/li[1]/a', 'href', "http://help.mycwt.com/");
  //   driver.waitForText('//*[@id="right"]/div[2]/ul/li[3]/a', 'Terms of Use');
  //   driver.waitForAttributeContains('//*[@id="right"]/div[2]/ul/li[3]/a', 'href', "http://www.carlsonwagonlit.com/content/cwt/global/en/legal/terms-of-use.html");
  //   driver.waitForText('//*[@id="right"]/div[2]/ul/li[5]/a', 'Global Privacy Policy');
  //   driver.waitForAttributeContains('//*[@id="right"]/div[2]/ul/li[5]/a', 'href', "http://www.carlsonwagonlit.com/content/cwt/global/en/legal/global-privacy-policy.html");
  //   driver.waitForText('//*[@id="right"]/div[2]/ul/li[7]', '©2017 CWT');
  // },
};
