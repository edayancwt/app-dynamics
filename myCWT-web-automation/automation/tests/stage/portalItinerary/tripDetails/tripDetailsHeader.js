'use strict';

module.exports = {

  '@tags': ['trip', 'details', 'header'],

  before: function (driver) {
    driver.windowMaximize();
  },

  'step 1 - login to portal': (driver) => {
    const login = driver.page.login();
    login.fillLoginDetails(driver.globals.users.portalUser1);
  },

  'step 2 - Navigate to the trip' : (driver) => {
    driver.waitAndClick('#layout_2');
    driver.useXpath();
    driver.waitAndClick('//*[@id="my-trips"]/div/div[1]/ul/li/div/div[1]');
  },

//   ---------------------------------- Collapsed mode ----------------------------------

  'step 3 - Validate trip header breadcrumbs locations': (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[1]/div[1]/div[1]/ol/li[1]/a', 'HOME');
    driver.waitForText('//*[@id="tripDetails"]/div[1]/div[1]/div[1]/ol/li[2]/a', 'MY TRIPS');
  },

  'step 4 - Validate trip header trip name': (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[1]/h1', 'Trip to Denver, CO, Colorado, US');
  },

  'step 5 - Validate trip header trip time frame and duration': (driver) => {
    // header trip time title (this is to bypass acceptability changes, where all text located in different spans, eliminating "enter" hits)
    const checkOutSelector = '//*[@id="tripDetails"]/div[1]/p';
    driver.waitForElementVisible(checkOutSelector);
    driver.getText(checkOutSelector, function(result){
      const textValue = result.value.replace(/(\r\n\t|\n|\r\t)/gm,"");
      this.assert.equal(textValue, "Starts onJun 4  -  EndsSep 3, 2025 | 91 nights");
    });
  },

  'step 6 - Validate trip header map': (driver) => {
    driver.useCss();
    driver.waitForText('#itinerary-map-open', 'MAP VIEW');
    driver.useXpath();
    driver.waitForAttributeContains('//*[@id="itinerary-map-open"]/i', 'class', 'cwt-icon cwt-icon-location m-r-xs');
  },

  'step 7 - Validate trip header share link': (driver) => {
    driver.useCss();
    driver.waitForText('[data-id=action-share-button]', 'SHARE');
    driver.useXpath();
    driver.waitForAttributeContains('//*[@id="header-share-link"]/button/i', 'class', 'cwt-icon cwt-icon-share');
  },

  'step 8 - Validate trip header download link': (driver) => {
    driver.waitForText('.//*[@id="tripDetails"]/div[1]/div/div[2]/ul/li[2]/button', 'DOWNLOAD');
    driver.waitForAttributeContains('//*[@id="tripDetails"]/div[1]/div/div[2]/ul/li[2]/button/i', 'class', 'cwt-icon cwt-icon-download');
  },

  'step 9 - Validate trip header print link': (driver) => {
    driver.waitForText('.//*[@id="tripDetails"]/div[1]/div/div[2]/ul/li[3]/button', 'PRINT');
    driver.waitForAttributeContains('//*[@id="tripDetails"]/div[1]/div/div[2]/ul/li[3]/button/i', 'class', 'cwt-icon cwt-icon-print');
  },

  'step 10 - I scroll down to collapse the header': (driver) => {
    driver.scrollToLocation(0, 200);
  },

  'step 11 - Validate trip header breadcrumbs locations': (driver) => {
    driver.waitForText('.//*[@id="tripDetails"]/div[1]/div/div[1]/ol/li[1]/a', 'HOME');
    driver.waitForText('.//*[@id="tripDetails"]/div[1]/div/div[1]/ol/li[2]', 'MY TRIPS');
  },

//   ---------------------------------- Collapsed mode ----------------------------------

  'step 12 - Validate trip header breadcrumbs locations': (driver) => {
    driver.waitForText('.//*[@id="tripDetails"]/div[1]/div/div[1]/ol/li[1]/a', 'HOME');
    driver.waitForText('.//*[@id="tripDetails"]/div[1]/div/div[1]/ol/li[2]', 'MY TRIPS');
  },

  'step 13 - Validate trip header trip name': (driver) => {
    driver.waitForText('//*[@id="tripDetails"]/div[1]/h1', 'Trip to Denver, CO, Colorado, US');
  },

  'step 14 - Validate trip header trip time frame and duration': (driver) => {
    // driver.waitForText('//*[@id="tripDetails"]/div[1]/p', 'Jun 4 - Sep 3, 2025 | 91 nights');
    // trip header time (this is to bypass acceptability changes, where all text located in different spans, eliminating "enter" hits)
    const checkOutSelector = '//*[@id="tripDetails"]/div[2]/div/ul/li[8]/div/div/div/div[2]/h6';
    driver.waitForElementVisible(checkOutSelector);
    driver.getText(checkOutSelector, function(result){
      const textValue = result.value.replace(/(\r\n\t|\n|\r\t)/gm,"");
      this.assert.equal(textValue, "Check-out |hotel name isCOUNTRY INN STS DENVER AIR");
    });
  },

  'step 15 - Validate trip header map': (driver) => {
    driver.waitForText('.//*[@id="itinerary-map-open"]', 'MAP VIEW');
    driver.waitForAttributeContains('//*[@id="itinerary-map-open"]/i', 'class', 'cwt-icon cwt-icon-location m-r-xs');
  },

  'step 16 - Validate trip header share link': (driver) => {
    driver.waitForText('.//*[@id="tripDetails"]/div[1]/div/div[2]/ul/li[1]/button', 'SHARE');
    driver.waitForAttributeContains('//*[@id="tripDetails"]/div[1]/div/div[2]/ul/li[1]/button/i', 'class', 'cwt-icon cwt-icon-share');
  },

  'step 17 - Validate trip header download link': (driver) => {
    driver.waitForText('.//*[@id="tripDetails"]/div[1]/div/div[2]/ul/li[2]/button', 'DOWNLOAD');
    driver.waitForAttributeContains('//*[@id="tripDetails"]/div[1]/div/div[2]/ul/li[2]/button/i', 'class', 'cwt-icon cwt-icon-download');
  },

  'step 18 - Validate trip header print link': (driver) => {
    driver.waitForText('.//*[@id="tripDetails"]/div[1]/div/div[2]/ul/li[3]/button', 'PRINT');
    driver.waitForAttributeContains('//*[@id="tripDetails"]/div[1]/div/div[2]/ul/li[3]/button/i', 'class', 'cwt-icon cwt-icon-print');
  },

  'step 19 - I scroll up to collapse the header': (driver) => {
    driver.scrollToLocation(0, 0);
  },

//   ---------------------------------- Header actions - breadcrumbs ----------------------------------

  'step 20 - Click on my trips breadcrumb link': (driver) => {
    driver.waitAndClick('//*[@id="tripDetails"]/div[1]/div[1]/div[1]/ol/li[2]/a');
    driver.waitForUrlToContain('travel.stage-mycwt.com/group/selenium-sub-selenium-top/my-trips#/', 20000);
    driver.waitAndClick('//*[@id="my-trips"]/div/div[1]/ul/li/div/div[1]');
  },

  'step 21 - Click on home breadcrumb link': (driver) => {
    driver.waitAndClick('//*[@id="tripDetails"]/div[1]/div[1]/div[1]/ol/li[1]/a');
    driver.useCss();
    driver.waitForText('#heroMsgUsername', 'Aportal One,');
    driver.waitAndClick('#air-1');
  },

//   ---------------------------------- Header actions - Map, Share,Download and Print links ----------------------------------

  'step 22 - Click on the header map link': (driver) => {
    driver.useCss();
    driver.waitAndClick('#itinerary-map-open');
    driver.pause(1000);
    driver.waitAndClick('#itinerary-map-close');
  },

  'step 23 - Click on the header share link': (driver) => {
    driver.useCss();
    driver.pause(1000);
    driver.waitAndClick('#header-share-link');
    // Click on cancel button
    driver.waitAndClick('#modal-share-cancel-button');
  },

// TODO: do we have a defect here, download button is disable and not displaying any message
//   'step 25 - Click on the header download link': (driver) => {
//     driver.waitAndClick('//*[@id="tripDetails"]/div[1]/div/div[2]/ul/li[2]/button');
//     driver.waitForText('//*[@id="itinerary-download-popover"]/div[2]/ul/li[2]', 'No reservations found for this trip');
//     driver.waitAndClick('//*[@id="tripDetails"]/div[1]/div/div[2]/ul/li[2]/button');
//   },

  'step 26 - Logout': (driver) => {
    driver.page.logout().logout();
  },

};