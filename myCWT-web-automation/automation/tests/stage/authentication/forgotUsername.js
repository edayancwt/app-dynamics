'use strict';

const globals = require('../../../nightwatch.globals');
const pageLogin = require('../../../pages/page-login');
const pageYopmail = require('../../../pages/page-yopmail');
const pageForgotUsername = require('../../../pages/page-forgot-username');

let forgotUsernameUser = 'doberman3@yopmail.com';
// let forgotUsernameMultiple = 'automation-6269@mailtest.worldmate.com';

module.exports = {

  '@tags': ['IDM'],

  before: function (browser) {
    browser.windowMaximize();
  },

  'step 1 - Navigate to login URL' : (browser) => {
    browser
      // Go to login url
      .url(globals.urls.stage_login_url)
      //  Click on forgot username link
      .waitAndClickByCss(pageLogin.selectors.main.forgotUsername);
  },

  'step 2 - Validate forgot username screen' : (browser) => {
    browser
      // Validate login link
      .waitForTextByCss(pageForgotUsername.selectors.main.loginLink, 'Log in')
      // Validate language default text (english)
      .waitForTextByCss(pageForgotUsername.selectors.main.languageSelectorText, 'English (US)')
      // Validate language icon
      .waitForAttributeContainsByCss(pageForgotUsername.selectors.main.languageSelectorIcon, 'class', 'cwt-icon-arrow-down')
      // Validate username icon
      .waitForAttributeContainsByCss(pageForgotUsername.selectors.main.forgotUsernameIcon, 'class', 'icon-user')
      // Validate forgot username title
      .waitForTextByCss(pageForgotUsername.selectors.main.forgotUsernameTitle, 'Forgot username')
      // Validate forgot username text
      .waitForTextByCss(pageForgotUsername.selectors.main.forgotUsernameText, 'Please enter your email and we’ll send you instructions on how to log in to your account.')
      // Validate input field pre-text
      .waitForAttributeContainsByCss(pageForgotUsername.selectors.main.emailInput, 'placeholder', 'Enter your work email')
      // Validate input icon
      .waitForAttributeContainsByCss(pageForgotUsername.selectors.main.emailInputIcon, 'class', 'cwt-icon-email')
      // Validate next button
      .waitForTextByCss(pageForgotUsername.selectors.main.nextButton, 'NEXT')
      // Validate myCWT logo
      .waitForAttributeContainsByCss(pageForgotUsername.selectors.main.myCwtLogo, 'alt', 'CWT Logo')
      // Validate myCWT text
      .waitForTextByCss(pageForgotUsername.selectors.main.myCwtTitle, 'Your anytime, anywhere\ntravel services platform')
      // Validate help center link
      .waitForTextByCss(pageForgotUsername.selectors.footer.helpCenter, 'Help Center')
      // Validate cookie policy link
      .waitForTextByCss(pageForgotUsername.selectors.footer.cookiePolicy, 'Cookie Policy')
      // Validate terms of use link
      .waitForTextByCss(pageForgotUsername.selectors.footer.termsOfUse, 'Terms of Use')
      // Validate privacy policy link
      .waitForTextByCss(pageForgotUsername.selectors.footer.privacyPolicy, 'Global Privacy Policy')
      // Validate copyrights link
      .waitForTextByCss(pageForgotUsername.selectors.footer.copyrightsText, '©2022 CWT');
  },

  'step 3 - Validate check your email message on the screen' : (browser) => {
    browser
      // Add user email in the email field
      .waitAndSetValueByCss(pageForgotUsername.selectors.main.emailInput, forgotUsernameUser)
      // Click on next button
      .waitAndClickByCss(pageForgotUsername.selectors.main.nextButton)
      // Validate check email image
      .waitForAttributeContainsByCss(pageForgotUsername.selectors.checkYourEmail.checkYourEmailImage, 'class', 'icon-email-sent')
      // Validate check email title
      .waitForTextByCss(pageForgotUsername.selectors.checkYourEmail.checkYourEmailTitle, 'Check your email')
      // Validate check email text
      .waitForTextByCss(pageForgotUsername.selectors.checkYourEmail.checkYourEmailText, 'We sent you an email\nwith instructions on how to log in to your account\nIt may take few minutes to come through.');
  },

  'step 4 - Validate forgot username email (yopmail)' : (browser) => {
    browser
      // Open help center page (just to replace it with yopmail)
      .waitAndClickByCss(pageForgotUsername.selectors.footer.helpCenter)
      // switch to the second tab
      .switchToTab(1)
      // Go to yopmail url
      .url('http://www.yopmail.com')
      // Click on cookies popup if exist
      .clickIfExistByCss(pageYopmail.selectors.login.acceptRecommendedCookiesButton)
      // Add the user email
      .waitAndSetValueByCss(pageYopmail.selectors.login.yopmailEmailInput, forgotUsernameUser)
      // Click on go to button (arrow)
      .waitAndClickByCss(pageYopmail.selectors.login.yopmailEmailInputIcon)
      // Switch to iframe
      .frame('ifmail')
      // Validate email subject
      .waitForTextByXpath(pageYopmail.selectors.login.yopmailSubject, 'Your myCWT account username')
      // Main title
      .waitForTextByXpath(pageYopmail.selectors.forgotUsernameEmail.yopmailMainTitle, 'Hi Traveler')
      // First text box (We received a request)
      .waitForTextByXpath(pageYopmail.selectors.forgotUsernameEmail.yopmailFirstTextBox, 'We received a request to recall the username for your myCWT account.')

      // Employee table title
      .waitForTextByXpath(pageYopmail.selectors.forgotUsernameEmail.yopmailTableEmployeeNameTitle, 'Employee name:')
      // Employee title employee name
      .waitForTextByXpath(pageYopmail.selectors.forgotUsernameEmail.yopmailTableEmployeeName, 'Doberman Three')
      // Username table title
      .waitForTextByXpath(pageYopmail.selectors.forgotUsernameEmail.yopmailTableUsernameTitle, 'Username:')
      // Username text
      .waitForTextByXpath(pageYopmail.selectors.forgotUsernameEmail.yopmailTableUsername, 'doberman3@yopmail.com')

      // Second text box (If you didn't ask)
      .waitForTextByXpath(pageYopmail.selectors.forgotUsernameEmail.yopmailSecondTextBox, 'If you didn\'t ask for your username, don\'t worry - we haven\'t done anything, and you can safely ignore this message. ')
      // Third text box (If you still encounter issues)
      .waitForTextByXpath(pageYopmail.selectors.forgotUsernameEmail.yopmailThirdTextBox, 'If you still encounter issues logging into your account, please contact our Help Center team for assistance.')
      // Forth text box (Please do not forward)
      .waitForTextByXpath(pageYopmail.selectors.forgotUsernameEmail.yopmailForthTextBox, 'Please do not forward or give this username to anyone.')
      // Fifth text box (Thank you)
      .waitForTextByXpath(pageYopmail.selectors.forgotUsernameEmail.yopmailFifthTextBox, 'Thank you,\nThe myCWT Team')
      // Sixth text box (Need help)
      .waitForTextByXpath(pageYopmail.selectors.forgotUsernameEmail.yopmailSixthTextBox, 'Need help?\nContact our Help Center and we’ll be happy to answer your questions')
      // Seventh text box (You are receiving this email)
      .waitForTextByXpath(pageYopmail.selectors.forgotUsernameEmail.yopmailSeventhTextBox, 'You are receiving this email because your company uses CWT as its travel management company. CWT is committed to protecting the personal data of our clients\' travelers. Your company has authorized the use of this data.')
      // Terms of use
      .waitForTextByXpath(pageYopmail.selectors.forgotUsernameEmail.yopmailTermsOfUse, 'Terms of use')
      // Terms of use link
      .waitForAttributeContainsByXpath(pageYopmail.selectors.forgotUsernameEmail.yopmailTermsOfUse, 'href', 'https://www.mycwt.com/legal/terms-of-use.html')
      // Global privacy policy
      .waitForTextByXpath(pageYopmail.selectors.forgotUsernameEmail.yopmailGlobalPrivacyPolicy, 'Global Privacy Policy')
      // Global privacy policy link
      .waitForAttributeContainsByXpath(pageYopmail.selectors.forgotUsernameEmail.yopmailGlobalPrivacyPolicy, 'href', 'https://www.mycwt.com/legal/global-privacy-policy')
      .stop();
  },

  // todo: need to fix https://cwtitops.atlassian.net/browse/TTDIG-885

//    ---------------------------------- Forgot username multiple accounts -----------------------------------


//   'step 7 - Navigate to login URL' : (browser) => {
//     browser
//       .url(globals.urls.stage_login_url);
//   },
//
//   'step 8 - Click on forgot username link' : (browser) => {
//     // browser.useCss()
//     // .waitAndClick('#forgot-username-button')
//     browser
//       .waitAndClickByCss('#forgot-username-button');
//   },
//
//   'step 9 - Add email address in email field and click on next button' : (browser) => {
//     browser
//       .waitAndSetValue('#email', forgotUsernameMultiple)
//       .waitAndClick('#submit-button');
//   },
//
//   'step 10 - Validate email (multiple) received and display as expected' : (browser) => {
//     browser
//       .url(globals.urls.mailtest_url + forgotUsernameMultiple)
//       .useXpath()
//       //Email content
//       .isElementExistWithRefresh('/html/body/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr[1]/th[1]', 6, 5000)
//       .waitForAttributeContains('/html/body/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[1]/td/p/img', 'src', 'https://cdn.worldmate.com/ping-images/myCWTLogo.png')
//       // .waitForText('/html/body/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[2]/td/h2', 'Hi Traveler')
//       .waitForText('/html/body/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[2]/td/p[1]', 'We received a request to recall the username for your myCWT account. However, Your email address, automation-6269@mailtest.worldmate.com, is associated with multiple accounts:')
//       // Table titles
//       .waitForText('/html/body/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr[1]/th[1]', 'Employee name:')
//       .waitForText('/html/body/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr[1]/th[2]', 'Username:')
//       // Table content
//       .waitForText('/html/body/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr[2]/td[1]', 'FirstName pwIM LastName MorW')
//       .waitForText('/html/body/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr[2]/td[2]', 'automation-6269-1@mailtest.worldmate.com')
//       .waitForText('/html/body/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr[3]/td[1]', 'Multiple Seven Seven')
//       .waitForText('/html/body/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr[3]/td[2]', 'automation-6269-7@mailtest.worldmate.com')
//       .waitForText('/html/body/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr[4]/td[1]', 'FirstName new LastName new')
//       .waitForText('/html/body/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr[4]/td[2]', 'automation-6269@mailtest.worldmate.com')
//       // First text box
//       .waitForText('/html/body/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[2]/td/p[2]', 'If you didn\'t ask for your username, don\'t worry - we haven\'t done anything, and you can safely ignore this message. ')
//       // Second text box
//       .waitForText('/html/body/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[2]/td/p[3]', 'If you still encounter issues logging into your account, please contact our Help Center team for assistance.')
//       .waitForAttributeContains('/html/body/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[2]/td/p[3]/a', 'href', 'http://help.mycwt.com/')
//       .waitForText('/html/body/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[2]/td/p[4]', 'Please do not forward or give this username to anyone. ')
//       .waitForText('/html/body/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[2]/td/p[5]', 'Thank you,\nThe myCWT Team')
//       .waitForText('/html/body/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr[1]/td', 'Need help?\nContact our Help Center and we’ll be happy to answer your questions')
//       //TODO: Traveller issue (2 L's)
//       // .waitForText("/html/body/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr[2]/td", "You are receiving this email because your company uses CWT as its travel management company. CWT is committed to protecting the personal data of our clients' travelers. Your company has authorized the use of this data.")
//       .waitForText('/html/body/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr[3]/td/a[1]', 'Terms of use')
//       .waitForText('/html/body/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr[3]/td/a[2]', 'Global Privacy Policy')
//       .waitForAttributeContains('/html/body/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr[3]/td/a[1]', 'href', 'http://www.carlsonwagonlit.com/content/cwt/global/en/legal/terms-of-use.html')
//       .waitForAttributeContains('/html/body/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr[3]/td/a[2]', 'href', 'http://www.carlsonwagonlit.com/content/cwt/global/en/legal/global-privacy-policy.html');
//   },
//
//
// //    ---------------------------------- Forgot username field validations -----------------------------------
//
//
//   'step 11 - Navigate to login URL' : (browser) => {
//     browser
//       .url(globals.urls.stage_login_url);
//   },
//
//   'step 12 - Click on forgot username link' : (browser) => {
//     browser
//       .waitAndClickByCss('#forgot-username-button');
//   },
//
//   'step 13 - Click on next button while field is empty' : (browser) => {
//     browser
//       .waitAndClickByCss('#submit-button');
//   },
//
//   'step 14 - validate warning message appear' : (browser) => {
//     browser
//       .waitForAttributeContainsByXpath('//*[@id="pfRegEmail"]/p/i','class','cwt-icon-alert')
//       .waitForText('//*[@id="pfRegEmail"]/p', 'Please enter a valid email address.');
//   },
//
//   'step 15 - Click on next button while field contain invalid email "123"' : (browser) => {
//     browser
//       .waitAndSetValueByCss('#email', '123')
//       .waitAndClickByCss('#submit-button');
//   },
//
//   'step 16 - validate warning message appear, and clear the field' : (browser) => {
//     browser
//       .waitForAttributeContainsByXpath('//*[@id="pfRegEmail"]/p/i','class','cwt-icon-alert')
//       .waitForTextByXpath('//*[@id="pfRegEmail"]/p', 'Please enter a valid email address.')
//       .useCss()
//       .clearValue('#email');
//   },
//
//   'step 17 - Click on next button while field contain invalid email "blabla@yopmail"' : (browser) => {
//     browser
//       .waitAndSetValueByCss('#email', 'blabla@yopmail')
//       .waitAndClickByCss('#submit-button');
//   },
//
//   'step 18 - validate warning message appear, and clear the field' : (browser) => {
//     browser
//       .waitForAttributeContainsXpath('//*[@id="pfRegEmail"]/p/i','class','cwt-icon-alert')
//       .waitForTextXpath('//*[@id="pfRegEmail"]/p', 'Please enter a valid email address.')
//       .useCss()
//       .clearValue('#email');
//   },
//
//   'step 19 - Click on next button while field contain valid email "lama2@yopmail.com"' : (browser) => {
//     browser
//       .waitAndSetValueByCss('#email', 'lama2@yopmail.com')
//       .waitAndClickByCss('#submit-button');
//   },
//
//   'step 20 - Validate check your email message on the screen' : (browser) => {
//     browser
//       .waitForAttributeContainsByCss('//*[@id="right"]/div[2]/div/i', 'class', 'icon-email-sent')
//       .waitForTextByCss('#forgot-username-check-email-title', 'Check your email')
//       .waitForTextByCss('#forgot-username-email-sent', 'We sent you an email to\nlama2@yopmail.com\nwith instructions on how to log in to your account\nIt may take few minutes to come through.')
//       .waitForTextByCss('#back-to-login', 'BACK TO LOGIN');
//   },

};