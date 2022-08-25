"use strict";

module.exports = {
  "@tags": [
    "stage",
    "sanity",
    "portal",
    "home",
    "company news",
    "company resources"
  ],

  before: function(driver) {
    driver.globals.waitForConditionTimeout = 50000;
    driver.windowMaximize();
  },

  "step 1 - login to portal": driver => {
    const login = driver.page.login();
    login.fillLoginDetails(driver.globals.users.portalUser8);
  },

  "step 2 - validate openX banner": driver => {
    // driver.validateUrlResponse('https://ox-d.carlsonwagonlit.com/w/1.0/ai?auid=539477932&c.cid=a%3A96fc4&cs=539477932-a_96fc4-jkjtxky8b51a63a4-d171-3ed2-9683-5174a6e6e1c6&c.ulang=en&cb=1533653897552&c.ccountry=US&c.ocountry=GB&c.dcountry=US&c.carrier=SU&c.class=Y&c.ddate=2025-06-04&c.rdate=2025-06-10');
  },

  "step 3 - validate home company news items": driver => {
    // driver.execute(function() {
    //   window.scrollBy(0, 715);
    // }, []);
    // driver.refresh();
    driver.waitForTextByCss("[data-testid=company-news-title]", "Company News");
    driver.waitForTextByCss(
      "[data-testid=company-news-item-title]",
      "Welcome to your improved traveler website!"
    );
    driver.waitForTextByCss(
      "[data-testid=company-news-item-date]",
      "May 15, 2019"
    );
    driver.waitForTextByCss(
      //   '//*[@id="shell"]/div[2]/div/div/section[2]/div[1]/div/div/button',
      "button[data-testid=button-anchor]",
      "Show more"
    );
    driver.waitAndClickByCss("button[data-testid=button-anchor]");
    driver.waitForTextByCss(
      "[data-testid=collapse-wrapper]",
      "Today marks a big step forward in providing you with a modern, useful online experience.\n" +
        "As part of the launch of Global Employee Travel (GET), we are working to align our Buzz Page with myCWT. The GET Buzz Page will be your one stop shop for all things related to Global Employee Travel. Our myCWT site will complement this and provide travelers country specific information. We will categorize the myCWT Company Resources section into two sections.  Doing so will improve the employee experience by allowing users to more easily find information and speed up their booking process:"
    );
    // driver.waitForTextByCss('[data-testid=show-more-button]', 'Show less');
    // driver.waitAndClickByCss('[data-testid=show-more-button]');
  },

  "step 4 - Validate home company resources items": driver => {
    // company resources title
    driver.waitForTextByCss(
      "[data-testid=company-resources-title]",
      "Company Resources"
    );
    // check tabs titles
    driver.waitForTextByCss("[data-testid=company-resources]", "TRAVEL TOOLS");
    driver.waitForTextByCss(
      "[data-testid=company-resources]",
      "NEW TAB FOR TEST"
    );

    // check first tab links
    driver.waitForAttributeContainsByCss(
      "[data-testid=collapse-panel]:nth-of-type(1) li:nth-of-type(1) a",
      "href",
      "http://cnn.com"
    );

    // click on the second tab - open tab
    driver.waitAndClickByXpath(
      '//*[@id="shell"]/div[2]/div/div/section[2]/div/div/div[2]/div[2]/div[2]/a'
    );

    // check second tab links
    driver.pause(1000);
    driver.waitForAttributeContainsByCss(
      "[data-testid=collapse-panel]:nth-of-type(2) li:nth-of-type(1) a",
      "href",
      "http://www.google.com"
    );
    driver.waitForAttributeContainsByCss(
      "[data-testid=collapse-panel]:nth-of-type(2) li:nth-of-type(2) a",
      "href",
      "/cms/documents/20133/e9924310-49e2-47cd-cc16-4d7247d4bb58"
    );
    driver.waitForAttributeContainsByCss(
      "[data-testid=collapse-panel]:nth-of-type(2) li:nth-of-type(3) a",
      "href",
      "/cms/documents/35866/87b0c3b5-68c8-7ec9-38b8-f5e5e763ddc8"
    );
    driver.waitForAttributeContainsByCss(
      "[data-testid=collapse-panel]:nth-of-type(2) li:nth-of-type(4) a",
      "href",
      "/cms/documents/35866/f44475c8-5e13-3b0a-e977-9de6d69a2669"
    );
    driver.waitForAttributeContainsByCss(
      "[data-testid=collapse-panel]:nth-of-type(2) li:nth-of-type(5) a",
      "href",
      "/cms/documents/37899/1651960f-395a-a263-ac0f-57892cd52852"
    );
    // click on the first link
    driver.waitAndClickByCss(
      "[data-testid=collapse-panel]:nth-of-type(2) li:nth-of-type(1) a"
    );

    // Switch to the second tab [1]
    driver.switchToTab(1);
    // Validate second tab URL
    driver.waitForUrlToContain("www.google.com", 20000);
    // Close second tab
    driver.closeWindow();
    driver.pause(1000);
    // Switch back to the first tab [0]
    driver.switchToTab(0);
  },
  "step 5 - Logout": driver => {
    driver.waitAndClickByCss("[data-testid=account-dropdown-button]");
    driver.pause(1000);
    driver.waitAndClickByCss("[data-testid=header-logout]");
  }
};
