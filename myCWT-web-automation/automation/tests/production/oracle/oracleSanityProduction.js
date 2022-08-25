'use strict';

const OBTbuttonELement = '[data-testid=obt-button-container] > [data-testid=pill-button]';

module.exports = {

  '@tags': ['sanity', 'oracle', 'production'],

  before: function (driver) {
    driver.windowMaximize();
  },

  'step 1 - login to sato portal' : (driver) => {
    const login = driver.page.login();
    login.fillLoginDetails(driver.globals.users.portalUser76);
  },

  'step 2 - Check header' : (driver) => {
    // Greeting message
    driver.waitForElementVisible('[data-testid=hero-name-of-traveler]');
    driver.waitForTextByCss('[data-testid=hero-name-of-traveler]', 'Lemon');
    driver.waitForTextByCss('[data-testid=hero-welcome-message]', 'Hello Lemon, how can we help with your travel plans?');
  },

  'step 3 - OBT link': (driver) => {
    // OBT button text
    driver.pause(5000);
    driver.waitForTextByCss(OBTbuttonELement, 'BOOK / MODIFY / CANCEL TRIPS');
    // OBT button text and URL
    driver.waitForAttributeContainsByCss(OBTbuttonELement, 'href', 'https://accounts.mycwt.com/idp/startSSO.ping?PartnerSpId=GetThere');
    // OBT button arrow icon
    driver.waitForAttributeContainsByCss('[data-testid=pill-button] [data-testid=icon-ArrowRight]', 'class', 'CwtIcons__StyledIcon-sc-1zecbe-0 CwtIcons-sc-1zecbe-1 BookingButton__RightArrow-sc-1rwrfi2-0 eYmtyh');
    // hover on OBT link
    driver.moveToElement(OBTbuttonELement, 20, 20);
    // hover text
    driver.waitForTextByCss('span[class^=BookingButton]', 'Powered by "GetThere"');
    // click on OBT link
    driver.waitAndClickByCss(OBTbuttonELement);
    // Switch to the second tab [1]
    driver.switchToTab(1);
    // Validate second tab URL
    driver.waitForUrlToContain('wx1.getthere.net/login/saml/post.act', 20000);
    // Close second tab
    driver.closeWindow();
    driver.pause(1000);
    // Switch back to the first tab [0]
    driver.switchToTab(0);
  },

  'step 4 - Logout' : (driver) => {
    //click on logout link
    driver.waitAndClickByCss('[data-testid=header-logout]');
  },
};