'use strict';

module.exports = {

  '@tags': ['IDM', 'login'],

  before: function (driver) {
    driver.windowMaximize();
  },

//    ---------------------------------- User 1 - popular city with video ----------------------------------

  'step 1 - login with user 1': (driver) => {
    const login = driver.page.login();
    login.fillLoginDetails(driver.globals.users.portalUser16);
  },

  'step 1.1 - Validate user 1 "home" video (London)': (driver) => {
    driver.waitForAttributeContains('#heroMedia', 'data-media-source', 'https://cdn.worldmate.com/portal-hero-video/60876.mp4');
    driver.waitAndClick('#layout_2');
  },

  'step 1.2 - Validate user 1 "my trips" image (London)': (driver) => {
    driver.waitForAttributeContains('.trip-general', 'style', 'https://cdn.worldmate.com/portal-trip-destination/60876.jpg');
    driver.validateUrlResponse('https://cdn.worldmate.com/portal-trip-destination/60876.jpg');
    driver.waitAndClick('.trip-general');
  },

  'step 1.3 - Validate user 1 "trip details" image (London)': (driver) => {
    driver.waitForAttributeContains('.trip-header', 'style', 'https://cdn.worldmate.com/portal-hero-img/60876.jpg');
    driver.validateUrlResponse('https://cdn.worldmate.com/portal-hero-img/60876.jpg');
  },

  'step 1.4 - Logout user 1' : (driver) => {
    driver.page.logout().logout();
  },

//    ---------------------------------- User 2 - popular city with only image ----------------------------------

  'step 2 - login with user 2': (driver) => {
    const login = driver.page.login();
    login.fillLoginDetails(driver.globals.users.portalUser17);
  },

  'step 2.1 - Validate user 2 "home" image (Brussels)': (driver) => {
    driver.waitForAttributeContains('#heroMedia', 'data-media-source', 'https://cdn.worldmate.com/portal-hero-img/50732.jpg');
    driver.validateUrlResponse('https://cdn.worldmate.com/portal-hero-img/50732.jpg');
    driver.waitForCssContains('#heroMedia', 'opacity', '1');
    driver.waitAndClick('#layout_2');
  },

  'step 2.2 - Validate user 2 "my trips" image (Brussels)': (driver) => {
    driver.waitForAttributeContains('.trip-general', 'style', 'https://cdn.worldmate.com/portal-trip-destination/50732.jpg');
    driver.validateUrlResponse('https://cdn.worldmate.com/portal-trip-destination/50732.jpg');
    driver.waitAndClick('.trip-general');
  },

  'step 2.3 - Validate user 2 "trip details" image (Brussels)': (driver) => {
    driver.waitForAttributeContains('.trip-header', 'style', 'https://cdn.worldmate.com/portal-hero-img/50732.jpg');
    driver.validateUrlResponse('https://cdn.worldmate.com/portal-hero-img/50732.jpg');
  },

  'step 2.4 - Logout user 2' : (driver) => {
    driver.page.logout().logout();
  },

//    ---------------------------------- User 3 - not popular city with default video ----------------------------------

  'step 3 - login with user 3': (driver) => {
    const login = driver.page.login();
    login.fillLoginDetails(driver.globals.users.portalUser18);
  },

  'step 3.1 - Validate user 3 "home" default video (Jerusalem)': (driver) => {
    driver.waitForAttributeContains('#heroMedia', 'data-media-source', 'https://cdn.worldmate.com/portal-hero-video/default.mp4');
    driver.waitForCssContains('#heroMedia', 'opacity', '1');
    driver.waitAndClick('#layout_2');
  },

  'step 3.2 - Validate user 3 "my trips" image (Jerusalem)': (driver) => {
    driver.waitForAttributeContains('.trip-general', 'style', 'https://cdn.worldmate.com/portal-hero-img/default.jpg');
    driver.validateUrlResponse('https://cdn.worldmate.com/portal-hero-img/default.jpg');
    driver.waitAndClick('.trip-general');
  },

  'step 3.3 - Validate user 3 "trip details" image (Jerusalem)': (driver) => {
    driver.waitForAttributeContains('.trip-header', 'style', 'https://cdn.worldmate.com/portal-hero-img/default.jpg');
    driver.validateUrlResponse('https://cdn.worldmate.com/portal-hero-img/default.jpg');
  },

//    ---------------------------------- (Still) User 3 - past trips ----------------------------------

  'step 3.4 - Validate user 3 past trip popular image on trip details (paris)': (driver) => {
    driver.waitAndClick('#layout_2');
    driver.scrollToLocation(0, 600);
    driver.waitAndClick('[data-id=trip-1]');
    driver.waitForAttributeContains('.trip-header', 'style', 'https://cdn.worldmate.com/portal-hero-img/62827.jpg');
    driver.validateUrlResponse('https://cdn.worldmate.com/portal-hero-img/62827.jpg');
  },

  'step 3.5 - Validate user 3 past trip not popular image on trip details (Hiroshima)': (driver) => {
    driver.waitAndClick('#layout_2');
    driver.scrollToLocation(0, 600);
    driver.waitAndClick('[data-id=trip-2]');
    driver.waitForAttributeContains('.trip-header', 'style', 'https://cdn.worldmate.com/portal-hero-img/default.jpg');
    driver.validateUrlResponse('https://cdn.worldmate.com/portal-hero-img/default.jpg');
  },

};