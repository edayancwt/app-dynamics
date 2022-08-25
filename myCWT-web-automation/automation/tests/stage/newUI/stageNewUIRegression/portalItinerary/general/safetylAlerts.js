'use strict';

module.exports = {

  '@tags': ['travel', 'alerts'],

  before: function (driver) {
    driver.windowMaximize();
  },

  'step 1 - login': (driver) => {
    const login = driver.page.login();
    login.fillLoginDetails(driver.globals.users.portalUser19);
  },

//    ---------------------------------- Alerts tooltip ----------------------------------

  'step 2 - Validate alerts title and icon' : (driver) => {
    driver.waitForAttributeContainsByCss('#alert-icon-warning','class', 'cwt-icons-warning');
    driver.waitForCssContains('#alert-icon-warning', 'color', '255, 0, 0');     //icon color red
    driver.waitForTextByCss('#alert-warning-text', 'SAFETY ALERTS');
    driver.waitForCssContains('#alert-warning-text', 'color', '255, 0, 0');      //text color red
    driver.waitAndClickByCss('#alert-warning-text');
  },

  'step 3 - Validate alerts tooltip data' : (driver) => {
    //TODO: replace with ID
    driver.waitForTextByXpath('//*[@id="trips-travel-alerts-popover"]/div[2]/div/div/div[1]/div/h4', 'United Kingdom - Measles');
    driver.waitForTextByXpath('//*[@id="trips-travel-alerts-popover"]/div[2]/div/div/div[1]/div/div[2]/div', 'AUTOMATION-This is the active to test');
    driver.waitForTextByCss('#alert-tooltip-last-updated', 'Last Updated: Mar 26, 2018');
    driver.waitForTextByCss('#alert-tooltip-alert-number', '1/4 Alerts');
    driver.waitForTextByCss('#alert-tooltip-show-all', 'Show All');
    driver.waitForAttributeContainsByCss('#alert-tooltip-service-medical','class', 'cwt-icons-medical');
    driver.waitAndClickByCss('#alert-tooltip-service-medical');
  },

//    ---------------------------------- Alerts home dialog ----------------------------------

  'step 4 - Validate alerts dialog header (home)' : (driver) => {
    driver.waitForTextByCss('#alert-main-trip-name', 'Trip to Berlin');     //trip title
    driver.waitForAttributeContainsByCss('#alert-main-backwards-button','class', 'cwt-icons-forward is-first');    //backwards button disabled
    driver.waitForTextByCss('#alert-main-alert-number', 'Alert 1/4');     //alerts count
    driver.waitForAttributeContainsByCss('#alert-main-forwards-button','class', 'cwt-icons-forward');    //forward button enabled
  },

  'step 5 - Validate alerts dialog content (home)' : (driver) => {
    driver.waitForAttributeContainsByCss('[data-id=alert-main-service]','class', 'cwt-icons-medical');    //medical icon
    driver.waitForTextByCss('#alert-main-category', 'United Kingdom - Measles');
    driver.waitForTextByCss('#alert-main-title', 'AUTOMATION-This is the active to test');
    driver.waitForTextByCss('#alert-main-description', 'AUTOMATION-This is the summary of the "active to test" - Most cases have been in unvaccinated individuals. Measles is caused by a highly contagious virus that spreads from person-to-person via infectious droplets. Typical symptoms include fever, cough and a characteristic rash. Serious to fatal complications can occur - particularly when very young children, adults or pregnant women are infected. All travellers should ensure they are fully immunised against measles.');
    driver.waitForTextByCss('#alert-main-last-updated', 'Last Updated: Mar 26, 2018');
  },

  'step 6 - switch to the second alert and validating its content' : (driver) => {
    driver.clickToSlide('#alert-main-forwards-button',1);
    driver.waitForAttributeContainsByCss('[data-id=alert-main-service]','class', 'cwt-icons-weather');    //security icon
    driver.waitForTextByCss('#alert-main-category', 'United Kingdom - Measles');
    driver.waitForTextByCss('#alert-main-title', 'AUTOMATION-Measles clusters across United Kingdom');
    driver.waitForTextByCss('#alert-main-description', 'An increase in measles cases has been reported in several countries in Europe. England (United Kingdom), France, Georgia, Greece, Italy, Romania, Russia and Ukraine are heavily affected. Most cases have been in unvaccinated individuals. Measles is caused by a highly contagious virus that spreads from person-to-person via infectious droplets. Typical symptoms include fever, cough and a characteristic rash. Serious to fatal complications can occur - particularly when very young children, adults or pregnant women are infected. All travellers should ensure they are fully immunised against measles.');
    driver.waitForTextByCss('#alert-main-last-updated', 'Last Updated: Mar 26, 2018');
  },

  'step 6.1 - switch to the third alert and validating its content' : (driver) => {
    driver.clickToSlide('#alert-main-forwards-button',1);
    driver.waitForAttributeContainsByCss('[data-id=alert-main-service]','class', 'cwt-icons-medical');    //security icon
    driver.waitForTextByCss('#alert-main-category', 'Austria - Measles');
    driver.waitForTextByCss('#alert-main-title', 'AUTOMATION-Measles clusters across Austria');
    driver.waitForTextByCss('#alert-main-description', 'Members in main cities on 6 May should expect a heightened security force presence during municipal elections scheduled to take place on the day. Preliminary results are expected by 7 May, and the official results are due to be confirmed by 9 May. While the elections are expected to pass off peacefully, polling stations and related gatherings should be avoided as a precaution.');
    driver.waitForTextByCss('#alert-main-last-updated', 'Last Updated: Mar 26, 2018');
  },

  'step 6.2 - switch to the forth (last) alert and validating its content' : (driver) => {
    driver.clickToSlide('#alert-main-forwards-button',1);
    driver.waitForAttributeContainsByCss('[data-id=alert-main-service]','class', 'cwt-icons-security');    //security icon
    driver.waitForTextByCss('#alert-main-category', 'Israel - Protest/Rally');
    driver.waitForTextByCss('#alert-main-title', 'AUTOMATION-Urban centres: Expect, avoid further protests by ultra-Orthodox Jewish community over conscription issue');
    driver.waitForTextByCss('#alert-main-description', 'Members in urban centres should expect and avoid further protests in the coming days over a controversial draft law on allowing ultra-Orthodox Jews (also known as Haredi or Haredim) to be conscripted for military service. Clashes on 22 March broke out between ultra-Orthodox Jews and the police during anti-conscription demonstrations in Bnei Brak (Tel Aviv district). Thirty demonstrators were arrested and the security forces used tear gas to disperse crowds as they attempted to block Highway 4. Clashes also broke out during disruptive protests later in the evening in Ramat Gan (Tel Aviv district).');
    driver.waitForTextByCss('#alert-main-last-updated', 'Last Updated: Mar 23, 2018');
  },

  'step 7 - Validate alerts home dialog footer' : (driver) => {
    driver.waitForTextByCss('#alert-main-helpful-title', 'Is this alert helpful?');     //is this helpful title
    driver.waitForAttributeContainsByCss('#alert-main-helpful-yes-button', 'value', 'Yes');     //is this helpful YES button
    driver.waitForAttributeContainsByCss('#alert-main-helpful-no-button', 'value' ,'No');     //is this helpful NO button
    driver.waitForTextByCss('#alert-main-powered-by-text', 'Powered by:');     //powered by text
    driver.waitForAttributeContainsByCss('[data-id=alert-main-isos-logo]','src', 'travel.stage-mycwt.com/o/cwt-portal-theme/images/_/node_modules/trip-alerts/dist/assets/images/isos.5c3cf31c0728771d453b1ea74d8c0cf4.jpg');    //international image
    driver.validateUrlResponse('https://travel.stage-mycwt.com/o/cwt-portal-theme/images/_/node_modules/trip-alerts/dist/assets/images/isos.5c3cf31c0728771d453b1ea74d8c0cf4.jpg');
    driver.waitAndClickByCss('#alert-warning-text');
    driver.waitAndClickByCss('#alert-tooltip-service-medical');
    driver.waitForAttributeContainsByCss('[data-id=alert-main-control-risks-logo]','src', 'https://travel.stage-mycwt.com/o/cwt-portal-theme/images/_/node_modules/trip-alerts/dist/assets/images/control-risk.f3f6c47c2af16da9a0aad3a6b539bfce.jpg');    //control image
    driver.validateUrlResponse('https://travel.stage-mycwt.com/o/cwt-portal-theme/images/_/node_modules/trip-alerts/dist/assets/images/control-risk.f3f6c47c2af16da9a0aad3a6b539bfce.jpg');
  },

//    ---------------------------------- Alerts trip details dialog ----------------------------------

  'step 8 - Navigate to trip details and validate alerts banner' : (driver) => {
    driver.pause(3000);
    driver.waitAndClickByCss('#hotel-1');    //Click on one of home cards
    driver.waitForAttributeContainsByXpath('//*[@id="tripDetails"]/div[1]/div[2]/div/i','class', 'cwt-icons-warning');
    driver.waitForTextByXpath('//*[@id="tripDetails"]/div[1]/div[2]/div/p', '4 active alerts for this trip');
    driver.pause(1000);
    driver.waitAndClickByXpath('//*[@id="tripDetails"]/div[1]/div[2]/div/p');
  },

  'step 9 - Validate alerts dialog content (trip details)' : (driver) => {
    driver.waitForAttributeContainsByCss('.cwt-icons-medical','class', 'cwt-icons-medical');    //medical icon
    driver.waitForTextByCss('.alert-body__category', 'United Kingdom - Measles');
    driver.waitForTextByCss('.alert-body__title', 'AUTOMATION-This is the active to test');
    driver.waitForTextByCss('.alert-body__description', 'AUTOMATION-This is the summary of the "active to test" - Most cases have been in unvaccinated individuals. Measles is caused by a highly contagious virus that spreads from person-to-person via infectious droplets. Typical symptoms include fever, cough and a characteristic rash. Serious to fatal complications can occur - particularly when very young children, adults or pregnant women are infected. All travellers should ensure they are fully immunised against measles.');
    driver.waitForTextByCss('.alert-body__lastUpdateTime', 'Last Updated: Mar 26, 2018');
  },

  'step 10 - Validate alerts dialog footer (trip details)' : (driver) => {
    driver.waitForTextByCss('#alert-main-helpful-title', 'Is this alert helpful?');     //is this helpful title
    driver.waitForAttributeContainsByCss('#alert-main-helpful-yes-button', 'value', 'Yes');     //is this helpful YES button
    driver.waitForAttributeContainsByCss('#alert-main-helpful-no-button', 'value' ,'No');     //is this helpful NO button
    driver.waitForTextByCss('#alert-main-powered-by-text', 'Powered by:');     //powered by text
    driver.waitForAttributeContainsByCss('[data-id=alert-main-isos-logo]','src', 'travel.stage-mycwt.com/o/cwt-portal-theme/images/_/node_modules/trip-alerts/dist/assets/images/isos.5c3cf31c0728771d453b1ea74d8c0cf4.jpg');    //international image
    driver.waitForAttributeContainsByCss('[data-id=alert-main-control-risks-logo]','src', 'travel.stage-mycwt.com/o/cwt-portal-theme/images/_/node_modules/trip-alerts/dist/assets/images/control-risk.f3f6c47c2af16da9a0aad3a6b539bfce.jpg');    //control image
  },

//    ---------------------------------- Helpful click ----------------------------------

  'step 11 - Click on helpful button and validate message' : (driver) => {
    driver.waitAndClickByCss('#alert-main-helpful-yes-button');
    driver.waitForTextByXpath('//*[@id="senna_surface1"]/div[4]/div/div[2]/div/div/div/div[3]/div[1]/span', 'Thank you!');
    // click on navigation once
    driver.useCss();
    driver.clickToSlide('#alert-main-forwards-button',1);
    driver.waitAndClickByCss('#alert-main-helpful-no-button');
    driver.waitForTextByXpath('//*[@id="senna_surface1"]/div[4]/div/div[2]/div/div/div/div[3]/div[1]/span', 'Thank you!');
    driver.waitAndClickByCss('.modal-container__close');
  },

//    ---------------------------------- Alerts TA ----------------------------------

  'step 12 - Navigate to one of the travelers and validate alerts banner' : (driver) => {
    driver.waitAndClickByCss('#layout_3');
    driver.waitAndClickByXpath('//*[@id="traveler-trip-info-1"]/span[1]/a');
    driver.waitForAttributeContainsByXpath('//*[@id="tripDetails"]/div[1]/div[2]/div/i','class', 'cwt-icons-warning');
    driver.waitForTextByXpath('//*[@id="tripDetails"]/div[1]/div[2]/div/p', '3 active alerts for this trip');
    driver.waitAndClickByXpath('//*[@id="tripDetails"]/div[1]/div[2]/div/p');
  },

  'step 13 - Validate traveler alerts dialog header' : (driver) => {
    driver.waitForTextByCss('#alert-main-trip-name', 'Trip to Dublin');
    driver.waitForAttributeContainsByCss('#alert-main-backwards-button','class', 'cwt-icons-forward is-first');
    driver.waitForTextByCss('#alert-main-alert-number', 'Alert 1/3');
    driver.waitForAttributeContainsByCss('#alert-main-forwards-button','class', 'cwt-icons-forward');
  },

  'step 14 - Validate traveler alerts dialog content' : (driver) => {
    driver.waitForAttributeContainsByCss('[data-id=alert-main-service]','class', 'cwt-icons-medical');    //medical icon
    driver.waitForTextByCss('#alert-main-category', 'Ireland - Measles');
    driver.waitForTextByCss('#alert-main-title', 'AUTOMATION-Measles in Ireland');
    driver.waitForTextByCss('#alert-main-description', 'Most cases have been in unvaccinated individuals. Measles is caused by a highly contagious virus that spreads from person-to-person via infectious droplets. Typical symptoms include fever, cough and a characteristic rash. Serious to fatal complications can occur - particularly when very young children, adults or pregnant women are infected. All travellers should ensure they are fully immunised against measles.');
    driver.waitForTextByCss('#alert-main-last-updated', 'Last Updated: Mar 26, 2018');
  },

  'step 15 - Validate traveler alerts dialog footer' : (driver) => {
    driver.waitForTextByCss('#alert-main-helpful-title', 'Is this alert helpful?');
    driver.waitForAttributeContainsByCss('#alert-main-helpful-yes-button', 'value', 'Yes');
    driver.waitForAttributeContainsByCss('#alert-main-helpful-no-button', 'value' ,'No');
    driver.waitForTextByCss('#alert-main-powered-by-text', 'Powered by:');
    driver.waitForAttributeContainsByCss('[data-id=alert-main-isos-logo]','src', 'travel.stage-mycwt.com/o/cwt-portal-theme/images/_/node_modules/trip-alerts/dist/assets/images/isos.5c3cf31c0728771d453b1ea74d8c0cf4.jpg');    //international image
    driver.waitForAttributeContainsByCss('[data-id=alert-main-control-risks-logo]','src', 'travel.stage-mycwt.com/o/cwt-portal-theme/images/_/node_modules/trip-alerts/dist/assets/images/control-risk.f3f6c47c2af16da9a0aad3a6b539bfce.jpg');    //control image
    driver.waitAndClickByCss('.modal-container__close');
  },

};