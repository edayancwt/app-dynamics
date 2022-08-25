'use strict';

module.exports = {

  '@tags': ['home', 'missing', 'hotel', 'accommodation', 'MA'],

  before: function (driver) {
    driver.windowMaximize();
  },

  'step 1 - login to portal': (driver) => {
    const login = driver.page.login();
    login.fillLoginDetails(driver.globals.users.portalUser8);
  },

  'step 2 - navigate right': (driver) => {
    driver.clickToSlide('#slider-nav-Forward', 1);
  },

  // 'step 3 - validate missing hotel image': (driver) => {   //TODO: have defect
  //   driver.waitForAttributeContainsByXpath('//*[@id="shell"]/div/div[1]/div/div/section/div[2]/div/div/div/div[3]/div/div/div[1]/div/div[1]/i[1]', 'class', 'CwtIcons__StyledIcon-sc-1zecbe-0');
  // },

  'step 4 - Validate missing hotel title': (driver) => {
    driver.waitForTextByCss('[data-testid=card-title]', "Portal Sanity, your itinerary is missing an hotel");
  },

  'step 5 - Validate missing hotel sub title': (driver) => {
    driver.waitForTextByCss('[data-testid=subtitle]', 'Check out our hotel recommendations, tailored personally for you.');
  },

  'step 6 - Validate missing hotel dates': (driver) => {
    driver.waitForTextByCss('[data-testid=search-button]', 'VIEW HOTELS');
  },

  'step 7 - Validate view hotels button': (driver) => {
    driver.waitForTextByCss('[data-testid=hotel-checkin-time]', '| 5 nights | Jun 05 - Jun 10');
  },

  'step 8 - Click on view button and navigate to hotel booking page': (driver) => {
    driver.waitAndClickByCss('[data-testid=search-button]');
  },

  // 'step 9 - Validate navigation to trip details missing hotel item': (driver) => {   //TODO: have defect, navigation to trip details.
  //   driver.waitForUrlToContain('travel.stage-mycwt.com/group/selenium-sub-selenium-top/book-a-hotel');
  // },

  'step 10 - Logout' : (driver) => {
    driver.waitAndClickByCss('[data-testid=account-dropdown-button]');
    driver.pause(1000);
    driver.waitAndClickByXpath('//*[@id="main-header"]/div[3]/div/div/ul/li[2]/span');
  },
};