'use strict';

let NWTools = require('nightwatch-tools');
let randomString = NWTools.randomString(3,'1234567890');
let randomPassword = `Pa$$word${randomString}`;

let invalidPassword = ['pass2', 'Pp@12', 'pass2pass2pass2pass2pass2pass2pass2', 'passwordbest', 'password777',
  'password$$$', '44442222%%', '@@@@####$$', '4444222211'];
let forgotPassUser = 'doberman4@yopmail.com';

const globals = require('../../../nightwatch.globals');
const pageHome = require('../../../pages/page-home');
const pageLogin = require('../../../pages/page-login');
const pageYopmail = require('../../../pages/page-yopmail');
const pageForgotPassword = require('../../../pages/page-forgot-password');
const pageTermsOfService = require('../../../pages/page-terms-of-service');
const pageAirlineNotifications = require('../../../pages/page-airline-notifications');

module.exports = {

  '@tags': ['IDM'],

  before: function (browser) {
    browser.windowMaximize();
  },

  'step 1 - Navigate to login URL' : (browser) => {
    browser
      // Go to login url
      .url(globals.urls.stage_login_url)
      //  Click on forgot password link
      .waitAndClickByCss(pageLogin.selectors.main.forgotPassword);
  },

  'step 2 - Validate forgot password screen' : (browser) => {
    browser
      // Validate login link
      .waitForTextByCss(pageForgotPassword.selectors.main.loginLink, 'Log in')
      // Validate language default text (english)
      .waitForTextByCss(pageForgotPassword.selectors.main.languageSelectorText, 'English (US)')
      // Validate language icon
      .waitForAttributeContainsByCss(pageForgotPassword.selectors.main.languageSelectorIcon, 'class', 'cwt-icon-arrow-down')
      // Validate user icon
      .waitForAttributeContainsByCss(pageForgotPassword.selectors.main.userIcon, 'class', 'icon-user')
      // Validate reset title
      .waitForTextByCss(pageForgotPassword.selectors.main.passwordResetTitle, 'Password reset')
      // Validate reset text
      .waitForTextByCss(pageForgotPassword.selectors.main.passwordResetText, 'Please enter your username and we’ll send you instructions to reset your password')
      // Validate input field pre-text
      .waitForAttributeContainsByCss(pageForgotPassword.selectors.main.usernameInput, 'placeholder', 'Enter your username')
      // Validate input icon
      .waitForAttributeContainsByCss(pageForgotPassword.selectors.main.usernameInputIcon, 'class', 'cwt-icon-user')
      // Validate forgot username link
      .waitForTextByCss(pageForgotPassword.selectors.main.forgotUsernameLink, 'Forgot Username?')
      // Validate next button
      .waitForTextByCss(pageForgotPassword.selectors.main.nextButton, 'NEXT')
      // Validate myCWT logo
      .waitForAttributeContainsByCss(pageForgotPassword.selectors.main.myCwtLogo, 'alt', 'CWT Logo')
      // Validate myCWT text
      .waitForTextByCss(pageForgotPassword.selectors.main.myCwtTitle, 'Your anytime, anywhere\ntravel services platform')
      // Validate help center link
      .waitForTextByCss(pageForgotPassword.selectors.footer.helpCenter, 'Help Center')
      // Validate cookie policy link
      .waitForTextByCss(pageForgotPassword.selectors.footer.cookiePolicy, 'Cookie Policy')
      // Validate terms of use link
      .waitForTextByCss(pageForgotPassword.selectors.footer.termsOfUse, 'Terms of Use')
      // Validate privacy policy link
      .waitForTextByCss(pageForgotPassword.selectors.footer.privacyPolicy, 'Global Privacy Policy')
      // Validate copyrights link
      .waitForTextByCss(pageForgotPassword.selectors.footer.copyrightsText, '©2022 CWT');
  },

  'step 3 - Validate check your email message on the screen' : (browser) => {
    browser
      // Add email in the username field
      .waitAndSetValueByCss(pageForgotPassword.selectors.main.usernameInput, forgotPassUser)
      // Click on next button
      .waitAndClickByCss(pageForgotPassword.selectors.main.nextButton)
      // Validate check email image
      .waitForAttributeContainsByCss(pageForgotPassword.selectors.checkYourEmail.checkYourEmailImage, 'class', 'icon-email-sent')
      // Validate check email title
      .waitForTextByCss(pageForgotPassword.selectors.checkYourEmail.checkYourEmailTitle, 'Check your email')
      // Validate check email text
      .waitForTextByCss(pageForgotPassword.selectors.checkYourEmail.checkYourEmailText, 'We sent you an email with instructions on how to reset your password. It may take few minutes to come through.');
  },

  'step 4 - Validate forgot password email (yopmail)' : (browser) => {
    browser
      // Open help center page (just to replace it with yopmail)
      .waitAndClickByCss(pageForgotPassword.selectors.footer.helpCenter)
      // switch to the second tab
      .switchToTab(1)
      // Go to yopmail url
      .url('http://www.yopmail.com')
      // Click on cookies popup if exist
      .clickIfExistByCss('#necesary')
      // Add the user email
      .waitAndSetValueByCss('#login', forgotPassUser)
      // Click on go to button (arrow)
      .waitAndClickByCss('#refreshbut')
      // Switch to iframe
      .frame('ifmail')
      // Validate email subject
      .waitForTextByXpath(pageYopmail.selectors.login.yopmailSubject, 'Reset your myCWT password')
      // Main title
      .waitForTextByXpath(pageYopmail.selectors.forgotPasswordEmail.yopmailMainTitle, 'Hi Traveler')
      // First text box (We received a request)
      .waitForTextByXpath(pageYopmail.selectors.forgotPasswordEmail.yopmailFirstTextBox, 'We received a request to reset your password for your myCWT account. You can reset your password by clicking the button below')
      // Reset password button title
      .waitForTextByXpath(pageYopmail.selectors.forgotPasswordEmail.yopmailResetPasswordButton, 'RESET PASSWORD')
      // Second text box (If the button doesn't work)
      .waitForTextByXpath(pageYopmail.selectors.forgotPasswordEmail.yopmailSecondTextBox, 'If the button doesn’t work you can paste this link into your browser:')
      // Reset password alternative link
      .waitForTextByXpath(pageYopmail.selectors.forgotPasswordEmail.yopmailResetPasswordLink, 'https://accounts.stage-mycwt.com/ext/pwdreset2/Resume?')
      // Third text box (If you still encounter issues)
      .waitForTextByXpath(pageYopmail.selectors.forgotPasswordEmail.yopmailThirdTextBox, 'If you still encounter issues logging into your account, please contact our Help Center team for assistance.')
      // Forth text box (If you didn't make the request)
      .waitForTextByXpath(pageYopmail.selectors.forgotPasswordEmail.yopmailForthTextBox, 'If you didn’t make the request, someone may be trying to compromise your account. Please immediately contact our Help Center team for assistance.')
      // Fifth text box (Thank you)
      .waitForTextByXpath(pageYopmail.selectors.forgotPasswordEmail.yopmailFifthTextBox, 'Thank you,\nThe myCWT Team')
      // Sixth text box (Need help)
      .waitForTextByXpath(pageYopmail.selectors.forgotPasswordEmail.yopmailSixthTextBox, 'Need help?\nContact our Help Center and we’ll be happy to answer your questions')
      // Seventh text box (You are receiving this email)
      .waitForTextByXpath(pageYopmail.selectors.forgotPasswordEmail.yopmailSeventhTextBox, 'You are receiving this email because your company uses CWT as its travel management company. CWT is committed to protecting the personal data of our clients\' travelers. Your company has authorized the use of this data.')
      // Terms of use
      .waitForTextByXpath(pageYopmail.selectors.forgotPasswordEmail.yopmailTermsOfUse, 'Terms of use')
      // Terms of use link
      .waitForAttributeContainsByXpath(pageYopmail.selectors.forgotPasswordEmail.yopmailTermsOfUse, 'href', 'https://www.mycwt.com/legal/terms-of-use.html')
      // Global privacy policy
      .waitForTextByXpath(pageYopmail.selectors.forgotPasswordEmail.yopmailGlobalPrivacyPolicy, 'Global Privacy Policy')
      // Global privacy policy link
      .waitForAttributeContainsByXpath(pageYopmail.selectors.forgotPasswordEmail.yopmailGlobalPrivacyPolicy, 'href', 'https://www.mycwt.com/legal/global-privacy-policy')

      // Click on reset password button
      .waitAndClickByXpath(pageYopmail.selectors.forgotPasswordEmail.yopmailResetPasswordButton)
      // Switch to the third tab
      .switchToTab(2);
  },

  'step 5 - Validate create new password screen' : (browser) => {
    browser
      // Validate create new password title
      .waitForTextByCss(pageForgotPassword.selectors.createNewPassword.createNewPasswordTitle, 'Create a new password')
      // Validate password input pre-text
      .waitForAttributeContainsByCss(pageForgotPassword.selectors.createNewPassword.passwordInput, 'placeholder', 'Password')
      // Validate password input icon
      .waitForAttributeContainsByCss(pageForgotPassword.selectors.createNewPassword.passwordInputIcon, 'class', 'cwt-icon-lock')
      // Validate create password button
      .waitForTextByCss(pageForgotPassword.selectors.createNewPassword.createPasswordButton, 'CREATE PASSWORD')

      // Click on the password input to reveal the tooltip
      .waitAndClickByCss(pageForgotPassword.selectors.createNewPassword.passwordInput)
      //Password tooltip
      .waitForTextByCss(pageForgotPassword.selectors.createNewPassword.passwordPolicyTooltip, 'Password policy\nMust be 8-32 characters long\nMust contain a combination of letters, numbers and symbols.\nMust be different from your username\nMust be different from 5 previous passwords');
  },

//    ---------------------------------- Password validations -----------------------------------

  'step 6 - Validate all invalid passwords' : (browser) => {
    for (let i = 0; i < invalidPassword.length; i++) {
      browser
        .waitAndSetValueByCss(pageForgotPassword.selectors.createNewPassword.passwordInput, invalidPassword[i])
        // Click on submit
        .waitAndClickByCss(pageForgotPassword.selectors.createNewPassword.createPasswordButton)
        // Validate error message
        .waitForTextByCss(pageForgotPassword.selectors.createNewPassword.invalidPasswordMessage, 'Your password does not meet the password policy')
        // Validate error icon
        .waitForAttributeContainsByCss(pageForgotPassword.selectors.createNewPassword.invalidPasswordIcon, 'class', 'cwt-icon-alert')
        // Clear password field
        .clearValue(pageForgotPassword.selectors.createNewPassword.passwordInput);
    }
  },

  'step 7 - Add valid random password and click on create button' : (browser) => {
      browser
        // Add valid password
        .waitAndSetValueByCss(pageForgotPassword.selectors.createNewPassword.passwordInput, randomPassword);
        // Print new password to the console
        console.log(`\n------------------ Your new password is: ${randomPassword} ------------------\n`);
        // Click on submit button
        browser.waitAndClickByCss(pageForgotPassword.selectors.createNewPassword.createPasswordButton);
  },

  'step 8 - Validate "password was changed" screen' : (browser) => {
    browser
      // Validate success message image
      .waitForAttributeContainsByCss(pageForgotPassword.selectors.passwordWasChanged.successImage, 'class', 'icon-big-success')
      // Validate success message title
      .waitForTextByCss(pageForgotPassword.selectors.passwordWasChanged.successTitle, 'Your password was successfully changed')
      // Validate success message text
      .waitForTextByCss(pageForgotPassword.selectors.passwordWasChanged.successText, 'You can use this password to access both myCWT website and myCWT mobile app')
      // Validate Done button
      .waitForTextByCss(pageForgotPassword.selectors.passwordWasChanged.successDoneButton, 'DONE')
      // Click on Done button again
      .waitAndClickByCss(pageForgotPassword.selectors.passwordWasChanged.successDoneButton);
  },


  'step 9 - Login using the new password': (browser) => {
    browser
      // Add username
      .waitAndSetValueByCss(pageLogin.selectors.main.usernameInput, forgotPassUser)
      // Add password
      .waitAndSetValueByCss(pageLogin.selectors.main.passwordInput, randomPassword)
      // click on submit
      .waitAndClickByCss(pageLogin.selectors.main.submitButton);
  },

  'step 10 - Validate Terms of service page - Only If display': (browser) => {
    browser
      .element('css selector', pageTermsOfService.selectors.main.termsOfServiceNoticeText, (isExist) => {
        if (isExist.status !== -1) {
          browser
            // Terms of service notice text
            .waitForTextByCss(pageTermsOfService.selectors.main.termsOfServiceNoticeText, 'Notice: Use of CWT Platform is governed by Platform User Terms & Conditions (PUTC), By clicking ‘Continue’ below you agree to comply with PUTC and acknowledge receipt of the following Global Privacy Policy and Traveler Notice:')
            // Terms of service title
            .waitForTextByCss(pageTermsOfService.selectors.main.termsOfServiceTitle, 'CWT GLOBAL PRIVACY POLICY AND NOTICE')
            // Terms of service text
            .waitForTextByCss(pageTermsOfService.selectors.main.termsOfServiceText, 'The Global Privacy is available in English and in the following languages. Please note that some of these pages are currently being translated.')
            // Terms of service first language
            .waitForTextByXpath(pageTermsOfService.selectors.main.termsOfServiceFirstLanguage, 'Bulgarian')
            // Terms of service second language
            .waitForTextByXpath(pageTermsOfService.selectors.main.termsOfServiceSecondLanguage, 'Croatian')
            // click on continue button
            .waitAndClickByCss(pageTermsOfService.selectors.main.termsOfServiceContinueButton);
        }
      });
  },

  'step 11 - Validate airline notification popup': (browser) => {
    browser
      // Airline notification title
      .waitForTextByCss(pageAirlineNotifications.selectors.main.mainTitle, 'Improve your travel experience by adding your mobile phone number:')
      // Airline notification text
      .waitForTextByCss(pageAirlineNotifications.selectors.main.textContent, 'Get faster service when calling our help center. Receive notifications from airlines in case of trip disruption.')
      // Airline notification image
      .waitForAttributeContainsByCss(pageAirlineNotifications.selectors.main.phoneImage, 'src', 'https://travel.stage-mycwt.com/my-cwt-spa/images/Hand_Mobile.svg')
      // Airline notification skip button
      .waitForTextByXpath(pageAirlineNotifications.selectors.main.skipButton, 'Skip')
      // Airline notification save number button
      .waitForTextByXpath(pageAirlineNotifications.selectors.main.saveButton, 'SAVE NUMBER')

      // Click on calling code selection button
      .waitAndClickByXpath(pageAirlineNotifications.selectors.main.callingCodeSelector)
      // Type r letter for search and select with ENTER
      .keys('r').pause(500).keys(browser.Keys.ENTER)
      // Validate selected calling code
      .waitForAttributeContainsByCss(pageAirlineNotifications.selectors.main.phoneInput, 'value', '+262')
      .pause(1000)
      // Click on calling code selection button
      .waitAndClickByXpath(pageAirlineNotifications.selectors.main.callingCodeSelector)
      // Type i_s letters for search and select with ENTER
      .keys('i').keys('s').pause(500).keys(browser.Keys.ENTER)
      // Validate selected calling code
      .waitForAttributeContainsByCss(pageAirlineNotifications.selectors.main.phoneInput, 'value', '+972')

      // Add invalid number (short)
      .waitAndSetValueByCss(pageAirlineNotifications.selectors.main.phoneInput, '123')
      // Click on save number
      .waitAndClickByXpath(pageAirlineNotifications.selectors.main.saveButton)
      // Validate error message
      .waitForTextByCss(pageAirlineNotifications.selectors.main.phoneInputErrorMessage, 'Please enter a valid phone number')

      // Focus on the number field
      .waitAndClickByCss(pageAirlineNotifications.selectors.main.phoneInput)
      // Clear number
      .keys(browser.Keys.BACK_SPACE).keys(browser.Keys.BACK_SPACE).keys(browser.Keys.BACK_SPACE)

      // Add invalid number (longer)
      .waitAndSetValueByCss(pageAirlineNotifications.selectors.main.phoneInput, '123456')
      // Click on save number
      .waitAndClickByXpath(pageAirlineNotifications.selectors.main.saveButton)
      // Validate error message
      .waitForTextByCss(pageAirlineNotifications.selectors.main.phoneInputErrorMessage, 'Please enter a valid phone number')
      // Click on skip button
      .waitAndClickByXpath(pageAirlineNotifications.selectors.main.skipButton)
      // Accept cookies
      .waitAndClickByCss(pageHome.selectors.cookies.acceptCookiesButton)
      // Validate username
      .waitForTextByCss(pageHome.selectors.welcome.welcomeUsername, 'Doberman');
  },
};