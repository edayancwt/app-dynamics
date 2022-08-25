'use strict';

module.exports = {

  '@tags': ['trip', 'details', 'car', 'pick up'],

  before: function (driver) {
    driver.windowMaximize();
  },

  'step 1 - login to portal': (driver) => {
    const login = driver.page.login();
    login.fillLoginDetails(driver.globals.users.portalUser1);
  },

  'step 2 - Navigate to the trip': (driver) => {
    driver.waitAndClick('#layout_2');
    driver.useXpath();
    driver.waitAndClick('//*[@id="my-trips"]/div/div[1]/ul/li/div/div[1]');
  },

  'step 3 - click on car pick up "more details" link to expand the item': (driver) => {
    driver.waitAndClick('//*[@id="tripDetails"]/div[2]/div/ul/li[5]/div/div/div/div[3]/div/div[4]/div[1]/button/span');
    driver.scrollToLocation(0, 1323);
  },

  'step 4 - Validate car pick up starting date title': (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[5]/div/div/p', 'FRI, JUL 18');
  },

  'step 5 - Validate car pick up title and agency name': (driver) => {
    // driver.waitForText('//*[@id="tripDetails"]/div[2]/div/div[6]/div/div/div[2]/h2', 'Pick-Up | DOLLAR');
    // car drop-off title and hotel name (this is to bypass acceptability changes, where all text located in different spans, eliminating "enter" hits)
    const checkOutSelector = '//*[@id="tripDetails"]/div[2]/div/ul/li[5]/div/div/div/div[2]/h6';
    driver.waitForElementVisible(checkOutSelector);
    driver.getText(checkOutSelector, function(result){
      const textValue = result.value.replace(/(\r\n\t|\n|\r\t)/gm,"");
      this.assert.equal(textValue, "Pick-Up |rental company isDOLLAR");
    });
  },

  'step 6 - Validate car pick up title and time': (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[5]/div/div/div/div[3]/div/div[1]/div[1]/h6/span[1]', 'PICK-UP');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[5]/div/div/div/div[3]/div/div[1]/div[1]/h6/span[2]', '3:10 PM');
  },

  'step 7 - Validate car drop off title time and date': (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[5]/div/div/div/div[3]/div/div[1]/div[3]/h6/span[1]', 'DROP-OFF');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[5]/div/div/div/div[3]/div/div[1]/div[3]/h6/span[2]', '1:20 PM');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[5]/div/div/div/div[3]/div/div[1]/div[3]/span', 'FRI, JUL 25');
  },

  'step 8 - Validate car pick up duration': (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[5]/div/div/div/div[3]/div/div[1]/div[2]/div/div[2]/div/span', '7 Days');
  },

  'step 9 - Validate car pick up address': (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[5]/div/div/div/div[3]/div/div[2]/div/div[1]/label', 'ADDRESS');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[5]/div/div/div/div[3]/div/div[2]/div/div[1]/p', 'DEN');
  },

  'step 10 - Validate car pick up phone number': (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[5]/div/div/div/div[3]/div/div[2]/div/div[2]/label', 'PHONE #');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[5]/div/div/div/div[3]/div/div[2]/div/div[2]/p', '--');
  },

  'step 11 - Validate car pick up confirmation': (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[5]/div/div/div/div[3]/div/div[2]/div/div[3]/label', 'CONFIRMATION #');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[5]/div/div/div/div[3]/div/div[2]/div/div[3]/p', 'R4083926');
  },

  'step 12 - Validate car pick up reservation': (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[5]/div/div/div/div[3]/div/div[3]/div[3]/div[1]/div[1]/label', 'RESERVATION');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[5]/div/div/div/div[3]/div/div[3]/div[3]/div[1]/div[1]/p', 'Poli3eer4');
  },

  'step 13 - Validate car pick up fax number': (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[5]/div/div/div/div[3]/div/div[3]/div[3]/div[1]/div[2]/label', 'FAX #');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[5]/div/div/div/div[3]/div/div[3]/div[3]/div[1]/div[2]/p', '--');
  },

//   ---------------------------------- Car details ----------------------------------

  'step 14 - Validate car pick up class': (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[5]/div/div/div/div[3]/div/div[3]/div[3]/div[2]/div/label', 'CAR DETAILS');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[5]/div/div/div/div[3]/div/div[3]/div[3]/div[3]/div[1]/span', 'Class');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[5]/div/div/div/div[3]/div/div[3]/div[3]/div[3]/div[1]/p', '--');
  },

  'step 15 - Validate car pick up type': (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[5]/div/div/div/div[3]/div/div[3]/div[3]/div[3]/div[2]/span', 'Type');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[5]/div/div/div/div[3]/div/div[3]/div[3]/div[3]/div[2]/p', 'Economy, Car, NAVIGATIONAL SYSTEM');
  },

  'step 16 - Validate car pick up price per day': (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[5]/div/div/div/div[3]/div/div[3]/div[3]/div[3]/div[3]/span', 'Price Per Day');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[5]/div/div/div/div[3]/div/div[3]/div[3]/div[3]/div[3]/p', '--');
  },

  'step 17 - Validate car pick up total price': (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[5]/div/div/div/div[3]/div/div[3]/div[3]/div[3]/div[4]/span', 'Total Price');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[5]/div/div/div/div[3]/div/div[3]/div[3]/div[3]/div[4]/p', '159 USD');
  },

//   ---------------------------------- Program ----------------------------------

  'step 18 - Validate car pick up program membership': (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[5]/div/div/div/div[3]/div/div[3]/div[3]/div[4]/div/label', 'PROGRAM');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[5]/div/div/div/div[3]/div/div[3]/div[3]/div[5]/div[1]/span', 'Membership');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[5]/div/div/div/div[3]/div/div[3]/div[3]/div[5]/div[1]/p', '--');
  },

  'step 19 - Validate car pick up program number': (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[5]/div/div/div/div[3]/div/div[3]/div[3]/div[5]/div[2]/span', 'Member ID');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[5]/div/div/div/div[3]/div/div[3]/div[3]/div[5]/div[2]/p', '--');
  },

  'step 20 - Validate car pick up program points': (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[5]/div/div/div/div[3]/div/div[3]/div[3]/div[5]/div[3]/span', 'Points');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[5]/div/div/div/div[3]/div/div[3]/div[3]/div[5]/div[3]/p', '--');
  },

//   ---------------------------------- Agent information ----------------------------------

  'step 21 - Validate car pick up agent booked from': (driver) => {
    driver.scrollToLocation(0, 1974);
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[5]/div/div/div/div[3]/div/div[3]/div[3]/div[6]/div/label', 'AGENCY INFORMATION');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[5]/div/div/div/div[3]/div/div[3]/div[3]/div[7]/div[1]/span', 'Booked From');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[5]/div/div/div/div[3]/div/div[3]/div[3]/div[7]/div[1]/p', 'Carlson Wagonlit Travel');
  },

  'step 22 - Validate car pick up agent phone number': (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[5]/div/div/div/div[3]/div/div[3]/div[3]/div[7]/div[2]/span', 'Phone #');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[5]/div/div/div/div[3]/div/div[3]/div[3]/div[7]/div[2]/p', '--');
  },

  'step 23 - Validate car pick up booking date': (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[5]/div/div/div/div[3]/div/div[3]/div[3]/div[7]/div[3]/span', 'Booking Date');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[5]/div/div/div/div[3]/div/div[3]/div[3]/div[7]/div[3]/p', '--');
  },

  'step 24 - Validate car pick up url': (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[5]/div/div/div/div[3]/div/div[3]/div[3]/div[7]/div[4]/span', 'URL');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[5]/div/div/div/div[3]/div/div[3]/div[3]/div[7]/div[4]/p/a', 'http://www.carlsonwagonlit.com/');
  },

//   ---------------------------------- Notes ----------------------------------

  'step 25 - Validate car pick up notes': (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[5]/div/div/div/div[3]/div/div[3]/div[3]/div[8]/div/label', 'NOTES');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[5]/div/div/div/div[3]/div/div[3]/div[3]/div[8]/div/p', '--');
  },

  'step 26 - Click on car pick up "less details" link to collapse the item': (driver) => {
    driver.waitAndClick('//*[@id="tripDetails"]/div[2]/div/ul/li[5]/div/div/div/div[3]/div/div[4]/div[1]/button/span');
  },

  'step 27 - Logout': (driver) => {
    driver.page.logout().logout();
  },

};