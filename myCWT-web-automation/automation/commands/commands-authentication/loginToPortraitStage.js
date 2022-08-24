/**
 * @param {String} selector
 * loginToPortraitStage
 */

const globals = require('../../nightwatch.globals');
const pageClientMaint = require('../../pages/page-clientMaint');

exports.command = function (adminID, adminPassword) {
  const browser = this;

  browser
    .url(globals.urls.clientMaint_stage_url)
    .clearValue('#UserID').waitAndSetValueByCss('#UserID', adminID)
    .clearValue('#UserIdentifier').waitAndSetValueByCss('#UserIdentifier', adminPassword)
    // CLick on OK button
    .waitAndClickByCss(pageClientMaint.selectors.login.okButton)
    // Navigate to portrait
    .waitAndClickByCss(pageClientMaint.selectors.menu.profileServices)
    .waitAndClickByCss(pageClientMaint.selectors.menu.profile)
    .switchToTab(1);

  return this;
};