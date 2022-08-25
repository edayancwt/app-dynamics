'use strict';

module.exports = {

  '@tags': ['trip', 'details', 'car', 'drop off'],

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

  'step 3 - click on car drop off more details link to expand the item': (driver) => {
    // driver.execute(function() { window.scrollBy(0, 1792); }, []);
    driver.waitAndClick('//*[@id="tripDetails"]/div[2]/div/ul/li[6]/div/div/div/div[3]/div/div[3]/div[1]/button/span');
  },

  'step 4 - Validate validate car drop off title and agency name': (driver) => {
    // car drop-off title and hotel name (this is to bypass acceptability changes, where all text located in different spans, eliminating "enter" hits)
    const checkOutSelector = '//*[@id="tripDetails"]/div[2]/div/ul/li[6]/div/div/div/div[2]/h6';
    driver.waitForElementVisible(checkOutSelector);
    driver.getText(checkOutSelector, function(result){
      const textValue = result.value.replace(/(\r\n\t|\n|\r\t)/gm,"");
      this.assert.equal(textValue, "Drop-off |rental company isDOLLAR");
    });
    driver.scrollToLocation(0, 1790);
  },

  'step 5 - Validate car drop off title and time': (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[6]/div/div/div/div[3]/div/div[1]/div/div[1]/label', 'DROP-OFF TIME');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[6]/div/div/div/div[3]/div/div[1]/div/div[1]/p', '1:20');
  },

  'step 6 - Validate car drop off address': (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[6]/div/div/div/div[3]/div/div[1]/div/div[2]/label', 'ADDRESS');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[6]/div/div/div/div[3]/div/div[1]/div/div[2]/p', 'DEN');
  },

  'step 7 - Validate car drop off phone number': (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[6]/div/div/div/div[3]/div/div[1]/div/div[3]/label', 'PHONE #');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[6]/div/div/div/div[3]/div/div[1]/div/div[3]/p', '--');
  },

  'step 8 - Validate car drop off confirmation': (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[6]/div/div/div/div[3]/div/div[2]/div[3]/div[1]/div[1]/label', 'CONFIRMATION #');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[6]/div/div/div/div[3]/div/div[2]/div[3]/div[1]/div[1]/p', 'R4083926');
  },

  'step 9 - Validate car drop off reservation': (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[6]/div/div/div/div[3]/div/div[2]/div[3]/div[1]/div[2]/label', 'RESERVATION');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[6]/div/div/div/div[3]/div/div[2]/div[3]/div[1]/div[2]/p', 'Poli3eer4');
  },

  'step 10 - Validate car drop off fax number': (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[6]/div/div/div/div[3]/div/div[2]/div[3]/div[1]/div[3]/label', 'FAX #');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[6]/div/div/div/div[3]/div/div[2]/div[3]/div[1]/div[3]/p', '--');
  },

//   ---------------------------------- Car details ----------------------------------

  'step 11 - Validate car drop off class': (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[6]/div/div/div/div[3]/div/div[2]/div[3]/div[2]/div/label', 'CAR DETAILS');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[6]/div/div/div/div[3]/div/div[2]/div[3]/div[3]/div[1]/span', 'Class');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[6]/div/div/div/div[3]/div/div[2]/div[3]/div[3]/div[1]/p', '--');
  },

  'step 12 - Validate car drop off type': (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[6]/div/div/div/div[3]/div/div[2]/div[3]/div[3]/div[2]/span', 'Type');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[6]/div/div/div/div[3]/div/div[2]/div[3]/div[3]/div[2]/p', 'Economy, Car, NAVIGATIONAL SYSTEM');
  },

  'step 13 - Validate car drop off price per day': (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[6]/div/div/div/div[3]/div/div[2]/div[3]/div[3]/div[3]/span', 'Price Per Day');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[6]/div/div/div/div[3]/div/div[2]/div[3]/div[3]/div[3]/p', '--');
  },

  'step 14 - Validate car pick up total price': (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[6]/div/div/div/div[3]/div/div[2]/div[3]/div[3]/div[4]/span', 'Total Price');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[6]/div/div/div/div[3]/div/div[2]/div[3]/div[3]/div[4]/p', '159 USD');
  },

//   ---------------------------------- Program ----------------------------------

  'step 15 - Validate car drop off program membership': (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[6]/div/div/div/div[3]/div/div[2]/div[3]/div[4]/div/label', 'PROGRAM');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[6]/div/div/div/div[3]/div/div[2]/div[3]/div[5]/div[1]/span', 'Membership');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[6]/div/div/div/div[3]/div/div[2]/div[3]/div[5]/div[1]/p', '--');
  },

  'step 16 - Validate car drop off program number': (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[6]/div/div/div/div[3]/div/div[2]/div[3]/div[5]/div[2]/span', 'Member ID');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[6]/div/div/div/div[3]/div/div[2]/div[3]/div[5]/div[2]/p', '--');
  },

  'step 17 - Validate car pick up program points': (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[6]/div/div/div/div[3]/div/div[2]/div[3]/div[5]/div[3]/span', 'Points');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[6]/div/div/div/div[3]/div/div[2]/div[3]/div[5]/div[3]/p', '--');
  },

//   ---------------------------------- Agent information ----------------------------------

  'step 18 - Validate car drop off agent booked from': (driver) => {
    driver.scrollToLocation(0, 2290);
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[6]/div/div/div/div[3]/div/div[2]/div[3]/div[6]/div/label', 'AGENCY INFORMATION');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[6]/div/div/div/div[3]/div/div[2]/div[3]/div[7]/div[1]/span', 'Booked From');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[6]/div/div/div/div[3]/div/div[2]/div[3]/div[7]/div[1]/p', 'Carlson Wagonlit Travel');
  },

  'step 19 - Validate car drop off agent phone number': (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[6]/div/div/div/div[3]/div/div[2]/div[3]/div[7]/div[2]/span', 'Phone #');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[6]/div/div/div/div[3]/div/div[2]/div[3]/div[7]/div[2]/p', '--');
  },

  'step 20 - Validate car drop off booking date': (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[6]/div/div/div/div[3]/div/div[2]/div[3]/div[7]/div[3]/span', 'Booking Date');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[6]/div/div/div/div[3]/div/div[2]/div[3]/div[7]/div[3]/p', '--');
  },

  'step 21 - Validate car pick up url': (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[6]/div/div/div/div[3]/div/div[2]/div[3]/div[7]/div[4]/span', 'URL');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[6]/div/div/div/div[3]/div/div[2]/div[3]/div[7]/div[4]/p/a', 'http://www.carlsonwagonlit.com/');
  },

//   ---------------------------------- Notes ----------------------------------

  'step 22 - Validate car drop off notes': (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[6]/div/div/div/div[3]/div/div[2]/div[3]/div[8]/div/label', 'NOTES');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[6]/div/div/div/div[3]/div/div[2]/div[3]/div[8]/div/p', '--');
  },

  'step 23 - Click on car drop off less details link to collapse the item': (driver) => {
    driver.waitAndClick('//*[@id="tripDetails"]/div[2]/div/ul/li[6]/div/div/div/div[3]/div/div[3]/div[1]/button/span');
  },

  'step 27 - Logout': (driver) => {
    driver.page.logout().logout();
  },

};