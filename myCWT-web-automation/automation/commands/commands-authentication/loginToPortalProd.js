/**
 * @param {String} selector
 * loginToPortalProd
 */

const globals = require('../../nightwatch.globals');
const pageLogin = require('../../pages/page-login');
const pageHome = require('../../pages/page-home');

exports.command = function (username, password) {
  const browser = this;

    browser
      // Go to portal prod url
      .url(globals.urls.prod_login_url)
      // Add username
      .waitAndSetValueByCss(pageLogin.selectors.main.usernameInput, username)
      // Add password
      .waitAndSetValueByCss(pageLogin.selectors.main.passwordInput, password)
      // click on submit
      .waitAndClickByCss(pageLogin.selectors.main.submitButton)
      // Accept cookies
      .waitAndClickByCss(pageHome.selectors.cookies.acceptCookiesButton);

  return this;
};