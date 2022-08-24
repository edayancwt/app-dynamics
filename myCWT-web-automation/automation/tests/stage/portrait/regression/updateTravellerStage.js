'use strict';

let NWTools = require('nightwatch-tools');
let randomString = NWTools.randomString(5,'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz');
let randomNumber = NWTools.randomString(5,'1234567890');
const pagePortrait = require('../../../../pages/page-portrait');
const { number } = require('prop-types');
let newUserDetails = [];
//-------------------------------------------------------------------------------------------
let adminID = 'u043exd';
let adminPassword = 'EdEdEd2022!!';
//---------------------------------Client details--------------------------------------------
let NVClientName = 'Selenium top';
let NVSubunit = 'Selenium sub 3';
let NVTravellerType = 'General';
let EUClientName = 'LIGAS TEST';
let EUSubunit = 'PL-Test25';
let EUTravellerType = 'EMEA1';
//-----------------------------------User details--------------------------------------------
let firstName = `Astrid ${randomString}`;
let lastName = `Berg ${randomString}`;
let email = `astrid${randomNumber}@yopmail.com`;
let esid = `myESID:${randomNumber}`;
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
        browser
        // Add ESID
      .waitAndSetValueByCss(pagePortrait.selectors.travellerDetails.ESIDCreate, esid)
      // Click on "save and add" button
      .waitAndClickByXpath(pagePortrait.selectors.travellerDetails.saveAndAdd)
      // Validate saving (By "save and add" button become disable)
      .pause(4000)
      .elementDisabledByXpath(pagePortrait.selectors.travellerDetails.saveAndAdd);
  },

  'step 3 - Search and select the new traveller': (browser) => {
    browser
      // Check "search across clients" checkbox
      .waitAndClickByXpath(pagePortrait.selectors.search.searchAcrossClientsCheckBox)
      // Add the new traveller email
      .waitAndSetValueByCss(pagePortrait.selectors.search.email, email)
      // Check "include inactive profiles" checkbox
      .waitAndClickByXpath(pagePortrait.selectors.search.includeInactiveProfilesCheckBox)
      .pause(10000)
      // Click on search button
      .waitAndClickByCss(pagePortrait.selectors.search.searchButton)
      // Select the new traveller
      .waitAndClickByXpath(pagePortrait.selectors.searchResults.resultsName)
      // Click on "ignore-skip this step" button
      .waitAndClickByCss(pagePortrait.selectors.searchResults.skipThisStepButton);
  },

  // ---------------------------------------- Update traveller ----------------------------------------

  'step 4 - Update traveller information': (browser) => {
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
      .waitAndClickByXpath(pagePortrait.selectors.upperPopUpMessage.close);
  },

  'step 5 - Update phone number': (browser) => {
    browser
      // Click on phone number tab
      .waitAndClickByCss(pagePortrait.selectors.phoneNumber.phoneNumberTab)
      // Click on add
      .waitAndClickByCss(pagePortrait.selectors.phoneNumber.addButton)
      // Click on type
      .waitAndClickByCss(pagePortrait.selectors.phoneNumber.type)
      .keys('w')
      // Click on country
      .waitAndClickByCss(pagePortrait.selectors.phoneNumber.country)
      // Select country by the first letter
      .keys('d')
      // Add phone number
      .waitAndSetValueByCss(pagePortrait.selectors.phoneNumber.phoneNumberField, '12345678')
      // Click on "Submit changes"
      .waitAndClickByCss(pagePortrait.selectors.travellerDetails.submitChangesButton)
      // Validate success message
      .waitForTextByXpath(pagePortrait.selectors.upperPopUpMessage.text, 'SUCCESS')
      // Close success message
      .waitAndClickByXpath(pagePortrait.selectors.upperPopUpMessage.close);
  },

  'step 6 - Update email address': (browser) => {
    browser
      // Click on email address tab
      .waitAndClickByCss(pagePortrait.selectors.emailAddress.emailAddressTab)
      // Clear email address field
      .clearValueByCss(pagePortrait.selectors.emailAddress.emailAddressField)
      // Add new email address
      .waitAndSetValueByCss(pagePortrait.selectors.emailAddress.emailAddressField, `${randomNumber}${email}`)
      // Select receive invoice
      .waitAndClickByCss(pagePortrait.selectors.emailAddress.receiveInvoice)
      // Select receive itinerary
      .waitAndClickByCss(pagePortrait.selectors.emailAddress.receiveItinerary)
      // Click on "Submit changes"
      .waitAndClickByCss(pagePortrait.selectors.travellerDetails.submitChangesButton)
      // Validate success message
      .waitForTextByXpath(pagePortrait.selectors.upperPopUpMessage.text, 'SUCCESS')
      // Close success message
      .waitAndClickByXpath(pagePortrait.selectors.upperPopUpMessage.close);
  },

  'step 7 - Update address': (browser) => {
    browser
      // Click on email address tab
      .waitAndClickByCss(pagePortrait.selectors.address.addressTab)
      // Click on add
      .waitAndClickByCss(pagePortrait.selectors.address.addButton)
      // Click on type
      .waitAndClickByCss(pagePortrait.selectors.address.type)
      // Select type by the first letter
      .keys('h')
      // Click on preferred
      .waitAndClickByCss(pagePortrait.selectors.address.preferred)
      // Click on country
      .waitAndClickByCss(pagePortrait.selectors.address.country)
      // Select country by letters
      .keys('ger')
      // Click on address line 1
      .waitAndClickByCss(pagePortrait.selectors.address.addressLine1)
      // Add text to address line 1
      .waitAndSetValueByCss(pagePortrait.selectors.address.addressLine1, `Address line 1: ${randomNumber}`)
      // Click on address line 2
      .waitAndClickByCss(pagePortrait.selectors.address.addressLine2)
      // Add text to address line 2
      .waitAndSetValueByCss(pagePortrait.selectors.address.addressLine2, `Address line 2: ${randomNumber}`)
      // Add city
      .waitAndSetValueByCss(pagePortrait.selectors.address.city, `Berlin: ${randomNumber}`)
      // Add postal code
      .waitAndSetValueByCss(pagePortrait.selectors.address.postalCode, randomNumber)
      // Click on "Submit changes"
      .waitAndClickByCss(pagePortrait.selectors.travellerDetails.submitChangesButton)
      // Validate success message
      .waitForTextByXpath(pagePortrait.selectors.upperPopUpMessage.text, 'SUCCESS')
      // Close success message
      .waitAndClickByXpath(pagePortrait.selectors.upperPopUpMessage.close);
  },

  'step 8 - Update Emergency Contact': (browser) => {
    browser
      // Click on Emergency Contact tab
      .waitAndClickByCss(pagePortrait.selectors.emergencyContact.emergencyContactTab)
      // Add name
      .waitAndSetValueByCss(pagePortrait.selectors.emergencyContact.name, `My name is ${randomString}`)
      // Add relationship
      .waitAndSetValueByCss(pagePortrait.selectors.emergencyContact.relationship, `My relationship is ${randomNumber}`)
      // Click on country
      .waitAndClickByCss(pagePortrait.selectors.emergencyContact.country)
      // Select country by letters
      .keys('ger')
      // Add phone number
      .waitAndSetValueByCss(pagePortrait.selectors.emergencyContact.phoneNumber, `${randomNumber}1234`)
      // Click on "Submit changes"
      .waitAndClickByCss(pagePortrait.selectors.travellerDetails.submitChangesButton)
      // Validate success message
      .waitForTextByXpath(pagePortrait.selectors.upperPopUpMessage.text, 'SUCCESS')
      // Close success message
      .waitAndClickByXpath(pagePortrait.selectors.upperPopUpMessage.close);
  },

  'step 9 - Update Travel Documents And Electronic Authorisations': (browser) => {
    browser
      // Click on Travel Documents tab
      .waitAndClickByCss(pagePortrait.selectors.travelDocuments.travelDocumentsTab)
      // Click on add travel document
      .waitAndClickByCss(pagePortrait.selectors.travelDocuments.addTravelDocumentsButton)
      // Click on document type
      .waitAndClickByCss(pagePortrait.selectors.travelDocuments.documentType)
      // Select document type by letters
      .keys('pass')
      // Add number
      .waitAndSetValueByCss(pagePortrait.selectors.travelDocuments.number, randomNumber)
      // Click on country
      .waitAndClickByCss(pagePortrait.selectors.travelDocuments.country)
      // Select country by letters
      .keys('ger')
      // Add expiration date
      .waitAndSetValueByCss(pagePortrait.selectors.travelDocuments.expirationDate, '06/20/2029')
      // Add City
      .waitAndSetValueByCss(pagePortrait.selectors.travelDocuments.city, 'Berlin')
      // Click on Country of Issue
      .waitAndClickByCss(pagePortrait.selectors.travelDocuments.countryOfIssue)
      // Select Country of Issue by the first letter
      .keys('ger')
      // Add issue date
      .waitAndSetValueByCss(pagePortrait.selectors.travelDocuments.issueDate, '06/20/2020')
      // Click on "Submit changes"
      .waitAndClickByCss(pagePortrait.selectors.travellerDetails.submitChangesButton)
      // Validate success message
      .waitForTextByXpath(pagePortrait.selectors.upperPopUpMessage.text, 'SUCCESS')
      // Close success message
      .waitAndClickByXpath(pagePortrait.selectors.upperPopUpMessage.close)
      // Click on add security document
      .waitAndClickByCss(pagePortrait.selectors.travelDocuments.addSecurityDocumentButton)
      // Click on security document
      .waitAndClickByCss(pagePortrait.selectors.travelDocuments.securityDocument)
      // Select security document by letters
      .keys('red')
      // Add security document number
      .waitAndSetValueByCss(pagePortrait.selectors.travelDocuments.securityDocumentNumber, '123456')
      // Click on "Submit changes"
      .waitAndClickByCss(pagePortrait.selectors.travellerDetails.submitChangesButton)
      // Validate success message
      .waitForTextByXpath(pagePortrait.selectors.upperPopUpMessage.text, 'SUCCESS')
      // Close success message
      .waitAndClickByXpath(pagePortrait.selectors.upperPopUpMessage.close);
  },

  'step 10 - Update driver license': (browser) => {
    browser
      // Click on driver license tab
      .waitAndClickByCss(pagePortrait.selectors.driverLicense.driverLicenseTab)
      // Click on add driver license
      .waitAndClickByCss(pagePortrait.selectors.driverLicense.addDriverLicenseButton)
      // Add number
      .waitAndSetValueByCss(pagePortrait.selectors.driverLicense.licenseNumber, '1234567890')
      // Click on country
      .waitAndClickByCss(pagePortrait.selectors.driverLicense.country)
      // Select country by letters
      .keys('ger')
      // Add expiration date
      .waitAndSetValueByCss(pagePortrait.selectors.driverLicense.expirationDate, '06/20/2029')
      // Add place of issue
      .waitAndSetValueByCss(pagePortrait.selectors.driverLicense.placeOfIssue, 'Berlin')
      // Add issue date
      .waitAndSetValueByCss(pagePortrait.selectors.driverLicense.issueDate, '06/20/2020')
      // Click on "Submit changes"
      .waitAndClickByCss(pagePortrait.selectors.travellerDetails.submitChangesButton)
      // Validate success message
      .waitForTextByXpath(pagePortrait.selectors.upperPopUpMessage.text, 'SUCCESS')
      // Close success message
      .waitAndClickByXpath(pagePortrait.selectors.upperPopUpMessage.close);
  },

  'step 11 - Update citizenship': (browser) => {
    browser
      // Click on citizenship tab
      .waitAndClickByCss(pagePortrait.selectors.citizenship.citizenshipTab)
      // Click on add citizenship
      .waitAndClickByCss(pagePortrait.selectors.citizenship.addCitizenshipButton)
      // Click on country
      .waitAndClickByCss(pagePortrait.selectors.citizenship.country)
      // Select country by letters
      .keys('ger')
      // Click on "Submit changes"
      .waitAndClickByCss(pagePortrait.selectors.travellerDetails.submitChangesButton)
      // Validate success message
      .waitForTextByXpath(pagePortrait.selectors.upperPopUpMessage.text, 'SUCCESS')
      // Close success message
      .waitAndClickByXpath(pagePortrait.selectors.upperPopUpMessage.close);
  },

  'step 12 - Select the traveller again': (browser) => {
    browser
      // Close traveller tab
      .waitAndClickByXpath(pagePortrait.selectors.main.closeTab)
      // Select the traveller
      .waitAndClickByXpath(pagePortrait.selectors.searchResults.resultsName)
      // Click on "ignore-skip this step" button
      .waitAndClickByCss(pagePortrait.selectors.searchResults.skipThisStepButton);
  },

  // ---------------------------------------- Validate traveller updated ----------------------------------------


  'step 13 - Validate traveller information': (browser) => {
    browser
      // Validate middle name
      .waitForAttributeContainsByCss(pagePortrait.selectors.travellerDetails.middleName, 'value', `Mido ${randomString}`)
      // Validate Suffix
      .waitForAttributeContainsByCss(pagePortrait.selectors.travellerDetails.suffix, 'value', '1234')
      // Validate ESID
      .waitForAttributeContainsByCss(pagePortrait.selectors.travellerDetails.ESIDUpdate, 'value', esid);
  },

  'step 14 - Validate phone number': (browser) => {
    browser
      // Click on phone number tab
      .waitAndClickByCss(pagePortrait.selectors.phoneNumber.phoneNumberTab)
      // Validate phone number
      .waitForAttributeContainsByCss(pagePortrait.selectors.phoneNumber.phoneNumberField, 'value', '12345678');
  },

  'step 15 - Validate email address': (browser) => {
    browser
      // Click on email address tab
      .waitAndClickByCss(pagePortrait.selectors.emailAddress.emailAddressTab)
      // Validate email
      .waitForAttributeContainsByCss(pagePortrait.selectors.emailAddress.emailAddressField, 'value', `${randomNumber}${email}`);
  },

  'step 16 - Validate address': (browser) => {
    browser
      // Click on address tab
      .waitAndClickByCss(pagePortrait.selectors.address.addressTab)
      // Validate address line 1
      .waitForAttributeContainsByCss(pagePortrait.selectors.address.addressLine1, 'value', `Address line 1: ${randomNumber}`)
      // Validate address line 2
      .waitForAttributeContainsByCss(pagePortrait.selectors.address.addressLine2, 'value', `Address line 2: ${randomNumber}`)
      // Validate city
      .waitForAttributeContainsByCss(pagePortrait.selectors.address.city, 'value', `Berlin: ${randomNumber}`)
      // Validate postal code
      .waitForAttributeContainsByCss(pagePortrait.selectors.address.postalCode, 'value', randomNumber);
  },

  'step 17 - Validate emergency contact': (browser) => {
    browser
      // Click on emergency contact tab
      .waitAndClickByCss(pagePortrait.selectors.emergencyContact.emergencyContactTab)
      // Validate emergency contact name
      .waitForAttributeContainsByCss(pagePortrait.selectors.emergencyContact.name, 'value', `My name is ${randomString}`);
  },

  'step 18 - Validate travel documents': (browser) => {       // TBD, waiting for change in this section


  },

  'step 19 - Validate driver license': (browser) => {
    browser
      // Click on driver license tab
      .waitAndClickByCss(pagePortrait.selectors.driverLicense.driverLicenseTab)
      // Validate driver license number (hidden in xxx)
      .waitForAttributeContainsByCss(pagePortrait.selectors.driverLicense.licenseNumber, 'value', 'xxxxxxxxxx')
      // Validate country
      .waitForAttributeContainsByCss(pagePortrait.selectors.driverLicense.country, 'value', 'DE')
      // Validate expiration date
      .waitForAttributeContainsByCss(pagePortrait.selectors.driverLicense.expirationDate, 'value', '06/20/2029')
      // Validate place of issue
      .waitForAttributeContainsByCss(pagePortrait.selectors.driverLicense.placeOfIssue, 'value', 'Berlin')
      // Validate issue date
      .waitForAttributeContainsByCss(pagePortrait.selectors.driverLicense.issueDate, 'value', '06/20/2020');
  },

  'step 20 - Validate citizenship': (browser) => {
    browser
      // Click on citizenship tab
      .waitAndClickByCss(pagePortrait.selectors.citizenship.citizenshipTab);
      // Validate citizenship country
      // .waitForAttributeContainsByCss(pagePortrait.selectors.citizenship.country, 'value', 'DE')
  },


// ---------------------------------------- Deactivate traveller ----------------------------------------

  // 'step 6 - Deactivate traveller': (browser) => {
  //   browser
  //     // Click on deactivate profile button
  //     .waitAndClickByXpath(pagePortrait.selectors.travellerDetails.deactivateProfileButton)
  //     // Click on yes in the popup dialog
  //     .waitAndClickByXpath(pagePortrait.selectors.travellerDetails.deactivatePopUpYes)
  //     // Close update traveller tab
  //     .waitAndClickByXpath(pagePortrait.selectors.main.closeTab)
  //     .pause(10000)
  //     // Click on search button
  //     .waitAndClickByCss(pagePortrait.selectors.search.searchButton)
  //     // Validate "expired" status
  //     .stop()
  //     .waitForTextByXpath(pagePortrait.selectors.searchResults.resultsStatusText, 'Expired');
  // },
  //
  // 'step 7 - Traveller report': () => {
  //   console.log('\n----------------------------------------------------------------\n' +
  //     'Traveller details:\n----------------------------------------------------------------');
  //   for(let i=0 ; i<newUserDetails.length ; i++) {
  //     console.log(newUserDetails[i]);
  //   }
  //   console.log('----------------------------------------------------------------\n');
  // },
};