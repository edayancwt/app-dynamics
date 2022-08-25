'use strict';

module.exports = {

  '@tags': ['home', 'flight'],

  before: function (driver) {
    driver.windowMaximize();
  },

  'step 1 - login to portal': (driver) => {
    const login = driver.page.login();
    login.fillLoginDetails(driver.globals.users.portalUser8);
  },

  'step 2 - flight card - date': (driver) => {
    driver.waitForTextByCss('[data-testid=air-1] [data-testid=card-header-segment-date]', 'WED, JUN 04');
  },

  'step 3 - flight card - icon': (driver) => {
    driver.waitForAttributeContainsByCss('[data-testid=air-1] [data-testid=header-card-icon]', 'class', 'CwtIcons__StyledIcon-sc-1zecbe-0 style__Icon-sc-1d72k64-4 ljHoUT CwtIcons-sc-1zecbe-1 tMHET');
  },

  'step 4 - flight card - airline and flight number': (driver) => {
    driver.waitForTextByCss('[data-testid=air-1] [data-testid=card-header-segment-title]', 'Aeroflot 262');
  },

  'step 5 - flight card - airline icon': (driver) => {
    driver.waitForAttributeContainsByCss('[data-testid=air-1] [data-testid=card-header-segment-vendor-icon]', 'class', 'style__VendorIcon-sc-1d72k64-10 hcECOW');
    driver.validateUrlResponse('https://api.worldmate.com/public/flights/img/airlines/SU.png')
  },

  'step 6 - flight card - departure airport': (driver) => {
    driver.waitForTextByCss('[data-testid=air-1] [data-testid=column-main-text]', 'LHR\n11:00 AM');
  },

  'step 8 - flight card - departure date': (driver) => {
    driver.waitForTextByXpath('//*[@id="shell"]/div/div[1]/div/div/section/div[2]/div/div/div/div[1]/div/div/div[1]/div[2]/div[1]/div[1]/span', 'WED, JUN 04');
  },

  'step 9 - flight card - departure airport address': (driver) => {
    driver.waitForTextByXpath('//*[@id="shell"]/div/div[1]/div/div/section/div[2]/div/div/div/div[1]/div/div/div[1]/div[2]/div[1]/div[2]/div/div/span', 'Heathrow Airport,\nLondon, GB');
  },

  'step 10 - flight card - arrival airport': (driver) => {
    driver.waitForTextByXpath('//*[@id="shell"]/div/div[1]/div/div/section/div[2]/div/div/div/div[1]/div/div/div[1]/div[2]/div[3]/p/span[1]', 'SVO');
  },

  'step 11 - flight card - arrival time': (driver) => {
    driver.waitForTextByXpath('//*[@id="shell"]/div/div[1]/div/div/section/div[2]/div/div/div/div[1]/div/div/div[1]/div[2]/div[3]/p/span[2]', '4:50 PM');
  },

  'step 12 - flight card - arrival date': (driver) => {
    driver.waitForTextByXpath('//*[@id="shell"]/div/div[1]/div/div/section/div[2]/div/div/div/div[1]/div/div/div[1]/div[2]/div[3]/div[1]/span', 'WED, JUN 04');
  },

  'step 13 - flight card - arrival airport address': (driver) => {
    driver.waitForTextByXpath('//*[@id="shell"]/div/div[1]/div/div/section/div[2]/div/div/div/div[1]/div/div/div[1]/div[2]/div[3]/div[2]/div/div[1]/span/span[1]', 'Sheremetyevo\nAirport, Mosco...');
  },

  'step 14 - flight card - flight duration': (driver) => {
    driver.waitForTextByXpath('//*[@id="shell"]/div/div[1]/div/div/section/div[2]/div/div/div/div[1]/div/div/div[1]/div[2]/div[2]/div/span', '3H 50M');
  },

//    -------------------------------- Layover --------------------------------


  'step 15 - flight layover - icon': (driver) => {
    driver.waitForAttributeContainsByXpath('//*[@id="shell"]/div/div[1]/div/div/section/div[2]/div/div/div/div[1]/div/div/div[2]/i', 'class', 'CwtIcons-sc-1zecbe-1');
  },

  'step 16 - flight layover - duration': (driver) => {
    driver.waitForTextByXpath('//*[@id="shell"]/div/div[1]/div/div/section/div[2]/div/div/div/div[1]/div/div/div[2]/p[1]', '2H 10M');
    driver.waitForTextByXpath('//*[@id="shell"]/div/div[1]/div/div/section/div[2]/div/div/div/div[1]/div/div/div[2]/p[2]', 'Layover');
  },

  'step 17 - flight layover - change of terminal title': (driver) => {
    driver.waitForTextByXpath('//*[@id="shell"]/div/div[1]/div/div/section/div[2]/div/div/div/div[1]/div/div/div[2]/div/p', 'Change of terminal is required');
  },

  // 'step 18 - click on flight card': (driver) => {
  //   driver.waitAndClickByCss('#air-1');    //TODO: navigation still not working
  // },
  //
  // 'step 19 - flight item on trip details': (driver) => {
  //   driver.waitForUrlToContain('travel.stage-mycwt.com/group/selenium-sub-selenium-top/my-trips/#/trip/226191/948505/air-1', 20000);
  //   driver.waitForTextByXpath('//*[@id="tripDetails"]/div[2]/div/ul/li[1]/div/div/div/div[3]/div/div[1]/div[1]/h6/span[2]', 'LHR');
  // },
  //
  // 'step 20 - Logout' : (driver) => {
  //   driver.page.logout().logout();   //TODO: logout still not working
  // },

};
