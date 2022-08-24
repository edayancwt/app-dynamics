/**
 * @param {String} selector
 * portalLogout
 */

const pageHeader = require('../../pages/page-header');
const pageLogout = require('../../pages/page-logout');

exports.command = function () {
  const browser = this;

  browser
    // Click on my profile drop down
    .waitAndClickByCss(pageHeader.selectors.navigation.myProfileDropdown)
    // Click on logout button
    .waitAndClickByCss(pageHeader.selectors.navigation.logout)
    // Validate logout text
    .waitForTextByCss(pageLogout.selectors.main.logoutText, 'You have been successfully logged out from myCWT!');

  return this;
};