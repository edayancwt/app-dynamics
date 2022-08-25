'use strict';

module.exports = {

  '@tags': ['home', 'company', 'resources'],

  before: function (driver) {
    driver.windowMaximize();
  },

  'step 1 - login to portal': (driver) => {
    const login = driver.page.login();
    login.fillLoginDetails(driver.globals.users.portalUser8);
  },

  // 'step 2 - Company resources - title': (driver) => {
  //   driver.scrollToLocation(0,2500);
  //   driver.waitForTextByXpath(".//*[@id='portlet_companyresourcesportlet_WAR_cwtportalportlet']/div/div/div/div/div/h2", 'Company Resources');   //TODO: missing title.
  // },

  'step 3 - Company resources - tabs': (driver) => {
    driver.waitForTextByXpath("//*[@id=\"shell\"]/div/div[1]/div/div/div[2]/div[2]/ul[1]/li[1]/button", 'Travel Tools');
    driver.waitForTextByXpath("//*[@id=\"shell\"]/div/div[1]/div/div/div[2]/div[2]/ul[1]/li[2]/button", 'New tab for test');
  },

  'step 4 - Company resources - click on first tab': (driver) => {
    driver.waitAndClickByXpath("//*[@id=\"shell\"]/div/div[1]/div/div/div[2]/div[2]/ul[1]/li[1]/button");
  },

  'step 5 - Company resources - first tab link': (driver) => {
    driver.waitForTextByXpath("//*[@id=\"shell\"]/div/div[1]/div/div/div[2]/div[2]/ul[2]/li/a", 'Evya URL test 1');
  },

  'step 6 - Company resources - click on second tab': (driver) => {
    driver.waitAndClickByXpath("//*[@id=\"shell\"]/div/div[1]/div/div/div[2]/div[2]/ul[1]/li[2]/button");
  },

  'step 7 - Company resources - second tab links': (driver) => {
    driver.waitForTextByXpath("//*[@id=\"shell\"]/div/div[1]/div/div/div[2]/div[2]/ul[2]/li[1]/a", 'performance test 3');
    driver.waitForTextByXpath("//*[@id=\"shell\"]/div/div[1]/div/div/div[2]/div[2]/ul[2]/li[2]/a", 'performance test 1');
  },

  'step 8 - Company resources - click on the second tab first link': (driver) => {
    driver.waitAndClickByXpath("//*[@id=\"shell\"]/div/div[1]/div/div/div[2]/div[2]/ul[2]/li[1]/a");
  },

  'step 9 - Company resources - switch tab and validate URL': (driver) => {
    // Switch to the second tab [1]
    driver.switchToTab(1);
    // Validate second tab URL
    driver.waitForUrlToContain('www.google.com/', 20000);
    // Close second tab
    driver.closeWindow();
    driver.pause(500);
    // Switch back to the first tab [0]
    driver.switchToTab(0);
    // Validate first tab URL
    driver.waitForUrlToContain('new-stg.mycwt.com', 20000);
  },

  // 'step 10 - Logout' : (driver) => {
  //   driver.page.logout().logout();   //TODO: logout still not working
  // },

};