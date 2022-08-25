'use strict';

module.exports = {

  '@tags': ['home', 'company', 'resources'],

  before: function (driver) {
    driver.windowMaximize();
  },

  'step 1 - login to portal': (driver) => {
    const login = driver.page.login();
    login.fillLoginDetails(driver.globals.users.portalUser1);
  },

  'step 2 - Company resources - title': (driver) => {
    driver.scrollToLocation(0,2500);
    driver.waitForTextByXpath(".//*[@id='portlet_companyresourcesportlet_WAR_cwtportalportlet']/div/div/div/div/div/h2", 'Company Resources');
  },

  'step 3 - Company resources - tabs': (driver) => {
    driver.waitForTextByXpath("//*[@id='portlet_companyresourcesportlet_WAR_cwtportalportlet']/div/div/div/div/div/ul[1]/li[1]/button", 'Automation - Resource 1');
    driver.waitForTextByXpath("//*[@id='portlet_companyresourcesportlet_WAR_cwtportalportlet']/div/div/div/div/div/ul[1]/li[2]/button", 'Automation - Resource 2');
  },

  'step 4 - Company resources - click on first tab': (driver) => {
    driver.waitAndClickByXpath("//*[@id='portlet_companyresourcesportlet_WAR_cwtportalportlet']/div/div/div/div/div/ul[1]/li[1]/button");
  },

  'step 5 - Company resources - first tab links': (driver) => {
    driver.waitForTextByXpath("//*[@id='list-resource']/li[1]/a", 'Automation - Travel Policy');
    driver.waitForTextByXpath("//*[@id='list-resource']/li[2]/a", 'Automation - Corporate Card Guidelines');
  },

  'step 6 - Company resources - click on second tab': (driver) => {
    driver.waitAndClickByXpath("//*[@id='portlet_companyresourcesportlet_WAR_cwtportalportlet']/div/div/div/div/div/ul[1]/li[2]/button");
  },

  'step 7 - Company resources - second tab links': (driver) => {
    driver.waitForTextByXpath("//*[@id='list-resource']/li[1]/a", 'Automation - Air Travel Program');
    driver.waitForTextByXpath("//*[@id='list-resource']/li[2]/a", 'Automation - Passport & Visa');
  },

  'step 8 - Company resources - click on first link': (driver) => {
    driver.waitAndClickByXpath("//*[@id='list-resource']/li[1]/a");
  },

  'step 9 - Company resources - switch tab and validate URL': (driver) => {
    // Switch to the second tab [1]
    driver.switchToTab(1);
    // Validate second tab URL
    driver.waitForUrlToContain('//edition.cnn.com/', 20000);
    // Close second tab
    driver.closeWindow();
    driver.pause(500);
    // Switch back to the first tab [0]
    driver.switchToTab(0);
    // Validate first tab URL
    driver.waitForUrlToContain('travel.stage-mycwt.com/group/selenium-sub-selenium-top#/', 20000);
  },

  'step 10 - Logout' : (driver) => {
    driver.page.logout().logout();
  },

};