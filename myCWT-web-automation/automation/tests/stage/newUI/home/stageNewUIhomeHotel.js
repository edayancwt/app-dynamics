'use strict';

module.exports = {

  '@tags': ['home', 'hotel'],

  before: function (driver) {
    driver.windowMaximize();
  },

  'step 1 - login to portal': (driver) => {
    const login = driver.page.login();
    login.fillLoginDetails(driver.globals.users.portalUser8);
  },

  'step 2 - header - navigate 3 times to the right': (driver) => {
    driver.clickToSlide('#slider-nav-Forward', 3);
  },

  'step 3 - hotel card - date': (driver) => {
    driver.waitForTextByXpath('//*[@id="shell"]/div/div[1]/div/div/section/div[2]/div[1]/div/div/div[5]/div/div/div[1]/p', 'SUN, JUN 08');
  },

  'step 4 - hotel card - icon': (driver) => {
    driver.waitForAttributeContainsByXpath('//*[@id="shell"]/div/div[1]/div/div/section/div[2]/div[1]/div/div/div[5]/div/div/div[1]/div/div[1]/i[1]', 'class', 'CwtIcons-sc-1zecbe-1');
  },

  'step 5 - hotel card - name': (driver) => {
    driver.waitForTextByXpath('//*[@id="shell"]/div/div[1]/div/div/section/div[2]/div[1]/div/div/div[5]/div/div/div[1]/div/div[1]/h4/div/span/span[1]/span', 'COUNTRY INN STS DENVER AIR');
  },

  'step 6 - hotel card - address': (driver) => {
    driver.waitForTextByXpath('//*[@id="shell"]/div/div[1]/div/div/section/div[2]/div[1]/div/div/div[5]/div/div/div[1]/div/div[2]/h4/div/span/span[1]/span', '4343 N. Airport Way,');
  },

  'step 7 - hotel card - check-in title': (driver) => {
    driver.waitForTextByXpath('//*[@id="shell"]/div/div[1]/div/div/section/div[2]/div[1]/div/div/div[5]/div/div/div[2]/div[1]/span', 'CHECK-IN');
  },

  'step 8 - hotel card - check-in date': (driver) => {
    driver.waitForTextByXpath('//*[@id="shell"]/div/div[1]/div/div/section/div[2]/div[1]/div/div/div[5]/div/div/div[2]/div[1]/div[1]/span', 'SUN,JUN 08');
  },

  'step 9 - hotel card - check-out title': (driver) => {
    driver.waitForTextByXpath('//*[@id="shell"]/div/div[1]/div/div/section/div[2]/div/div/div/div[5]/div/div/div[2]/div[3]/span', 'CHECK-OUT');
  },

  'step 10 - hotel card - check-out date': (driver) => {
    driver.waitForTextByXpath('//*[@id="shell"]/div/div[1]/div/div/section/div[2]/div/div/div/div[5]/div/div/div[2]/div[3]/div[1]/span', "MON,JUN 09");
  },

  'step 11 - hotel card - number of nights': (driver) => {
    driver.waitForTextByXpath('//*[@id="shell"]/div/div[1]/div/div/section/div[2]/div/div/div/div[5]/div/div/div[2]/div[2]/div/span', '2 NIGHT');
  },

  'step 12 - hotel card - room type': (driver) => {
    driver.waitForTextByXpath('//*[@id="shell"]/div/div[1]/div/div/section/div[2]/div[1]/div/div/div[5]/div/div/div[2]/div[1]/div[2]/div', 'Room Type:\nZ8X...');
  },

  'step 13 - hotel card - confirmation number': (driver) => {
    driver.waitForTextByXpath('//*[@id="shell"]/div/div[1]/div/div/section/div[2]/div[1]/div/div/div[5]/div/div/ul/li[1]', 'Confirmation #:\n8KQDJH4');
  },

  'step 14 - hotel card - phone number': (driver) => {
    driver.waitForTextByXpath('//*[@id="shell"]/div/div[1]/div/div/section/div[2]/div[1]/div/div/div[5]/div/div/ul/li[2]/a', '1-303-375-1105');
  },

  'step 15 - hotel card - phone icon': (driver) => {
    driver.waitForAttributeContainsByXpath('//*[@id="shell"]/div/div[1]/div/div/section/div[2]/div[1]/div/div/div[5]/div/div/ul/li[2]/i', 'class', 'CwtIcons-sc-1zecbe-1');
  },

  // 'step 16 - hotel card - click on the hotel item and navigate to the trip details': (driver) => {
  //   driver.waitAndClickByCss('#hotel-1');    //TODO: navigation still not working
  // },
  //
  // 'step 17 - hotel card - validate trip details URL': (driver) => {
  //   driver.waitForUrlToContain('travel.stage-mycwt.com/group/selenium-sub-selenium-top/my-trips/#/trip/226191/948505/hotel-1');
  //   driver.waitForTextByXpath('//*[@id="tripDetails"]/div[2]/div/ul/li[7]/div/div/div/div[3]/div/div[1]/div[1]/h6/span[2]', 'MON, AUG 18');
  // },
  //
  // 'step 18 - Logout' : (driver) => {
  //   driver.page.logout().logout();   //TODO: logout still not working
  // },

};