'use strict';

// TODO: need to update data-testid for most fields before completing this test

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
      .loginToPortraitProd(adminID, adminPassword);
  },

  'step 2 - Search by email': (browser) => {
    browser
      // Select "Search Across Clients" check box
      .waitAndClickByXpath(pagePortraitSearch.selectors.search.searchAcrossClientsCheckBox)
      // Existing email
      .waitAndSetValueByCss(pagePortraitSearch.selectors.search.email, 'nilson1@yopmail.com')
      // Click on search button
      .waitAndClickByCss(pagePortraitSearch.selectors.search.searchButton)
      // .stop()
      // Validate user in the results
      .waitForTextByXpath(pagePortraitSearch.selectors.searchResults.resultsName, 'One, Nilson')
      // Validate pin
      .waitForTextByXpath(pagePortraitSearch.selectors.searchResults.resultsPin, '161140880')
      // Validate ID
      .waitForTextByXpath(pagePortraitSearch.selectors.searchResults.resultsId, 'E21A5E7EOR')
      // Validate client information
      .waitForTextByXpath(pagePortraitSearch.selectors.searchResults.resultsClientInformation, 'CWT Employee Travel\nUS-OI Test\nGeneral')

      // Clear email field
      .useCss().clearValue(pagePortraitSearch.selectors.search.email)
      // None existing email
      .waitAndSetValueByCss(pagePortraitSearch.selectors.search.email, 'fakeTraveller@yopmail.com')
      // Click on search button
      .waitAndClickByCss(pagePortraitSearch.selectors.search.searchButton)
      // Validate no results upper text
      .waitForTextByXpath(pagePortraitSearch.selectors.searchResults.noResultsUpperText, 'Your search returned 0 travelers. No items match the search criteriaNo traveler profiles found.')
      // Validate no results lower text
      .waitForTextByXpath(pagePortraitSearch.selectors.searchResults.noResultsLowerText, 'No items match the search criteria')
      // Clear email field
      .useCss().clearValue(pagePortraitSearch.selectors.search.email);
  },

  'step 3 - Search by name': (browser) => {
    browser
      // Existing name
      .waitAndSetValueByCss(pagePortraitSearch.selectors.search.name, 'Two, Nilson')
      // Click on search button
      .waitAndClickByCss(pagePortraitSearch.selectors.search.searchButton)
      // Validate user in the results
      .waitForTextByXpath(pagePortraitSearch.selectors.searchResults.resultsName, 'Two, Nilson')
      // Validate pin
      .waitForTextByXpath(pagePortraitSearch.selectors.searchResults.resultsPin, '161135879')
      // Validate ID
      .waitForTextByXpath(pagePortraitSearch.selectors.searchResults.resultsId, 'GFdwuy337\nTRK5CRTDN9')
      // Validate client information
      .waitForTextByXpath(pagePortraitSearch.selectors.searchResults.resultsClientInformation, 'CWT Employee Travel\nUS-OI Test\nGeneral')

      // Clear name field
      .useCss().clearValue(pagePortraitSearch.selectors.search.name)
      // None existing name
      .waitAndSetValueByCss(pagePortraitSearch.selectors.search.name, 'fake name')
      // Click on search button
      .waitAndClickByCss(pagePortraitSearch.selectors.search.searchButton)
      // Validate no results upper text
      .waitForTextByXpath(pagePortraitSearch.selectors.searchResults.noResultsUpperText, 'Your search returned 0 travelers. No items match the search criteriaNo traveler profiles found.')
      // Validate no results lower text
      .waitForTextByXpath(pagePortraitSearch.selectors.searchResults.noResultsLowerText, 'No items match the search criteria')
      // Clear name field
      .useCss().clearValue(pagePortraitSearch.selectors.search.name);
  },

  'step 4 - Search by pin': (browser) => {
    browser
      // Existing pin number
      .waitAndSetValueByCss(pagePortraitSearch.selectors.search.pin, '161137881')
      // Click on search button
      .waitAndClickByCss(pagePortraitSearch.selectors.search.searchButton)
      // Validate user in the results
      .waitForTextByXpath(pagePortraitSearch.selectors.searchResults.resultsName, 'Three, Nilson')
      // Validate pin
      .waitForTextByXpath(pagePortraitSearch.selectors.searchResults.resultsPin, '161137881')
      // Validate ID
      .waitForTextByXpath(pagePortraitSearch.selectors.searchResults.resultsId, 'GFdwuyfre\nTTW8WBS30L')
      // Validate client information
      .waitForTextByXpath(pagePortraitSearch.selectors.searchResults.resultsClientInformation, 'CWT Employee Travel\nUS-OI Test\nGeneral')

      // Clear pin field
      .useCss().clearValue(pagePortraitSearch.selectors.search.pin)
      // None existing pin
      .waitAndSetValueByCss(pagePortraitSearch.selectors.search.pin, 'fake pin number')
      // Click on search button
      .waitAndClickByCss(pagePortraitSearch.selectors.search.searchButton)
      // Validate no results upper text
      .waitForTextByXpath(pagePortraitSearch.selectors.searchResults.noResultsUpperText, 'Your search returned 0 travelers. No items match the search criteriaNo traveler profiles found.')
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
      .waitAndSetValueByXpath(pagePortraitSearch.selectors.search.thirdPartySyncId, 'TRK5CRTDN9')
      // Click on search button
      .waitAndClickByCss(pagePortraitSearch.selectors.search.searchButton)
      // Validate user in the results
      .waitForTextByXpath(pagePortraitSearch.selectors.searchResults.resultsName, 'Two, Nilson')
      // Validate pin
      .waitForTextByXpath(pagePortraitSearch.selectors.searchResults.resultsPin, '161135879')
      // Validate ID (3rd Party Sync ID)
      .waitForTextByXpath(pagePortraitSearch.selectors.searchResults.resultsId, 'GFdwuy337\nTRK5CRTDN9')
      // Validate client information
      .waitForTextByXpath(pagePortraitSearch.selectors.searchResults.resultsClientInformation, 'CWT Employee Travel\nUS-OI Test\nGeneral')

      // Clear 3rd Party Sync ID field
      .clearValue(pagePortraitSearch.selectors.search.thirdPartySyncId)
      // None existing 3rd Party Sync ID
      .waitAndSetValueByXpath(pagePortraitSearch.selectors.search.thirdPartySyncId, 'fake 3rd Party Sync ID')
      // Click on search button
      .waitAndClickByCss(pagePortraitSearch.selectors.search.searchButton)
      // Validate no results upper text
      .waitForTextByXpath(pagePortraitSearch.selectors.searchResults.noResultsUpperText, 'Your search returned 0 travelers. No items match the search criteriaNo traveler profiles found.')
      // Validate no results lower text
      .waitForTextByXpath(pagePortraitSearch.selectors.searchResults.noResultsLowerText, 'No items match the search criteria')
      // Clear pin field
      .clearValue(pagePortraitSearch.selectors.search.thirdPartySyncId);
  },

  'step 7 - Search by GUID': (browser) => {
    browser
      // Existing guid
      .waitAndSetValueByCss(pagePortraitSearch.selectors.search.guid, '15:2383ED35')
      // Click on search button
      .waitAndClickByCss(pagePortraitSearch.selectors.search.searchButton)
      // Validate user in the results
      .waitForTextByXpath(pagePortraitSearch.selectors.searchResults.resultsName, 'One, Nilson')
      // Validate pin
      .waitForTextByXpath(pagePortraitSearch.selectors.searchResults.resultsPin, '161140880')
      // Validate ID (3rd Party Sync ID)
      .waitForTextByXpath(pagePortraitSearch.selectors.searchResults.resultsId, 'E21A5E7EOR')
      // Validate client information
      .waitForTextByXpath(pagePortraitSearch.selectors.searchResults.resultsClientInformation, 'CWT Employee Travel\nUS-OI Test\nGeneral')

      // Clear guid field
      .useCss().clearValue(pagePortraitSearch.selectors.search.guid)
      // None existing guid
      .waitAndSetValueByCss(pagePortraitSearch.selectors.search.guid, 'fake guid')
      // Click on search button
      .waitAndClickByCss(pagePortraitSearch.selectors.search.searchButton)
      // Validate no results upper text
      .waitForTextByXpath(pagePortraitSearch.selectors.searchResults.noResultsUpperText, 'Your search returned 0 travelers. No items match the search criteriaInvalid search criteria to find Traveler Profile details. Need to enter valid Traveler GUID.')
      // Validate no results lower text
      .waitForTextByXpath(pagePortraitSearch.selectors.searchResults.noResultsLowerText, 'No items match the search criteria')
      // Clear guid field
      .useCss().clearValue(pagePortraitSearch.selectors.search.guid);
  },

};