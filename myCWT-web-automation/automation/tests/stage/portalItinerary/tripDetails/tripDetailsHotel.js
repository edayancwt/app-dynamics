'use strict';

module.exports = {

  '@tags': ['trip', 'details', 'hotel'],

  before: function (driver) {
    driver.windowMaximize();
  },

  'step 1 - login to portal': (driver) => {
    const login = driver.page.login();
    login.fillLoginDetails(driver.globals.users.portalUser1);
  },

  'step 2 - Navigate to the trip' : (driver) => {
    driver.waitAndClick('#layout_2');
    driver.useXpath();
    driver.waitAndClick('//*[@id="my-trips"]/div/div[1]/ul/li/div/div[1]');
  },

  'step 3 - Click on hotel "more details" link to expand the item' : (driver) => {
    driver.scrollToLocation(0, 2057);
    driver.waitAndClick('//*[@id="tripDetails"]/div[2]/div/ul/li[7]/div/div/div/div[3]/div/div[4]/div[1]/button/span');
  },

  'step 4 - Validate hotel check-in title and name' : (driver) => {
    // hotel check-in title and hotel name (this is to bypass acceptability changes, where all text located in different spans, eliminating "enter" hits)
    const checkOutSelector = '//*[@id="tripDetails"]/div[2]/div/ul/li[7]/div/div/div/div[2]';
    driver.waitForElementVisible(checkOutSelector);
    driver.getText(checkOutSelector, function(result){
      const textValue = result.value.replace(/(\r\n\t|\n|\r\t)/gm,"");
      this.assert.equal(textValue, "Check-in |hotel name isCOUNTRY INN STS DENVER AIR");
    });
  },

  'step 5 - Validate hotel check in title and date' : (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[7]/div/div/div/div[3]/div/div[1]/div[1]/h6/span[1]', 'CHECK-IN');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[7]/div/div/div/div[3]/div/div[1]/div[1]/h6/span[2]', 'MON, AUG 18');
  },

  'step 6 - Validate hotel check out title and date' : (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[7]/div/div/div/div[3]/div/div[1]/div[3]/h6/span[1]', 'CHECK-OUT');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[7]/div/div/div/div[3]/div/div[1]/div[3]/h6/span[2]', 'MON, AUG 25');
  },

  'step 7 - Validate hotel duration' : (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[7]/div/div/div/div[3]/div/div[1]/div[2]/div/div[2]/div/span', '7 Nights');
  },

  'step 8 - Validate hotel address' : (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[7]/div/div/div/div[3]/div/div[2]/div/div[1]/label', 'ADDRESS');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[7]/div/div/div/div[3]/div/div[2]/div/div[1]/p', '4343 N. Airport Way,');
  },

  'step 9 - Validate hotel phone number' : (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[7]/div/div/div/div[3]/div/div[2]/div/div[2]/label', 'PHONE #');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[7]/div/div/div/div[3]/div/div[2]/div/div[2]/p', '1-303-375-1105');
  },

  'step 10 - Validate hotel confirmation' : (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[7]/div/div/div/div[3]/div/div[2]/div/div[3]/label', 'CONFIRMATION #');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[7]/div/div/div/div[3]/div/div[2]/div/div[3]/p', '8KQDJH4');
  },

  'step 11 - Validate hotel reservation' : (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[7]/div/div/div/div[3]/div/div[3]/div[3]/div[1]/div[1]/label', 'RESERVATION');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[7]/div/div/div/div[3]/div/div[3]/div[3]/div[1]/div[1]/p', 'Poli3eer4');
  },

  'step 12 - Validate hotel reservation' : (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[7]/div/div/div/div[3]/div/div[3]/div[3]/div[1]/div[2]/label', 'FAX #');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[7]/div/div/div/div[3]/div/div[3]/div[3]/div[1]/div[2]/p', '1-303-375-8495');
  },

//   ---------------------------------- Room details ----------------------------------

  'step 13 - Validate hotel room type' : (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[7]/div/div/div/div[3]/div/div[3]/div[3]/div[2]/div/label', 'ROOM DETAILS');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[7]/div/div/div/div[3]/div/div[3]/div[3]/div[3]/div[1]/span', 'Room Type');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[7]/div/div/div/div[3]/div/div[3]/div[3]/div[3]/div[1]/p', 'Z8XX107');
  },

  'step 14 - Validate hotel breakfast' : (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[7]/div/div/div/div[3]/div/div[3]/div[3]/div[3]/div[2]/span', 'Breakfast');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[7]/div/div/div/div[3]/div/div[3]/div[3]/div[3]/div[2]/p', '--');
  },

  'step 15 - Validate hotel price per day' : (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[7]/div/div/div/div[3]/div/div[3]/div[3]/div[3]/div[3]/span', 'Price Per Day');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[7]/div/div/div/div[3]/div/div[3]/div[3]/div[3]/div[3]/p', '--');
  },

  'step 16 - Validate hotel total price' : (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[7]/div/div/div/div[3]/div/div[3]/div[3]/div[3]/div[4]/span', 'Total Price');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[7]/div/div/div/div[3]/div/div[3]/div[3]/div[3]/div[4]/p', '118.67 USD');
  },

//   ---------------------------------- Program ----------------------------------

  'step 17 - Validate hotel program membership' : (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[7]/div/div/div/div[3]/div/div[3]/div[3]/div[4]/div/label', 'PROGRAM');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[7]/div/div/div/div[3]/div/div[3]/div[3]/div[5]/div[1]/span', 'Membership');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[7]/div/div/div/div[3]/div/div[3]/div[3]/div[5]/div[1]/p', '--');
  },

  'step 18 - Validate hotel program number' : (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[7]/div/div/div/div[3]/div/div[3]/div[3]/div[5]/div[2]/span', 'Member ID');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[7]/div/div/div/div[3]/div/div[3]/div[3]/div[5]/div[2]/p', '--');
  },

  'step 19 - Validate hotel program points' : (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[7]/div/div/div/div[3]/div/div[3]/div[3]/div[5]/div[3]/span', 'Points');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[7]/div/div/div/div[3]/div/div[3]/div[3]/div[5]/div[3]/p', '--');
  },

//   ---------------------------------- Agent information ----------------------------------

  'step 20 - Validate hotel agent booked from' : (driver) => {
    driver.scrollToLocation(0, 2743);
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[7]/div/div/div/div[3]/div/div[3]/div[3]/div[6]/div/label', 'AGENCY INFORMATION');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[7]/div/div/div/div[3]/div/div[3]/div[3]/div[7]/div[1]/span', 'Booked From');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[7]/div/div/div/div[3]/div/div[3]/div[3]/div[7]/div[1]/p', 'Carlson Wagonlit Travel');
  },

  'step 21 - Validate hotel agent phone number' : (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[7]/div/div/div/div[3]/div/div[3]/div[3]/div[7]/div[2]/span', 'Phone #');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[7]/div/div/div/div[3]/div/div[3]/div[3]/div[7]/div[2]/p', '--');
  },

  'step 22 - Validate hotel booking date' : (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[7]/div/div/div/div[3]/div/div[3]/div[3]/div[7]/div[3]/span', 'Booking Date');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[7]/div/div/div/div[3]/div/div[3]/div[3]/div[7]/div[3]/p', '--');
  },

  'step 23 - Validate hotel url' : (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[7]/div/div/div/div[3]/div/div[3]/div[3]/div[7]/div[4]/span', 'URL');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[7]/div/div/div/div[3]/div/div[3]/div[3]/div[7]/div[4]/p/a', 'http://www.carlsonwagonlit.com/');
  },

//   ---------------------------------- Notes ----------------------------------

  'step 24 - Validate hotel notes' : (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[7]/div/div/div/div[3]/div/div[3]/div[3]/div[8]/div/label', 'NOTES');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[7]/div/div/div/div[3]/div/div[3]/div[3]/div[8]/div/p', '--');
  },

  'step 25 - Click on hotel "less details" link to collapse the item' : (driver) => {
    driver.waitAndClick('//*[@id="tripDetails"]/div[2]/div/ul/li[7]/div/div/div/div[3]/div/div[4]/div[1]/button/span');
  },

  'step 26 - Validate hotel check out date and title' : (driver) => {
    driver.scrollToLocation(0, 2942);
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[8]/div/div/p', "MON, AUG 25");
    // hotel check-out title and hotel name (this is to bypass acceptability changes, where all text located in different spans, eliminating "enter" hits)
    const checkOutSelector = '//*[@id="tripDetails"]/div[2]/div/ul/li[8]/div/div/div/div[2]/h6';
    driver.waitForElementVisible(checkOutSelector);
    driver.getText(checkOutSelector, function(result){
      const textValue = result.value.replace(/(\r\n\t|\n|\r\t)/gm,"");
      this.assert.equal(textValue, "Check-out |hotel name isCOUNTRY INN STS DENVER AIR");
    });
    },

  'step 27 - Logout' : (driver) => {
    driver.page.logout().logout();
  },

};