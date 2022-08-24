'use strict';

let NWTools = require('nightwatch-tools');
let randomString = NWTools.randomString(4,'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz');
let randomNumber = NWTools.randomString(4,'1234567890');
const pagePortrait = require('../../../../pages/page-portrait');
const pagePortraitSearch = require('../../../../pages/page-portrait');
let newUserDetails = [];
//-------------------------------------------------------------------------------------------
let adminID = 'u075pxb';  // pavel username: u075pxb
let adminPassword = 'Vbren2156482';   // pavel password: Vbren2156482
//---------------------------------Client details--------------------------------------------
let NVClientName = 'Selenium top';
let NVSubunit = 'Selenium sub 4';
let NVTravellerType = 'General';
let EUClientName = 'LIGAS TEST';
let EUSubunit = 'PL-Test25';
let EUTravellerType = 'EMEA1';
//-----------------------------------User details--------------------------------------------
let firstName = `Astrid ${randomString}`;
let lastName = `Berg ${randomString}`;
let email = `astrid${randomNumber}@yopmail.com`;
let esid = `esid:${randomNumber}`;
//-------------------------------------------------------------------------------------------

module.exports = {

  '@tags': ['CRUD', 'Portrait'],

  before: function (browser) {
    browser.windowMaximize();
  },

// ---------------------------------------- Create new traveller ----------------------------------------

  'step 1 - Login with admin credentials': (browser) => {
    browser
      .loginToPortraitStage(adminID, adminPassword);
  },

  'step 2 - Add all required fields': (browser) => {
    browser
      // Add client name
      .waitAndSetValueByCss(pagePortrait.selectors.search.client, NVClientName)
      .pause(3000)
      // Select the first option
      .waitAndClickByCss(pagePortrait.selectors.search.firstClient)
      .pause(3000)
      // Click on add traveller button
      .waitAndClickByXpath(pagePortrait.selectors.search.addTravelerButton)
      .pause(3000)
      // Add subunit
      .waitAndClickByCss(pagePortrait.selectors.travellerDetails.subunit)
      .waitAndClickOnText(NVSubunit)
      // Add traveler type
      .waitAndClickByCss(pagePortrait.selectors.travellerDetails.travellerType)
      .waitAndClickOnText(NVTravellerType)
      // .stop()
      // Add first name
      .waitAndSetValueByCss(pagePortrait.selectors.travellerDetails.firstName, firstName);
        newUserDetails.push(`- First name: ${firstName}`);
    browser
      // Add last name
      .waitAndSetValueByCss(pagePortrait.selectors.travellerDetails.lastName, lastName);
        newUserDetails.push(`- Last name: ${lastName}`);
    browser
      // Add title
      .waitAndClickByXpath(pagePortrait.selectors.travellerDetails.title2)
      // Add email
      .waitAndSetValueByCss(pagePortrait.selectors.travellerDetails.emailAddress, email);
        newUserDetails.push(`- Email: ${email}`);

        // Add value in ESID field if exist
    browser
      // eslint-disable-next-line no-undef
      .element('css selector', pagePortrait.selectors.travellerDetails.ESIDCreate, (isExist) => {                      // Click if exist
        if (isExist.status !== -1) {
          browser
            // eslint-disable-next-line no-undef
            .waitAndSetValueByCss(pagePortrait.selectors.travellerDetails.ESIDCreate, esid);
        }
      });

    browser
      // Click on "save and add" button
      .waitAndClickByXpath(pagePortrait.selectors.travellerDetails.saveAndAdd)
      // Validate saving (By "save and add" button become disable)
      .pause(5000);
      // .elementDisabledByXpath(pagePortrait.selectors.travellerDetails.saveAndAdd);
  },

// ---------------------------------------- Update traveller ----------------------------------------

  'step 3 - Search and select the new traveller': (browser) => {
    browser
      // Check "search across clients" checkbox
      .waitAndClickByXpath(pagePortrait.selectors.search.searchAcrossClientsCheckBox)
      // Add the new traveller email
      .waitAndSetValueByCss(pagePortrait.selectors.search.email, email)
      // Check "include inactive profiles" checkbox
      .waitAndClickByXpath(pagePortrait.selectors.search.includeInactiveProfilesCheckBox)
      // Click on search button
      .waitAndClickByCss(pagePortrait.selectors.search.searchButton);

    browser.element('xpath', pagePortrait.selectors.searchResults.resultsName, (isExist) => {                      // Click if exist
      if (isExist.status !== 1) {
        browser
          .pause(8000)
          .waitAndClickByCss(pagePortrait.selectors.search.searchButton);
      }
    });

      // Select the new traveller
      browser.waitAndClickByXpath(pagePortrait.selectors.searchResults.resultsName)
      // Click on "ignore-skip this step" button
      .waitAndClickByCss(pagePortrait.selectors.searchResults.skipThisStepButton);
  },

  'step 4 - Update some details': (browser) => {
    browser
      // Update middle name
      .waitAndSetValueByCss(pagePortrait.selectors.travellerDetails.middleName, `Mido ${randomString}`)
      // Update Suffix
      .waitAndSetValueByCss(pagePortrait.selectors.travellerDetails.suffix, '1234')
      // Update Gender to female
      .waitAndClickByXpath(pagePortrait.selectors.travellerDetails.gender2)
      // Click on "Submit changes"
      .waitAndClickByCss(pagePortrait.selectors.travellerDetails.submitChangesButton)
      // Validate success message
      .waitForTextByXpath(pagePortrait.selectors.upperPopUpMessage.text, 'SUCCESS')
      // Close success message
      .waitAndClickByXpath(pagePortrait.selectors.upperPopUpMessage.close)
      // Close update traveller tab
      .waitAndClickByXpath(pagePortrait.selectors.main.closeTab);
  },

  'step 5 - Validate new details are saved': (browser) => {
    browser
      // Clear email search field
      .clearValueByCss(pagePortrait.selectors.search.email)
      // Add non-existing email
      .waitAndSetValueByCss(pagePortrait.selectors.search.email, 'fake111@yopmail.com')
      // Click on search button
      .waitAndClickByCss(pagePortrait.selectors.search.searchButton)
      // Clear email search field
      .clearValueByCss(pagePortrait.selectors.search.email)
      // Search for the new traveller again
      .waitAndSetValueByCss(pagePortrait.selectors.search.email, email)
      // Click on search button
      .waitAndClickByCss(pagePortrait.selectors.search.searchButton);

        browser.element('xpath', pagePortrait.selectors.searchResults.resultsName, (isExist) => {                      // Click if exist
            if (isExist.status !== 1) {
            browser
              .pause(8000)
              .waitAndClickByCss(pagePortrait.selectors.search.searchButton);
          }
      });

      // Select the new traveller
      browser.waitAndClickByXpath(pagePortrait.selectors.searchResults.resultsName)
      // Click on "ignore-skip this step" button
      .waitAndClickByCss(pagePortrait.selectors.searchResults.skipThisStepButton)
      // Validate middle name
      .waitForAttributeContainsByCss(pagePortrait.selectors.travellerDetails.middleName, 'value', `Mido ${randomString}`)
      // Validate Suffix
      .waitForAttributeContainsByCss(pagePortrait.selectors.travellerDetails.suffix, 'value', '1234')
      // Validate Gender
      .waitForTextByXpath(pagePortrait.selectors.travellerDetails.gender2, 'Female');
  },

// ---------------------------------------- Deactivate traveller ----------------------------------------

  'step 6 - Deactivate traveller': (browser) => {
    browser
      // Click on deactivate profile button
      .waitAndClickByXpath(pagePortrait.selectors.travellerDetails.deactivateProfileButton)
      // Click on yes in the popup dialog
      .waitAndClickByXpath(pagePortrait.selectors.travellerDetails.deactivatePopUpYes)
      // Close update traveller tab
      .waitAndClickByXpath(pagePortrait.selectors.main.closeTab)
      // Click on search button
      .waitAndClickByCss(pagePortrait.selectors.search.searchButton)

      // Waiting for 'Active' status to be updated to 'Expired'
      .useXpath().waitForElementVisible(pagePortrait.selectors.searchResults.resultsStatusText)
      .getText(pagePortrait.selectors.searchResults.resultsStatusText, function (result) {
        const myValue = result.value;
          if (myValue !== 'Expired') {
            browser
              .pause(5000)
              .waitAndClickByCss(pagePortrait.selectors.search.searchButton);
          }
      });
      // Validate "expired" status
      browser.waitForTextByXpath(pagePortrait.selectors.searchResults.resultsStatusText, 'Expired');
  },

  'step 7 - Traveller report': () => {
    console.log('\n----------------------------------------------------------------\n' +
      'Traveller details:\n----------------------------------------------------------------');
    for(let i=0 ; i<newUserDetails.length ; i++) {
      console.log(newUserDetails[i]);
    }
    console.log('----------------------------------------------------------------\n');
  },
};