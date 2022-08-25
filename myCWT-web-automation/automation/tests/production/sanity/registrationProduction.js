'use strict';

const globals = require('../../../nightwatch.globals');

module.exports = {

  '@tags': ['IDM', 'login', 'production'],

  before: function (browser) {
    browser.windowMaximize();
  },

  'step 1 - Navigate to prod registration URL': (browser) => {
    browser
      .url(globals.urls.prod_sign_up_url);
  },

//    ---------------------------------- UI Check ----------------------------------

  // 'step 2 - Validate registration icons': (browser) => {
  //   browser
  //     //cwt logo
  //     // .waitForAttributeContainsByXpath('//*[@id="left"]/div[2]/div[1]/div/div/img', 'src', 'https://cdn.worldmate.com/ping-images/my-cwt-logo-2019.svg')
  //     //email icon
  //     .waitForAttributeContainsByXpath('//*[@id="pfRegEmail"]/i', 'class', 'cwt-icon-email');
  // },
  //
  // 'step 3 - Validate registration main title text': (browser) => {
  //   browser
  //     .waitForTextByXpath('//*[@id="left"]/div[2]/div[1]/div/div/h1', 'Welcome to myCWT,\nyour gateway to business travel');
  // },
  //
  // 'step 4 - Validate registration language text (English(US))': (browser) => {
  //   browser
  //     .waitForTextByCss('#locale-selection-dropdown', 'English (US)');
  // },

  'step 5 - Validate registration create account title': (browser) => {
    browser
      .waitForTextByCss('#registration-title', 'Create your account');
  },

  'step 6 - Validate registration email pre text': (browser) => {
    browser
      .waitForAttributeContainsByCss('#email', 'placeholder', 'Enter your work email');
  },

  'step 7 - Validate registration next button text': (browser) => {
    browser
      .waitForTextByCss('#submit-button', 'NEXT');
  },

  'step 8 - Validate registration already registered text': (browser) => {
    browser
      .waitForTextByCss('#already-registered', 'Already registered?Log in');
  },

  'step 9 - Validate registration general links': (browser) => {
    browser
      .waitForTextByCss('#help-center-link', 'Help Center')
      .waitForTextByCss('#terms-of-use-link', 'Terms of Use')
      .waitForTextByCss('#privacy-policy-link', 'Global Privacy Policy')
      .waitForTextByCss('#copyrights', '©2020 CWT');
  },

//    ---------------------------------- Active links ----------------------------------

  // 'step 10 - Click on registration up login link': (browser) => {     //TODO: up login removed.
  //   browser.useXpath();
  //   .waitAndClickByXpath('//*[@id="right"]/div[1]/ul/li[1]/a');
  //   // validate login URL
  //   .waitForUrlToContain('travel.mycwt.com/login',20000);
  //   // and back to registration
  //   .pause(1000);
  //   .url(globals.urls.prod_sign_up_url);
  // },

  'step 11 - Click on registration down login link': (browser) => {
    browser
      .waitAndClickByCss('#already-registered-login-link')
      // validate login URL
      .waitForUrlToContain('travel.mycwt.com/login',20000)
      // and back to registration
      .url(globals.urls.prod_sign_up_url);
  },

  'step 12 - Validate registration help center link': (browser) => {
    browser
      .waitForAttributeContainsByCss('#help-center-link', 'href', 'http://help.mycwt.com/');
  },

  'step 13 - Validate registration terms of use link': (browser) => {
    browser
      .waitForAttributeContainsByCss('#terms-of-use-link', 'href', 'www.mycwt.com/global/en/legal/platform-terms-of-use/');
  },

  'step 14 - Validate registration global privacy policy link': (browser) => {
    browser
      .waitForAttributeContainsByCss('#privacy-policy-link', 'href', 'www.mycwt.com/content/cwt/global/en/legal/global-privacy-policy.html');
  },

  // TODO: Cannot find chat element at the moment
  // 'step 15 - Click on support chat button': (browser) => {
  //   browser.waitAndClickByXpath('//*[@id="right"]/div[3]/form/p/a');
  // },
  //
  // 'step 16 - Validate support chat dialog': (browser) => {
  //   browser.waitForTextByXpath('//*[@id="right"]/div[4]/ul/li[7]', '©2018 CWT');
  // },

//    ---------------------------------- Validations ----------------------------------

  'step 17 - Click on registration next button': (browser) => {
    browser
      .waitAndClickByCss('#submit-button');
  },

  'step 18 - Validate registration valid email is required message appear': (browser) => {
    browser
    .waitForTextByXpath('//*[@id="pfRegEmail"]/p', 'Please enter a valid email address.');
  },

  'step 19 - Add invalid email address in the email field': (browser) => {
    browser
      .waitAndSetValueByXpath('//*[@id="email"]', 'blabla');
  },

  'step 20 - Click on registration next button': (browser) => {
    browser
    .waitAndClickByCss('#submit-button');
  },

  'step 21 - Validate registration valid email is required message appear': (browser) => {
    browser
    .waitForTextByXpath('//*[@id="pfRegEmail"]/p', 'Please enter a valid email address.');
  },

  'step 22 - Add non existing email address in the email field': (browser) => {
    browser
      .clearValue('//*[@id="email"]')
    .waitAndSetValueByXpath('//*[@id="email"]', 'prod-fake-email@mailtest.worldmate.com');
  },

  'step 23 - Click on registration next button': (browser) => {
    browser
    .waitAndClickByCss('#submit-button');
  },

  'step 24 - Validate registration non existing email message appear': (browser) => {
    browser
    .waitForAttributeContainsByXpath('//*[@id="right"]/div[1]/div/i', 'class', 'icon-email-sent')
    .waitForTextByXpath('//*[@id="registration-check-email-title"]', 'Check your email')
    .waitForTextByXpath('//*[@id="registration-page-check-email-description"]', 'We sent you an email\nwith instructions on how to register your account.\nIt may take few minutes to come through.')
    .waitForTextByXpath('//*[@id="right"]/div[1]/div/p[2]', 'Didn\'t get the email?\nCheck your spam folder or re-send email')
    // Click on re-send button
    .waitAndClickByXpath('//*[@id="right"]/div[1]/div/p[2]/a')
    // TODO: need to discover "Email sent" element. (sergey fix, wait for IDM deploy)
    // .useCss();
    // .waitForTextByCss('#emailSentMsg', "Email sent");

    .waitForTextByXpath('//*[@id="right"]/div[1]/div/p[2]/a', 're-send email')
    // and back to registration
    .url(globals.urls.prod_sign_up_url);
  },

  'step 25 - Navigate browser to the non existing email': (browser) => {
    browser.url(globals.urls.mailtest_url + 'prod-fake-email@mailtest.worldmate.com');
  },

  'step 26 - Validate non existing email display': (browser) => {
    browser
      .isElementExistWithRefresh('/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[1]/td/p/img', 6, 5000)
      .waitForAttributeContainsByXpath('/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[1]/td/p/img', 'src', 'https://cdn.worldmate.com/ping-images/mycwt-logo-rebranded.png')
      .waitForTextByXpath('/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[2]/td/h2', 'Hi Traveller')
      .waitForTextByXpath('/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[2]/td/p[1]', 'You are receiving this email because you recently tried to register for a myCWT account. Unfortunately, we couldn\'t find your email address in our records.')
      .waitForTextByXpath('/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[2]/td/p[2]', 'To resolve this issue, please contact your corporate travel manager or the person who normally arranges your travel and ask them to verify the work email address in your myCWT Portrait profile.')
      .waitForTextByXpath('/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[2]/td/p[3]', 'If you encounter issues registering your myCWT account, please contact our Help Center team for assistance.')
      .waitForTextByXpath('/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[2]/td/p[4]', 'If you didn\'t try to create an account for prod-fake-email@mailtest.worldmate.com, don\'t worry - we haven\'t done anything, and you can safely ignore this message.')
      .waitForTextByXpath('/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[2]/td/p[5]', 'Thank you,\nThe myCWT Team')
      .waitForTextByXpath('/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr[1]/td', 'Need help?\nContact our Help Center and we’ll be happy to answer your questions')
      .waitForTextByXpath('/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr[2]/td/span', 'You are receiving this email because your company uses CWT as its travel management company. CWT is committed to protecting the personal data of our clients\' travellers. Your company has authorised the use of this data.')
      .waitForTextByXpath('/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr[3]/td/a[1]', 'Terms of use')
      .waitForAttributeContainsByXpath('/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr[3]/td/a[1]', 'href', 'https://www.mycwt.com/legal/terms-of-use.html')
      .waitForTextByXpath('/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr[3]/td/a[2]', 'Global Privacy Policy')
      .waitForAttributeContainsByXpath('/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr[3]/td/a[2]', 'href', 'https://www.mycwt.com/legal/global-privacy-policy')
      // and back to registration
      .url(globals.urls.prod_sign_up_url);
  },

  'step 27 - Add already registered email address': (browser) => {
    browser
      .waitAndSetValueByXpath('//*[@id="email"]', 'automation-6477@mailtest.worldmate.com');
  },

  'step 28 - Click on registration next button': (browser) => {
    browser
      .waitAndClickByCss('#submit-button');
  },

  'step 29 - Validate registration already registered message appear': (browser) => {
    browser
      .waitForAttributeContainsByXpath('//*[@id="right"]/div[2]/div/i', 'class', 'icon-email-sent')
    .waitForTextByCss('#registration-check-email-title', 'Check your email')
    .waitForTextByCss('#registration-page-check-email-description', 'We sent you an email\nwith instructions on how to register your account.\nIt may take few minutes to come through.')
    .waitForTextByXpath('//*[@id="right"]/div[2]/div/p[2]', 'Didn\'t get the email?\nCheck your spam folder or re-send email');
  },

  'step 30 - Navigate browser to the already registered account': (browser) => {
    browser.pause(2000)
    .url(globals.urls.mailtest_url + 'automation-6477@mailtest.worldmate.com')
    .pause(3000);
  },

  'step 31 - Validate already registered account email': (browser) => {
    browser
      .isElementExistWithRefresh('/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[2]/td/div/p[1]/span[2]', 6, 5000)
      .waitForAttributeContainsByXpath('/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[1]/td/p/img', 'src', 'https://cdn.worldmate.com/ping-images/mycwt-logo-rebranded.png')
      .waitForTextByXpath('/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[2]/td/h2', 'Hi Automation reg prod')
      .waitForTextByXpath('/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[2]/td/p[1]', 'You recently tried to create an account with myCWT but your email address, automation-6477@mailtest.worldmate.com, is already registered for the following account:')
      .waitForTextByXpath('/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[2]/td/div/p[1]/span[1]', 'Employee name:')
      .waitForTextByXpath('/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[2]/td/div/p[1]/span[2]', 'Automation reg prod Reg prod')
      .waitForTextByXpath('/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[2]/td/div/p[2]/span[1]', 'Username:')
      .waitForTextByXpath('/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[2]/td/div/p[2]/span[2]', 'automation-6477@mailtest.worldmate.com')
      .waitForTextByXpath('/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[2]/td/p[2]', 'Login to your account If you forgot the password for this account, please follow the instruction on the Password Reset page.')
      .waitForTextByXpath('/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[2]/td/p[3]', 'If you still encounter issues logging into your account, please contact our Help Center team for assistance.')
      .waitForTextByXpath('/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[2]/td/p[4]', 'If you didn\'t try to create an account for automation-6477@mailtest.worldmate.com, don\'t worry - we haven\'t done anything, and you can safely ignore this message.')
      .waitForTextByXpath('/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[2]/td/p[5]', 'Thank you,\nThe myCWT Team')
      .waitForTextByXpath('/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr[1]/td', 'Need help?\nContact our Help Center and we’ll be happy to answer your questions')
      .waitForTextByXpath('/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr[2]/td/span', 'You are receiving this email because your company uses CWT as its travel management company. CWT is committed to protecting the personal data of our clients\' travellers. Your company has authorized the use of this data.')
      .waitForTextByXpath('/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr[3]/td/a[1]', 'Terms of use')
      .waitForAttributeContainsByXpath('/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr[3]/td/a[1]', 'href', 'https://www.mycwt.com/legal/terms-of-use.html')
      .waitForTextByXpath('/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr[3]/td/a[2]', 'Global Privacy Policy')
      .waitForAttributeContainsByXpath('/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr[3]/td/a[2]', 'href', 'https://www.mycwt.com/legal/global-privacy-policy')
      // and back to registration
      .url(globals.urls.prod_sign_up_url);
  },

//    ---------------------------------- Multiple account user ----------------------------------

  'step 31.1 - Add multiple accounts email address in the email field': (browser) => {
    browser
      .waitAndSetValueByCss('#email', 'automation-6270@mailtest.worldmate.com');
  },

  'step 32 - Click on registration next button': (browser) => {
    browser
      .waitAndClickByCss('#submit-button');
  },

  'step 33 - Validate check your email message appear': (browser) => {
    browser
      .waitForAttributeContainsByXpath('//*[@id="right"]/div[2]/div/i', 'class', 'icon-email-sent')
      .waitForTextByXpath('//*[@id="right"]/div[2]/div/h3', 'Check your email')
      .waitForTextByCss('#registration-page-check-email-description', 'We sent you an email\nwith instructions on how to register your account.\nIt may take few minutes to come through.')
      .waitForTextByXpath('//*[@id="right"]/div[2]/div/p[2]', 'Didn\'t get the email?\nCheck your spam folder or re-send email');
  },

  'step 34 - Navigate browser to the multiple accounts email': (browser) => {
    browser
      .pause(2000)
      .url(globals.urls.mailtest_url + 'automation-6270@mailtest.worldmate.com');
  },

  'step 35 - Validate multiple accounts email': (browser) => {
    // TODO: Pause and refresh temporary until we can find unique element on multiple account email content.
    browser
      .pause(5000).refresh()
      .isElementExistWithRefresh('/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[1]/td/p/img', 6, 5000)
      .waitForAttributeContainsByXpath('/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[1]/td/p/img', 'src', 'https://cdn.worldmate.com/ping-images/mycwt-logo-rebranded.png')
      // TODO: have a defect, some of the text is not in the email. (DE9085)
      // .waitForTextByXpath('/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[2]/td/p[1]', 'You recently requested registration for a CWT Account. However, your email address, automation-6269@mailtest.worldmate.com, is associated with multiple accounts.')
      .waitForTextByXpath('/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[2]/td/p[2]', 'In order to continue, check the list of your accounts and choose the ones you would like to register.')
      .waitForTextByXpath('/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/a', 'SHOW ACCOUNTS')
      .waitForTextByXpath('/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[2]/td/p[4]', 'If you didn\'t try to create an account for automation-6270@mailtest.worldmate.com, don\'t worry - we haven\'t done anything, and you can safely ignore this message.')
      .waitForTextByXpath('/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[2]/td/p[5]', 'Thank you,\n' + 'The myCWT Team')
      .waitForTextByXpath('/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr[1]/td', 'Need help?\nContact our Help Center and we’ll be happy to answer your questions')
      .waitForTextByXpath('/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr[2]/td/span', 'You are receiving this email because your company uses CWT as its travel management company. CWT is committed to protecting the personal data of our clients\' travelers. Your company has authorized the use of this data.')
      .waitForTextByXpath('/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr[3]/td/a[1]', 'Terms of use')
      .waitForTextByXpath('/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr[3]/td/a[2]', 'Global Privacy Policy')
      .waitForAttributeContainsByXpath('/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr[3]/td/a[1]', 'href', 'https://www.mycwt.com/legal/terms-of-use.html')
      .waitForAttributeContainsByXpath('/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr[3]/td/a[2]', 'href', 'https://www.mycwt.com/legal/global-privacy-policy')
      .waitForTextByXpath('/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[2]/td/h2', 'Hi Traveler');
  },

  'step 36 - Click on show accounts button in the email': (browser) => {
    browser
      .waitAndClickByCss('.activation-button')
      .switchToTab(1);
  },

  'step 37 - Validate multiple accounts registration screen': (browser) => {
    browser
      .waitForTextByXpath('//*[@id="right"]/div[1]/ul/li/a/span', 'Log in')
      .waitForAttributeContainsByXpath('//*[@id="right"]/div[1]/ul/li/a', 'href', 'https://travel.mycwt.com/')
      .waitForAttributeContainsByXpath('//*[@id="right"]/div[2]/div[1]/p[1]/i', 'class', 'icon-accounts')
      .waitForTextByXpath('//*[@id="right"]/div[2]/div[1]/h3/span', 'Multiple accounts registration')
      .waitForTextByXpath('//*[@id="right"]/div[2]/div[1]/p[2]/span', 'Your email address is associated with multiple travel accounts. Please select the account you wish to register.')
      .waitForTextByXpath('//*[@id="right"]/div[2]/div[1]/p[3]/span', 'You will be able to come back to this page and register any of the remaining accounts listed below.')
      .waitForTextByXpath('//*[@id="right"]/div[3]/ul/li[1]/a', 'Help Center')
      .waitForAttributeContainsByXpath('//*[@id="right"]/div[3]/ul/li[1]/a', 'href', 'http://help.mycwt.com/')
      .waitForTextByXpath('//*[@id="right"]/div[3]/ul/li[3]/a', 'Terms of Use')
      .waitForAttributeContainsByXpath('//*[@id="right"]/div[3]/ul/li[3]/a', 'href', 'http://www.mycwt.com/content/cwt/global/en/legal/terms-of-use.html')
      .waitForTextByXpath('//*[@id="right"]/div[3]/ul/li[5]/a/span', 'Global Privacy Policy')
      .waitForAttributeContainsByXpath('//*[@id="right"]/div[3]/ul/li[5]/a', 'href', 'http://www.mycwt.com/content/cwt/global/en/legal/global-privacy-policy.html')
      .waitForTextByXpath('//*[@id="right"]/div[3]/ul/li[7]', '©2017 CWT');
  },

  'step 38 - Validate all user accounts display in the accounts list': (browser) => {
    // First user full check
    browser
      .waitForTextByXpath('//*[@id="right"]/div[2]/div[2]/div[1]/h3/span', 'Suggested account')
      .waitForAttributeContainsByXpath('//*[@id="right"]/div[2]/div[2]/div[1]/div/div/div/div[1]/i', 'class', 'icon-userGrey')
      .waitForTextByXpath('//*[@id="right"]/div[2]/div[2]/div[1]/div/div/div/div[2]/h3', 'Multiple Prod Two Prod Two')
      .waitForTextByXpath('//*[@id="right"]/div[2]/div[2]/div[1]/div/div/div/div[2]/div[1]', 'CWT Employee Travel\nUS-GEN')
      .waitForTextByXpath('//*[@id="right"]/div[2]/div[2]/div[1]/div/div/div/div[2]/div[2]', 'Employee ID: rgerhrthrfh\nUserName: N/A')
      // All other users
      .waitForTextByXpath('//*[@id="right"]/div[2]/div[2]/div[2]/div[1]/div/div/div[2]/h3', 'Multiple Prod One Prod One')
      .waitForTextByXpath('//*[@id="right"]/div[2]/div[2]/div[2]/div[2]/div/div/div[2]/h3', 'Multiple Prod Three Prod Three')
      .waitForTextByXpath('//*[@id="right"]/div[2]/div[2]/div[2]/div[3]/div/div/div[2]/h3', 'Multiple Prod Four Prod Four');
  },

  'step 39 - Validate all accounts current state': (browser) => {
    // First active account
    browser
      .waitForAttributeContainsByXpath('//*[@id="right"]/div[2]/div[2]/div[2]/div[1]/span/i', 'class', 'cwt-icon-checked')
      .waitForTextByXpath('//*[@id="right"]/div[2]/div[2]/div[2]/div[1]/span', 'Registered')
      // Second active account
      .waitForAttributeContainsByXpath('//*[@id="right"]/div[2]/div[2]/div[2]/div[2]/span/i', 'class', 'cwt-icon-checked')
      .waitForTextByXpath('//*[@id="right"]/div[2]/div[2]/div[2]/div[2]/span', 'Registered');
      // // Inactive account      TODO: activate this once the account display "inactive".
      // .waitForAttributeContainsByXpath('//*[@id="right"]/div[2]/div[2]/div[2]/div[5]/span/i', 'class', 'cwt-icon-non-active');
      // .waitForTextByXpath('//*[@id="right"]/div[2]/div[2]/div[2]/div[5]/span', 'Inactive');
  },

  'step 40 - Click on one of the available for registration accounts': (browser) => {
    browser
      .waitAndClickByXpath('//*[@id="right"]/div[2]/div[2]/div[1]/div/div/div');
  },

  'step 41 - Validate getting we sent you an email message on the account box': (browser) => {
    browser
      .waitForAttributeContainsByXpath('//*[@id="right"]/div[2]/div[2]/div[1]/div/span/i', 'class', 'cwt-icon-email')
      .waitForTextByXpath('//*[@id="right"]/div[2]/div[2]/div[1]/div/span/span', 'We sent you an email with instructions on how to register this account.')
      .waitForTextByXpath('//*[@id="right"]/div[2]/div[2]/div[1]/div/span/a/span', 'Re-send email');
  },

  'step 42 - Navigate browser to the activate specific account email': (browser) => {
    browser
      .url(globals.urls.mailtest_url + 'automation-6270@mailtest.worldmate.com');
  },

  'step 43 - Validate activate account email display as expected': (browser) => {
    browser
      .isElementExistWithRefresh('/html/body/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[2]/td/h2', 6, 5000)
      .waitForAttributeContainsByXpath('/html/body/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[1]/td/p/img', 'src', 'https://cdn.worldmate.com/ping-images/mycwt-logo-rebranded.png')
      .waitForTextByXpath('/html/body/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[2]/td/h2', 'Hi Multiple Prod Two')
      .waitForTextByXpath('/html/body/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[2]/td/p[1]', 'Welcome to myCWT. Please click the button below to verify your email address and activate your account.')
      .waitForTextByXpath('/html/body/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[2]/td/div/p/span[1]', 'Employee name:')
      .waitForTextByXpath('/html/body/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[2]/td/div/p/span[2]', 'Multiple Prod Two Prod Two')
      .waitForTextByXpath('/html/body/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/a', 'ACTIVATE ACCOUNT')
      .waitForTextByXpath('/html/body/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[2]/td/p[3]', 'If you didn\'t try to create an account for automation-6270@mailtest.worldmate.com, don\'t worry - we haven\'t done anything, and you can safely ignore this message.')
      .waitForTextByXpath('/html/body/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[2]/td/p[4]', 'Thank you,\nThe myCWT Team')
      .waitForTextByXpath('/html/body/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr[1]/td', 'Need help?\nContact our Help Center and we’ll be happy to answer your questions')
      .waitForTextByXpath('/html/body/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr[2]/td/span', 'You are receiving this email because your company uses CWT as its travel management company. CWT is committed to protecting the personal data of our clients\' travelers. Your company has authorized the use of this data.')
      .waitForTextByXpath('/html/body/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr[3]/td/a[1]', 'Terms of use')
      .waitForTextByXpath('/html/body/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr[3]/td/a[2]', 'Global Privacy Policy')
      .waitForAttributeContainsByXpath('/html/body/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr[3]/td/a[1]', 'href', 'https://www.mycwt.com/legal/terms-of-use.html')
      .waitForAttributeContainsByXpath('/html/body/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr[3]/td/a[2]', 'href', 'https://www.mycwt.com/legal/global-privacy-policy')
      .back();
  },

  'step 44 - Click on one of the available for registration account': (browser) => {
    browser
      .waitAndClickByXpath('//*[@id="right"]/div[2]/div[2]/div[1]/div/div/div');
  },

  'step 45 - Click on re-send email button on the account box': (browser) => {
    browser
      .waitAndClickByXpath('//*[@id="right"]/div[2]/div[2]/div[1]/div/span/a/span')
      .pause(1000);
  },

  'step 46 - Validate "email sent" message appear for 3 seconds': (browser) => {
    browser
      .waitForTextByXpath('//*[@id="right"]/div[2]/div[2]/div[1]/div/span', 'Email sent')
      .closeWindow()
      .switchToTab(0);
  },

  'step 47 - Validate activate account email content': (browser) => {
    browser
      .isElementExistWithRefresh('/html/body/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[2]/td/h2', 6, 5000)
      .waitForTextByXpath('/html/body/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[2]/td/h2', 'Hi Multiple Prod Two')
      // back to registration
      .url(globals.urls.prod_sign_up_url);
  },

//    ---------------------------------- Set username and password screen - invalid username ----------------------------------

  'step 48 - Add unregistered account in the registration email field': (browser) => {
    browser
      .waitAndSetValueByCss('#email', 'automation-4321@mailtest.worldmate.com');
  },

  'step 49 - Click on registration next button': (browser) => {
    browser
      .waitAndClickByCss('#submit-button');
  },

  'step 50 - Navigate browser to the unregistered account activation email': (browser) => {
    browser
      .pause(3000)
      .url(globals.urls.mailtest_url + 'automation-4321@mailtest.worldmate.com');
  },

  'step 51 - Click on activate account button in the unregistered activation email': (browser) => {
    // TODO: Pause and refresh temporary until we can find unique element on multiple account email content.
    browser
      .pause(6000)
      .refresh()
      .isElementExistWithRefresh('/html/body/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/a', 6, 5000)
      .waitAndClickByCss('.activation-button')
      .switchToTab(1);
  },

  'step 52 - Validate user email display in username field': (browser) => {
    browser
    .waitForAttributeContainsByXpath('//*[@id="newUsername"]', 'value', 'automation-4321@mailtest.worldmate.com');
  },

  'step 53 - Clear username field from the existing username': (browser) => {
    browser
    .clearValueByCss('#newUsername');
  },

  'step 54 - Validate username pre-text display': (browser) => {
    browser
      .waitForAttributeContainsByCss('#newUsername', 'placeholder', 'Six or more characters long');
  },

  'step 55 - Click on username field': (browser) => {
    browser
      .waitAndClickByCss('#newUsername');
  },

  // 'step 56 - Validate changing your username tooltip appear': (browser) => {
  //   browser
  //   .pause(2000)
  //   .waitForTextByCss('.m-b-xs', 'Changing your username')
  //   .waitForTextByCss('.m-b-0', 'Username other than your work email will prevent you from using myCWT.');
  // },

  'step 57 - Add valid password in password field': (browser) => {
    browser
      .waitAndSetValueByCss('#newPassword', 'password1');
  },

  'step 58 - Add less than 6 characters in the username field': (browser) => {
    browser
      .waitAndSetValueByCss('#newUsername', 'user');
  },

  'step 59 - Click on registration sign up button': (browser) => {
    browser
      .waitAndClickByXpath('//*[@id="right"]/div[3]/form/div[5]/div/button');
  },

  'step 60 - Validate at least 6 characters message appear': (browser) => {
    // message icon
    browser
      .waitForAttributeContainsByXpath('//*[@id="pfRegUsername"]/p/i', 'class', 'cwt-icon-alert')
      // message text
      .waitForTextByXpath('//*[@id="pfRegUsername"]/p', 'Your user name should be at least 6 characters long.');
  },

  'step 61 - Clear username field from the existing username': (browser) => {
    browser
      .clearValue('#newUsername');
  },

  'step 62 - Add already existing username in the username field': (browser) => {
    browser
      .waitAndSetValueByCss('#newUsername', 'automation-8669@mailtest.worldmate.com');
  },

  'step 63 - Click on registration sign up button': (browser) => {
    browser
      .waitAndClickByXpath('//*[@id="right"]/div[3]/form/div[5]/div/button');
  },

  'step 64 - Validate username already exists message appear': (browser) => {
    // message icon
    browser
      .waitForAttributeContainsByXpath('//*[@id="newPass-help-block"]/i', 'class', 'cwt-icon cwt-icon-alert p-r-sm')
      // message text
      .waitForTextByCss('#newPass-help-block', 'Your password does not meet the password policy')
      // back to registration
      .url(globals.urls.prod_sign_up_url);
  },

//    ---------------------------------- Set username and password screen - invalid password ----------------------------------

  'step 65 - Add unregistered account in the registration email field': (browser) => {
    browser
      .waitAndSetValueByXpath('//*[@id="email"]', 'automation-4321@mailtest.worldmate.com');
  },

  'step 66 - Click on registration next button': (browser) => {
    browser
      .waitAndClickByCss('#submit-button');
  },

  'step 67 - Navigate browser to the unregistered account activation email': (browser) => {
    browser
      .url(globals.urls.mailtest_url + 'automation-4321@mailtest.worldmate.com');
  },

  'step 68 - Click on activate account button in the unregistered activation email': (browser) => {
    // TODO: Pause and refresh temporary until we can find unique element on multiple account email content.
    browser
      .pause(5000)
      .refresh()
      .isElementExistWithRefresh('/html/body/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/a', 6, 5000)
      .waitAndClickByCss('.activation-button')
      .switchToTab(2);
  },

  'step 69 - Validate user email display in username field': (browser) => {
    browser
    .waitForAttributeContainsByXpath('//*[@id="newUsername"]', 'value', 'automation-4321@mailtest.worldmate.com');
  },

// ---- Empty password ----

  'step 70 - Click on registration sign up button': (browser) => {
    browser
      .waitAndClickByXpath('//*[@id="right"]/div[3]/form/div[5]/div/button');
  },

  'step 71 - Validate user email display in username field': (browser) => {
    browser
      .waitForAttributeContainsByXpath('//*[@id="pfRegPassword"]/p/i', 'class', 'cwt-icon-alert')
      .waitForTextByXpath('//*[@id="pfRegPassword"]/p', 'Your password does not meet the password policy');
  },

  'step 72 - Click on on password field': (browser) => {
    browser
      .waitAndClickByCss('#newPassword');
  },

  'step 73 - Validate password policy tooltip appear': (browser) => {
    browser
      .waitAndClickByCss('#newPassword')
      .waitForTextByCss('.popover', 'Password policy\nMust be 8-32 characters long\nMust contain a combination of letters, numbers and symbols.\nMust be different from your username\nMust be different from 5 previous passwords');
  },

// ---- Less than 8 characters ----

  'step 74 - Add less than 8 characters in the password field': (browser) => {
    browser
      .waitAndSetValueByCss('#newPassword', 'pass1@');
  },

  'step 75 - Click on registration sign up button': (browser) => {
    browser
      .waitAndClickByXpath('//*[@id="right"]/div[3]/form/div[5]/div/button');
  },

  'step 76 - Validate password policy message appear': (browser) => {
    // message icon
    browser
      .waitForAttributeContainsByXpath('//*[@id="pfRegPassword"]/p/i', 'class', 'cwt-icon-alert')
      // message text
      .waitForTextByXpath('//*[@id="pfRegPassword"]/p', 'Your password does not meet the password policy');
  },

// ---- More than 32 characters ----

  'step 77 - Add more than 32 characters in the password field': (browser) => {
    browser
      .clearValue('#newPassword')
      .waitAndSetValueByCss('#newPassword', 'password1@password1@password1@password1@');
  },

  'step 78 - Click on registration sign up button': (browser) => {
    browser
      .waitAndClickByXpath('//*[@id="right"]/div[3]/form/div[5]/div/button');
  },

  'step 79 - Validate password policy message appear': (browser) => {
    // message icon
    browser
      .waitForAttributeContainsByXpath('//*[@id="pfRegPassword"]/p/i', 'class', 'cwt-icon-alert')
      // message text
      .waitForTextByXpath('//*[@id="pfRegPassword"]/p', 'Your password does not meet the password policy');
  },
// TODO: change to non-alphnumeric
// ---- Missing special characters ----

  'step 80 - Add password missing numbers or special characters in the password field': (browser) => {
    browser
      .clearValue('#newPassword')
      .waitAndSetValueByCss('#newPassword', 'onlycharpass');
  },

  'step 81 - Click on registration sign up button': (browser) => {
    browser
      .waitAndClickByXpath('//*[@id="right"]/div[3]/form/div[5]/div/button');
  },

  'step 82 - Validate password policy message appear': (browser) => {
    // message icon
    browser
      .waitForAttributeContainsByXpath('//*[@id="newPass-help-block"]/i', 'class', 'cwt-icon cwt-icon-alert p-r-sm')
      // message text
      .waitForTextByCss('#newPass-help-block', 'Your password does not meet the password policy');
  },

// ---- Using username as password ----

  'step 83 - Add password missing numbers or special characters in the password field': (browser) => {
    browser
      .clearValue('#newPassword')
      .waitAndSetValueByCss('#newPassword', 'automation-4321@mailtest.worldmate.com');
  },

  'step 84 - Click on registration sign up button': (browser) => {
    browser
      .waitAndClickByXpath('//*[@id="right"]/div[3]/form/div[5]/div/button');
  },

  'step 85 - Validate password policy message appear': (browser) => {
    // message icon
    browser
      .waitForAttributeContainsByXpath('//*[@id="newPass-help-block"]/i', 'class', 'cwt-icon cwt-icon-alert p-r-sm')
      // message text
      .waitForTextByCss('#newPass-help-block', 'Your password does not meet the password policy');
  },

//    ---------------------------------- Activate account link expiration ----------------------------------

  // TODO: need to validate why expired email no longer expired (talk to roy)
  // TODO: validate we have a test for more than 1 click on the link + expiration with time.
  // 'step 86 - Navigate browser to the expired account activation email': (browser) => {
  //   browser.url(globals.urls.mailtest_url + 'automation-expired@mailtest.worldmate.com');
  // },
  //
  // 'step 87 - Click on activate account button in the expired account activation email': (browser) => {
  //   browser.useCss();
  //   .isElementExistWithRefresh('.activation-button', 6, 5000);
  //   .waitAndClickByCss('.activation-button');
  //   .switchToTab(1);
  // },
  //
  // 'step 88 - Validate expired activation screen display as expected': (browser) => {
  //   browser.useXpath();
  //   .isElementExistWithRefresh('//*[@id="right"]/div[1]/div/i', 6, 5000);
  //   .waitForAttributeContainsByXpath('//*[@id="right"]/div[1]/div/i', 'class', "icon-big-alert");
  //   .waitForTextByXpath('//*[@id="right"]/div[1]/div/h3', 'This email link has expired');
  //   .waitForTextByXpath('//*[@id="right"]/div[1]/div/p[1]', 'Looks like the link you clicked on expired. Click the button below to get a new link');
  //   .waitForTextByXpath('//*[@id="right"]/div[1]/div/div/button', 'RESEND LINK');
  //   .waitForTextByXpath('//*[@id="right"]/div[1]/div/p[2]/a', 'Return to signup');
  //   .waitForAttributeContainsByXpath('//*[@id="right"]/div[1]/div/p[2]/a', 'href', "/ext/reg/Registration?adapterId=UserReg");
  //   // Down links
  //   .waitForTextByXpath('//*[@id="right"]/div[2]/ul/li[1]/a', 'Help Center');
  //   .waitForAttributeContainsByXpath('//*[@id="right"]/div[2]/ul/li[1]/a', 'href', "http://help.mycwt.com/");
  //   .waitForTextByXpath('//*[@id="right"]/div[2]/ul/li[3]/a', 'Terms of Use');
  //   .waitForAttributeContainsByXpath('//*[@id="right"]/div[2]/ul/li[3]/a', 'href', "http://www.carlsonwagonlit.com/content/cwt/global/en/legal/terms-of-use.html");
  //   .waitForTextByXpath('//*[@id="right"]/div[2]/ul/li[5]/a', 'Global Privacy Policy');
  //   .waitForAttributeContainsByXpath('//*[@id="right"]/div[2]/ul/li[5]/a', 'href', "http://www.carlsonwagonlit.com/content/cwt/global/en/legal/global-privacy-policy.html");
  //   .waitForTextByXpath('//*[@id="right"]/div[2]/ul/li[7]', '©2017 CWT');
  // },
};