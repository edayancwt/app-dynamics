'use strict';

module.exports = {

  '@tags': ['home', 'meeting'],

  before: function (driver) {
    driver.windowMaximize();
  },

  'step 1 - login to portal': (driver) => {
    const login = driver.page.login();
    login.fillLoginDetails(driver.globals.users.portalUser1);
  },

  'step 2 - navigate right 5 times': (driver) => {
    driver.clickToSlide('#itinerary-next', 7);
  },

  'step 3 - Validate meeting icon': (driver) => {
    driver.waitForAttributeContainsByXpath('//*[@id="meeting-1"]/div/div/div[1]/span', "class", 'cwt-icon-meeting');
  },

  'step 4 - Validate meeting name': (driver) => {
    driver.waitForTextByXpath('//*[@id="meeting-1"]/div/div/div[1]/h4', "Automation meeting");
  },

  'step 5 - Validate meeting address': (driver) => {
    driver.waitForTextByXpath('//*[@id="meeting-1"]/div/div/div[1]/div/span', "San Diego Ave");
  },

  'step 6 - Validate meeting starts title': (driver) => {
    driver.waitForTextByXpath('//*[@id="meeting-1"]/div/div/div[2]/div[1]/p/span[1]', "STARTS");
  },

  'step 7 - Validate meeting start time': (driver) => {
    driver.waitForTextByXpath('//*[@id="meeting-1"]/div/div/div[2]/div[1]/p/span[2]', "3:00 PM");
  },

  'step 8 - Validate meeting start date': (driver) => {
    driver.waitForTextByXpath('//*[@id="meeting-1"]/div/div/div[2]/div[1]/span', "WED, SEP 03");
  },

  'step 9 - Validate meeting ends title': (driver) => {
    driver.waitForTextByXpath('//*[@id="meeting-1"]/div/div/div[2]/div[3]/p/span[1]', "ENDS");
  },

  'step 10 - Validate meeting end time': (driver) => {
    driver.waitForTextByXpath('//*[@id="meeting-1"]/div/div/div[2]/div[3]/p/span[2]', "4:00 PM");
  },

  'step 11 - Validate meeting end date': (driver) => {
    driver.waitForTextByXpath('//*[@id="meeting-1"]/div/div/div[2]/div[3]/span', "WED, SEP 03");
  },

  'step 12 - Validate meeting duration': (driver) => {
    driver.waitForTextByXpath('//*[@id="meeting-1"]/div/div/div[2]/div[2]/div[2]/div/span', "1H 0M");
  },

  'step 13 - Validate meeting participants': (driver) => {
    driver.waitForTextByXpath('//*[@id="meeting-1"]/div/div/div[3]/div/p[2]', "Shai, B-schedule Trips, Worldd Matee, Worldd Matee");
  },

  'step 14 - Click on the meeting item and navigate to trip details': (driver) => {
    driver.waitAndClickByCss('#meeting-1');
  },

  'step 15 - Validate navigation to trip details meeting item': (driver) => {
    driver.waitForUrlToContain('travel.stage-mycwt.com/group/selenium-sub-selenium-top/my-trips/#/trip/226191/948505/meeting-1', 20000);
  },

  'step 16 - Logout' : (driver) => {
    driver.page.logout().logout();
  },

};