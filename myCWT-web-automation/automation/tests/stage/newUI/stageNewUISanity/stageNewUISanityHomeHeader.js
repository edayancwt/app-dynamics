"use strict";

// const OBTbuttonELement = '[data-testid=obt-button-container] > [data-testid=button]';
const OBTbuttonELement = "[data-testid=button]";

module.exports = {
  "@tags": ["stage", "sanity", "portal", "home", "header"],

  before: function(driver) {
    driver.windowMaximize();
  },

  "step 1 - login to portal": driver => {
    const login = driver.page.login();
    login.fillLoginDetails(driver.globals.users.portalUser8);
  },
  "step 2 - Validate home header items": driver => {
    driver.waitForTextByCss(OBTbuttonELement, "CONTINUE");
    driver.waitForAttributeContainsByCss(
      OBTbuttonELement,
      "href",
      "https://accounts.mycwt.com/idp/startSSO.ping?PartnerSpId=KDS&ACSIdx=0"
    );
  },
  "step 3 - Validate travel alerts": driver => {
    // Home title
    driver.waitAndClickByCss("[data-testid=myCWT-logo]");
    driver.waitForAttributeContainsByCss(
      "[data-testid=safety-alerts-icon]",
      "class",
      "CwtIcons__StyledIcon-sc-1zecbe-0 CwtIcons-sc-1zecbe-1 hXkThC"
    );
    driver.waitForTextByCss(
      "[data-testid=alert-warning-text]",
      "SAFETY ALERTS"
    );
    driver.waitAndClickByCss("[data-testid=alert-warning-text]");
    // Tooltip
    driver.waitForTextByCss(
      "[data-testid=alert-tooltip-category-title]",
      "United Kingdom - Measles"
    );
    driver.waitForTextByCss(
      "[data-testid=alert-tooltip-service]",
      "AUTOMATION-This is the active to test"
    );
    driver.waitForTextByCss(
      "[data-testid=last-updated-text]",
      "LAST UPDATED: MAR 26, 2018"
    );
    driver.waitForTextByCss(
      "[data-testid=alert-tooltip-alert-number",
      "1/3 Alerts"
    );
    driver.waitForTextByCss("[data-testid=alert-tooltip-show-all]", "Show All");
    driver.waitForAttributeContainsByCss(
      "[data-testid=travel-alerts-category-icon]",
      "aria-label",
      "Medical Category Icon"
    );
    driver.waitAndClickByCss("[data-testid=alert-tooltip-category-title]");
    // Dialog
    driver.waitForTextByCss(
      "[data-testid=alert-pager-trip-name]",
      "Trip to Tokyo"
    );
    driver.waitForTextByCss(
      "[data-testid=alert-pager-buttons-text]",
      "1/3 Alerts"
    );
    // Click on forward button once
    driver.waitAndClickByCss(
      "[data-testid=travel-alert-modal-content] [data-testid=icon-Forward]"
    );
    driver.waitForTextByCss(
      "[data-testid=alert-pager-buttons-text]",
      "2/3 Alerts"
    );
    // validate the second alert
    driver.waitForAttributeContainsByCss(
      "[data-testid=alerts-modal-category-icon]",
      "aria-label",
      "Weather Category Icon"
    );
    driver.waitForTextByCss(
      "[data-testid=alert-main-category]",
      "United States - Volcanic"
    );
    driver.waitForTextByCss(
      "[data-testid=alert-main-title]",
      "AUTOMATION-Volcanic activity in new york"
    );
    driver.waitForTextByCss(
      "[data-testid=alert-main-description]",
      "Latest update: local state of emergency declared; water restrictions imposed. Activity at the Kilauea volcano, Big Island, has increased significantly since the beginning of the month. A local state of emergency has been declared and mandatory evacuation order issued for residents in Leilani Estates and Lanipuna Gardens Subdivisions in the Puna District. 'Vog' or visible haze caused by volcanic particles and gases released can cause health effects on eyes, throat, skin and respiratory system. Symptoms may be more pronounced in people with underlying health conditions, particularly respiratory problems such as asthma."
    );
    driver.waitForTextByCss(
      "[data-testid=alert-main-last-updated]",
      "LAST UPDATED: MAR 26, 2018"
    );
    // Dialog footer
    driver.waitForTextByCss(
      "[data-testid=alert-main-helpful-title]",
      "Is this alert helpful?"
    );
    driver.waitForTextByCss(
      "[data-testid=alert-main-helpful-yes-button]",
      "YES"
    );
    driver.waitForTextByCss("[data-testid=alert-main-helpful-no-button]", "NO");
    driver.waitForTextByCss(
      "[data-testid=alert-main-powered-by-text]",
      "Powered by:"
    );
    driver.waitForAttributeContainsByCss(
      "[data-testid=alert-main-isos-logo]",
      "alt",
      "isos logo"
    );
    driver.waitForAttributeContainsByCss(
      "[data-testid=alert-main-control-risks-logo]",
      "alt",
      "control risk logo"
    );
    driver.waitAndClickByCss("[data-testid=modal-close-button]");
  },
  "step 4 - OBT link": driver => {
    // OBT button text
    driver.waitForTextByCss(OBTbuttonELement, "CONTINUE");
    // hover on OBT link
    driver.moveToElement(OBTbuttonELement, 20, 20);
    // click on OBT link
    driver.waitAndClickByCss(OBTbuttonELement);
    // Switch to the second tab [1]
    driver.switchToTab(1);
    // Validate second tab URL
    driver.waitForUrlToContain(
      "accounts.mycwt.com/idp/startSSO.ping?PartnerSpId=KDS&ACSIdx=0",
      20000
    );
  }
};
