'use strict';

module.exports = {

  '@tags': ['home', 'hotel'],

  before: function (driver) {
    driver.windowMaximize();
  },

  'step 1 - login to portal': (driver) => {
    const login = driver.page.login();
    login.fillLoginDetails(driver.globals.users.portalUser1);
  },

  'step 2 - header - navigate 3 times to the right': (driver) => {
    driver.clickToSlide('#itinerary-next', 3);
  },

  'step 3 - hotel card - date': (driver) => {
    driver.waitForTextByXpath('//*[@id="hotel-1"]/div/p', 'MON, AUG 18');
  },

  'step 4 - hotel card - icon': (driver) => {
    driver.waitForAttributeContainsByXpath('//*[@id="hotel-1"]/div/div/div[1]/i', 'class', 'cwt-icon-hotel');
  },

  'step 5 - hotel card - name': (driver) => {
    driver.waitForTextByXpath('//*[@id="hotel-1"]/div/div/div[1]/h4', 'COUNTRY INN STS DENVER AIR');
  },

  'step 6 - hotel card - address': (driver) => {
    driver.waitForTextByXpath('//*[@id="hotel-1"]/div/div/div[1]/div/span', '4343 N. Airport Way,');
  },

  'step 7 - hotel card - check-in title': (driver) => {
    driver.waitForTextByXpath('//*[@id="hotel-1"]/div/div/div[2]/div[1]/p/span[1]', 'CHECK-IN');
  },

  'step 8 - hotel card - check-in date': (driver) => {
    driver.waitForTextByXpath('//*[@id="hotel-1"]/div/div/div[2]/div[1]/p', 'CHECK-IN\nMON, AUG 18');
  },

  'step 9 - hotel card - check-out title': (driver) => {
    driver.waitForTextByXpath('//*[@id="hotel-1"]/div/div/div[2]/div[3]/p/span[1]', 'CHECK-OUT');
  },

  'step 10 - hotel card - check-out date': (driver) => {
    driver.waitForTextByXpath('//*[@id="hotel-1"]/div/div/div[2]/div[3]/p', "CHECK-OUT\nMON, AUG 25");
  },

  'step 11 - hotel card - number of nights': (driver) => {
    driver.waitForTextByXpath('//*[@id="hotel-1"]/div/div/div[2]/div[2]/div[2]/div/span', '7 NIGHTS');
  },

  'step 12 - hotel card - room type': (driver) => {
    driver.waitForTextByXpath('//*[@id="hotel-1"]/div/div/div[3]', 'Room Type: Z8XX107');
  },

  'step 13 - hotel card - confirmation number': (driver) => {
    // driver.waitForTextByXpath('//*[@id="hotel-1"]/div/div/ul/li[1]/span', 'Confirmation#: 8KQDJH4');          TODO: have defect, # display twice
  },

  'step 14 - hotel card - phone number': (driver) => {
    driver.waitForTextByXpath('//*[@id="hotel-1"]/div/div/ul/li[2]/span/a', '1-303-375-1105');
  },

  'step 15 - hotel card - phone icon': (driver) => {
    driver.waitForAttributeContainsByXpath('//*[@id="hotel-1"]/div/div/ul/li[2]/span/i', 'class', 'cwt-icon-phone');
  },

  'step 16 - hotel card - click on the hotel item and navigate to the trip details': (driver) => {
    driver.waitAndClickByCss('#hotel-1');
  },

  'step 17 - hotel card - validate trip details URL': (driver) => {
    driver.waitForUrlToContain('travel.stage-mycwt.com/group/selenium-sub-selenium-top/my-trips/#/trip/226191/948505/hotel-1');
    driver.waitForTextByXpath('//*[@id="tripDetails"]/div[2]/div/ul/li[7]/div/div/div/div[3]/div/div[1]/div[1]/h6/span[2]', 'MON, AUG 18');
  },

  'step 18 - Logout' : (driver) => {
    driver.page.logout().logout();
  },

};