'use strict';

module.exports = {

  '@tags': ['trip', 'details', 'flight'],

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

  'step 3 - Click on the first flight "more details" link to expand the item' : (driver) => {
    driver.scrollToLocation(0, 193);
    driver.waitAndClick('//*[@id="tripDetails"]/div[2]/div/ul/li[1]/div/div/div/div[3]/div/div[4]/div[1]/button/span');
  },

  'step 4 - Validate flight starting date' : (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[1]/div/div/p', 'WED, JUN 4');
  },

  'step 5 - Validate flight airline and number' : (driver) => {
    // Airline name and flight number (this is to bypass acceptability changes, where all text located in different spans, eliminating "enter" hits)
    const checkOutSelector = '//*[@id="tripDetails"]/div[2]/div/ul/li[1]/div/div/div/div[2]';
    driver.waitForElementVisible(checkOutSelector);
    driver.getText(checkOutSelector, function(result){
      const textValue = result.value.replace(/(\r\n\t|\n|\r\t)/gm,"");
      this.assert.equal(textValue, "Flight to Moscow (SVO) | Airline carrier and flight code areAeroflot 262");
    });
  },

  'step 6 - Validate flight departure airport code' : (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[1]/div/div/div/div[3]/div/div[1]/div[1]/h6/span[2]', 'LHR');
  },

  'step 7 - Validate flight departure time' : (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[1]/div/div/div/div[3]/div/div[1]/div[1]/h6/span[3]', '11:00 AM');
  },

  'step 8 - Validate flight departure airport name and location' : (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[1]/div/div/div/div[3]/div/div[1]/div[1]/p[2]', 'Heathrow Airport, London, GB');
  },

  'step 9 - Validate flight arrival airport code' : (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[1]/div/div/div/div[3]/div/div[1]/div[3]/h6/span[2]', 'SVO');
  },

  'step 10 - Validate flight arrival time' : (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[1]/div/div/div/div[3]/div/div[1]/div[3]/h6/span[3]', '4:50 PM');
  },

  'step 11 - Validate flight arrival airport name and location' : (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[1]/div/div/div/div[3]/div/div[1]/div[3]/p[2]', 'Sheremetyevo Airport, Moscow, RU');
  },

  'step 12 - Validate flight flight duration' : (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[1]/div/div/div/div[3]/div/div[1]/div[2]/div/div[2]/div/span', '3H 50M');
  },

  'step 13 - Validate flight departure terminal' : (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[1]/div/div/div/div[3]/div/div[2]/div/div[1]/label', 'TERMINAL');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[1]/div/div/div/div[3]/div/div[2]/div/div[1]/p', '1');
  },

  'step 14 - Validate flight gate' : (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[1]/div/div/div/div[3]/div/div[2]/div/div[2]/label', 'GATE');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[1]/div/div/div/div[3]/div/div[2]/div/div[2]/p', '--');
  },

  'step 15 - Validate flight confirmation' : (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[1]/div/div/div/div[3]/div/div[2]/div/div[3]/label', 'CONFIRMATION #');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[1]/div/div/div/div[3]/div/div[2]/div/div[3]/p', 'KGGR3Y');
  },

  'step 16 - Validate flight e-ticket' : (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[1]/div/div/div/div[3]/div/div[2]/div/div[4]/label', 'E-TICKET');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[1]/div/div/div/div[3]/div/div[2]/div/div[4]/p', '5558937637555');
  },

  'step 17 - Validate flight reservation' : (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[1]/div/div/div/div[3]/div/div[3]/div[3]/div[1]/div[1]/label', 'RESERVATION');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[1]/div/div/div/div[3]/div/div[3]/div[3]/div[1]/div[1]/p', 'Poli3eer4');
  },

  'step 18 - Validate flight seat' : (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[1]/div/div/div/div[3]/div/div[3]/div[3]/div[1]/div[2]/label', 'SEAT');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[1]/div/div/div/div[3]/div/div[3]/div[3]/div[1]/div[2]/p', '13D');
  },

  'step 19 - Validate flight arrival terminal' : (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[1]/div/div/div/div[3]/div/div[3]/div[3]/div[1]/div[3]/label', 'ARRIVAL TERMINAL');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[1]/div/div/div/div[3]/div/div[3]/div[3]/div[1]/div[3]/p', '--');
  },

  'step 20 - Validate flight arrival gate' : (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[1]/div/div/div/div[3]/div/div[3]/div[3]/div[1]/div[4]/label', 'ARRIVAL GATE');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[1]/div/div/div/div[3]/div/div[3]/div[3]/div[1]/div[4]/p', '--');
  },

//   ---------------------------------- Additional info ----------------------------------

  'step 21 - Validate flight class' : (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[1]/div/div/div/div[3]/div/div[3]/div[3]/div[2]/div/label', 'ADDITIONAL INFO');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[1]/div/div/div/div[3]/div/div[3]/div[3]/div[3]/div[1]/span', 'Class');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[1]/div/div/div/div[3]/div/div[3]/div[3]/div[3]/div[1]/p', 'Y');
  },

  'step 22 - Validate flight aircraft' : (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[1]/div/div/div/div[3]/div/div[3]/div[3]/div[3]/div[2]/span', 'Aircraft');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[1]/div/div/div/div[3]/div/div[3]/div[3]/div[3]/div[2]/p', '--');
  },

  'step 23 - Validate flight meal' : (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[1]/div/div/div/div[3]/div/div[3]/div[3]/div[3]/div[3]/span', 'Meal');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[1]/div/div/div/div[3]/div/div[3]/div[3]/div[3]/div[3]/p', 'Food For Purchase');
  },

  'step 24 - Validate flight price' : (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[1]/div/div/div/div[3]/div/div[3]/div[3]/div[3]/div[4]/span', 'Price');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[1]/div/div/div/div[3]/div/div[3]/div[3]/div[3]/div[4]/p', '643 USD');
  },

//   ---------------------------------- Program ----------------------------------

  'step 25 - Validate flight program membership' : (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[1]/div/div/div/div[3]/div/div[3]/div[3]/div[4]/div/label', 'PROGRAM');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[1]/div/div/div/div[3]/div/div[3]/div[3]/div[5]/div[1]/span', 'Membership');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[1]/div/div/div/div[3]/div/div[3]/div[3]/div[5]/div[1]/p', '--');
  },

  'step 26 - Validate flight program number' : (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[1]/div/div/div/div[3]/div/div[3]/div[3]/div[5]/div[2]/span', 'Member ID');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[1]/div/div/div/div[3]/div/div[3]/div[3]/div[5]/div[2]/p', '--');
  },

  'step 27 - Validate flight program mileage' : (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[1]/div/div/div/div[3]/div/div[3]/div[3]/div[5]/div[3]/span', 'Mileage');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[1]/div/div/div/div[3]/div/div[3]/div[3]/div[5]/div[3]/p', '--');
  },

//   ---------------------------------- Agent information ----------------------------------

  'step 28 - Validate flight agent booked from' : (driver) => {
    driver.execute(function() { window.scrollBy(0, 872); }, []);
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[1]/div/div/div/div[3]/div/div[3]/div[3]/div[6]/div/label', 'AGENT INFORMATION');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[1]/div/div/div/div[3]/div/div[3]/div[3]/div[7]/div[1]/span', 'Booked From');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[1]/div/div/div/div[3]/div/div[3]/div[3]/div[7]/div[1]/p', 'Carlson Wagonlit Travel');
  },

  'step 29 - Validate flight agent phone number' : (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[1]/div/div/div/div[3]/div/div[3]/div[3]/div[7]/div[2]/span', 'Phone #');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[1]/div/div/div/div[3]/div/div[3]/div[3]/div[7]/div[2]/p', '--');
  },

  'step 30 - Validate flight booking date' : (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[1]/div/div/div/div[3]/div/div[3]/div[3]/div[7]/div[3]/span', 'Booking Date');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[1]/div/div/div/div[3]/div/div[3]/div[3]/div[7]/div[3]/p', '--');
  },

  'step 31 - Validate flight url' : (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[1]/div/div/div/div[3]/div/div[3]/div[3]/div[7]/div[4]/span', 'URL');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[1]/div/div/div/div[3]/div/div[3]/div[3]/div[7]/div[4]/p/a', 'http://www.carlsonwagonlit.com/');
  },

//   ---------------------------------- Baggage ----------------------------------

  'step 32 - Validate flight baggage last check in' : (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[1]/div/div/div/div[3]/div/div[3]/div[3]/div[8]/div/label', 'BAGGAGE');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[1]/div/div/div/div[3]/div/div[3]/div[3]/div[9]/div[1]/span', 'Last Check-in');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[1]/div/div/div/div[3]/div/div[3]/div[3]/div[9]/div[1]/p', '1h Before Departure');
  },

  'step 33 - Validate flight baggage price' : (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[1]/div/div/div/div[3]/div/div[3]/div[3]/div[9]/div[2]/span', 'Price');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[1]/div/div/div/div[3]/div/div[3]/div[3]/div[9]/div[2]/p', '--');
  },

  'step 34 - Validate flight baggage allowed amount' : (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[1]/div/div/div/div[3]/div/div[3]/div[3]/div[9]/div[3]/span', 'Allowed Amount');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[1]/div/div/div/div[3]/div/div[3]/div[3]/div[9]/div[3]/p', '--');
  },

  'step 35 - Validate flight baggage allowed weight' : (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[1]/div/div/div/div[3]/div/div[3]/div[3]/div[9]/div[4]/span', 'Allowed Weight');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[1]/div/div/div/div[3]/div/div[3]/div[3]/div[9]/div[4]/p', '--');
  },

//   ---------------------------------- Notes ----------------------------------

  'step 36 - Validate flight flight notes' : (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[1]/div/div/div/div[3]/div/div[3]/div[3]/div[10]/div/label', 'NOTES');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[1]/div/div/div/div[3]/div/div[3]/div[3]/div[10]/div/p', '--');
  },

  'step 37 - Validate flight check in button' : (driver) => {
    driver.useCss();
    driver.waitForAttributeContains('#flight-check-in', 'class', 'btn btn-primary disabled text-uppercase flight-check-in');
  },

  'step 38 - Click on flight less details link to collapse the item' : (driver) => {
    driver.useXpath();
    driver.waitAndClick('//*[@id="tripDetails"]/div[2]/div/ul/li[1]/div/div/div/div[3]/div/div[4]/div[1]/button/span');
  },

  'step 39 - Logout' : (driver) => {
    driver.page.logout().logout();
  },

};