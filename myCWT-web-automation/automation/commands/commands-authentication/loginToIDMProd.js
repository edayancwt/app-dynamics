/**
 * @param {String} selector
 * SSOLoginProd
 */

const pageSSO = require('../../pages/page-sso');

exports.command = function (username, password) {
  const browser = this;

  browser
    .url('https://idm-ui-prod.int.carlsonwagonlit.com')
    .waitAndSetValueByCss(pageSSO.selectors.main.username, username)
    .waitAndSetValueByCss(pageSSO.selectors.main.password, password)
    .waitAndClickByCss(pageSSO.selectors.main.loginButton);

  return this;
};