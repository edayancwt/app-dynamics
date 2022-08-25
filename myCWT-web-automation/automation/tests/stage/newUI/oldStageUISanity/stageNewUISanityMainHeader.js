'use strict';

module.exports = {

  '@tags': ['stage', 'sanity', 'portal', 'main header'],

  before: function (driver) {
    driver.windowMaximize();
  },

  'step 1 - login to portal': (driver) => {
    const login = driver.page.login();
    login.fillLoginDetails(driver.globals.users.portalUser8);
  },

  'step 2 - Validate home navigation links' : (driver) => {
    // My trips
    driver.pause(6000);
    driver.waitForTextByCss('[data-testid=header-navigation-myTrips]', 'MY TRIPS');
    driver.pause(6000);
    driver.waitAndClickByCss('[data-testid=header-navigation-myTrips]');
    driver.waitForUrlToContain('travel.stage-mycwt.com/my-trips', 20000);
    // Home
    driver.waitAndClickByCss('[data-testid=myCWT-logo]');
    driver.waitForUrlToContain('travel.stage-mycwt.com', 30000);

    // My travelers
    driver.waitForTextByCss('[data-testid=header-navigation-myTravelers]', 'MY TRAVELERS');
    driver.waitAndClickByCss('[data-testid=header-navigation-myTravelers]');
    driver.pause(2000);
    driver.waitForUrlToContain('travel.stage-mycwt.com/my-travelers', 20000);
    // Home
    driver.waitAndClickByCss('[data-testid=myCWT-logo]');
    driver.waitForUrlToContain('travel.stage-mycwt.com', 30000);

    // Book a hotel
    driver.waitForTextByCss('[data-testid=header-navigation-bookHotel]', 'BOOK A HOTEL');
    driver.waitAndClickByCss('[data-testid=header-navigation-bookHotel]');
    driver.pause(3000);
    driver.waitForUrlToContain('travel.stage-mycwt.com/book-a-hotel#/', 20000);
    // Home
    driver.waitAndClickByCss('[data-testid=myCWT-logo]');
    driver.waitForUrlToContain('travel.stage-mycwt.com', 30000);

    // // Book a flight
    // driver.pause(3000);
    // driver.waitForTextByCss('[data-testid=header-navigation-bookFlight]', 'BOOK A FLIGHT');
    // driver.waitAndClickByCss('[data-testid=header-navigation-bookFlight]');
    // driver.pause(2000);
    // driver.waitForUrlToContain('travel.stage-mycwt.com/book-a-flight#/', 20000);
    // // Home
    // driver.waitAndClickByCss('[data-testid=myCWT-logo]');
    // driver.waitForUrlToContain('travel.stage-mycwt.com', 30000);

    // Admin
    driver.waitForTextByCss('[data-testid=header-navigation-admin]', 'ADMIN');
    driver.waitAndClickByCss('[data-testid=header-navigation-admin]');
    driver.pause(6000);
    driver.switchToTab(1);
    // driver.waitForUrlToContain('admin-travel.stage-mycwt.com/group/incredibles_subunit_4-incredible_tests1', 20000);
    driver.closeWindow();
    driver.switchToTab(0);
    // Home
    driver.waitAndClickByCss('[data-testid=myCWT-logo]');
    driver.waitForUrlToContain('travel.stage-mycwt.com', 30000);

    // Account settings
    // click on "my account".
    driver.pause(4000);
    driver.waitForTextByCss('[data-testid=account-dropdown-button]', 'MY ACCOUNT');
    driver.waitAndClickByCss('[data-testid=account-dropdown-button]');
    driver.pause(500);
    // click on "account settings".
    driver.waitAndClickByCss('[data-testid=header-accountSettings]');
    driver.waitForUrlToContain('travel.stage-mycwt.com/account-settings', 20000);

    // validate account settings page open (checking the title)
    driver.waitForTextByCss('[data-testid=account-settings-title]','Account settings');
    // Home
    driver.waitAndClickByCss('[data-testid=myCWT-logo]');
    driver.waitForUrlToContain('travel.stage-mycwt.com', 30000);
    // My travel profile
    driver.waitForTextByCss('[class^=Header__IdentitySection] [data-testid=pill-button]', 'MY TRAVEL PROFILE');
    driver.waitAndClickByCss('[class^=Header__IdentitySection] [data-testid=pill-button]');

    driver.pause(4000);
    // Switch to the second tab [1]
    driver.switchToTab(1);
    // Validate second tab URL
    // driver.url(driver.globals.urls.portrait_url);
    driver.waitForUrlToContain('profile.stage-mycwt.com/profile/profile-mgmt/edit/portalblue', 20000);
    // Close second tab
    driver.closeWindow();
    driver.pause(1000);
    // Switch to the first tab [0]
    driver.switchToTab(0);
    // Validate first tab URL
    driver.waitForUrlToContain('travel.stage-mycwt.com', 20000);
  },

};
