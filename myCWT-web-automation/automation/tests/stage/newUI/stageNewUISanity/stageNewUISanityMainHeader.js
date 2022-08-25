"use strict";

module.exports = {
  "@tags": ["stage", "sanity", "portal", "main header"],

  before: function(driver) {
    driver.globals.waitForConditionTimeout = 50000;
    driver.windowMaximize();
  },

  "step 1 - login to portal": driver => {
    const login = driver.page.login();
    login.fillLoginDetails(driver.globals.users.portalUser8);
  },

  "step 2 - Validate home navigation links": driver => {
    // My trips
    driver.waitForTextByCss(
      "[data-testid=header-navigation-myTrips]",
      "MY TRIPS"
    );
    driver.waitAndClickByCss("[data-testid=header-navigation-myTrips]");
    driver.waitForUrlToContain(driver.launch_url + "my-trips#", 40000);
    // Home
    driver.waitAndClickByCss("[data-testid=myCWT-logo]");
    driver.waitForUrlToContain(driver.launch_url, 60000);

    // My travelers
    driver.waitForTextByCss(
      "[data-testid=header-navigation-myTravelers]",
      "MY TRAVELERS"
    );
    driver.waitAndClickByCss("[data-testid=header-navigation-myTravelers]");
    driver.waitForUrlToContain(driver.launch_url + "my-travelers", 20000);
    // Home
    driver.waitAndClickByCss("[data-testid=myCWT-logo]");
    driver.waitForUrlToContain(driver.launch_url, 30000);

    // Book a hotel
    driver.waitForTextByCss(
      "[data-testid=header-navigation-bookHotel]",
      "BOOK A HOTEL"
    );
    driver.waitAndClickByCss("[data-testid=header-navigation-bookHotel]");
    driver.waitForUrlToContain(driver.launch_url + "book-a-hotel#/", 20000);
    // Home
    driver.waitAndClickByCss("[data-testid=myCWT-logo]");
    driver.waitForUrlToContain(driver.launch_url, 30000);

    // // Book a flight
    // driver.waitForTextByCss('[data-testid=header-navigation-bookFlight]', 'BOOK A FLIGHT');
    // driver.waitAndClickByCss('[data-testid=header-navigation-bookFlight]');
    // driver.pause(2000);
    // driver.waitForUrlToContain('mycwt-integration.mobimate.com/book-a-flight', 20000);
    // Home
    // driver.waitAndClickByCss('[data-testid=myCWT-logo]');
    // driver.waitForUrlToContain('mycwt-integration.mobimate.com', 30000);

    //Admin
    driver.waitForTextByCss("[data-testid=header-navigation-admin]", "ADMIN");
    driver.waitAndClickByCss("[data-testid=header-navigation-admin]");
    driver.switchToTab(1);
    // driver.waitForUrlToContain('admin-integration.mobimate.com/group/sub-automation#/', 20000);
    driver.closeWindow();
    driver.pause(1000);
    driver.switchToTab(0);
    // Home
    driver.waitAndClickByCss("[data-testid=myCWT-logo]");
    driver.waitForUrlToContain(driver.launch_url, 30000);

    // Account settings
    // click on "my profile".
    driver.waitForTextByCss(
      "[data-testid=account-dropdown-button]",
      "MY PROFILE"
    );
    driver.waitAndClickByCss("[data-testid=account-dropdown-button]");
    driver.pause(500);
    // click on "account settings".
    driver.waitAndClickByCss("[data-testid=header-accountSettings]");
    driver.waitForUrlToContain(driver.launch_url + "account-settings", 20000);

    // validate account settings page open (checking the title)
    driver.waitForTextByCss(
      "[data-testid=account-settings-title]",
      "Account Settings"
    );
    // Home;
    driver.waitAndClickByCss("[data-testid=myCWT-logo]");
    driver.waitForUrlToContain(driver.launch_url, 30000);

    driver.waitForTextByCss(
      "[data-testid=account-dropdown-button]",
      "MY PROFILE"
    );

    // My travel profile

    // click on "my profile".
    driver.waitAndClickByCss("[data-testid=account-dropdown-button]");

    // click on "edit travel profile".
    driver.waitAndClickByCss("[aria-label='Edit Travel Profile']");

    driver.pause(2000);

    driver.windowHandles(function(result) {
      const newWindow = result.value[1];
      const prevWindow = result.value[0];

      driver.switchWindow(newWindow);
      driver.waitForUrlToContain(
        "profile.stage-mycwt.com/profile/profile-mgmt/edit/portalblue",
        30000
      );
      driver.closeWindow();
      driver.switchWindow(prevWindow);
    });

    // // Switch to the second tab [1]
    // driver.switchToTab(1);
    // // Validate second tab URL
    // driver.waitForUrlToContain(
    //   "profile.stage-mycwt.com/profile/profile-mgmt/edit/portalblue",
    //   30000
    // );
    // // Close second tab
    // driver.closeWindow();
    // driver.pause(1000);
    // // Switch to the first tab [0]
    // driver.switchToTab(0);
  }
};
