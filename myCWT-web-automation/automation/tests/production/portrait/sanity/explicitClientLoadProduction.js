'use strict';

let NWTools = require('nightwatch-tools');
let randomNumber = NWTools.randomString(5,'1234567890');
let randomString = NWTools.randomString(4,'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz');
let randomNumberForCreate = NWTools.randomString(4,'1234567890');
const globals = require('../../../../nightwatch.globals');
const pageClientMaint = require('../../../../pages/page-clientMaint');
const fs = require('fs');
const path = require('path');
const pageIDM = require('../../../../pages/page-idm');
//-------------------------------------------------------------------------------------------
let adminID = 'u043exd';
let adminPassword = 'EdEdEd2022!!';
let NVClientName = 'CWT Employee Travel';
let NVSubunit = 'US-OI Test';
let specExplicitNV = 'AutomationSpecExplicitNV';
let dataFolder = 'automation/tests/production/portrait/sanity/portraitData';
let NVTravellerType1 = 'General';
let NVTravellerType2 = 'Portrait only';
//---------------------------------File templates--------------------------------------------
let createTemplate = `create|${NVClientName}|${NVSubunit}|${NVTravellerType1}|myid${randomNumberForCreate}|Lime|One|lime${randomNumberForCreate}@yopmail.com`;
let updateTemplate = `update|${NVClientName}|${NVSubunit}|${NVTravellerType1}|myid${randomNumberForCreate}|Lime|One ${randomString}|lime${randomNumberForCreate}@yopmail.com`;
let deleteTemplate = `delete|${NVClientName}|${NVSubunit}|${NVTravellerType1}|myid${randomNumberForCreate}|Lime|One ${randomString}|lime${randomNumberForCreate}@yopmail.com`;

// Email extracted from the template creation
let travellerEmail = updateTemplate.replace(/.*(?=lime)/g, '');
let travellerName = `Lime One ${randomString}`;

module.exports = {

  '@tags': ['clientLoad', 'HRFeeds', 'portrait', 'explicit'],

  before: function (browser) {
    browser.windowMaximize();
  },

  'step 0 - Create files': () => {
    // Add "create" file
    fs.writeFile(`${dataFolder}/dataClientLoadCreate${randomNumberForCreate}.txt`, createTemplate, () => {
      console.log('Create file was created');
    });
    // Add "update" file
    fs.writeFile(`${dataFolder}/dataClientLoadUpdate${randomNumberForCreate}.txt`, updateTemplate, () => {
      console.log('Update file was created');
    });
    // Add "delete" file
    fs.writeFile(`${dataFolder}/dataClientLoadDelete${randomNumberForCreate}.txt`, deleteTemplate, () => {
      console.log('Delete file was created');
    });
  },

  'step 1 - Login to clientMaint with admin credentials': (browser) => {
    browser
      .url(globals.urls.clientMaint_prod_url)
      .clearValue(pageClientMaint.selectors.login.usernameInput).waitAndSetValueByCss(pageClientMaint.selectors.login.usernameInput, adminID)
      .clearValue(pageClientMaint.selectors.login.passwordInput).waitAndSetValueByCss(pageClientMaint.selectors.login.passwordInput, adminPassword)
      // CLick on OK button
      .waitAndClickByCss(pageClientMaint.selectors.login.okButton)
      // Navigate to client load
      .waitAndClickByCss(pageClientMaint.selectors.menu.profileServices)
      .waitAndClickByCss(pageClientMaint.selectors.menu.profileLoad)
      .switchToTab(1);
  },

  'step 2 - Create load': (browser) => {
    browser
      // Add Selenium in the search field
      .waitAndSetValueByCss(pageClientMaint.selectors.menu.clientNameInput, NVClientName)
      // Click on find button
      .waitAndClickByXpath(pageClientMaint.selectors.menu.findButton)
      // Click on the first result (Selenium top)
      .waitAndClickByXpath(pageClientMaint.selectors.menu.firstResult)
      // Click on continue button (by text)
      .waitAndClickOnText('Continue')
      // Click on Create load link (by text)
      .waitAndClickOnText('Create Load Specification')
      // Add profile load name
      .waitAndSetValueByCss(pageClientMaint.selectors.basicInformation.profileLoadName, `Create Load ${randomNumber}`)
      // Add data file path
      .waitAndSetValueByCss(pageClientMaint.selectors.basicInformation.fileLocationInput, 'C:\\fakepath\\dataClientLoadCreate.txt')
      // Select "Ongoing load" checkbox
      .waitAndClickByCss(pageClientMaint.selectors.basicInformation.ongoingLoad)
      // Click on submit
      .waitAndClickByXpath(pageClientMaint.selectors.basicInformation.submitButton)
      // Navigate to client information mapping
      .waitAndClickOnText('Client Information Mapping')
      // Clear top mapping field
      .clearValueByXpath('//*[@id="PALForm"]/table/tbody/tr[3]/td[2]/table/tbody/tr[1]/td/table/tbody/tr/td/table/tbody/tr/td/div/table/tbody/tr/td[2]/table/tbody/tr[2]/td[3]/input[1]')
      // Add top value
      .waitAndSetValueByXpath('//*[@id="PALForm"]/table/tbody/tr[3]/td[2]/table/tbody/tr[1]/td/table/tbody/tr/td/table/tbody/tr/td/div/table/tbody/tr/td[2]/table/tbody/tr[2]/td[3]/input[1]', NVClientName)
      // Add sub value
      .waitAndSetValueByCss('#PALForm > table > tbody > tr:nth-child(3) > td:nth-child(2) > table > tbody > tr:nth-child(1) > td > table > tbody > tr > td > table > tbody > tr > td > div > table > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(200) > td > div > table > tbody > tr:nth-child(2) > td:nth-child(4) > input[type=text]:nth-child(1)', NVSubunit)
      // Add traveller type
      .waitAndSetValueByCss('#PALForm > table > tbody > tr:nth-child(3) > td:nth-child(2) > table > tbody > tr:nth-child(1) > td > table > tbody > tr > td > table > tbody > tr > td > div > table > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(200) > td > div > table > tbody > tr:nth-child(3) > td:nth-child(5) > input[type=text]:nth-child(1)', NVTravellerType1)
      // Add traveller type
      .waitAndSetValueByCss('#PALForm > table > tbody > tr:nth-child(3) > td:nth-child(2) > table > tbody > tr:nth-child(1) > td > table > tbody > tr > td > table > tbody > tr > td > div > table > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(200) > td > div > table > tbody > tr:nth-child(4) > td:nth-child(5) > input[type=text]:nth-child(1)', NVTravellerType2)
      // Click on submit
      .waitAndClickByXpath('//*[@id="PALForm"]/table/tbody/tr[3]/td[2]/table/tbody/tr[3]/td[1]/a')

      // Navigate to file mapping
      .waitAndClickOnText('File Mapping')
      // Expand file type selection box
      .waitAndClickByCss('#fileTypeSelected')
      // Select PV3
      .waitAndClickByCss('#fileTypeSelected > :nth-child(2)')
      // Expand Delimiters selection box
      .waitAndClickByCss('#fileDelimiterSelected')
      // Select Bar/Excel
      .waitAndClickByCss('#fileDelimiterSelected > :nth-child(2)')
      // CLick on apply
      .waitAndClickByXpath('//*[@id="hidesubmit"]/center/table/tbody/tr[3]/td/a')
      // Click on submit
      .waitAndClickByXpath('//*[@id="hidesubmit"]/center/table/tbody/tr[2]/td[5]/a')
      // Navigate to Test/Run Load
      .waitAndClickOnText('Test/Run Load')
      // Upload data file
      .fileUpload(`${dataFolder}/dataClientLoadCreate${randomNumberForCreate}.txt`)
      // Click on Test button
      .waitAndClickByXpath(pageClientMaint.selectors.testRunLoad.testButton)
      // Navigate to file mapping
      .waitAndClickOnText('File Mapping')
      // Navigate to History section
      .waitAndClickOnText('History')
      // Refresh until the results line display
      .isElementExistWithRefresh('//*[@id="table-1"]/tbody/tr/td[2]/span/a', 10, 5000)

      // Navigate back to Test/Run Load (now you'll see the also run button)
      .waitAndClickOnText('Test/Run Load')
      // Upload data file once more
      .fileUpload(`${dataFolder}/dataClientLoadCreate${randomNumberForCreate}.txt`)
      // Click on Run button
      .waitAndClickByXpath(pageClientMaint.selectors.testRunLoad.runButton)
      .pause(1000)
      // Navigate to file mapping the second time
      .waitAndClickOnText('File Mapping')
      // Navigate to History the second time
      .waitAndClickOnText('History')
      // Refresh until the results line display
      .isElementExistWithRefresh('//*[@id="table-1"]/tbody/tr/td[2]/span/a', 10, 5000)
      // Click in the results
      .waitAndClickByXpath('//*[@id="table-1"]/tbody/tr/td[2]/span/a')

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

  'step 3 - Update load': (browser) => {
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
      .waitAndClickOnText(specExplicitNV)
      // Navigate to Test/Run Load
      .waitAndClickOnText('Test/Run Load')
      // Upload data file
      .fileUpload(`${dataFolder}/dataClientLoadUpdate${randomNumberForCreate}.txt`)
      // Click on Test button
      .waitAndClickByXpath(pageClientMaint.selectors.testRunLoad.runButton)
      // Navigate to file mapping
      .waitAndClickOnText('File Mapping')
      // Navigate to History section
      .waitAndClickOnText('History')
      // Wait, refresh and click in the results
      .pause(30000).refresh()
      .waitAndClickByCss(pageClientMaint.selectors.history.runHistoryFirstResults)
      // .stop()
      .pause(2000)
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

  'step 4 - Validate updated traveller in IDM': (browser) => {
    browser
      // Login to IDM
      .loginToIDMProd('u043exd', 'EdEdEd2022!!')
      // Add traveller email
      .waitAndSetValueByCss(pageIDM.selectors.search.userInput, travellerEmail)
      // Click on search button
      .waitAndClickByCss(pageIDM.selectors.search.searchButton)
      // Validate traveller name
      .waitForTextByXpath(pageIDM.selectors.searchResults.name, travellerName);
  },

  'step 5 - Report': () => {
      console.log('============== Report ==============');
      console.log(`Traveller email: ${travellerEmail}`);
  },

  'step 6 - Login to clientMaint with admin credentials': (browser) => {
    browser
      .url(globals.urls.clientMaint_prod_url)
      .waitAndSetValueByCss(pageClientMaint.selectors.login.usernameInput, adminID)
      .waitAndSetValueByCss(pageClientMaint.selectors.login.passwordInput, adminPassword)
      // CLick on OK button
      .waitAndClickByCss(pageClientMaint.selectors.login.okButton);
  },

  'step 7 - Delete load': (browser) => {
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
      .waitAndClickOnText(specExplicitNV)
      // Navigate to Test/Run Load
      .waitAndClickOnText('Test/Run Load')
      // Upload data file
      .fileUpload(`${dataFolder}/dataClientLoadDelete${randomNumberForCreate}.txt`)
      // Click on Test button
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
      .waitForTextByCss(pageClientMaint.selectors.report.reportText, 'Deletes                                   1')
      // Validate success 1
      .waitForTextByCss(pageClientMaint.selectors.report.reportText, 'Successful                                1')
      // Close tab 2 and 3 and focus back on tab 1
      .closeWindow().pause(500).switchToTab(1).closeWindow().switchToTab(0);
  },

  'step 8 - Validate traveller is deleted in IDM': (browser) => {
    browser
      // Open IDM URL, no need to login again
      .url('https://idm-ui-prod.int.carlsonwagonlit.com')
      // Add traveller email
      .waitAndSetValueByCss(pageIDM.selectors.search.userInput, travellerEmail)
      // Click on search button
      .waitAndClickByCss(pageIDM.selectors.search.searchButton)
      // Validate traveller name
      .waitForTextByCss(pageIDM.selectors.searchResults.noResultsText, `We couldn’t find any results for ‘${travellerEmail}’`);
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