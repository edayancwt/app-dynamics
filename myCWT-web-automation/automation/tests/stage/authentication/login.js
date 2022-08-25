'use strict';

const globals = require('../../../nightwatch.globals');
const pageHome = require('../../../pages/page-home');
const pageLogin = require('../../../pages/page-login');
const pageLogout = require('../../../pages/page-logout');
const pageHeader = require('../../../pages/page-header');

module.exports = {

  '@tags': ['IDM', 'login'],

  before: function (browser) {
    browser.windowMaximize();
  },

  'step 1 - Login with user 1': (browser) => {
    browser
      .url(globals.urls.stage_login_url)
      // Add username
      .waitAndSetValueByCss(pageLogin.selectors.main.usernameInput, globals.users.portalUser1.username)
      // Add password
      .waitAndSetValueByCss(pageLogin.selectors.main.passwordInput, globals.users.portalUser1.password)
      // click on submit
      .waitAndClickByCss(pageLogin.selectors.main.submitButton)
      // Accept cookies
      .waitAndClickByCss(pageHome.selectors.cookies.acceptCookiesButton, 30000)
      // Validate username
      .waitForTextByCss(pageHome.selectors.welcome.welcomeUsername, 'Aportal One')
      // Validate greeting message
      .waitForTextByCss(pageHome.selectors.welcome.welcomeFullTitle, '')
      // Validate user 1 trip
      .waitForTextByCss(pageHome.selectors.upcomingTrip.upcomingTripText, 'Denver, CO | Jun 4, 2025 - Sep 3, 2025 (92 days)');
  },

  'step 2 - Logout user 1': (browser) => {
    browser
      // Click on my profile
      .waitAndClickByCss(pageHeader.selectors.navigation.myProfileDropdown)
      // Click on logout
      .waitAndClickByCss(pageHeader.selectors.navigation.logout)
      // Validate logout text
      .waitForTextByCss(pageLogout.selectors.main.logoutText, 'You have been successfully logged out from myCWT!');
  },

  'step 3 - Login with user 2': (browser) => {
    browser
      // CLick on log back in button
      .waitAndClickByCss(pageLogout.selectors.main.logoutLogBackInButton)
      // Add username
      .waitAndSetValueByCss(pageLogin.selectors.main.usernameInput, globals.users.portalUser2.username)
      // Add password
      .waitAndSetValueByCss(pageLogin.selectors.main.passwordInput, globals.users.portalUser2.password)
      // click on submit
      .waitAndClickByCss(pageLogin.selectors.main.submitButton)
      // Accept cookies
      .clickIfExistByCss(pageHome.selectors.cookies.acceptCookiesButton)
      // Validate user 2 username
      .waitForTextByCss(pageHome.selectors.welcome.welcomeUsername, 'Aportal Two')
      // Validate user 2 greeting message
      .waitForTextByCss(pageHome.selectors.welcome.welcomeFullTitle, 'Hola Aportal Two, elija su opción de reserva preferida')
      // Validate user 2 trip
      .waitForTextByCss(pageHome.selectors.upcomingTrip.upcomingTripText, 'Denver, CO | Jun 4, 2025 - Sep 3, 2025 (92 days)');
  },

  'step 4 - Logout user 2': (browser) => {
    browser
      // Click on my profile
      .waitAndClickByCss(pageHeader.selectors.navigation.myProfileDropdown)
      // Click on logout
      .waitAndClickByCss(pageHeader.selectors.navigation.logout)
      // Validate logout text
      .waitForTextByCss(pageLogout.selectors.main.logoutText, 'You have been successfully logged out from myCWT!');
  },

  'step 5 - Login with user 1 again': (browser) => {
    browser
      // CLick on log back in button
      .waitAndClickByCss(pageLogout.selectors.main.logoutLogBackInButton)
      // Add username
      .waitAndSetValueByCss(pageLogin.selectors.main.usernameInput, globals.users.portalUser1.username)
      // Add password
      .waitAndSetValueByCss(pageLogin.selectors.main.passwordInput, globals.users.portalUser1.password)
      // click on submit
      .waitAndClickByCss(pageLogin.selectors.main.submitButton)
      // Accept cookies
      .clickIfExistByCss(pageHome.selectors.cookies.acceptCookiesButton)
      // Validate username
      .waitForTextByCss(pageHome.selectors.welcome.welcomeUsername, 'Aportal One')
      // Validate greeting message
      .waitForTextByCss(pageHome.selectors.welcome.welcomeFullTitle, '')
      // Validate user 1 trip
      .waitForTextByCss(pageHome.selectors.upcomingTrip.upcomingTripText, 'Denver, CO | Jun 4, 2025 - Sep 3, 2025 (92 days)');
  },

  'step 6 - Logout user 1 (again)': (browser) => {
    browser
      // Click on my profile
      .waitAndClickByCss(pageHeader.selectors.navigation.myProfileDropdown)
      // Click on logout
      .waitAndClickByCss(pageHeader.selectors.navigation.logout)
      // Validate logout text
      .waitForTextByCss(pageLogout.selectors.main.logoutText, 'You have been successfully logged out from myCWT!');
  },
};