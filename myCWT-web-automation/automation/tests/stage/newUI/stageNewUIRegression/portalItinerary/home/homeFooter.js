'use strict'

module.exports = {

  '@tags': ['home', 'footer'],

  before: function (driver) {
    driver.windowMaximize();
  },

  'step 1 - login to portal': (driver) => {
    const login = driver.page.login();
    login.fillLoginDetails(driver.globals.users.portalUser1);
  },

//    -------------------------------- Content --------------------------------

  'step 2 - footer text': (driver) => {
    // scroll down
    driver.execute(function() { window.scrollBy(0, 2000); }, []);
    driver.waitForTextByCss('[data-id=footer-copyright-text]','Copyright © 2017 CWT All rights reserved | Technical Assistance');
    driver.waitForTextByCss('[data-id=footer-center-text]', "CWT is committed to protecting your personal data and privacy. Read CWT's Traveler Notice to understand what information CWT collects and why, how CWT uses it and stores it, and how to review and update it.");
    driver.waitForTextByCss('[data-id=footer-end-text]', "For further information, please see CWT's Data Protection & Privacy Policy. Terms of Use");
  },

  'step 3 - footer - traveler notice': (driver) => {
    driver.waitForAttributeContainsByCss("#footer-travel-notice", 'href', 'www.carlsonwagonlit.com/content/cwt/global/en/traveler-notice.html');
  },

  'step 4 - footer - privacy policy': (driver) => {
    driver.waitForAttributeContainsByCss("#footer-data-protection", 'href', 'www.carlsonwagonlit.com/content/cwt/global/en/legal/global-privacy-policy.html');
  },

  'step 5 - footer - terms of use': (driver) => {
    driver.waitForAttributeContainsByCss("#footer-terms-of-use", 'href', 'https://www.carlsonwagonlit.com/legal/platform-terms-of-use/');
  },

//    -------------------------------- Links --------------------------------

  'step 6 - footer - click on traveler notice link': (driver) => {
    driver.waitAndClickByCss('#footer-travel-notice');
  },

  'step 7 - footer - validate traveler notice URL': (driver) => {
    // Switch to the second tab [1]
    driver.switchToTab(1);
    // Validate second tab URL
    // driver.waitForUrlToContain('www.carlsonwagonlit.com/global/en/traveler-notice/'); //TODO: DE9617
    // Close second tab
    driver.closeWindow();
    driver.pause(1000);
    // Switch back to the first tab [0]
    driver.switchToTab(0);
  },

  'step 8 - footer - click on privacy policy link': (driver) => {
    driver.waitAndClickByCss('#footer-data-protection');
  },

  'step 9 - footer - validate privacy policy URL': (driver) => {
    // Switch to the second tab [1]
    driver.switchToTab(1);
    // Validate second tab URL
    driver.waitForUrlToContain('www.carlsonwagonlit.com/legal/global-privacy-policy/');
    // Close second tab
    driver.closeWindow();
    driver.pause(1000);
    // Switch back to the first tab [0]
    driver.switchToTab(0);
  },

  'step 10 - footer - click on terms of use link': (driver) => {
    driver.waitAndClickByCss('#footer-terms-of-use');
  },

  'step 11 - footer - validate terms of use URL': (driver) => {
    // Switch to the second tab [1]
    driver.switchToTab(1);
    // Validate second tab URL
    // driver.waitForUrlToContain('www.carlsonwagonlit.com/global/en/legal/platform-terms-of-use/');   //TODO: DE9618
    // Close second tab
    driver.closeWindow();
    driver.pause(1000);
    // Switch back to the first tab [0]
    driver.switchToTab(0);
  },

//    -------------------------------- Technical assistance dialog --------------------------------

  'step 12 - footer - click on technical assistance link': (driver) => {
    driver.waitAndClickByCss('#footer-technical-assistance-link');
  },

  'step 13 - footer - validate technical assistance default text': (driver) => {
    driver.waitForTextByCss(".modal-content h4:nth-child(2)", "We're Here to Help");
    driver.waitForTextByCss(".modal-body div:nth-child(1)", 'For immediate travel/reservation requests or assistance, please contact a Carlson Wagonlit Travel Counsellor.\n' + "For any other technical issue fill in this form and we'll get back to you shortly!");
    driver.waitForTextByCss(".modal-body label:nth-child(2)", "DESCRIPTION:");
    driver.waitForTextByCss(".modal-body div:nth-child(4)", "1000 characters left");
    driver.waitForTextByCss('[for=technical-assistance__follow-up-by]', "GET BACK TO ME BY:");
    driver.waitForTextByCss("#technical-assistance-radio-email", "EMAIL");
    driver.waitForTextByCss("#technical-assistance-radio-tel", "TEL");
    driver.waitForTextByCss("#technical-assistance-cancel", "CANCEL");
  },

  'step 14 - footer - default email display': (driver) => {
    driver.waitForAttributeContainsByCss("#technical-assistance__follow-up-by", 'value', driver.globals.users.portalUser1.username);
  },

  'step 15 - footer - technical assistance dialog state before adding text': (driver) => {
    driver.waitForTextByCss(".modal-body div:nth-child(4)", '1000 characters left');
    // verify submit button is disabled.
    driver.waitForAttributeContainsByCss('#technical-assistance-submit', 'disabled', 'true');
    driver.waitForCssContains('#technical-assistance-submit', 'background-color', '143, 152, 163, 1'); //gray color
  },

  'step 16 - footer - technical assistance dialog state after adding text': (driver) => {
    driver.waitForElementVisible('#technical-assistance__description');
    driver.waitAndSetValueByCss('#technical-assistance__description', 'Testing this dialog');
    driver.waitForTextByCss(".modal-body div:nth-child(5)", '981 characters left');
 // verify submit button is enabled.
    driver.waitForCssContains('#technical-assistance-submit', 'background-color', '255, 105, 75, 1'); //orange color
  },

  'step 17 - footer - click on technical assistance phone button': (driver) => {
    driver.waitAndClickByCss("#technical-assistance-radio-tel");
  },

  'step 18 - footer - validate technical assistance telephone follow up pre text': (driver) => {
    driver.waitForAttributeContainsByCss("#technical-assistance__follow-up-by", 'placeholder', 'Enter telephone number');
  },

  'step 19 - footer - add technical assistance telephone number': (driver) => {
    driver.waitForElementVisible("#technical-assistance__follow-up-by");
    driver.waitAndSetValueByCss('#technical-assistance__follow-up-by', '555444333');
  },

  'step 20 - footer - click on technical assistance email button': (driver) => {
    driver.waitAndClickByCss('#technical-assistance-radio-email');
  },

  'step 21 - footer - validate technical assistance email follow up field value': (driver) => {
    driver.waitForAttributeContainsByCss("#technical-assistance__follow-up-by", 'value', 'aportal1@yopmail.com');
  },

  'step 22 - footer - clear technical assistance email follow up field value': (driver) => {
    driver.waitForElementVisible("#technical-assistance__follow-up-by");
    driver.clearValue('#technical-assistance__follow-up-by');
  },

  'step 23 - footer - validate technical assistance email follow up pre text': (driver) => {
    driver.waitForAttributeContainsByCss("#technical-assistance__follow-up-by", 'placeholder', 'Enter email');
  },

  'step 24 - footer - click on technical assistance close dialog button': (driver) => {
    driver.waitAndClickByCss('.sr-only');
    driver.refresh();
  },

//    -------------------------------- Technical assistance dialog - valid submission --------------------------------

  'step 25 - footer - click on technical assistance link': (driver) => {
    driver.waitAndClickByCss("#footer-technical-assistance-link");
  },

  'step 26 - footer - adding description text': (driver) => {
    driver.waitAndSetValueByCss('#technical-assistance__description', 'Valid text for submission');
  },

  'step 27 - footer - click on submit button': (driver) => {
    driver.waitAndClickByCss("#technical-assistance-submit");
  },

  'step 28 - footer - validate message sent': (driver) => {
    driver.pause(2000);
    driver.waitForTextByCss('.modal-title', "We're Here to Help");
    driver.waitForTextByCss('.modal-body div:nth-child(2)', 'Your request has been processed!');
    driver.waitForTextByCss('.modal-body div:nth-child(3)', "We'll get back to you via email: "+driver.globals.users.portalUser1.username);
    driver.waitAndClickByCss(".sr-only");
  },

};