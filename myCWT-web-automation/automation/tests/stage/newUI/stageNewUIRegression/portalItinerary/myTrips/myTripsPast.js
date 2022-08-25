'use strict';

module.exports = {

  '@tags': ['my', 'trips', 'past'],

  before: function (driver) {
    driver.windowMaximize();
  },

  'step 1 - login to portal': (driver) => {
    const login = driver.page.login();
    login.fillLoginDetails(driver.globals.users.portalUser1);
  },

  'step 2 - Click on my trips link': (driver) => {
    driver.waitAndClickByCss('#layout_2');
  },

  'step 3 - Validate past trip title': (driver) => {
    driver.waitForTextByCss('#my-trips-past-trips-title', 'My past trips (3)');
    driver.scrollToLocation(0, 622);
  },

  'step 4 - Validate past trip search field exist': (driver) => {
    driver.waitForAttributeContainsByCss('#my-trips-search-input', 'placeholder', 'Search for city airport or landmark');
  },

//   ---------------------------------- First past trip ----------------------------------

  'step 5 - Validate first past trip year title': (driver) => {
    driver.waitForTextByXpath('//*[@id="my-trips"]/div/div[2]/ul/li[1]/div/p', '2016');
  },

  'step 6 - Validate first past trip name': (driver) => {
    driver.waitForTextByXpath('//*[@id="my-trips"]/div/div[2]/ul/li[1]/div/div/div/div/h3/span/span', 'Trip to Santa Ana, CA');
  },

  'step 7 - Validate first past trip location': (driver) => {
    driver.waitForTextByXpath('//*[@id="my-trips"]/div/div[2]/ul/li[1]/div/div/div/div/p[1]/span/span', 'Santa Ana, California, US');
  },

  'step 8 - Validate first past trips date and duration': (driver) => {
    // trip dates (this is to bypass acceptability changes, where all text located in different spans, eliminating "enter" hits)
      const selector = '//*[@id="my-trips"]/div/div[2]/ul/li[1]/div/div/div/div/p[2]';
      driver.waitForElementVisible(selector);
      driver.getText(selector, function(result){
      const textValue = result.value.replace(/(\r\n\t|\n|\r\t)/gm,"");
      this.assert.equal(textValue, "Starts onOct 30  -  EndsNov 12, 2016 | 14 nights");
    });
  },

  'step 9 - Validate past trip flight icon display in the trip summary': (driver) => {
    driver.waitForAttributeContainsByXpath('//*[@id="my-trips"]/div/div[2]/ul/li[1]/div/div/ul/li[1]/div/span', 'class', 'cwt-icon-plan');
  },

  'step 10 - Validate past trip flight icon text display in the trip summary': (driver) => {
    driver.waitForTextByXpath('//*[@id="my-trips"]/div/div[2]/ul/li[1]/div/div/ul/li[1]/div/div/div/span[2]/span', 'AMS - DEN');
  },

  'step 11 - Validate past trip rail icon display in the trip summary': (driver) => {
    driver.waitForAttributeContainsByXpath('//*[@id="my-trips"]/div/div[2]/ul/li[1]/div/div/ul/li[4]/div/span', 'class', 'cwt-icon-rail');
  },

  'step 12 - Validate past trip rail icon text display in the trip summary': (driver) => {
    driver.waitForTextByXpath('//*[@id="my-trips"]/div/div[2]/ul/li[1]/div/div/ul/li[4]/div/div/div/span[2]/span', 'Amtrak to San Diego');
  },

  'step 13 - Validate past trip car icon display in the trip summary': (driver) => {
    driver.waitForAttributeContainsByXpath('//*[@id="my-trips"]/div/div[2]/ul/li[1]/div/div/ul/li[9]/div/span', 'class', 'cwt-icon-car');
  },

  'step 14 - Validate past trip car icon text display in the trip summary': (driver) => {
    driver.waitForTextByXpath('//*[@id="my-trips"]/div/div[2]/ul/li[1]/div/div/ul/li[9]/div/div/div/span[2]/span', 'DOLLAR');
  },

  'step 15 - Validate past trip more items indication': (driver) => {
    driver.waitForTextByXpath('//*[@id="my-trips"]/div/div[2]/ul/li[1]/div/div/ul/li[10]/div/div/div/span[2]/span', '5 more items...');
  },

//   ---------------------------------- Third past trip ----------------------------------

  'step 16 - Validate third past trip year title': (driver) => {
    driver.execute(function() { window.scrollBy(0, 1071); }, []);
    driver.waitForTextByXpath('//*[@id="my-trips"]/div/div[2]/ul/li[3]/div/p', '2014');
  },

  'step 17 - Validate third past trip name': (driver) => {
    driver.waitForTextByXpath('//*[@id="my-trips"]/div/div[2]/ul/li[3]/div/div/div/div/h3/span/span', 'Trip to Bangkok');
  },

  'step 18 - Validate third past trip location': (driver) => {
    driver.waitForTextByXpath('//*[@id="my-trips"]/div/div[2]/ul/li[3]/div/div/div/div/p[1]/span/span', 'Bangkok, TH');
  },

  'step 19 - Validate third past trip date and duration': (driver) => {
    // trip dates (this is to bypass acceptability changes, where all text located in different spans, eliminating "enter" hits)
    const selector = '//*[@id="my-trips"]/div/div[2]/ul/li[3]/div/div/div/div/p[2]';
    driver.waitForElementVisible(selector);
    driver.getText(selector, function(result){
    const textValue = result.value.replace(/(\r\n\t|\n|\r\t)/gm,"");
    this.assert.equal(textValue, "Starts onJul 29  -  EndsOct 29, 2014 | 92 nights");
    });
  },

  'step 20 - Top button': (driver) => {
    // Validate top button display
    driver.waitForTextByCss('#my-trips-top-button', 'TOP');
    driver.waitForAttributeContainsByXpath('//*[@id="my-trips-top-button"]/button/i', 'class', 'cwt-icon-back-to-top');
    // Click on top button
    driver.waitAndClickByCss('#my-trips-top-button');
    driver.waitAndClickByCss('#layout_2');
    // Validate top button don't display
    driver.pause(1000);
    driver.assert.elementNotPresent('#my-trips-top-button');
  },

  'step 21 - Click on past trip item': (driver) => {
    driver.execute(function() { window.scrollBy(0, 850); }, []);
    driver.waitAndClickByXpath('//*[@id="my-trips"]/div/div[2]/ul/li[1]/div/div/div[1]/div/p[1]');
  },

  'step 22 - Validate past trip item open': (driver) => {
    // trip dates (this is to bypass acceptability changes, where all text located in different spans, eliminating "enter" hits)
      const selector = '//*[@id="tripDetails"]/div[1]/p';
      driver.waitForElementVisible(selector);
      driver.getText(selector, function(result){
      const textValue = result.value.replace(/(\r\n\t|\n|\r\t)/gm,"");
      this.assert.equal(textValue, "Starts onOct 30  -  EndsNov 12, 2016 | 14 nights");
    });
  },

  'step 23 - Logout': (driver) => {
    driver.page.logout().logout();
  },

};