'use strict';

module.exports = {

  '@tags': ['trip', 'details', 'rail'],

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

  'step 3 - Click on rail "more details" link to expand the item': (driver) => {
    driver.scrollToLocation(0, 2798);
    driver.waitAndClick('//*[@id="tripDetails"]/div[2]/div/ul/li[10]/div/div/div/div[3]/div/div[4]/div[1]/button/span');
  },

  'step 4 - Validate rail starting date': (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[10]/div/div/p', 'WED, SEP 3');
  },

  'step 5 - Validate rail service name': (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[10]/div/div/div/div[2]/h6', 'Amtrak 566');
  },

  'step 6 - Validate rail departure time': (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[10]/div/div/div/div[3]/div/div[1]/div[1]/h6/span[2]', '9:30 AM');
  },

  'step 7 - Validate rail departure address': (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[10]/div/div/div/div[3]/div/div[1]/div[1]/p[2]', 'anta Ana John Wayne Santa Ana US');
  },

  'step 8 - Validate rail arrival time': (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[10]/div/div/div/div[3]/div/div[1]/div[3]/h6/span[2]', '11:30 AM');
  },

  'step 9 - Validate rail arrival address': (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[10]/div/div/div/div[3]/div/div[1]/div[3]/span/p', 'San Diego San Diego US');
  },

  'step 10 - Validate rail trip duration': (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[10]/div/div/div/div[3]/div/div[1]/div[2]/div/div[2]/div/span', '2H 0M');
  },

  'step 11 - Validate rail departure platform': (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[10]/div/div/div/div[3]/div/div[2]/div/div[1]/label', 'DEPARTURE PLATFORM');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[10]/div/div/div/div[3]/div/div[2]/div/div[1]/p', '--');
  },

  'step 12 - Validate rail arrival platform': (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[10]/div/div/div/div[3]/div/div[2]/div/div[2]/label', 'ARRIVAL PLATFORM');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[10]/div/div/div/div[3]/div/div[2]/div/div[2]/p', '--');
  },

  'step 13 - Validate rail seat': (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[10]/div/div/div/div[3]/div/div[3]/div[3]/div[1]/div[1]/label', 'SEAT');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[10]/div/div/div/div[3]/div/div[3]/div[3]/div[1]/div[1]/p', '--');
  },

  'step 14 - Validate rail class': (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[10]/div/div/div/div[3]/div/div[3]/div[3]/div[1]/div[2]/label', 'CLASS');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[10]/div/div/div/div[3]/div/div[3]/div[3]/div[1]/div[2]/p', '--');
  },

  'step 15 - Validate rail cabin': (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[10]/div/div/div/div[3]/div/div[3]/div[3]/div[1]/div[3]/label', 'CABIN');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[10]/div/div/div/div[3]/div/div[3]/div[3]/div[1]/div[3]/p', '--');
  },

//   ---------------------------------- Additional info ----------------------------------

  'step 16 - Validate rail total price': (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[10]/div/div/div/div[3]/div/div[3]/div[3]/div[2]/div/label', 'ADDITIONAL INFO');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[10]/div/div/div/div[3]/div/div[3]/div[3]/div[3]/div[1]/span', 'Total Price');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[10]/div/div/div/div[3]/div/div[3]/div[3]/div[3]/div[1]/p', '156 USD');
  },

  'step 17 - Validate rail confirmation number': (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[10]/div/div/div/div[3]/div/div[3]/div[3]/div[3]/div[2]/span', 'Confirmation #');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[10]/div/div/div/div[3]/div/div[3]/div[3]/div[3]/div[2]/p', '0D1212');
  },

//   ---------------------------------- Departure station details ----------------------------------

  'step 18 - Validate rail departure station address': (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[10]/div/div/div/div[3]/div/div[3]/div[3]/div[4]/div/label', 'DEPARTURE STATION DETAILS');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[10]/div/div/div/div[3]/div/div[3]/div[3]/div[5]/div[1]/span', 'Address');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[10]/div/div/div/div[3]/div/div[3]/div[3]/div[5]/div[1]/p', 'Santa Ana John Wayne Santa Ana US');
  },

  'step 19 - Validate rail departure phone number': (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[10]/div/div/div/div[3]/div/div[3]/div[3]/div[5]/div[2]/span', 'Phone #');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[10]/div/div/div/div[3]/div/div[3]/div[3]/div[5]/div[2]/p', '--');
    driver.scrollToLocation(0, 3350);
  },

//   ---------------------------------- Arrival station details ----------------------------------

  'step 20 - Validate rail arrival station address': (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[10]/div/div/div/div[3]/div/div[3]/div[3]/div[6]/div/label', 'ARRIVAL STATION DETAILS');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[10]/div/div/div/div[3]/div/div[3]/div[3]/div[7]/div[1]/span', 'Address');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[10]/div/div/div/div[3]/div/div[3]/div[3]/div[7]/div[1]/p', 'San Diego San Diego US');
  },

  'step 21 - Validate rail arrival phone number': (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[10]/div/div/div/div[3]/div/div[3]/div[3]/div[7]/div[2]/span', 'Phone #');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[10]/div/div/div/div[3]/div/div[3]/div[3]/div[7]/div[2]/p', '--');
  },

//   ---------------------------------- Program ----------------------------------

  'step 22 - Validate rail program membership': (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[10]/div/div/div/div[3]/div/div[3]/div[3]/div[8]/div/label', 'PROGRAM');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[10]/div/div/div/div[3]/div/div[3]/div[3]/div[9]/div[1]/span', 'Membership');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[10]/div/div/div/div[3]/div/div[3]/div[3]/div[9]/div[1]/p', '--');
  },

  'step 23 - Validate rail program number': (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[10]/div/div/div/div[3]/div/div[3]/div[3]/div[9]/div[2]/span', 'Member ID');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[10]/div/div/div/div[3]/div/div[3]/div[3]/div[9]/div[2]/p', '--');
  },

  'step 24 - Validate rail program points': (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[10]/div/div/div/div[3]/div/div[3]/div[3]/div[9]/div[3]/span', 'Points');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[10]/div/div/div/div[3]/div/div[3]/div[3]/div[9]/div[3]/p', '--');
  },

//   ---------------------------------- Agent information ----------------------------------

  'step 25 - Validate rail agent booked from': (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[10]/div/div/div/div[3]/div/div[3]/div[3]/div[10]/div/label', 'AGENCY INFORMATION');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[10]/div/div/div/div[3]/div/div[3]/div[3]/div[11]/div[1]/span', 'Booked from');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[10]/div/div/div/div[3]/div/div[3]/div[3]/div[11]/div[1]/p', 'Carlson Wagonlit Travel');
  },

  'step 26 - Validate rail agent phone number': (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[10]/div/div/div/div[3]/div/div[3]/div[3]/div[11]/div[2]/span', 'Phone #');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[10]/div/div/div/div[3]/div/div[3]/div[3]/div[11]/div[2]/p', '--');
  },

  'step 27 - Validate rail booking date': (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[10]/div/div/div/div[3]/div/div[3]/div[3]/div[11]/div[3]/span', 'Booking Date');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[10]/div/div/div/div[3]/div/div[3]/div[3]/div[11]/div[3]/p', '--');
  },

  'step 28 - Validate rail url': (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[10]/div/div/div/div[3]/div/div[3]/div[3]/div[11]/div[4]/span', 'URL');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[10]/div/div/div/div[3]/div/div[3]/div[3]/div[11]/div[4]/p/a', 'http://www.carlsonwagonlit.com/');
  },

//   ---------------------------------- Notes ----------------------------------

  'step 29 - Validate rail notes': (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[10]/div/div/div/div[3]/div/div[3]/div[3]/div[12]/div/label', 'NOTES');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[10]/div/div/div/div[3]/div/div[3]/div[3]/div[12]/div/p', '--');
  },

  'step 30 - Click on rail "less details" link to collapse the item': (driver) => {
    driver.waitAndClick('//*[@id="tripDetails"]/div[2]/div/ul/li[10]/div/div/div/div[3]/div/div[4]/div[1]/button/span');
  },

  'step 31 - Logout' : (driver) => {
    driver.page.logout().logout();
  },

};