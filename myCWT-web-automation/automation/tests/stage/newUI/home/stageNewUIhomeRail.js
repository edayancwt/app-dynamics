'use strict';

module.exports = {

  '@tags': ['home', 'rail'],

  before: function (driver) {
    driver.windowMaximize();
  },

  'step 1 - login to portal': (driver) => {
    const login = driver.page.login();
    login.fillLoginDetails(driver.globals.users.portalUser8);
  },

  'step 2 - navigate right 5 times': (driver) => {
    driver.clickToSlide('#slider-nav-Forward', 3);
  },

  'step 3 - Validate rail service card date': (driver) => {
    driver.waitForTextByXpath('//*[@id="shell"]/div/div[1]/div/div/section/div[2]/div/div/div/div[6]/div/div/div[1]/p', 'MON, JUN 09');
  },

  'step 4 - Validate rail icon': (driver) => {
    driver.waitForAttributeContainsByXpath('//*[@id="shell"]/div/div[1]/div/div/section/div[2]/div/div/div/div[6]/div/div/div[1]/div/div[1]/i[1]', "class", 'CwtIcons__StyledIcon-sc-1zecbe-0');
  },

  'step 5 - Validate rail service name': (driver) => {
    driver.waitForTextByXpath('//*[@id="shell"]/div/div[1]/div/div/section/div[2]/div/div/div/div[6]/div/div/div[1]/div/div[1]/h4/div/span/span[1]/span', "Amtrak Train");
  },

  'step 7 - Validate rail departure time': (driver) => {
    driver.waitForTextByXpath('//*[@id="shell"]/div/div[1]/div/div/section/div[2]/div[1]/div/div/div[6]/div/div/div[2]/div[1]/p/span', "9:30 AM");
  },

  'step 8 - Validate rail departure date': (driver) => {
    driver.waitForTextByXpath('//*[@id="shell"]/div/div[1]/div/div/section/div[2]/div[1]/div/div/div[6]/div/div/div[2]/div[1]/div[1]/span', "MON, JUN 09");
  },

  'step 9 - Validate rail departure station': (driver) => {
    driver.waitForTextByXpath('//*[@id="shell"]/div/div[1]/div/div/section/div[2]/div[1]/div/div/div[6]/div/div/div[2]/div[1]/div[2]/div/div[1]/span/span[1]', "Santa Ana\nJohn Wayne,...");
  },

  'step 10 - Validate rail arrival time': (driver) => {
    driver.waitForTextByXpath('//*[@id="shell"]/div/div[1]/div/div/section/div[2]/div[1]/div/div/div[6]/div/div/div[2]/div[3]/p/span', "11:30 AM");
  },

  'step 11 - Validate rail arrival date': (driver) => {
    driver.waitForTextByXpath('//*[@id="shell"]/div/div[1]/div/div/section/div[2]/div[1]/div/div/div[6]/div/div/div[2]/div[3]/div[1]/span', "TUE, JUN 10");
  },

  'step 12 - Validate rail arrival station': (driver) => {
    driver.waitForTextByXpath('//*[@id="shell"]/div/div[1]/div/div/section/div[2]/div[1]/div/div/div[6]/div/div/div[2]/div[3]/div[2]/div/div/span/span[1]', "San Diego, San\nDiego, US");
  },

  'step 13 - Validate rail duration': (driver) => {
    driver.waitForTextByXpath('//*[@id="shell"]/div/div[1]/div/div/section/div[2]/div[1]/div/div/div[6]/div/div/div[2]/div[2]/div/span', "26 HOURS");
  },

  // 'step 14 - Click on the rail item and navigate to trip details': (driver) => {
  //   driver.useCss();
  //   driver.waitAndClickByCss('#rail-1');   //TODO: navigation still not working
  // },
  //
  // 'step 15 - Validate navigation to trip details rail item': (driver) => {
  //   driver.waitForUrlToContain('travel.stage-mycwt.com/group/selenium-sub-selenium-top/my-trips/#/trip/226191/948505/rail-1');
  // },
  //
  // 'step 16 - Logout' : (driver) => {
  //   driver.page.logout().logout();   //TODO: logout still not working
  // },

};