'use strict';

module.exports = {

  '@tags': ['my', 'trips'],

  before: function (driver) {
    driver.windowMaximize();
  },

  'step 1 - login to portal': (driver) => {
    const login = driver.page.login();
    login.fillLoginDetails(driver.globals.users.portalUser1);
  },

  'step 2 - Validate view trips': (driver) => {
    driver.waitAndClickByCss('#layout_2');
    driver.useXpath();

    // this is to overcome "searching for trips" title display on the same selector as "my upcoming trips" selector.
    const titleSelector = '//*[@id="my-trips"]/div/div[1]/h2';
    driver.waitForElementVisible(titleSelector);
    driver.getText(titleSelector, function(result){
    if (result.value === 'Searching for trips...'){
      driver.pause(4000);
      }
    });

    driver.waitForTextByXpath('//*[@id="my-trips"]/div/div[1]/h2', 'My Upcoming trips (1)');
    driver.waitForTextByXpath('//*[@id="my-trips"]/div/div[1]/ul/li/div/div[1]/div/h6', 'Trip to Denver, CO');
    driver.waitForTextByXpath('//*[@id="my-trips"]/div/div[1]/ul/li/div/div[1]/div/p[1]', 'Denver, Colorado, US');
    // trip dates (this is to bypass acceptability changes, where all text located in different spans, eliminating "enter" hits)
      const selector = '//*[@id="my-trips"]/div/div[1]/ul/li/div/div[1]/div/p[2]';
      driver.waitForElementVisible(selector);
      driver.getText(selector, function(result){
      const textValue = result.value.replace(/(\r\n\t|\n|\r\t)/gm,"");
      this.assert.equal(textValue, "Starts onJun 4  -  EndsSep 3, 2025 | 91 nights");
    });
    //plane
    driver.waitForAttributeContainsByXpath('//*[@id="my-trips"]/div/div[1]/ul/li/div/ul/li[1]/div/span', 'class', 'cwt-icon-plane');
    driver.waitForTextByXpath('//*[@id="my-trips"]/div/div[1]/ul/li/div/ul/li[1]/div/div/div/span[2]/span', 'LHR - SVO - NRT');
    //missing hotel
    driver.waitForAttributeContainsByXpath('//*[@id="my-trips"]/div/div[1]/ul/li/div/ul/li[2]/div/span', 'class', 'cwt-icon-hotel text-danger');
    driver.waitForTextByXpath('//*[@id="my-trips"]/div/div[1]/ul/li/div/ul/li[2]/div/div/div/span[2]/span', 'Missing Hotel');
    //car
    driver.waitForAttributeContainsByXpath('//*[@id="my-trips"]/div/div[1]/ul/li/div/ul/li[3]/div/span', 'class', 'cwt-icon-car');
    driver.waitForTextByXpath('//*[@id="my-trips"]/div/div[1]/ul/li/div/ul/li[3]/div/div/div/span[2]/span', 'DOLLAR');
    //hotel
    driver.waitForAttributeContainsByXpath('//*[@id="my-trips"]/div/div[1]/ul/li/div/ul/li[4]/div/span', 'class', 'cwt-icon-hotel');
    driver.waitForTextByXpath('//*[@id="my-trips"]/div/div[1]/ul/li/div/ul/li[4]/div/div/div/span[2]/span', 'COUNTRY INN STS DENVER AIR');
    //rail
    driver.waitForAttributeContainsByXpath('//*[@id="my-trips"]/div/div[1]/ul/li/div/ul/li[6]/div/span', 'class', 'cwt-icon-rail');
    driver.waitForTextByXpath('//*[@id="my-trips"]/div/div[1]/ul/li/div/ul/li[6]/div/div/div/span[2]/span', 'Amtrak to San Diego');
  },

  'step 3 - Logout' : (driver) => {
    driver.page.logout().logout();
  },

//    ---------------------------------- View trips, validate empty state messages -----------------------------------

  'step 4 - login with user with no trips, validate no past/upcoming trips messages': (driver) => {
      const login = driver.page.login();
      login.fillLoginDetails(driver.globals.users.portalUser10);
  },

  'step 5 - Navigate to view trips and validate no past upcoming trips messages': (driver) => {
    driver.waitAndClickByCss('#layout_2');
    driver.waitForTextByXpath('//*[@id="my-trips"]/div/h2', 'You have no trips');
    driver.waitForTextByXpath('//*[@id="my-trips"]/div/div/div[1]/p[1]', 'Once you have a CWT trip, it will be automatically displayed here. Your past trips will appear below.');
    // driver.waitForTextByXpath('//*[@id="my-trips"]/div/div/div[1]/p[2]', 'Have trip reservations that do not appear here? Forward the confirmation email to');   //TODO: DE9445
    // driver.waitForAttributeContainsByXpath('//*[@id="my-trips"]/div/div/div[1]/p[2]/a', 'href', 'mailto:%20plans@cwttogo.com');
    driver.waitForAttributeContainsByXpath('//*[@id="my-trips"]/div/div/div[2]/figure', 'class', 'empty-img');
  },

  'step 6 - Logout' : (driver) => {
    driver.page.logout().logout();
  },

  'step 7 - login with user with no upcoming trips, validate no upcoming trips message': (driver) => {
    const login = driver.page.login();
    login.fillLoginDetails(driver.globals.users.portalUser11);
  },

  'step 8 - Navigate to view trips and validate no upcoming trips message': (driver) => {

    driver.waitAndClickByCss('#layout_2');
    driver.useXpath();
    // this is to overcome "searching for trips" title display on the same selector as "you have no upcoming trips" selector.
    const titleSelector = '//*[@id="my-trips"]/div/div[1]/h2';
    driver.waitForElementVisible(titleSelector);
    driver.getText(titleSelector, function(result){
      if (result.value === 'Searching for trips...'){
        driver.pause(4000);
      }
    });

    // driver.waitForTextByXpath('//*[@id="my-trips"]/div/div[1]/h2', 'you have no upcoming trips');    //TODO: DE9445
    // driver.waitForTextByXpath('//*[@id="my-trips"]/div/div[1]/div/p', "Once you have a CWT trip, it will be automatically displayed here.\n" +
    //   " Have trip reservations that do not appear here?\n" +
    //   "Forward the confirmation email to");
    // driver.waitForAttributeContainsByXpath('//*[@id="my-trips"]/div/div[1]/div/p/a', 'href', 'mailto:%20plans@cwttogo.com');

    // validate search field exist
    driver.waitForAttributeContainsByCss('#my-trips-search-input', 'placeholder', 'Search for city airport or landmark');
    // validate past trip exist
    driver.waitForTextByXpath('//*[@id="my-trips"]/div/div[2]/ul/li/div/div/div/div/h3/span/span', 'Trip to Berlin');
  },

  'step 9 - Logout' : (driver) => {
    driver.page.logout().logout();
  },

  'step 10 - login with user with no past trips, validate no past trips message': (driver) => {
    const login = driver.page.login();
    login.fillLoginDetails(driver.globals.users.portalUser12);
  },

  'step 11 - Navigate to view trips and validate no past trips message': (driver) => {
    driver.waitAndClickByCss('#layout_2');
    driver.waitForTextByXpath('//*[@id="my-trips"]/div/div[2]/h2', 'You have no past trips');
    driver.waitForTextByXpath('//*[@id="my-trips"]/div/div[2]/div/p', 'Your past trips will be automatically displayed here.');
    // validate search field don't exist
    driver.useCss();
    driver.waitForElementNotPresent('#my-trips-search-input', 'placeholder', 'Search for city airport or landmark');
    // validate upcoming trip exist
    driver.waitForTextByXpath('//*[@id="my-trips"]/div/div[1]/ul/li/div/div[1]/div/h6', 'Trip to Santa Ana, CA');
  },

  'step 12 - Logout' : (driver) => {
    driver.page.logout().logout();
  },

  //    ---------------------------------- Travel arranger, validate travelers trips empty state messages -----------------------------------

  'step 13 - login with TA': (driver) => {
    const login = driver.page.login();
    login.fillLoginDetails(driver.globals.users.portalUser13);
  },

  'step 14 - Navigate to traveler with no trips and validate no past trips message': (driver) => {
    driver.waitAndClickByCss('#layout_3');
    // search for traveler one
    driver.waitAndSetValueByCss('#travel-arranger-search-input', 'one');
    // click on traveler name (One)
    driver.waitAndClickByXpath('//*[@id="OnlineItineraryApp"]/div/div/table/tbody/tr/td[1]/a');
    driver.waitForTextByXpath('//*[@id="my-trips"]/div/h2', 'Traveler has no trips');
    driver.waitForTextByXpath('//*[@id="my-trips"]/div/div/div[1]/p[1]', "Once traveler has a CWT trip, it will be automatically displayed here. The traveler's past trips will appear below.");
    // driver.waitForTextByXpath('//*[@id="my-trips"]/div/div/div[1]/p[2]', "Have trip reservations for this user that do not appear here? Forward the confirmation email to");   //TODO: DE9445
    // driver.waitForAttributeContainsByXpath('//*[@id="my-trips"]/div/div/div[1]/p[2]/a', 'href', 'mailto:%20plans@cwttogo.com');
    driver.waitForAttributeContainsByXpath('//*[@id="my-trips"]/div/div/div[2]/figure', 'class', 'empty-img');
  },

  'step 15 - Navigate to traveler with no upcoming trips and validate no upcoming trips message': (driver) => {
    driver.waitAndClickByCss('#layout_3');
    // search for traveler two
    driver.waitAndSetValueByCss('#travel-arranger-search-input', 'two');
    // click on traveler name (Two)
    driver.waitAndClickByXpath('//*[@id="OnlineItineraryApp"]/div/div/table/tbody/tr/td[1]/a');
    driver.waitForTextByXpath('//*[@id="my-trips"]/div/div[1]/h2', 'traveller has no upcoming trips');
    driver.waitForTextByXpath('//*[@id="my-trips"]/div/div[1]/div/p', "Once traveler has a CWT trip, it will be automatically displayed here");    //TODO: DE9445
    // driver.waitForAttributeContainsByXpath('//*[@id="my-trips"]/div/div[1]/div/p/a', 'href', 'mailto:%20plans@cwttogo.com');
  },

  'step 16 - Navigate to traveler with no past trips and validate no past trips message': (driver) => {
    driver.waitAndClickByCss('#layout_3');
    // Search for traveler three
    driver.waitAndSetValueByCss('#travel-arranger-search-input', 'three');
    // click on traveler name (Three)
    driver.waitAndClickByXpath('//*[@id="OnlineItineraryApp"]/div/div/table/tbody/tr/td[1]/a');
    driver.waitForTextByXpath('//*[@id="my-trips"]/div/div[2]/h2', 'Traveller has no past trips');
    driver.waitForTextByXpath('//*[@id="my-trips"]/div/div[2]/div/p', "The traveler's past trips will be automatically displayed here.");
  },

  'step 17 - Logout' : (driver) => {
    driver.page.logout().logout();
  },

};