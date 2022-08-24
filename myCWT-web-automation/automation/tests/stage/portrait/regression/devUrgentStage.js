'use strict';

const pagePortraitSearch = require('../../../../pages/page-portrait');

let adminID = 'u043exd';
let adminPassword = 'EdEdEd2022!!';

module.exports = {

  '@tags': ['portrait'],

  before: function (browser) {
    browser.windowMaximize();
  },

  'step 1 - Login to portrait on stage (via clientMaint)': (browser) => {
    browser
      .loginToPortraitStage(adminID, adminPassword);
  },

  'step 2 - Search by email': (browser) => {
    browser
      // Select "Search Across Clients" check box
      .waitAndClickByXpath(pagePortraitSearch.selectors.search.searchAcrossClientsCheckBox)
      // Existing email
      .waitAndSetValueByCss(pagePortraitSearch.selectors.search.email, 'adam1@yopmail.com')
      // Click on search button
      .waitAndClickByCss(pagePortraitSearch.selectors.search.searchButton)
      // Validate user in the results
      .waitForTextByXpath(pagePortraitSearch.selectors.searchResults.resultsName, 'One, Adam One')
      // Validate pin
      .waitForTextByXpath(pagePortraitSearch.selectors.searchResults.resultsPin, '23412577')
      // Validate ID
      .waitForTextByXpath(pagePortraitSearch.selectors.searchResults.resultsId, 'TN9CAY03V6')
      // Validate client information
      .waitForTextByXpath(pagePortraitSearch.selectors.searchResults.resultsClientInformation, 'Selenium top\nSelenium sub 3\nGeneral')

      // Clear email field
      .useCss().clearValue(pagePortraitSearch.selectors.search.email)
      // None existing email
      .waitAndSetValueByCss(pagePortraitSearch.selectors.search.email, 'fakeTraveller@yopmail.com')
      // Click on search button
      .waitAndClickByCss(pagePortraitSearch.selectors.search.searchButton)
      // Validate no results upper text
      .waitForTextByXpath(pagePortraitSearch.selectors.searchResults.noResultsUpperText, 'Your search returned 0 travellers. No items match the search criteriaNo traveller profiles found.')
      // Validate no results lower text
      .waitForTextByXpath(pagePortraitSearch.selectors.searchResults.noResultsLowerText, 'No items match the search criteria')
      // Clear email field
      .useCss().clearValue(pagePortraitSearch.selectors.search.email);
  },

  'step 3 - Search by name': (browser) => {
    browser
      // Existing name
      .waitAndSetValueByCss(pagePortraitSearch.selectors.search.name, 'Two, Adam Two')
      // Click on search button
      .waitAndClickByCss(pagePortraitSearch.selectors.search.searchButton)
      // Validate user in the results
      .waitForTextByXpath(pagePortraitSearch.selectors.searchResults.resultsName, 'Two, Adam Two')
      // Validate pin
      .waitForTextByXpath(pagePortraitSearch.selectors.searchResults.resultsPin, '23412578')
      // Validate ID
      .waitForTextByXpath(pagePortraitSearch.selectors.searchResults.resultsId, 'TN002PZJR8')
      // Validate client information
      .waitForTextByXpath(pagePortraitSearch.selectors.searchResults.resultsClientInformation, 'Selenium top\nSelenium sub 3\nGeneral')

      // Clear name field
      .useCss().clearValue(pagePortraitSearch.selectors.search.name)
      // None existing name
      .waitAndSetValueByCss(pagePortraitSearch.selectors.search.name, 'fake name')
      // Click on search button
      .waitAndClickByCss(pagePortraitSearch.selectors.search.searchButton)
      // Validate no results upper text
      .waitForTextByXpath(pagePortraitSearch.selectors.searchResults.noResultsUpperText, 'Your search returned 0 travellers. No items match the search criteriaNo traveller profiles found.')
      // Validate no results lower text
      .waitForTextByXpath(pagePortraitSearch.selectors.searchResults.noResultsLowerText, 'No items match the search criteria')
      // Clear name field
      .useCss().clearValue(pagePortraitSearch.selectors.search.name);
  },

  'step 4 - Search by pin': (browser) => {
    browser
      // Existing pin number
      .waitAndSetValueByCss(pagePortraitSearch.selectors.search.pin, '23413641')
      // Click on search button
      .waitAndClickByCss(pagePortraitSearch.selectors.search.searchButton)
      // Validate user in the results
      .waitForTextByXpath(pagePortraitSearch.selectors.searchResults.resultsName, 'Three, Adam Three')
      // Validate pin
      .waitForTextByXpath(pagePortraitSearch.selectors.searchResults.resultsPin, '23413641')
      // Validate ID
      .waitForTextByXpath(pagePortraitSearch.selectors.searchResults.resultsId, 'TG4LMOT9OQ')
      // Validate client information
      .waitForTextByXpath(pagePortraitSearch.selectors.searchResults.resultsClientInformation, 'Selenium top\nSelenium sub 3\nGeneral')

      // Clear pin field
      .useCss().clearValue(pagePortraitSearch.selectors.search.pin)
      // None existing pin
      .waitAndSetValueByCss(pagePortraitSearch.selectors.search.pin, 'fake pin number')
      // Click on search button
      .waitAndClickByCss(pagePortraitSearch.selectors.search.searchButton)
      // Validate no results upper text
      .waitForTextByXpath(pagePortraitSearch.selectors.searchResults.noResultsUpperText, 'Your search returned 0 travellers. No items match the search criteriaNo traveller profiles found.')
      // Validate no results lower text
      .waitForTextByXpath(pagePortraitSearch.selectors.searchResults.noResultsLowerText, 'No items match the search criteria')
      // Clear pin field
      .useCss().clearValue(pagePortraitSearch.selectors.search.pin);
  },

  // 'step 5 - Search by External Sys ID': (browser) => {    // TBD!!!
  //   browser
  //     .stop();
  // },

  'step 6 - Search by 3rd Party Sync ID': (browser) => {
    browser
      // Existing 3rd Party Sync ID
      .waitAndSetValueByXpath(pagePortraitSearch.selectors.search.thirdPartySyncId, 'TN002PZJR8')
      // Click on search button
      .waitAndClickByCss(pagePortraitSearch.selectors.search.searchButton)
      // Validate user in the results
      .waitForTextByXpath(pagePortraitSearch.selectors.searchResults.resultsName, 'Two, Adam Two')
      // Validate pin
      .waitForTextByXpath(pagePortraitSearch.selectors.searchResults.resultsPin, '23412578')
      // Validate ID (3rd Party Sync ID)
      .waitForTextByXpath(pagePortraitSearch.selectors.searchResults.resultsId, 'TN002PZJR8')
      // Validate client information
      .waitForTextByXpath(pagePortraitSearch.selectors.searchResults.resultsClientInformation, 'Selenium top\nSelenium sub 3\nGeneral')

      // Clear 3rd Party Sync ID field
      .clearValue(pagePortraitSearch.selectors.search.thirdPartySyncId)
      // None existing 3rd Party Sync ID
      .waitAndSetValueByXpath(pagePortraitSearch.selectors.search.thirdPartySyncId, 'fake 3rd Party Sync ID')
      // Click on search button
      .waitAndClickByCss(pagePortraitSearch.selectors.search.searchButton)
      // Validate no results upper text
      .waitForTextByXpath(pagePortraitSearch.selectors.searchResults.noResultsUpperText, 'Your search returned 0 travellers. No items match the search criteriaNo traveller profiles found.')
      // Validate no results lower text
      .waitForTextByXpath(pagePortraitSearch.selectors.searchResults.noResultsLowerText, 'No items match the search criteria')
      // Clear pin field
      .clearValue(pagePortraitSearch.selectors.search.thirdPartySyncId);
  },

  'step 7 - Search by GUID': (browser) => {
    browser
      // Existing guid
      .waitAndSetValueByCss(pagePortraitSearch.selectors.search.guid, 'A:406CFEE8')
      // Click on search button
      .waitAndClickByCss(pagePortraitSearch.selectors.search.searchButton)
      // Validate user in the results
      .waitForTextByXpath(pagePortraitSearch.selectors.searchResults.resultsName, 'One, Adam One')
      // Validate pin
      .waitForTextByXpath(pagePortraitSearch.selectors.searchResults.resultsPin, '23412577')
      // Validate ID (3rd Party Sync ID)
      .waitForTextByXpath(pagePortraitSearch.selectors.searchResults.resultsId, 'TN9CAY03V6')
      // Validate client information
      .waitForTextByXpath(pagePortraitSearch.selectors.searchResults.resultsClientInformation, 'Selenium top\nSelenium sub 3\nGeneral')

      // Clear guid field
      .useCss().clearValue(pagePortraitSearch.selectors.search.guid)
      // None existing guid
      .waitAndSetValueByCss(pagePortraitSearch.selectors.search.guid, 'fake guid')
      // Click on search button
      .waitAndClickByCss(pagePortraitSearch.selectors.search.searchButton)
      // Validate no results upper text
      .waitForTextByXpath(pagePortraitSearch.selectors.searchResults.noResultsUpperText, 'Your search returned 0 travellers. No items match the search criteriaInvalid search criteria to find Traveller Profile details. Need to enter valid Traveller GUID.')
      // Validate no results lower text
      .waitForTextByXpath(pagePortraitSearch.selectors.searchResults.noResultsLowerText, 'No items match the search criteria')
      // Clear guid field
      .useCss().clearValue(pagePortraitSearch.selectors.search.guid);
  },

};