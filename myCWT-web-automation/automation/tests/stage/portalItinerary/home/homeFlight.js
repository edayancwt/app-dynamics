'use strict';

module.exports = {

  '@tags': ['home', 'company', 'resources'],

  before: function (driver) {
    driver.windowMaximize();
  },

  'step 1 - login to portal': (driver) => {
    const login = driver.page.login();
    login.fillLoginDetails(driver.globals.users.portalUser1);
  },

  'step 2 - flight card - date': (driver) => {
    driver.waitForTextByXpath('//*[@id="air-1"]/div/p', 'WED, JUN 4');
  },

  'step 3 - flight card - icon': (driver) => {
    driver.waitForAttributeContainsByXpath('//*[@id="air-1"]/div/div/div[2]/span[1]', 'class', 'cwt-icon-plane');
  },

  'step 4 - flight card - airline and flight number': (driver) => {
    driver.waitForTextByXpath('//*[@id="air-1"]/div/div/div[2]/h4', 'Aeroflot 262');
  },

  'step 5 - flight card - airline icon': (driver) => {
    driver.waitForAttributeContainsByXpath('//*[@id="air-1"]/div/div/div[2]/span[2]', 'style', 'https://travel.stage-mycwt.com/public/flights/img/airlines/SU.png');
    driver.validateUrlResponse('https://travel.stage-mycwt.com/public/flights/img/airlines/SU.png')
  },

  'step 6 - flight card - departure airport': (driver) => {
    driver.waitForTextByXpath('//*[@id="air-1"]/div/div/div[3]/div[1]/p[1]/span[2]', 'LHR');
  },

  'step 7 - flight card - departure time': (driver) => {
    driver.waitForTextByXpath('//*[@id="air-1"]/div/div/div[3]/div[1]/p[1]/span[3]', '11:00 AM');
  },

  'step 8 - flight card - departure date': (driver) => {
    driver.waitForTextByXpath('//*[@id="air-1"]/div/div/div[3]/div[1]/span', 'WED, JUN 04');
  },

  'step 9 - flight card - departure airport address': (driver) => {
    driver.waitForTextByXpath('//*[@id="air-1"]/div/div/div[3]/div[1]/div/p', 'Heathrow Airport, London, GB');
  },

  'step 10 - flight card - arrival airport': (driver) => {
    driver.waitForTextByXpath('//*[@id="air-1"]/div/div/div[3]/div[3]/p/span[2]', 'SVO');
  },

  'step 11 - flight card - arrival time': (driver) => {
    driver.waitForTextByXpath('//*[@id="air-1"]/div/div/div[3]/div[3]/p/span[3]', '4:50 PM');
  },

  'step 12 - flight card - arrival date': (driver) => {
    driver.waitForTextByXpath('//*[@id="air-1"]/div/div/div[3]/div[3]/span', 'WED, JUN 04');
  },

  'step 13 - flight card - arrival airport address': (driver) => {
    driver.waitForTextByXpath('//*[@id="air-1"]/div/div/div[3]/div[3]/div/p', 'Sheremetyevo Airport, Moscow, RU');
  },

  'step 14 - flight card - flight duration': (driver) => {
    driver.waitForTextByXpath('//*[@id="air-1"]/div/div/div[3]/div[2]/div[2]/div/span', '3H 50M');
  },

//    -------------------------------- Layover --------------------------------


  'step 15 - flight layover - icon': (driver) => {
    driver.waitForAttributeContainsByXpath('//*[@id="flightConnection-1"]/div/div/div[2]/i', 'class', 'cwt-icon-time');
  },

  'step 16 - flight layover - duration': (driver) => {
    driver.waitForTextByXpath('//*[@id="flightConnection-1"]/div/div/div[2]/p', 'Layover 2H 10M');
  },

  'step 17 - flight layover - change of terminal title': (driver) => {
    // TODO: "Change of terminal" is currently disabled until further notice.
    // driver.waitForTextByXpath('//*[@id="flightConnection-1"]/div/div/div[2]/small', 'Change of terminal is required');
  },

  'step 18 - click on flight card': (driver) => {
    driver.waitAndClickByCss('#air-1');
  },

  'step 19 - flight item on trip details': (driver) => {
    driver.waitForUrlToContain('travel.stage-mycwt.com/group/selenium-sub-selenium-top/my-trips/#/trip/226191/948505/air-1', 20000);
    driver.waitForTextByXpath('//*[@id="tripDetails"]/div[2]/div/ul/li[1]/div/div/div/div[3]/div/div[1]/div[1]/h6/span[2]', 'LHR');
  },

  'step 20 - Logout' : (driver) => {
    driver.page.logout().logout();
  },

};
