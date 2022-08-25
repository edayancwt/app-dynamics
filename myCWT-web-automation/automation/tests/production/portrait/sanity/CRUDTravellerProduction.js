'use strict';

let NWTools = require('nightwatch-tools');
let randomString = NWTools.randomString(4,'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz');
let randomNumber = NWTools.randomString(4,'1234567890');
const pagePortrait = require('../../../../pages/page-portrait');
let newUserDetails = [];
//-------------------------------------------------------------------------------------------
let adminID = 'u043exd';
let adminPassword = 'EdEdEd2022!!';
//---------------------------------Client details--------------------------------------------
let clientName = 'CWT Employee Travel';
let subunit = '//*[@id="addTravelerInfoformsubunit"]/option[199]';
let carlsonId = randomNumber+randomString;
//-----------------------------------User details--------------------------------------------
let firstName = `Ingrid ${randomString}`;
let lastName = `Gold ${randomString}`;
let email = `ingrid${randomNumber}@yopmail.com`;
//-------------------------------------------------------------------------------------------

module.exports = {

  '@tags': ['CRUD', 'Portrait'],

  before: function (browser) {
    browser.windowMaximize();
  },

// ---------------------------------------- Create new traveller ----------------------------------------

  'step 1 - Login with admin credentials': (browser) => {
    browser
      .loginToPortraitProd(adminID, adminPassword);
  },

  'step 2 - Add all required fields': (browser) => {
    browser
      // Add client name
      .waitAndSetValueByCss(pagePortrait.selectors.search.client, clientName)
      .pause(3000)
      // Select the first option
      .waitAndClickByCss(pagePortrait.selectors.search.firstClient)
      .pause(8000)
      // Click on add traveller button
      .waitAndClickByXpath(pagePortrait.selectors.search.addTravelerButton)
      .pause(3000)
      // Add subunit
      .waitAndClickByXpath(subunit)
      // Add traveler type
      .waitAndClickByXpath(pagePortrait.selectors.travellerDetails.travellerType2)
      // Add first name
      .waitAndSetValueByCss(pagePortrait.selectors.travellerDetails.firstName, firstName);
        newUserDetails.push(`- First name: ${firstName}`);
      browser
      // Add last name
      .waitAndSetValueByCss(pagePortrait.selectors.travellerDetails.lastName, lastName);
        newUserDetails.push(`- Last name: ${lastName}`);
      browser
      // Add prefix
      .waitAndClickByXpath(pagePortrait.selectors.travellerDetails.prefix2)
      // Add Carlson ID
      .waitAndSetValueByCss(pagePortrait.selectors.travellerDetails.carlsonId, carlsonId)
      // Add email
      .waitAndSetValueByCss(pagePortrait.selectors.travellerDetails.emailAddress, email);
        newUserDetails.push(`- Email: ${email}`);
      browser
      // Click on "save and add" button
      .waitAndClickByXpath(pagePortrait.selectors.travellerDetails.saveAndAdd)
      // Validate saving (By "save and add" button become disable)
      .pause(4000)
      .elementDisabledByXpath(pagePortrait.selectors.travellerDetails.saveAndAdd);
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
      .pause(2000)
      // Click on search button
      .waitAndClickByCss(pagePortrait.selectors.search.searchButton)
      // Select the new traveller
      .waitAndClickByXpath(pagePortrait.selectors.searchResults.resultsName)
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
      .pause(2000)
      .waitAndClickByCss(pagePortrait.selectors.search.searchButton)
      // Select the new traveller
      .waitAndClickByXpath(pagePortrait.selectors.searchResults.resultsName)
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
      .pause(2000)
      // Click on search button
      .waitAndClickByCss(pagePortrait.selectors.search.searchButton)
      // Validate "expired" status
      .waitForTextByXpath(pagePortrait.selectors.searchResults.resultsStatusText, 'Expired');
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