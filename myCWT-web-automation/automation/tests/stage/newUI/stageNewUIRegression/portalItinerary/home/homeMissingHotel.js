'use strict';

module.exports = {

  '@tags': ['home', 'missing', 'hotel', 'accommodation', 'MA'],

  before: function (driver) {
    driver.windowMaximize();
  },

  'step 1 - login to portal': (driver) => {
    const login = driver.page.login();
    login.fillLoginDetails(driver.globals.users.portalUser1);
  },

  'step 2 - navigate right': (driver) => {
    driver.clickToSlide('#itinerary-next', 1);
  },

  'step 3 - validate missing hotel image': (driver) => {
    driver.waitForAttributeContainsByXpath('//*[@id="missingAccommodation-1"]/div/div/img', 'src', 'https://travel.stage-mycwt.com/o/cwt-portal-theme/images/_/node_modules/cwt-itinerary-portlet-spa/dist/assets/images/trips/hotel_missing.56bec55ed4c23e46ddcb17287cd0cdc1.svg');
    driver.validateUrlResponse('https://travel.stage-mycwt.com/o/cwt-portal-theme/images/_/node_modules/cwt-itinerary-portlet-spa/dist/assets/images/trips/hotel_missing.56bec55ed4c23e46ddcb17287cd0cdc1.svg');
  },

  'step 4 - Validate missing hotel title': (driver) => {
    driver.waitForTextByXpath('//*[@id="missingAccommodation-1"]/div/div/div/h2/span', "Aportal One, your itinerary is missing an hotel");
  },

  'step 5 - Validate missing hotel secondary title': (driver) => {
    driver.waitForTextByXpath('//*[@id="missingAccommodation-1"]/div/div/div/h3/span', "Check out our hotel recommendations, tailored personally for you");
  },

  'step 6 - Validate missing hotel view button': (driver) => {
    driver.waitForTextByXpath('//*[@id="missingAccommodation-1"]/div/div/div/button/p/span', "VIEW HOTELS");
  },

  'step 7 - Validate missing hotel dates': (driver) => {
    driver.waitForTextByXpath('//*[@id="missingAccommodation-1"]/div/div/div/div/div', '28 nights | Jun 05 - Jul 03');
  },

  'step 8 - Click on view button and navigate to hotel booking page': (driver) => {
    driver.waitAndClickByXpath('//*[@id="missingAccommodation-1"]/div/div/div/button/p/span');
  },

  'step 9 - Validate navigation to trip details missing hotel item': (driver) => {
    driver.waitForUrlToContain('travel.stage-mycwt.com/group/selenium-sub-selenium-top/book-a-hotel');
  },

  'step 10 - Logout' : (driver) => {
    driver.page.logout().logout();
  },

};