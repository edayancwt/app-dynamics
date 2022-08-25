'use strict';

module.exports = {

  '@tags': ['stage', 'sanity', 'portal', 'home', 'cards'],

  before: function (driver) {
    driver.windowMaximize();
  },

  'step 1 - login to portal': (driver) => {
    const login = driver.page.login();
    login.fillLoginDetails(driver.globals.users.portalUser8);
  },

  'step 2 - Validate home itinerary flight card' : (driver) => {
    driver.waitForElementVisible('[data-testid=air-1]');
    driver.waitForTextByCss('[data-testid=air-1] [data-testid=card-header-segment-date]', 'WED, JUN 04');
    driver.waitForAttributeContainsByCss('[data-testid=air-1] [data-testid=card-header-icon]', 'class', 'CwtIcons__StyledIcon-sc-1zecbe-0 style__Icon-sc-1d72k64-4 ljHoUT CwtIcons-sc-1zecbe-1 tMHET');
    driver.waitForTextByCss('[data-testid=air-1] [data-testid=tooltip-base]', 'Aeroflot 262');
    driver.waitForAttributeContainsByCss('[data-testid=air-1] [data-testid=card-header-segment-vendor-icon]', 'class', 'style__VendorIcon-sc-1d72k64-10 hcECOW');
    driver.validateUrlResponse('https://api.worldmate.com/public/flights/img/airlines/SU.png');
    driver.waitForTextByCss('[data-testid=air-1] [data-testid=column-main-text]', 'LHR\n11:00 AM');
    driver.waitForTextByCss('[data-testid=air-1] [data-testid=card-end-column-wrapper] [data-testid=column-main-text]', 'SVO\n4:50 PM');
    driver.waitForTextByCss('[data-testid=air-1] [data-testid=card-start-column-wrapper] [data-testid=card-date-text]', 'WED, JUN 04');
    driver.waitForTextByCss('[data-testid=air-1] [data-testid=card-start-column-wrapper] [data-testid=column-detail-area]', 'Heathrow Airport,\nLondon, GB');
    driver.waitForTextByCss('[data-testid=air-1] [data-testid=card-end-column-wrapper] [data-testid=card-date-text]', 'WED, JUN 04');
    driver.waitForTextByCss('[data-testid=air-1] [data-testid=card-end-column-wrapper] [data-testid=column-detail-area]', 'Sheremetyevo\nAirport, Mosco...');
    // Flight layover
    driver.waitForAttributeContainsByCss('[data-testid=time-icon]', 'class', 'CwtIcons__StyledIcon-sc-1zecbe-0 style__TimeIcon-sc-1y588tk-1 hPdbsw CwtIcons-sc-1zecbe-1 fnRQYH');
    driver.waitForTextByCss('[data-testid=flightConnection-1] [data-testid=duration-time]', "2H 10M");
    driver.waitForTextByCss('[data-testid=flightConnection-1] [data-testid=duration-text]', "Layover");
    driver.waitForTextByCss('[data-testid=alert]', 'Change of terminal is required');
  },

  'step 3 - Validate home itinerary missing hotel card' : (driver) => {
    driver.waitForTextByCss('[data-testid=card-title]', 'Portal Sanity, your itinerary is missing a hotel');
    driver.waitForTextByCss('[data-testid=subtitle]', 'Check out our hotel recommendations, tailored personally for you');
    driver.waitForTextByCss('[data-testid=search-button]', 'VIEW HOTELS');
    driver.waitForTextByCss('[data-testid=hotel-checkin-time]', '| 5 nights | Jun 05 - Jun 10');
    // click on view hotels button
    driver.waitAndClickByCss('[data-testid=search-button]');
    // Validate booking page URL
    driver.waitForUrlToContain('travel.mycwt.com/book-a-hotel#/hotel-results', 20000);
    // back to home
    driver.back();
  },

  'step 4 - Validate home itinerary car card' : (driver) => {
    driver.useCss();
    driver.clickToSlide('#slider-nav-Forward', 2);
    driver.waitForTextByCss('[data-testid=car-1] [data-testid=card-header-segment-date]', 'SAT, JUN 07');
    driver.waitForAttributeContainsByCss('[data-testid=car-1] [data-testid=card-header-icon]', 'class', 'CwtIcons__StyledIcon-sc-1zecbe-0 style__Icon-sc-1d72k64-4 ljHoUT CwtIcons-sc-1zecbe-1 figTwR');
    driver.waitForTextByCss('[data-testid=car-1] [data-testid=tooltip-base]', 'DOLLAR Car Pick-Up');
    driver.waitForTextByCss('[data-testid=car-1] [data-testid=card-start-column-wrapper] [data-testid=time-text]', '1:10 PM');
    driver.waitForTextByCss('[data-testid=car-1] [data-testid=card-start-column-wrapper] [data-testid=card-date-text]', 'SAT, JUN 07');
    driver.waitForTextByCss('[data-testid=car-1] [data-testid=card-start-column-wrapper] [data-testid=column-detail-area]', "DEN");
    driver.waitForTextByCss('[data-testid=car-1] [data-testid=card-end-column-wrapper] [data-testid=time-text]', '8:20');
    driver.waitForTextByCss('[data-testid=car-1] [data-testid=card-end-column-wrapper] [data-testid=card-date-text]', 'SAT, JUN 07');
    driver.waitForTextByCss('[data-testid=car-1] [data-testid=card-end-column-wrapper] [data-testid=column-detail-area]', 'DEN');
    driver.waitForTextByCss('[data-testid=car-1] [data-testid=duration-text]', "1 DAY");
    driver.waitForTextByCss('[data-testid=car-1] [data-testid=card-footer-list-item]', 'Confirmation #:\nR4083926');
  },

  'step 5 - Validate home itinerary hotel card' : (driver) => {
    driver.clickToSlide('#slider-nav-Forward', 1);
    driver.waitForTextByCss('[data-testid=hotel-1] [data-testid=card-header-segment-date]', 'SUN, JUN 08');
    driver.waitForAttributeContainsByCss('[data-testid=hotel-1] [data-testid=card-header-icon]', 'class', 'CwtIcons__StyledIcon-sc-1zecbe-0 style__Icon-sc-1d72k64-4 ljHoUT CwtIcons-sc-1zecbe-1 cwBKRA');
    driver.waitForTextByCss('[data-testid=hotel-1] [data-testid=tooltip-base]', 'COUNTRY INN STS DENVER AIR');
    driver.waitForTextByCss('[data-testid=hotel-1] [data-testid=card-header-segment-subtitle]', '4343 N. Airport Way,');
    driver.waitForTextByCss('[data-testid=hotel-1] [data-testid=card-start-column-wrapper] [data-testid=card-segment-status]', 'CHECK-IN');
    driver.waitForTextByCss('[data-testid=hotel-1] [data-testid=card-start-column-wrapper] [data-testid=column-secondary-area]', 'SUN,JUN 08');
    driver.waitForTextByCss('[data-testid=hotel-1] [data-testid=card-end-column-wrapper] [data-testid=card-segment-status]', 'CHECK-OUT');
    driver.waitForTextByCss('[data-testid=hotel-1] [data-testid=card-end-column-wrapper] [data-testid=column-secondary-area]', 'MON,JUN 09');
    driver.waitForTextByCss('[data-testid=hotel-1] [data-testid=duration-text]', "1 NIGHT");
    driver.waitForTextByCss('[data-testid=hotel-1] [data-testid=card-start-column-wrapper] [data-testid=column-detail-area]', 'Room Type:\nZ8XX107');
    driver.waitForTextByCss('[data-testid=hotel-1] [data-testid=card-footer-list-item]', 'Confirmation #:\n8KQDJH4\n1-303-375-1105');
  },

  'step 6 - validate home itinerary rail card' : (driver) => {
    driver.clickToSlide('#slider-nav-Forward', 1);
    driver.waitForTextByCss('[data-testid=rail-1] [data-testid=card-header-segment-date]', 'MON, JUN 09');
    driver.waitForAttributeContainsByCss('[data-testid=rail-1] [data-testid=card-header-icon]', 'class', 'CwtIcons__StyledIcon-sc-1zecbe-0 style__Icon-sc-1d72k64-4 ljHoUT CwtIcons-sc-1zecbe-1 fXFaBP');
    driver.waitForTextByCss('[data-testid=rail-1] [data-testid=tooltip-base]', 'Amtrak');
    driver.waitForTextByCss('[data-testid=rail-1] [data-testid=card-start-column-wrapper] [data-testid=time-text]', '9:30 AM');
    driver.waitForTextByCss('[data-testid=rail-1] [data-testid=card-start-column-wrapper] [data-testid=card-date-text]', 'MON, JUN 09');
    driver.waitForTextByCss('[data-testid=rail-1] [data-testid=card-start-column-wrapper] [data-testid=column-detail-area]', "Santa Ana\n" +
      "John Wayne,...");
    driver.waitForTextByCss('[data-testid=rail-1] [data-testid=card-end-column-wrapper] [data-testid=time-text]', '11:30');
    driver.waitForTextByCss('[data-testid=rail-1] [data-testid=card-end-column-wrapper] [data-testid=card-date-text]', 'TUE, JUN 10');
    driver.waitForTextByCss('[data-testid=rail-1] [data-testid=card-end-column-wrapper] [data-testid=column-detail-area]', 'San Diego, San\nDiego, US');
    driver.waitForTextByCss('[data-testid=rail-1] [data-testid=duration-text]', "26 HOURS");
  },

  'step 7 - validate home itinerary meeting card' : (driver) => {
    driver.clickToSlide('#slider-nav-Forward', 1);
    driver.waitForTextByCss('[data-testid=meeting-1] [data-testid=card-header-segment-date]', 'TUE, JUN 10');
    driver.waitForAttributeContainsByCss('[data-testid=meeting-1] [data-testid=card-header-icon]', 'class', 'CwtIcons__StyledIcon-sc-1zecbe-0 style__Icon-sc-1d72k64-4 ljHoUT CwtIcons-sc-1zecbe-1 kEqNau');
    driver.waitForTextByCss('[data-testid=meeting-1] [data-testid=tooltip-base]', 'Meeting With Misha');
    driver.waitForTextByCss('[data-testid=meeting-1] [data-testid=card-start-column-wrapper] [data-testid=card-segment-status]', 'STARTS');
    driver.waitForTextByCss('[data-testid=meeting-1] [data-testid=card-start-column-wrapper] [data-testid=time-text]', '2:00 PM');
    driver.waitForTextByCss('[data-testid=meeting-1] [data-testid=card-start-column-wrapper] [data-testid=card-date-text]', 'TUE, JUN 10');
    driver.waitForTextByCss('[data-testid=meeting-1] [data-testid=card-end-column-wrapper] [data-testid=card-segment-status]', 'ENDS');
    driver.waitForTextByCss('[data-testid=meeting-1] [data-testid=card-end-column-wrapper] [data-testid=time-text]', '3:00');
    driver.waitForTextByCss('[data-testid=meeting-1] [data-testid=card-end-column-wrapper] [data-testid=card-date-text]', 'TUE, JUN 10');
    driver.waitForTextByCss('[data-testid=meeting-1] [data-testid=duration-text]', '1H 0M');
  },

  'step 8 - navigate right': (driver) => {
    driver.clickToSlide('#slider-nav-Back', 4);
    driver.clickToSlide('#slider-nav-Forward', 1);
  },

  'step 9 - navigate left': (driver) => {
    driver.clickToSlide('#slider-nav-Back', 1);
  },

  'step 10 - navigate forward 3 times': (driver) => {
    driver.clickToSlide('#slider-nav-Forward', 4);
  },

  'step 11 - validate forward button disabled': (driver) => {
    driver.waitForElementNotPresent('#slider-nav-Forward', 1000);
  },

  'step 12 - navigate left': (driver) => {
    driver.useCss();
    driver.clickToSlide('#slider-nav-Back', 5);
  },

  'step 13 - validate backwards button disabled': (driver) => {
    driver.waitForElementNotPresent('#slider-nav-Back', 1000);
  },

  'step 14 - Logout' : (driver) => {
    driver.waitAndClickByCss('[data-testid=account-dropdown-button]');
    driver.pause(1000);
    driver.waitAndClickByCss('[data-testid=header-logout]');
  },

  'step 15 - Validate logout process' : (driver) => {
    driver.waitForTextByCss('[data-testid=sso-logout-message]', 'You have been successfully logged out from myCWT!');
    driver.waitForTextByCss('[data-testid=button]', 'LOG BACK IN');
    driver.waitAndClickByCss('[data-testid=button]');
    driver.waitForTextByCss('#login-main-title', 'Log in to your account');
  },

};
