'use strict';

module.exports = {

  '@tags': ['home', 'map'],

  before: function (driver) {
    driver.windowMaximize();
  },

  'step 1 - login to portal': (driver) => {
    const login = driver.page.login();
    login.fillLoginDetails(driver.globals.users.portalUser1);
  },

  'step 2 - Click on the map icon': (driver) => {
    driver.waitAndClickByCss('#itinerary-map-open');
    driver.pause(1000);
    driver.waitAndClickByXpath(".//*[@id='itinerary-map-close']");
    driver.pause(1000);
    driver.waitAndClickByCss('#itinerary-map-open')
  },

  'step 3 - Validate default map zoom state': (driver) => {
    driver.useXpath();
    driver.waitForAttributeContainsByXpath('//*[@id="senna_surface1"]/div[4]/div/div[2]/div/div/div[2]/div/div/div/div[1]/div/div/div[2]', 'style', '1, 0, 0, 1, 502, 207');
  },

  'step 4 - Click on zoom-in button once': (driver) => {
    driver.pause(1000);
    driver.mapZoomIn(1);
  },

  'step 5 - Validate map zoom state after zoom-in': (driver) => {
    driver.waitForAttributeContainsByXpath('//*[@id="senna_surface1"]/div[4]/div/div[2]/div/div/div[2]/div/div/div/div[1]/div/div/div[1]', 'style', '1, 0, 0, 1, 561, 165');
  },

  'step 6 - Click on zoom-out button 8 times': (driver) => {
    driver.mapZoomOut(11);
  },

  'step 7 - Click on zoom-in button 2 times': (driver) => {
    driver.mapZoomIn(1);
  },

  'step 8 - Validate items display on the map': (driver) => {
    // plan
    driver.waitForElementVisible('//*[@id="senna_surface1"]/div[4]/div/div[2]/div/div/div[2]/div/div/div/div[1]/div/div/div[10]/div/i');
    //hotel
    driver.waitForElementVisible('//*[@id="senna_surface1"]/div[4]/div/div[2]/div/div/div[2]/div/div/div/div[1]/div/div/div[3]/div/i/i');
    // car
    driver.waitForElementVisible('//*[@id="senna_surface1"]/div[4]/div/div[2]/div/div/div[2]/div/div/div/div[1]/div/div/div[1]/div/i/i');
    //meeting
    driver.waitForElementVisible('//*[@id="senna_surface1"]/div[4]/div/div[2]/div/div/div[2]/div/div/div/div[1]/div/div/div[5]/div/i/i');
    // rail
    driver.waitForElementVisible('//*[@id="senna_surface1"]/div[4]/div/div[2]/div/div/div[2]/div/div/div/div[1]/div/div/div[4]/div/i/i');
  },

  'step 9 - Click on map close button': (driver) => {
    driver.waitAndClickByXpath(".//*[@id='itinerary-map-close']");
  },

  'step 10 - Logout' : (driver) => {
    driver.page.logout().logout();
  },

};