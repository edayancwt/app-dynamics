'use strict';

module.exports = {

  '@tags': ['travel', 'tools'],

  before: function (driver) {
    driver.windowMaximize();
  },

  'step 1 - login': (driver) => {
    const login = driver.page.login();
    login.fillLoginDetails(driver.globals.users.portalUser8);
  },

  'step 2 - Validate travel tools' : (driver) => {
    // Navigate to Travel tools tab
    driver.waitAndClickByCss('#layout_5');
    // Validate page URL
    driver.waitForUrlToContain('travel.stage-mycwt.com/group/incredibles_subunit_4-incredible_tests1/travel-tools#/', 20000);
    // Train schedule title
    driver.waitForTextByCss('.portlet-header', 'Train Schedule');
    // Second title
    driver.waitForTextByXpath('//*[@id="portlet_raillinksportlet_WAR_cwtportalportlet"]/div/div/div/div/div/div/p', 'Use this tool to find schedules of train carriers around the world.');
    // Search field title
    driver.waitForTextByCss('.searchable-select__label', 'SEARCH FOR TRAINS IN:');
    // Search field pre-text
    driver.waitForAttributeContainsByCss('#rail-links-country', 'placeholder', 'Select country');
    // Add non-existing location
    driver.waitAndSetValueByCss('#rail-links-country', 'Berlin');
    // Validate no match message
    driver.waitForTextByXpath('//*[@id="portlet_raillinksportlet_WAR_cwtportalportlet"]/div/div/div/div/div/div/div/div/div[1]', 'No matches for "Berlin"');
    // refresh to clear search field
    driver.refresh();
    // Add existing location
    driver.waitAndSetValueByCss('#rail-links-country', 'Sweden');
    // Click on the found location
    driver.waitAndClickByXpath('//*[@id="portlet_raillinksportlet_WAR_cwtportalportlet"]/div/div/div/div/div/div/div/div/div[1]');
    // Click on the third rail company link
    driver.waitAndClickByXpath('//*[@id="portlet_raillinksportlet_WAR_cwtportalportlet"]/div/div/div/div/div/div/ul/li[3]/a');
    // Switch to the second tab
    driver.switchToTab(1);
    driver.waitForUrlToContain('www.tagkompaniet.se', 20000);
    // Close second tab
    driver.closeWindow();
    driver.pause(1000);
    // Switch back to the first tab [0]
    driver.switchToTab(0);
  },

  'step 3 - Logout' : (driver) => {
    driver.page.logout().logout();
  },

};