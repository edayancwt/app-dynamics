'use strict';

module.exports = {

  '@tags': ['home', 'rail'],

  before: function (driver) {
    driver.windowMaximize();
  },

  'step 1 - login to portal': (driver) => {
    const login = driver.page.login();
    login.fillLoginDetails(driver.globals.users.portalUser1);
  },

  'step 2 - navigate right 5 times': (driver) => {
    driver.clickToSlide('#itinerary-next', 5);
  },

  'step 3 - Validate rail service card date': (driver) => {
    driver.waitForTextByXpath('//*[@id="rail-1"]/div/p', 'WED, SEP 3');
  },

  'step 4 - Validate rail icon': (driver) => {
    driver.waitForAttributeContainsByXpath('//*[@id="rail-1"]/div/div/div[1]/span', "class", 'cwt-icon-rail');
  },

  'step 5 - Validate rail service name': (driver) => {
    driver.waitForTextByXpath('//*[@id="rail-1"]/div/div/div[1]/h4', "Amtrak");
  },

  'step 6 - Validate rail headline address': (driver) => {
    driver.waitForTextByXpath('//*[@id="rail-1"]/div/div/div[1]/div/span', "Santa Ana John Wayne Santa Ana US");
  },

  'step 7 - Validate rail departure time': (driver) => {
    driver.waitForTextByXpath('//*[@id="rail-1"]/div/div/div[2]/div[1]/p[1]/span[3]', "9:30 AM");
  },

  'step 8 - Validate rail departure date': (driver) => {
    driver.waitForTextByXpath('//*[@id="rail-1"]/div/div/div[2]/div[1]/span', "WED, SEP 03");
  },

  'step 9 - Validate rail departure station': (driver) => {
    driver.waitForTextByXpath('//*[@id="rail-1"]/div/div/div[2]/div[1]/div/p', "Santa Ana John Wayne Santa Ana US");
  },

  'step 10 - Validate rail arrival time': (driver) => {
    driver.waitForTextByXpath('//*[@id="rail-1"]/div/div/div[2]/div[3]/p[1]/span[3]', "11:30 AM");
  },

  'step 11 - Validate rail arrival date': (driver) => {
    driver.waitForTextByXpath('//*[@id="rail-1"]/div/div/div[2]/div[3]/span', "WED, SEP 03");
  },

  'step 12 - Validate rail arrival station': (driver) => {
    driver.waitForTextByXpath('//*[@id="rail-1"]/div/div/div[2]/div[3]/div/p', "San Diego San Diego US");
  },

  'step 13 - Validate rail duration': (driver) => {
    driver.waitForTextByXpath('//*[@id="rail-1"]/div/div/div[2]/div[2]/div[2]/div/span', "2H 0M");
  },

  'step 14 - Click on the rail item and navigate to trip details': (driver) => {
    driver.useCss();
    driver.waitAndClickByCss('#rail-1');
  },

  'step 15 - Validate navigation to trip details rail item': (driver) => {
    driver.waitForUrlToContain('travel.stage-mycwt.com/group/selenium-sub-selenium-top/my-trips/#/trip/226191/948505/rail-1');
  },

  'step 16 - Logout' : (driver) => {
    driver.page.logout().logout();
  },

};