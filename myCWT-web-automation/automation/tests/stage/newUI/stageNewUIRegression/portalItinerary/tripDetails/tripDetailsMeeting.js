'use strict';

module.exports = {

  '@tags': ['trip', 'details', 'meeting'],

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

  'step 3 - Click on meeting "more details" link to expand the item': (driver) => {
    driver.waitAndClick('//*[@id="tripDetails"]/div[2]/div/ul/li[11]/div/div/div/div[3]/div/div[4]/div[1]/button/span');
  },

  'step 4 - Validate trip details meeting main title': (driver) => {
    driver.scrollToLocation(0, 3252);
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[11]/div/div/div/div[2]/h6', 'Automation meeting');
  },

  'step 5 - Validate meeting starting time': (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[11]/div/div/div/div[3]/div/div[1]/div[1]/h6/span[2]', '3:00 PM');
  },

  'step 6 - Validate meeting ending time': (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[11]/div/div/div/div[3]/div/div[1]/div[3]/h6/span[2]', '4:00 PM');
  },

  'step 7 - Validate meeting duration': (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[11]/div/div/div/div[3]/div/div[1]/div[2]/div/div[2]/div/span', '1H 0M');
  },

  'step 8 - Validate meeting address': (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[11]/div/div/div/div[3]/div/div[2]/div/div[1]/label', 'ADDRESS');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[11]/div/div/div/div[3]/div/div[2]/div/div[1]/p', 'San Diego Ave');
  },

  'step 9 - Validate meeting organizer': (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[11]/div/div/div/div[3]/div/div[2]/div/div[2]/label', 'ORGANIZER');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[11]/div/div/div/div[3]/div/div[2]/div/div[2]/p', 'Shai');
  },

  'step 10 - Validate meeting contact details': (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[11]/div/div/div/div[3]/div/div[3]/div[3]/div[1]/div/label', 'CONTACT DETAILS');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[11]/div/div/div/div[3]/div/div[3]/div[3]/div[2]/div[1]/span', 'Phone');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[11]/div/div/div/div[3]/div/div[3]/div[3]/div[2]/div[1]/p', '--');
  },

  'step 11 - Validate meeting email': (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[11]/div/div/div/div[3]/div/div[3]/div[3]/div[2]/div[2]/span', 'Email');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[11]/div/div/div/div[3]/div/div[3]/div[3]/div[2]/div[2]/p', 'shai@worldmate.com');
  },

  'step 12 - Validate meeting notes': (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[11]/div/div/div/div[3]/div/div[3]/div[3]/div[3]/div/label', 'NOTES');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[11]/div/div/div/div[3]/div/div[3]/div[3]/div[3]/div/p', '--');
  },

  'step 13 - Click on meeting less details link to collapse the item': (driver) => {
    driver.waitAndClick('//*[@id="tripDetails"]/div[2]/div/ul/li[11]/div/div/div/div[3]/div/div[4]/div[1]/button/span');
  },

  'step 14 - Logout' : (driver) => {
    driver.page.logout().logout();
  },

};