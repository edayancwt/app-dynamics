/**
 * @param {String} selector
 * loginToPortalStage
 */

const globals = require('../../nightwatch.globals');
const pageLogin = require('../../pages/page-login');
const pageHome = require('../../pages/page-home');
const pageAirlineNotifications = require('../../pages/page-airline-notifications');

exports.command = function (username, password) {
  const browser = this;

    browser
      // Go to portal stage url
      .url(globals.urls.stage_login_url)
      // Add username
      .waitAndSetValueByCss(pageLogin.selectors.main.usernameInput, username)
      // Add password
      .waitAndSetValueByCss(pageLogin.selectors.main.passwordInput, password)
      // click on submit
      .waitAndClickByCss(pageLogin.selectors.main.submitButton)
      // Accept cookies
      .waitAndClickByCss(pageHome.selectors.cookies.acceptCookiesButton)
      // Close airline notification popup if exist
      .clickIfExistByCss(pageAirlineNotifications.selectors.main.closeButton);

  return this;
};