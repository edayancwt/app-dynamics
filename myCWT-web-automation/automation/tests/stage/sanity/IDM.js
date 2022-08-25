'use strict';

const pageIDM = require('../../../pages/page-idm');

module.exports = {

'@tags': ['IDM'],

  before: function (browser) {
    browser.windowMaximize();
  },

  'step 1 - Login': (browser) => {
    browser
      .loginToIDMStage('u043exd', 'EdEdEd2022!!');
  },

  'step 2 - Search none-exiting traveller': (browser) => {
    browser
      // Add none-existing username
      .waitAndSetValueByCss(pageIDM.selectors.search.userInput, 'faketraveller250@yopmail.com')
      // Click on search button
      .waitAndClickByCss(pageIDM.selectors.search.searchButton)
      // Validate Name
      .waitForTextByCss(pageIDM.selectors.searchResults.noResultsText, 'We couldn’t find any results for ‘faketraveller250@yopmail.com’');
  },

  'step 3 - Search exiting traveller': (browser) => {
    browser
      // Clear username field
      .clearValueByCss(pageIDM.selectors.search.userInput)
      // Add existing username
      .waitAndSetValueByCss(pageIDM.selectors.search.userInput, 'Aportal1@yopmail.com')
      // Click on search button
      .waitAndClickByCss(pageIDM.selectors.search.searchButton)
      // Validate Name
      .waitForTextByXpath(pageIDM.selectors.searchResults.name, 'Aportal One One')
      // Validate Status
      .waitForTextByXpath(pageIDM.selectors.searchResults.status, 'Active')
      // Validate Registered
      .waitForTextByXpath(pageIDM.selectors.searchResults.registered, 'Yes')
      // Validate Username
      .waitForTextByCss(pageIDM.selectors.searchResults.username, 'aportal1@yopmail.com')
      // Validate Employee ID
      .waitForTextByCss(pageIDM.selectors.searchResults.employeeID, 'Aportal One')
      // Validate Pin
      .waitForTextByCss(pageIDM.selectors.searchResults.pin, '21897055')
      // Validate Top Unit
      .waitForTextByCss(pageIDM.selectors.searchResults.topUnit, 'Selenium top')
      // Validate Email
      .waitForTextByCss(pageIDM.selectors.searchResults.email, 'aportal1@yopmail.com');
  },

  'step 4 - Validate traveller attributes': (browser) => {
    browser
      // Click on the result (name)
      .waitAndClickByXpath(pageIDM.selectors.searchResults.name)
      // Validate Sub unit
      .waitForTextByXpath(pageIDM.selectors.travellerAttributes.subUnit, 'Selenium sub')
      // Validate IDM email
      .waitForTextByXpath(pageIDM.selectors.travellerAttributes.idmEmail, 'aportal1@yopmail.com')
      // Validate work email
      .waitForTextByXpath(pageIDM.selectors.travellerAttributes.workEmail, 'aportal1@yopmail.com')
      // Validate mobile phone
      .waitForTextByXpath(pageIDM.selectors.travellerAttributes.mobilePhone, 'None')
      // Validate status
      .waitForTextByXpath(pageIDM.selectors.travellerAttributes.status, 'Not Suspended')
      // Validate employee ID
      .waitForTextByXpath(pageIDM.selectors.travellerAttributes.employeeID, 'Aportal One')
      // Validate guid
      .waitForTextByXpath(pageIDM.selectors.travellerAttributes.guid, 'A:4040792E')
      // Validate traveller type guid
      .waitForTextByXpath(pageIDM.selectors.travellerAttributes.travellerTypeGuid, 'A:69725')
      // Validate third party sync ID
      .waitForTextByXpath(pageIDM.selectors.travellerAttributes.thirdPartySyncID, 'TR5RZMOCK2')
      // Validate pin
      .waitForTextByXpath(pageIDM.selectors.travellerAttributes.pin, '21897055')
      // Validate IDM ID
      .waitForTextByXpath(pageIDM.selectors.travellerAttributes.idmID, 'da844b3b-008f-4da2-bd9a-65725bbfa695')
      // Validate username
      .waitForTextByXpath(pageIDM.selectors.travellerAttributes.username, 'aportal1@yopmail.com')
      // Validate password
      .waitForTextByXpath(pageIDM.selectors.travellerAttributes.password, '********')
      // Validate effective time
      .waitForTextByXpath(pageIDM.selectors.travellerAttributes.effectiveTime, '07/20/2017 18:08')
      // Validate expiration time
      .waitForTextByXpath(pageIDM.selectors.travellerAttributes.expirationTime, '01/30/2200 02:00')
      // Validate IDM type
      .waitForTextByXpath(pageIDM.selectors.travellerAttributes.idmType, 'PING');
  },

  'step 5 - Validate traveller roles': (browser) => {
    browser
      // Click on roles button
      .waitAndClickByCss(pageIDM.selectors.searchResults.rolesButton)
      // Validate Client content admin selection
      .waitForAttributeContainsByXpath(pageIDM.selectors.travellerRoles.clientContactAdmin, 'class', 'toggle on')
      // Validate traveller selection
      .waitForAttributeContainsByXpath(pageIDM.selectors.travellerRoles.traveller, 'class', 'toggle on')
      // Validate travel arranger selection
      .waitForAttributeContainsByXpath(pageIDM.selectors.travellerRoles.travelArranger, 'class', 'toggle off')
      // Validate analytiqs user selection
      .waitForAttributeContainsByXpath(pageIDM.selectors.travellerRoles.analytiqsUser, 'class', 'toggle on')
      // Validate cwt admin selection
      .waitForAttributeContainsByXpath(pageIDM.selectors.travellerRoles.cwtAdmin, 'class', 'toggle on')
      // Validate global content admin selection
      .waitForAttributeContainsByXpath(pageIDM.selectors.travellerRoles.globalContentAdmin, 'class', 'toggle on');
  }

};