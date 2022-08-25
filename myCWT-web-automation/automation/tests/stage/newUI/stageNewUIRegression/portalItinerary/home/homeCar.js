'use strict';

module.exports = {

  '@tags': ['home', 'car'],

  before: function (driver) {
    driver.windowMaximize();
  },

  'step 1 - login to portal': (driver) => {
    const login = driver.page.login();
    login.fillLoginDetails(driver.globals.users.portalUser1);
  },

  'step 2 - Car rental card navigation and date': (driver) => {
    driver.clickToSlide('#itinerary-next', 3);
    driver.waitForTextByXpath('//*[@id="car-1"]/div/p', 'FRI, JUL 18');
  },

  'step 3 - Car card icon': (driver) => {
    driver.waitForAttributeContainsByXpath('//*[@id="car-1"]/div/div/div[1]/span', 'class', 'cwt-icon-car');
  },

  'step 4 - Car agency': (driver) => {
    driver.waitForTextByXpath('//*[@id="car-1"]/div/div/div[1]/h4', 'DOLLAR');
  },

  'step 5 - Car confirmation number': (driver) => {
    // driver.waitForTextByXpath('//*[@id="car-1"]/div/div/div[1]/div/ul/li[1]/span', 'Confirmation#: R4083926'); TODO:DE9294
  },

  'step 6 - Car pickup title': (driver) => {
    driver.waitForTextByXpath('//*[@id="car-1"]/div/div/div[2]/div[1]/p/span[1]', 'PICK-UP');
  },

  'step 7 - Car pickup time': (driver) => {
    driver.waitForTextByXpath('//*[@id="car-1"]/div/div/div[2]/div[1]/p/span[2]', '3:10 PM');
  },

  'step 8 - Car pickup date': (driver) => {
    driver.waitForTextByXpath('//*[@id="car-1"]/div/div/div[2]/div[1]/span', 'FRI, JUL 18');
  },

  'step 9 - Car pickup location': (driver) => {
    driver.waitForTextByXpath('//*[@id="car-1"]/div/div/div[2]/div[1]/div/p', 'DEN');
  },

  'step 10 - Car drop off title': (driver) => {
    driver.waitForTextByXpath('//*[@id="car-1"]/div/div/div[2]/div[3]/p/span[1]', 'DROP-OFF');
  },

  'step 11 - Car drop off time': (driver) => {
    driver.waitForTextByXpath('//*[@id="car-1"]/div/div/div[2]/div[3]/p/span[2]', '1:20 PM');
  },

  'step 12 - Car drop off date': (driver) => {
    driver.waitForTextByXpath('//*[@id="car-1"]/div/div/div[2]/div[3]/span', 'FRI, JUL 25');
  },

  'step 13 - Car drop off location': (driver) => {
    driver.waitForTextByXpath('//*[@id="car-1"]/div/div/div[2]/div[3]/div/p', 'DEN');
  },

  'step 14 - Car duration': (driver) => {
    driver.waitForTextByXpath('//*[@id="car-1"]/div/div/div[2]/div[2]/div[2]/div/span', '7 NIGHTS');
  },

  'step 15 - Car navigate to trip details': (driver) => {
    driver.waitAndClickByCss('#car-1');
  },

  'step 16 - Car validate URL': (driver) => {
    driver.waitForUrl('https://travel.stage-mycwt.com/group/selenium-sub-selenium-top/my-trips/#/trip/226191/948505/car-1');
  },

  'step 17 - Logout' : (driver) => {
    driver.page.logout().logout();
  },

};