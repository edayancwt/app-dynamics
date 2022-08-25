'use strict';

module.exports = {

  '@tags': ['home', 'car'],

  before: function (driver) {
    driver.windowMaximize();
  },

  'step 1 - login to portal': (driver) => {
    const login = driver.page.login();
    login.fillLoginDetails(driver.globals.users.portalUser8);
  },

  'step 2 - Car rental card navigation and date': (driver) => {
    driver.clickToSlide('#slider-nav-Forward', 2);
    driver.waitForTextByXpath('//*[@id="shell"]/div/div[1]/div/div/section/div[2]/div/div/div/div[4]/div/div/div[1]/p', 'SAT, JUN 07');
  },

  'step 3 - Car card icon': (driver) => {
    driver.waitForAttributeContainsByXpath('//*[@id="shell"]/div/div[1]/div/div/section/div[2]/div/div/div/div[4]/div/div/div[1]/div/div[1]/i[1]', 'class', 'CwtIcons-sc-1zecbe-1');
  },

  'step 4 - Car agency': (driver) => {
    driver.waitForTextByXpath('//*[@id="shell"]/div/div[1]/div/div/section/div[2]/div/div/div/div[4]/div/div/div[1]/div/div[1]/h4/div', 'DOLLAR Car Pick-Up');
  },

  'step 5 - Car pickup time': (driver) => {
    driver.waitForTextByXpath('//*[@id="shell"]/div/div[1]/div/div/section/div[2]/div/div/div/div[4]/div/div/div[2]/div[1]/p/span', '1:10 PM');
  },

  'step 6 - Car pickup date': (driver) => {
    driver.waitForTextByXpath('//*[@id="shell"]/div/div[1]/div/div/section/div[2]/div/div/div/div[4]/div/div/div[2]/div[1]/div[1]/span', 'SAT, JUN 07');
  },

  'step 7 - Car pickup location': (driver) => {
    driver.waitForTextByXpath('//*[@id="shell"]/div/div[1]/div/div/section/div[2]/div/div/div/div[4]/div/div/div[2]/div[1]/div[2]/div/div/span/span[1]/span', 'DEN');
  },

  // 'step 8 - Car drop off title': (driver) => {
  //   driver.waitForTextByXpath('//*[@id="car-1"]/div/div/div[2]/div[3]/p/span[1]', 'DROP-OFF');   //TODO: missing drop off title
  // },

  'step 9 - Car drop off time': (driver) => {
    driver.waitForTextByXpath('//*[@id="shell"]/div/div[1]/div/div/section/div[2]/div/div/div/div[4]/div/div/div[2]/div[3]/p/span', '8:20 PM');
  },

  'step 10 - Car drop off date': (driver) => {
    driver.waitForTextByXpath('//*[@id="shell"]/div/div[1]/div/div/section/div[2]/div/div/div/div[4]/div/div/div[2]/div[3]/div[1]/span', 'SAT, JUN 07');
  },

  'step 11 - Car drop off location': (driver) => {
    driver.waitForTextByXpath('//*[@id="shell"]/div/div[1]/div/div/section/div[2]/div/div/div/div[4]/div/div/div[2]/div[3]/div[2]/div/div/span/span[1]/span', 'DEN');
  },

  'step 12 - Car duration': (driver) => {
    driver.waitForTextByXpath('//*[@id="shell"]/div/div[1]/div/div/section/div[2]/div/div/div/div[4]/div/div/div[2]/div[2]/div/span', '1 DAY');
  },

  'step 13 - Car confirmation number': (driver) => {
    driver.waitForTextByXpath('//*[@id="shell"]/div/div[1]/div/div/section/div[2]/div/div/div/div[4]/div/div/ul/li[1]', 'Confirmation #:\nR4083926');
  },

  // 'step 14 - Car navigate to trip details': (driver) => {
  //   driver.waitAndClickByCss('#car-1');    //TODO: navigation still not working
  // },

  // 'step 15 - Car validate URL': (driver) => {
  //   driver.waitForUrl('https://travel.stage-mycwt.com/group/selenium-sub-selenium-top/my-trips/#/trip/226191/948505/car-1');
  // },

  // 'step 16 - Logout' : (driver) => {
  //   driver.page.logout().logout();   //TODO: logout still not working
  // },

};