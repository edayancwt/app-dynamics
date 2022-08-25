'use strict';

const OBTbuttonELement = '[data-testid=obt-button-container] > [data-testid=pill-button]';

module.exports = {

  '@tags': ['stage', 'sanity', 'portal', 'home', 'header'],

  before: function (driver) {
    driver.windowMaximize();
  },

  'step 1 - login to portal': (driver) => {
    const login = driver.page.login();
    login.fillLoginDetails(driver.globals.users.portalUser8);
  },

  'step 2 - Validate home header items': (driver) => {
    driver.waitForTextByCss('[data-testid=hero-name-of-traveler]', 'Portal Sanity');
    driver.waitForTextByCss('[data-testid=hero-welcome-message]', 'Portal Sanity, book your travelers\' next trips');
    driver.waitForTextByCss(OBTbuttonELement, 'BOOK A FULL TRIP');
    driver.waitForAttributeContainsByCss(OBTbuttonELement, 'href', 'https://accounts.mycwt.com/idp/startSSO.ping?PartnerSpId=KDS&ACSIdx=0');
  },

  // 'step 3 - Validate home booking panel': (driver) => {
  //   // Going to
  //   driver.waitForTextByXpath('//*[@id="hotel-search-panel-row"]/div/div[1]/div/label', 'GOING TO');
  //   driver.waitForTextByCss('.autocomplete-placeholder', 'Search for city, airport or landmark');
  //   driver.waitForAttributeContainsByXpath('//*[@id="cwt-icons-search"]', 'class', 'cwt-icons-search');
  //   // Check in
  //   driver.waitForTextByXpath('//*[@id="check-in-title"]/span', 'CHECK IN');
  //   driver.waitForTextByXpath('//*[@id="hotel-search-panel-row"]/aside[1]/div[1]/div[2]/div/div[1]/div[1]/div', 'Select Date');
  //   driver.waitForAttributeContainsByXpath('//*[@id="hotel-search-panel-row"]/aside[1]/div[1]/div[1]/i[1]', 'class', 'cwt-icons-checkIn');
  //   // Check out
  //   driver.waitForTextByXpath('//*[@id="hotel-search-panel-row"]/aside[1]/div[1]/div[1]/div[2]', 'CHECK OUT');
  //   driver.waitForTextByXpath('//*[@id="hotel-search-panel-row"]/aside[1]/div[1]/div[2]/div/div[1]/div[3]/div', 'Select Date');
  //   driver.waitForAttributeContainsByXpath('//*[@id="hotel-search-panel-row"]/aside[1]/div[1]/div[1]/i[2]', 'class', 'cwt-icons-checkOut');
  //
  //   // Search for location
  //   driver.waitAndSetValueByCss('.hotel-search-panel .Select-control input', 'rome');
  //   driver.pause(2000);
  //   // Select the first option in the results
  //   driver.waitAndClickByCss('.Select .Select-option:nth-child(1)');
  //   // Select dates
  //   driver.selectSpecificHotelDates(12, 15);
  //   // Click on find button
  //   driver.waitAndClickByCss('#nw-search-hotel');
  //   // Validate booking page URL
  //   driver.waitForUrlToContain('stage-www.mycwt.com/group/incredibles_subunit_4-incredible_tests1/book-a-hotel#', 20000);
  // },

  'step 4 - Validate travel alerts': (driver) => {
    // Home title
    driver.waitAndClickByCss('[data-testid=myCWT-logo]');
    driver.pause(2000);
    driver.waitForAttributeContainsByCss('[data-testid=safety-alerts-icon]', 'class', 'CwtIcons__StyledIcon-sc-1zecbe-0 CwtIcons-sc-1zecbe-1 hXkThC');
    driver.waitForTextByCss('[data-testid=alert-warning-text]', 'SAFETY ALERTS');
    driver.pause(2000);
    driver.waitAndClickByCss('[data-testid=alert-warning-text]');
    // Tooltip
    driver.waitForTextByCss('[data-testid=alert-tooltip-category-title]', 'United Kingdom - Measles');
    driver.waitForTextByCss('[data-testid=alert-tooltip-service]', 'AUTOMATION-This is the active to test');
    driver.waitForTextByCss('[data-testid=last-updated-text]', 'LAST UPDATED: MAR 26, 2018');
    driver.waitForTextByCss('[data-testid=alert-tooltip-alert-number', '1/3 Alerts');
    driver.waitForTextByCss('[data-testid=alert-tooltip-show-all]', 'Show All');
    driver.waitForAttributeContainsByCss('[data-testid=travel-alerts-category-icon]', 'aria-label', 'Medical Category Icon');
    driver.waitAndClickByCss('[data-testid=alert-tooltip-category-title]');
    // Dialog
    driver.waitForTextByCss('[data-testid=alert-pager-trip-name]', 'Trip to Tokyo');
    driver.waitForTextByCss('[data-testid=alert-pager-buttons-text]', '1/3 Alerts');
    // Click on forward button once
    driver.pause(2000);
    driver.waitAndClickByCss('[data-testid=travel-alert-modal-content] [data-testid=icon-Forward]');
    driver.waitForTextByCss('[data-testid=alert-pager-buttons-text]', '2/3 Alerts');
    // validate the second alert
    driver.waitForAttributeContainsByCss('[data-testid=alerts-modal-category-icon]', 'aria-label', 'Weather Category Icon');
    driver.waitForTextByCss('[data-testid=alert-main-category]', 'United States - Volcanic');
    driver.waitForTextByCss('[data-testid=alert-main-title]', 'AUTOMATION-Volcanic activity in new york');
    driver.waitForTextByCss('[data-testid=alert-main-description]', 'Latest update: local state of emergency declared; water restrictions imposed. Activity at the Kilauea volcano, Big Island, has increased significantly since the beginning of the month. A local state of emergency has been declared and mandatory evacuation order issued for residents in Leilani Estates and Lanipuna Gardens Subdivisions in the Puna District. \'Vog\' or visible haze caused by volcanic particles and gases released can cause health effects on eyes, throat, skin and respiratory system. Symptoms may be more pronounced in people with underlying health conditions, particularly respiratory problems such as asthma.');
    driver.waitForTextByCss('[data-testid=alert-main-last-updated]', 'LAST UPDATED: MAR 26, 2018');
    // Dialog footer
    driver.waitForTextByCss('[data-testid=alert-main-helpful-title]', 'Is this alert helpful?');
    driver.waitForTextByCss('[data-testid=alert-main-helpful-yes-button]', 'YES');
    driver.waitForTextByCss('[data-testid=alert-main-helpful-no-button]', 'NO');
    driver.waitForTextByCss('[data-testid=alert-main-powered-by-text]', 'Powered by:');
    driver.waitForAttributeContainsByCss('[data-testid=alert-main-isos-logo]', 'alt', 'isos logo');
    driver.waitForAttributeContainsByCss('[data-testid=alert-main-control-risks-logo]', 'alt', 'control risk logo');
    driver.waitAndClickByCss('[data-testid=modal-close-button]');
  },

  'step 5 - OBT link': (driver) => {
    // OBT button text
    driver.waitForTextByCss(OBTbuttonELement, 'BOOK A FULL TRIP');
    // OBT button arrow icon
    //driver.waitForAttributeContainsByCss('[data-testid=pill-button] [data-testid=icon-ArrowRight]', 'class', 'CwtIcons__StyledIcon-sc-1zecbe-0 CwtIcons-sc-1zecbe-1 BookingButton__RightArrow-sc-1rwrfi2-0 eYmtyh');
    // hover on OBT link
    driver.moveToElement(OBTbuttonELement, 20, 20);
    // hover text
    driver.waitForTextByCss('span[class^=BookingButton]', 'Powered by "KDS"');
    // click on OBT link
    driver.waitAndClickByCss('a[data-testid="pill-button"]');
    // Switch to the second tab [1]
    driver.switchToTab(1);
    // Validate second tab URL
    driver.waitForUrlToContain('accounts.mycwt.com/idp/startSSO.ping?PartnerSpId=KDS&ACSIdx=0', 20000);
    // Close second tab
    //driver.closeWindow();
    //driver.pause(1000);
    // Switch back to the first tab [0]
    //driver.switchToTab(0);
  },

  // 'step 6 - Logout' : (driver) => {
  //   driver.pause(1000);
  //   driver.waitAndClickByCss('[data-testid=account-dropdown-button]');
  //   driver.pause(1000);
  //   driver.waitAndClickByCss('[data-testid=header-logout]');
  // },

};
