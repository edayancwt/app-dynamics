'use strict';

let NWTools = require('nightwatch-tools');
let randomNumberForCreate = NWTools.randomString(4,'1234567890');
const globals = require('../../../../nightwatch.globals');
const pageClientMaint = require('../../../../pages/page-clientMaint');
const fs = require('fs');
const path = require('path');
const pageIDM = require('../../../../pages/page-idm');

let myGUID = [];
let myESID = [];
//------------------------------------------------------------------------------------------
let adminID = 'u043exd';
let adminPassword = 'EdEdEd2022!!';
let clientName = 'CWT Employee Travel';
let subunitName = 'US-OI Test';
let dataFolder = 'automation/tests/production/portrait/sanity/portraitData';
//---------------------------------File templates--------------------------------------------
let createTemplate = `${clientName}|${subunitName}|General|myid${randomNumberForCreate}|Mango|One|mango${randomNumberForCreate}@yopmail.com`;

// Email extracted from the template creation
let travellerEmail = createTemplate.replace(/.*(?=mango)/g, '');

module.exports = {

  '@tags': ['clientLoad', 'HRFeeds', 'portrait'],

  before: function (browser) {
    browser.windowMaximize();
  },

  // ----------------------------------- Create new traveller for ESID update ------------------------------------------

  'step 0 - Create files': () => {
    // Add "Create" file base on the template
    fs.writeFile(`${dataFolder}/implicitClientLoadCreate${randomNumberForCreate}.txt`, createTemplate, () => {
      console.log('File was created');
    });
  },

  'step 1 - Login to clientMaint with admin credentials': (browser) => {
    browser
      .url(globals.urls.clientMaint_prod_url)
      .waitAndSetValueByCss(pageClientMaint.selectors.login.usernameInput, adminID)
      .waitAndSetValueByCss(pageClientMaint.selectors.login.passwordInput, adminPassword)
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
      .waitAndSetValueByCss(pageClientMaint.selectors.menu.clientNameInput, clientName)
      // Click on find button
      .waitAndClickByXpath(pageClientMaint.selectors.menu.findButton)
      // Click on the first result (Selenium top)
      .waitAndClickByXpath(pageClientMaint.selectors.menu.firstResult)
      // Click on continue button (by text)
      .waitAndClickOnText('Continue')
      // Click on Identify Load Specification link (by text)
      .waitAndClickOnText('Identify Load Specification')
      // Click on Automation spec (by text)
      .waitAndClickOnText('AutomationSpecImplicit')
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

  'step 3 - Validate updated traveller in IDM': (browser) => {
    browser
      // Login to IDM
      .loginToIDMProd('u043exd', 'EdEdEd2022!!')
      // Add traveller email
      .waitAndSetValueByCss(pageIDM.selectors.search.userInput, travellerEmail)
      // Click on search button
      .waitAndClickByCss(pageIDM.selectors.search.searchButton)
      // Click on the name
      .waitAndClickByXpath(pageIDM.selectors.searchResults.name)

      // Get the guid and the ESID (Employee ID)
      .waitForElementVisible('//*[@id="app"]/div/div[3]/div[2]/div[4]/div/div[1]/div[6]/p[2]/span')
        .getText('//*[@id="app"]/div/div[3]/div[2]/div[4]/div/div[1]/div[6]/p[2]/span', function (ESID) {
          const myValue1 = ESID.value;
          myESID.push(myValue1);
          console.log('FINAL ESID >>>>>>>>>>>>>: '+myESID);
        })
        .getText('//*[@id="app"]/div/div[3]/div[2]/div[4]/div/div[1]/div[7]/p[2]/span', function (GUID) {
          const myValue2 = GUID.value;
          myGUID.push(myValue2);
          console.log('FINAL GUID >>>>>>>>>>>>>: '+myGUID);
      });
  },

  // ----------------------------------------------- Update ESID -------------------------------------------------------

  'step 4 - Create ESID update file': () => {
    // Template
    let ESIDTemplate = `Active|${clientName}|${subunitName}|||${myGUID}||||${myESID}|${myESID}Updated`;
    // Add "Create" file base on the template
    fs.writeFile(`${dataFolder}/ESIDUpdate${randomNumberForCreate}.txt`, ESIDTemplate, () => {
      console.log('ESID file was created');
    });
  },

  'step 5 - Login to clientMaint with admin credentials': (browser) => {
    browser
      .url(globals.urls.clientMaint_prod_url)
      .waitAndSetValueByCss(pageClientMaint.selectors.login.usernameInput, adminID)
      .waitAndSetValueByCss(pageClientMaint.selectors.login.passwordInput, adminPassword)
      // CLick on OK button
      .waitAndClickByCss(pageClientMaint.selectors.login.okButton);
  },

  'step 6 - Load the ESID file': (browser) => {
    browser
      // Navigate to client load
      .waitAndClickByCss(pageClientMaint.selectors.menu.profileServices)
      .waitAndClickByCss(pageClientMaint.selectors.menu.profileLoad)
      .switchToTab(1)
      // Add Selenium in the search field
      .waitAndSetValueByCss(pageClientMaint.selectors.menu.clientNameInput, clientName)
      // Click on find button
      .waitAndClickByXpath(pageClientMaint.selectors.menu.findButton)
      // Click on the first result (Selenium top)
      .waitAndClickByXpath(pageClientMaint.selectors.menu.firstResult)
      // Click on continue button (by text)
      .waitAndClickOnText('Continue')
      // Click on Identify Load Specification link (by text)
      .waitAndClickOnText('ESID Specification')
      // Navigate to Test/Run Load
      .waitAndClickOnText('Test/Run Load')

      // Upload data file
      .fileUpload(`${dataFolder}/ESIDUpdate${randomNumberForCreate}.txt`)
      // Click on run button
      .waitAndClickByXpath(pageClientMaint.selectors.testRunLoad.runButton)
      // Navigate to file mapping
      .waitAndClickOnText('Profile Extract')
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

  'step 7 - Validate traveller updated with new ESID': (browser) => {
    browser
      // Open IDM URL ()no need to login again
      .url('https://idm-ui-prod.int.carlsonwagonlit.com/')
      // Add traveller email
      .waitAndSetValueByCss(pageIDM.selectors.search.userInput, travellerEmail)
      // Click on search button
      .waitAndClickByCss(pageIDM.selectors.search.searchButton)
      // Click on the name
      .waitAndClickByXpath(pageIDM.selectors.searchResults.name)
      // Validate updated ESID

      .waitForTextByXpath(pageIDM.selectors.searchResults.employeeID, `${myESID}Updated`);
      console.log(`UPDATED ESID >>>>>>>>>>>>>: ${myESID}Updated`);
  },

  // ----------------------------------------- Update ESID to empty ESID -----------------------------------------------

  'step 8 - Create empty ESID file (last field empty)': () => {
    // Template
    let emptyESIDTemplate = `Active|${clientName}|${subunitName}|||${myGUID}||||${myESID}Updated|`;
    // Add "Create" file base on the template
    fs.writeFile(`${dataFolder}/emptyESIDUpdate${randomNumberForCreate}.txt`, emptyESIDTemplate, () => {
      console.log('Empty ESID file was created');
    });
  },

  'step 9 - Login to clientMaint with admin credentials': (browser) => {
    browser
      .url(globals.urls.clientMaint_prod_url)
      .waitAndSetValueByCss('#UserID', adminID)
      .waitAndSetValueByCss('#UserIdentifier', adminPassword)
      // CLick on OK button
      .waitAndClickByCss(pageClientMaint.selectors.login.okButton);
  },

  'step 10 - Load the empty ESID file (to update the traveller with empty ESID)': (browser) => {
    browser
      // Navigate to client load
      .waitAndClickByCss(pageClientMaint.selectors.menu.profileServices)
      .waitAndClickByCss(pageClientMaint.selectors.menu.profileLoad)
      .switchToTab(1)
      // Add Selenium in the search field
      .waitAndSetValueByCss(pageClientMaint.selectors.menu.clientNameInput, clientName)
      // Click on find button
      .waitAndClickByXpath(pageClientMaint.selectors.menu.findButton)
      // Click on the first result (Selenium top)
      .waitAndClickByXpath(pageClientMaint.selectors.menu.firstResult)
      // Click on continue button (by text)
      .waitAndClickOnText('Continue')
      // Click on Identify Load Specification link (by text)
      .waitAndClickOnText('ESID Specification')
      // Navigate to Test/Run Load
      .waitAndClickOnText('Test/Run Load')

      // Upload data file
      .fileUpload(`${dataFolder}/emptyESIDUpdate${randomNumberForCreate}.txt`)
      // Click on run button
      .waitAndClickByXpath(pageClientMaint.selectors.testRunLoad.runButton)
      // Navigate to file mapping
      .waitAndClickOnText('Profile Extract')
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

  'step 11 - Validate traveller updated with empty ESID on IDM': (browser) => {
    browser
      // Open IDM URL ()no need to login again
      .url('https://idm-ui-prod.int.carlsonwagonlit.com')
      // Add traveller email
      .waitAndSetValueByCss(pageIDM.selectors.search.userInput, travellerEmail)
      // Click on search button
      .waitAndClickByCss(pageIDM.selectors.search.searchButton)
      // Click on the name
      .waitAndClickByXpath(pageIDM.selectors.searchResults.name)
      // Validate empty ESID (no value)
      .waitForTextByXpath(pageIDM.selectors.searchResults.employeeID, '');
    console.log('UPDATED ESID >>>>>>>>>>>>>: Empty');
  },

  // ---------------------------------- Update empty ESID with new valid string ----------------------------------------

  'step 12 - Create another ESID file for updating the empty ESID': () => {
    // Template
    let secondESIDTemplate = `Active|${clientName}|${subunitName}|||${myGUID}|||||${myESID}SecondUpdate`;
    // Add "Create" file base on the template
    fs.writeFile(`${dataFolder}/secondESIDUpdate${randomNumberForCreate}.txt`, secondESIDTemplate, () => {
      console.log('Second ESID update file was created');
    });
  },

  'step 13 - Login to clientMaint with admin credentials': (browser) => {
    browser
      .url(globals.urls.clientMaint_prod_url)
      .waitAndSetValueByCss('#UserID', adminID)
      .waitAndSetValueByCss('#UserIdentifier', adminPassword)
      // CLick on OK button
      .waitAndClickByCss(pageClientMaint.selectors.login.okButton);
  },

  'step 14 - Load the updated ESID file (to update the empty ESID with new valid ESID)': (browser) => {
    browser
      // Navigate to client load
      .waitAndClickByCss(pageClientMaint.selectors.menu.profileServices)
      .waitAndClickByCss(pageClientMaint.selectors.menu.profileLoad)
      .switchToTab(1)
      // Add Selenium in the search field
      .waitAndSetValueByCss(pageClientMaint.selectors.menu.clientNameInput, clientName)
      // Click on find button
      .waitAndClickByXpath(pageClientMaint.selectors.menu.findButton)
      // Click on the first result (Selenium top)
      .waitAndClickByXpath(pageClientMaint.selectors.menu.firstResult)
      // Click on continue button (by text)
      .waitAndClickOnText('Continue')
      // Click on Identify Load Specification link (by text)
      .waitAndClickOnText('ESID Specification')
      // Navigate to Test/Run Load
      .waitAndClickOnText('Test/Run Load')
      // Upload data file
      .fileUpload(`${dataFolder}/secondESIDUpdate${randomNumberForCreate}.txt`)
      // Click on run button
      .waitAndClickByXpath(pageClientMaint.selectors.testRunLoad.runButton)
      // Navigate to file mapping
      .waitAndClickOnText('Profile Extract')
      // Navigate to History section
      .waitAndClickOnText('History')
      // Wait for 5 seconds and click in the results
      .pause(30000).refresh()
      .waitAndClickByXpath('//*[@id="table-2"]/tbody/tr[1]/td[2]/a')
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

  'step 15 - Validate traveller updated with new ESID on IDM': (browser) => {
    browser
      .pause(2000)
      // Open IDM URL ()no need to login again
      .url('https://idm-ui-prod.int.carlsonwagonlit.com')
      // Add traveller email
      .waitAndSetValueByCss(pageIDM.selectors.search.userInput, travellerEmail)
      // Click on search button
      .waitAndClickByCss(pageIDM.selectors.search.searchButton)
      // Click on the name
      .waitAndClickByXpath(pageIDM.selectors.searchResults.name)
      // Validate empty ESID (no value)
      .waitForTextByXpath(pageIDM.selectors.searchResults.employeeID, `${myESID}SecondUpdate`);
    console.log(`UPDATED ESID >>>>>>>>>>>>>: ${myESID}SecondUpdate`);
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