'use strict';

module.exports = {

  '@tags': ['stage', 'sanity', 'portal', 'my trips'],

  before: function (driver) {
    driver.windowMaximize();
  },

  'step 1 - login to portal': (driver) => {
    driver.refresh();
    const login = driver.page.login();
    login.fillLoginDetails(driver.globals.users.portalUser8);
  },

  'step 2 - Validate view trips upcoming' : (driver) => {
    driver.pause(5000);
    // click on my trips button
    driver.waitForElementVisible('[data-testid=header-navigation-myTrips]');
    driver.pause(2000);
    // click on my trips button
    driver.waitAndClickByCss('[data-testid=header-navigation-myTrips]');
    // view trips main title
    driver.waitForTextByCss('[data-testid=upcoming-trips-section-title]', 'My upcoming trips (1)');
    // trip title
    driver.waitForTextByCss('[data-testid=trip-971131] [data-testid=trip-name]', 'Trip to Tokyo');
    // trip location
    driver.waitForTextByCss('[data-testid=trip-971131] [data-testid=trip-address-destination]', 'Tokyo, JP');
    // trip duration
    driver.waitForTextByCss('[data-testid=trip-971131] [data-testid=trip-dates]', 'Jun 4 - Jun 10, 2025 | 7 days');
    // flight item
    driver.waitForAttributeContainsByCss('[data-testid=air-1] [data-testid=segment-icon]', 'class', 'CwtIcons__StyledIcon-sc-1zecbe-0 styles__Icon-sc-10wf0m2-10 eGKQsK CwtIcons-sc-1zecbe-1 tMHET');
    driver.waitForTextByCss('[data-testid=air-1] [data-testid=segment-description]', 'LHR - SVO - NRT');
    // missing hotel item
    driver.waitForAttributeContainsByCss('[data-testid=missingAccommodation-1] [data-testid=segment-icon]', 'class', 'CwtIcons__StyledIcon-sc-1zecbe-0 styles__Icon-sc-10wf0m2-10 eGKQsK CwtIcons-sc-1zecbe-1 cwBKRA');
    driver.waitForTextByCss('[data-testid=missingAccommodation-1] [data-testid=segment-description]', 'Missing Hotel');
    // car item
    driver.waitForAttributeContainsByCss('[data-testid=car-1] [data-testid=segment-icon]', 'class', 'CwtIcons__StyledIcon-sc-1zecbe-0 styles__Icon-sc-10wf0m2-10 eGKQsK CwtIcons-sc-1zecbe-1 figTwR');
    driver.waitForTextByCss('[data-testid=car-1] [data-testid=segment-description]', 'DOLLAR');
    // + number
    driver.waitForTextByCss('[data-testid=more-items] [data-testid=trip-card-more]', '+ 2');
    driver.waitForTextByCss('[data-testid=more-items] [data-testid=segment-description]', 'More items');
  },

  'step 3 - Validate view trips past' : (driver) => {
    // Past trips main title
    driver.scrollToLocation(0, 541);
    driver.waitForTextByCss('[data-testid=past-trips-section-title]', 'My past trips (1)');
    // Search field pre-text and icon
    driver.waitForAttributeContainsByCss('[data-testid=input-icon-search]', 'class', 'CwtIcons__StyledIcon-sc-1zecbe-0 styles__StyledIcon-n24pwb-0 lcarwX CwtIcons-sc-1zecbe-1 bThmWo');
    driver.waitForAttributeContainsByCss('[data-testid=input-search]', 'placeholder', 'Search for city airport or landmark');
    // Year title
    driver.waitForTextByCss('[data-testid=my-trips-year-divider]', '2016');
    // Past trip main title
    driver.waitForTextByCss('[data-testid=trip-969599] [data-testid=trip-name]', 'Trip to Bangkok');
    // Past trip location
    driver.waitForTextByCss('[data-testid=trip-969599] [data-testid=trip-address-destination]', 'Bangkok, TH');
    // trip duration
    driver.waitForTextByCss('[data-testid=trip-969599] [data-testid=trip-dates]', 'Jul 29 - Oct 29, 2016 | 93 days');

    // // Past trip dates (this is to bypass acceptability changes, where all text located in different spans, eliminating "enter" hits)
    // const selector = '//*[@id="my-trips"]/div/div[2]/ul/li/div/div/div/div/p[2]';
    // driver.waitForElementVisible(selector);
    // driver.getText(selector, function(result){
    //   const textValue = result.value.replace(/(\r\n\t|\n|\r\t)/gm,"");
    //   this.assert.equal(textValue, "Starts onJul 29  -  EndsOct 29, 2016 | 93 nights");
    // });

    // Flight item
    driver.waitForAttributeContainsByCss('[data-testid=trip-969599] [data-testid=air-1] [data-testid=segment-icon]', 'class', 'CwtIcons__StyledIcon-sc-1zecbe-0 styles__Icon-sc-10wf0m2-10 eGKQsK CwtIcons-sc-1zecbe-1 tMHET');
    driver.waitForTextByCss('[data-testid=trip-969599] [data-testid=air-1] [data-testid=segment-description]', 'WLG - SYD - BKK\n- PHL - PHL');
  },

  'step 4 - Validate view trips search' : (driver) => {
    // Add text for existing trip
    driver.waitAndSetValueByCss('[data-testid=input-search]', 'Bangkok');
    // validate trip exist in the results
    driver.waitForTextByCss('[data-testid=trip-969599] [data-testid=trip-name]', 'Trip to Bangkok');
    // Clear value
    driver.clearValue('[data-testid=input-search]');
    // validate no trip display
    driver.waitAndSetValueByCss('[data-testid=input-search]', 'blabla');
    // driver.waitForAttributeContainsByXpath('//*[@id="my-trips"]/div/div[2]/ul/div/figure', 'class', 'empty-img');
    driver.waitForTextByCss('[data-testid=conditional-state-title]', "no trips found");
  },

  'step 5 - Logout' : (driver) => {
    driver.waitAndClickByCss('[data-testid=account-dropdown-button]');
    driver.pause(1000);
    driver.waitAndClickByCss('[data-testid=header-logout]');
  },

};
