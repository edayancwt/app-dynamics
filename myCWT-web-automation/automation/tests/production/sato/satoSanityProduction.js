"use strict";

module.exports = {
  "@tags": ["sanity", "sato", "production"],

  before: function(driver) {
    driver.resizeWindow(1920, 1020);
    driver.windowMaximize();
    driver.globals.waitForConditionTimeout = 50000;
  },

  "step 1 - login to sato portal": driver => {
    const login = driver.page.login();

    // driver.waitAndClickByCss("#close-re-registration-modal");

    login.fillLoginDetails({
      username: "sato2@yopmail.com",
      password: "Pa$$word123"
    });
  },

  "step 2 - Check upcoming trips page": driver => {
    // welcome message
    driver.waitForElementVisible("#welcome-user-message");

    // Trip to denver
    driver.waitForTextByCss(
      ".upcomingTripContainer:nth-of-type(1) .trip-name",
      "Trip to London"
    );
    driver.waitForTextByCss(
      ".upcomingTripContainer:nth-of-type(1) .trip-dates",
      "Mon, Jun 22 - Tue, Jun 23, 2020"
    );
    driver.waitForTextByCss(
      ".upcomingTripContainer:nth-of-type(1) .trip-duration",
      "(2 days)"
    );
  },

  "step 3 - Logout": driver => {
    //click on logout link
    driver.waitAndClickByCss(".navigation-link.log-out");
    //validate login URL
    // driver.waitForUrlToContain('accounts.cwtsatotogo.com', 30000); //TODO: Logout is not working
  }
};
