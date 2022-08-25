'use strict';

const pagePortrait = require('../../../../pages/page-portrait');

let clientName = 'CWT Employee Travel';
let firstName = 'Dua';
let lastName = 'Lipa';
let emailAddress = 'Lipa42@yopmail.com';

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

  'step 2 - All validations': (browser) => {
    browser
      .waitAndSetValueByCss(pagePortrait.selectors.search.client, clientName)
      .pause(2000)
      .waitAndClickByCss(pagePortrait.selectors.search.firstClient)
      .pause(10000)
      .waitAndClickByXpath(pagePortrait.selectors.search.addTravelerButton)
      .pause(3000)
      // Validations
      .elementPresentByCss(pagePortrait.selectors.validations.subunitValidation)        // Subunit
      .elementPresentByCss(pagePortrait.selectors.validations.travellerTypeValidation)  // Traveller type
      .elementPresentByCss(pagePortrait.selectors.validations.firstNameValidation)      // First name
      .elementPresentByCss(pagePortrait.selectors.validations.lastNameValidation)       // Last name
      .elementDisabledByXpath(pagePortrait.selectors.travellerDetails.saveAndAdd)          // Save and add button disable
      .elementDisabledByXpath(pagePortrait.selectors.travellerDetails.saveAndExit)         // Save and exit button disable
      .elementDisabledByXpath(pagePortrait.selectors.travellerDetails.saveAndEdit);        // Save and edit button disable

    },

  'step 3 - Adding subunit': (browser) => {
    browser
      // Add subunit
      .waitAndClickByXpath('//*[@id="addTravelerInfoformsubunit"]/option[4]')
      // Validations
      .elementNotPresentByCss(pagePortrait.selectors.validations.subunitValidation)        // Subunit
      .elementPresentByCss(pagePortrait.selectors.validations.travellerTypeValidation)     // Traveller type
      .elementPresentByCss(pagePortrait.selectors.validations.firstNameValidation)         // First name
      .elementPresentByCss(pagePortrait.selectors.validations.lastNameValidation)          // Last name
      .elementDisabledByXpath(pagePortrait.selectors.travellerDetails.saveAndAdd)         // Save and add button disable
      .elementDisabledByXpath(pagePortrait.selectors.travellerDetails.saveAndExit)        // Save and exit button disable
      .elementDisabledByXpath(pagePortrait.selectors.travellerDetails.saveAndEdit);       // Save and edit button disable
  },

  'step 4 - Adding traveler type': (browser) => {
    browser
      // Add traveler type
      .waitAndClickByXpath('//*[@id="addTravelerInfoformtravelerType"]/option[2]')
      // Validations
      .elementNotPresentByCss(pagePortrait.selectors.validations.subunitValidation)         // Subunit
      .elementNotPresentByCss(pagePortrait.selectors.validations.travellerTypeValidation)   // Traveller type
      .elementPresentByCss(pagePortrait.selectors.validations.firstNameValidation)          // First name
      .elementPresentByCss(pagePortrait.selectors.validations.lastNameValidation)           // Last name
      .elementPresentByCss(pagePortrait.selectors.validations.titleValidation)              // Title
      .elementPresentByCss(pagePortrait.selectors.validations.emailValidation)              // email
      .elementDisabledByXpath(pagePortrait.selectors.travellerDetails.saveAndAdd)          // Save and add button disable
      .elementDisabledByXpath(pagePortrait.selectors.travellerDetails.saveAndExit)         // Save and exit button disable
      .elementDisabledByXpath(pagePortrait.selectors.travellerDetails.saveAndEdit);        // Save and edit button disable
  },

  'step 5 - Adding first name': (browser) => {
    browser
      // Add first name
      .waitAndSetValueByCss(pagePortrait.selectors.travellerDetails.firstName, firstName)
      // Validations
      .elementNotPresentByCss(pagePortrait.selectors.validations.subunitValidation)         // Subunit
      .elementNotPresentByCss(pagePortrait.selectors.validations.travellerTypeValidation)   // Traveller type
      .elementNotPresentByCss(pagePortrait.selectors.validations.firstNameValidation)       // First name
      .elementPresentByCss(pagePortrait.selectors.validations.lastNameValidation)           // Last name
      .elementPresentByCss(pagePortrait.selectors.validations.titleValidation)              // Title
      .elementPresentByCss(pagePortrait.selectors.validations.emailValidation)              // email
      .elementDisabledByXpath(pagePortrait.selectors.travellerDetails.saveAndAdd)          // Save and add button disable
      .elementDisabledByXpath(pagePortrait.selectors.travellerDetails.saveAndExit)         // Save and exit button disable
      .elementDisabledByXpath(pagePortrait.selectors.travellerDetails.saveAndEdit);        // Save and edit button disable
  },

  'step 6 - Adding last name': (browser) => {
    browser
      // Add last name
      .waitAndSetValueByCss(pagePortrait.selectors.travellerDetails.lastName, lastName)
      // Validations
      .elementNotPresentByCss(pagePortrait.selectors.validations.subunitValidation)         // Subunit
      .elementNotPresentByCss(pagePortrait.selectors.validations.travellerTypeValidation)   // Traveller type
      .elementNotPresentByCss(pagePortrait.selectors.validations.firstNameValidation)       // First name
      .elementNotPresentByCss(pagePortrait.selectors.validations.lastNameValidation)        // Last name
      .elementPresentByCss(pagePortrait.selectors.validations.titleValidation)              // Title
      .elementPresentByCss(pagePortrait.selectors.validations.emailValidation)              // email
      .elementDisabledByXpath(pagePortrait.selectors.travellerDetails.saveAndAdd)          // Save and add button disable
      .elementDisabledByXpath(pagePortrait.selectors.travellerDetails.saveAndExit)         // Save and exit button disable
      .elementDisabledByXpath(pagePortrait.selectors.travellerDetails.saveAndEdit);        // Save and edit button disable
  },

  'step 7 - Adding title': (browser) => {
    browser
      // Add title
      .waitAndClickByXpath('//*[@id="addTravelerInfoformprefix"]/option[2]')
      // Validations
      .elementNotPresentByCss(pagePortrait.selectors.validations.subunitValidation)          // Subunit
      .elementNotPresentByCss(pagePortrait.selectors.validations.travellerTypeValidation)    // Traveller type
      .elementNotPresentByCss(pagePortrait.selectors.validations.firstNameValidation)        // First name
      .elementNotPresentByCss(pagePortrait.selectors.validations.lastNameValidation)         // Last name
      .elementNotPresentByCss(pagePortrait.selectors.validations.titleValidation)            // Title
      .elementPresentByCss(pagePortrait.selectors.validations.emailValidation)               // email
      .elementDisabledByXpath(pagePortrait.selectors.travellerDetails.saveAndAdd)           // Save and add button disable
      .elementDisabledByXpath(pagePortrait.selectors.travellerDetails.saveAndExit)          // Save and exit button disable
      .elementDisabledByXpath(pagePortrait.selectors.travellerDetails.saveAndEdit);         // Save and edit button disable
  },

  'step 8 - Adding email': (browser) => {
    browser
      // Add email
      .waitAndSetValueByCss(pagePortrait.selectors.travellerDetails.emailAddress, emailAddress)
      // Validations
      .elementNotPresentByCss(pagePortrait.selectors.validations.subunitValidation)         // Subunit
      .elementNotPresentByCss(pagePortrait.selectors.validations.travellerTypeValidation)   // Traveller type
      .elementNotPresentByCss(pagePortrait.selectors.validations.firstNameValidation)       // First name
      .elementNotPresentByCss(pagePortrait.selectors.validations.lastNameValidation)        // Last name
      .elementNotPresentByCss(pagePortrait.selectors.validations.titleValidation)           // Title
      .elementNotPresentByCss(pagePortrait.selectors.validations.emailValidation);          // email
  },
};