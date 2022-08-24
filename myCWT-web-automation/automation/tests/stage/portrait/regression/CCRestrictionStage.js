'use strict';

let NWTools = require('nightwatch-tools');
let randomString = NWTools.randomString(4,'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz');
let randomNumberForCreate = NWTools.randomString(4,'1234567890');
const globals = require('../../../../nightwatch.globals');
const pageClientMaint = require('../../../../pages/page-clientMaint');
const fs = require('fs');
const path = require('path');
const pageIDM = require('../../../../pages/page-idm');

//------------------------------------------------------------------------------------------------
let adminID = 'u043exd';
let adminPassword = 'EdEdEd2022!!';
let clientName = 'Selenium top';
let subunitName = 'Selenium sub 3';

module.exports = {

  '@tags': ['clientLoad', 'CC', 'portrait'],

  before: function (browser) {
    browser.windowMaximize();
  },

  'step 1 - Login to clientMaint with admin credentials': (browser) => {
    browser
      .url(globals.urls.clientMaint_stage_url)
      .clearValue(pageClientMaint.selectors.login.usernameInput).waitAndSetValueByCss(pageClientMaint.selectors.login.usernameInput, adminID)
      .clearValue(pageClientMaint.selectors.login.passwordInput).waitAndSetValueByCss(pageClientMaint.selectors.login.passwordInput, adminPassword)
      // CLick on OK button
      .waitAndClickByCss(pageClientMaint.selectors.login.okButton)
  },

  'step 2 - ': (browser) => {
    browser
      // Add client name
      .waitAndSetValueByCss(pageClientMaint.selectors.identifyClient.clientNameInput, 'Selenium')
      // Select the first result
      .waitAndClickByCss(pageClientMaint.selectors.identifyClient.firstResult)
      // Click on select
      .waitAndClickByCss(pageClientMaint.selectors.identifyClient.selectButton)
      // Hover on client services
      .moveToElement('#client_services_label', 1, 1)
      // Hover subunit
      .moveToElement('#yui-gen9 > a', 1, 1)
      .pause(1000)
      // Click on policies
      .waitAndClickByXpath('//*[@id="yui-gen17"]')


      .stop();
  },

};