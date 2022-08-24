'use strict';

let NWTools = require('nightwatch-tools');
let randomString = NWTools.randomString(4,'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz');
let randomNumberForCreate = NWTools.randomString(4,'1234567890');
const globals = require('../../../../nightwatch.globals');
const pageClientMaint = require('../../../../pages/page-clientMaint');
const pageIDM = require('../../../../pages/page-idm');
const fs = require('fs');
const path = require('path');
//------------------------------------------------------------------------------------------------
let adminID = 'u043exd';
let adminPassword = 'EdEdEd2022!!';
let dataFolder = 'automation/tests/stage/portrait/sanity/portraitData';
let specImplicitNV = 'AutomationSpecImplicitNV';
let NVClientName = 'Selenium top';
let NVSubunit = 'Selenium sub 2';
let NVTravellerType1 = 'General';
let EUClientName = 'LIGAS TEST';
let EUSubunit = 'PL-Test25';
let EUTravellerType1 = 'EMEA1';
//---------------------------------File templates--------------------------------------------
let createTemplate = `${NVClientName}|${NVSubunit}|${NVTravellerType1}|myid${randomNumberForCreate}|Tomato|One|tomato${randomNumberForCreate}@yopmail.com`;
let updateTemplate = `${NVClientName}|${NVSubunit}|${NVTravellerType1}|myid${randomNumberForCreate}|Tomato|One ${randomString}|tomato${randomNumberForCreate}@yopmail.com`;

let travellerFullName = 'Tomato One';
// Email extracted from the template creation
let travellerEmail = createTemplate.replace(/.*(?=tomato)/g, '');

module.exports = {

  '@tags': ['clientLoad', 'HRFeeds', 'portrait'],

  before: function (browser) {
    browser.windowMaximize();
  },

  'step 0 - Create files': () => {
    // Add "Create" file base on the template
    fs.writeFile(`${dataFolder}/implicitClientLoadCreate${randomNumberForCreate}.txt`, createTemplate, () => {
      console.log('Create file was created');
    });

    // Add "Update" file base on the template
    fs.writeFile(`${dataFolder}/implicitClientLoadUpdate${randomNumberForCreate}.txt`, updateTemplate, () => {
      console.log('Create file was created');
    });
  },

  'step 1 - Login to clientMaint with admin credentials': (browser) => {
    browser
      .url(globals.urls.clientMaint_stage_url)
      .clearValue(pageClientMaint.selectors.login.usernameInput).waitAndSetValueByCss(pageClientMaint.selectors.login.usernameInput, adminID)
      .clearValue(pageClientMaint.selectors.login.passwordInput).waitAndSetValueByCss(pageClientMaint.selectors.login.passwordInput, adminPassword)
      // CLick on OK button
      .waitAndClickByCss(pageClientMaint.selectors.login.okButton);
  },

  'step 2 - Create traveller': (browser) => {
    browser
      // Navigate to client load
      .waitAndClickByCss(pageClientMaint.selectors.menu.profileServices)
      .waitAndClickByCss(pageClientMaint.selectors.menu.profileLoad)
      .switchToTab(1)
      // Add Selenium in the search field
      .waitAndSetValueByCss(pageClientMaint.selectors.menu.clientNameInput, NVClientName)
      // Click on find button
      .waitAndClickByXpath(pageClientMaint.selectors.menu.findButton)
      // Click on the first result (Selenium top)
      .waitAndClickByXpath(pageClientMaint.selectors.menu.firstResult)
      // Click on continue button (by text)
      .waitAndClickOnText('Continue')
      // Click on Identify Load Specification link (by text)
      .waitAndClickOnText('Identify Load Specification')
      // Click on Automation spec (by text)
      .waitAndClickOnText(specImplicitNV)
      // Navigate to Test/Run Load
      .waitAndClickOnText('Test/Run Load')
      // Upload data file
      .fileUpload(`${dataFolder}/implicitClientLoadCreate${randomNumberForCreate}.txt`)
      // Click on run button
      .waitAndClickByXpath(pageClientMaint.selectors.testRunLoad.runButton)
      // Navigate to file mapping
      .waitAndClickOnText('File Mapping')
      // Navigate to History section
      .waitAndClickOnText('History')
      // Wait, refresh and click in the results
      .pause(30000).refresh()
      .waitAndClickByCss(pageClientMaint.selectors.history.runHistoryFirstResults)

      // Switch to the third tab
      .switchToTab(2)
      // Validate 0 failures
      .waitForTextByCss(pageClientMaint.selectors.report.reportText, 'Failed                                    0')
      // Validate create 1
      .waitForTextByCss(pageClientMaint.selectors.report.reportText, 'Creates                                   1')
      // Validate success 1
      .waitForTextByCss(pageClientMaint.selectors.report.reportText, 'Successful                                1')
      // Close tab 2 and 3 and focus back on tab 1
      .closeWindow().pause(500).switchToTab(1).closeWindow().switchToTab(0);
  },

  'step 4 - Validate updated traveller in IDM': (browser) => {
    browser
      // Login to IDM
      .loginToIDMStage('u043exd', 'EdEdEd2022!!')
      // Add traveller email
      .waitAndSetValueByCss(pageIDM.selectors.search.userInput, travellerEmail)
      // Click on search button
      .waitAndClickByCss(pageIDM.selectors.search.searchButton)
      // Validate traveller name
      .waitForTextByXpath(pageIDM.selectors.searchResults.name, travellerFullName);
  },

  'step 5 - Report': () => {
    console.log('============== Report ==============');
    console.log(`Traveller email: ${travellerEmail}`);
  },

  'step 6 - Login to clientMaint with admin credentials': (browser) => {
    browser
      .url(globals.urls.clientMaint_stage_url)
      .waitAndSetValueByCss(pageClientMaint.selectors.login.usernameInput, adminID)
      .waitAndSetValueByCss(pageClientMaint.selectors.login.passwordInput, adminPassword)
      // CLick on OK button
      .waitAndClickByCss(pageClientMaint.selectors.login.okButton);
  },

  'step 7 - Update traveller': (browser) => {
    browser
      // Navigate to client load
      .waitAndClickByCss(pageClientMaint.selectors.menu.profileServices)
      .waitAndClickByCss(pageClientMaint.selectors.menu.profileLoad)
      .switchToTab(1)
      // Add Selenium in the search field
      .waitAndSetValueByCss(pageClientMaint.selectors.menu.clientNameInput, NVClientName)
      // Click on find button
      .waitAndClickByXpath(pageClientMaint.selectors.menu.findButton)
      // Click on the first result (Selenium top)
      .waitAndClickByXpath(pageClientMaint.selectors.menu.firstResult)
      // Click on continue button (by text)
      .waitAndClickOnText('Continue')
      // Click on Identify Load Specification link (by text)
      .waitAndClickOnText('Identify Load Specification')
      // Click on Automation spec (by text)
      .waitAndClickOnText(specImplicitNV)
      // Navigate to Test/Run Load
      .waitAndClickOnText('Test/Run Load')
      // Upload data file
      .fileUpload(`${dataFolder}/implicitClientLoadUpdate${randomNumberForCreate}.txt`)
      // Click on run button
      .waitAndClickByXpath(pageClientMaint.selectors.testRunLoad.runButton)
      // Navigate to file mapping
      .waitAndClickOnText('File Mapping')
      // Navigate to History section
      .waitAndClickOnText('History')
      // Wait, refresh and click in the results
      .pause(30000).refresh()
      .waitAndClickByCss(pageClientMaint.selectors.history.runHistoryFirstResults)

      // Switch to the third tab
      .switchToTab(2)
      // Validate 0 failures
      .waitForTextByCss(pageClientMaint.selectors.report.reportText, 'Failed                                    0')
      // Validate create 1
      .waitForTextByCss(pageClientMaint.selectors.report.reportText, 'Updates                                   1')
      // Validate success 1
      .waitForTextByCss(pageClientMaint.selectors.report.reportText, 'Successful                                1')
      // Close tab 2 and 3 and focus back on tab 1
      .closeWindow().pause(500).switchToTab(1).closeWindow().switchToTab(0);
  },

  'step 8 - Validate traveller is updated in IDM': (browser) => {
    browser
      // Open IDM URL ()no need to login again
      .url('https://idm-ui-stage.int.carlsonwagonlit.com')
      // Add traveller email
      .waitAndSetValueByCss(pageIDM.selectors.search.userInput, travellerEmail)
      // Click on search button
      .waitAndClickByCss(pageIDM.selectors.search.searchButton)
      // Validate traveller name
      .waitForTextByXpath(pageIDM.selectors.searchResults.name, `${travellerFullName} ${randomString}`);
  },

  'step 9 - Delete all data files': () => {
    const folderToDelete = dataFolder;
    fs.readdir(folderToDelete, (err, files) => {
      if (err) throw err;

      for (const file of files) {
        fs.unlink(path.join(folderToDelete, file), err => {
          if (err) throw err;
        });
      }
    });
  },

};