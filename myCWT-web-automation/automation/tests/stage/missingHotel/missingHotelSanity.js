'use strict';

module.exports = {

  '@tags': ['sanity', 'missingHotel'],

  before: function (driver) {
    driver.windowMaximize();
  },

  'step 1 - login to portal' : (driver) => {
    const login = driver.page.login();
    login.fillLoginDetails(driver.globals.users.growthUser1);
  },

  'step 1.1 - Validate home header items' : (driver) => {
    driver.useCss();
    driver.waitForText('#heroMsgUsername', 'Peka,');
    driver.waitForText('#heroMsgBody', 'how can we help with your travel plans?');
    driver.waitForText('.trip-name-label', 'Your upcoming trip:');
  },

  'step 2 - Missing accommodation card appears' : (driver) => {
    /*
      Verify that missing accommodation card appears
     */
    driver.useCss();
    driver.waitForAttributeContains('#missingAccommodation-1','class', 'slick-slide');
  },

  'step 3 - Check if missing accommodation general response appears' : (driver) => {
    /*
      Verify that missing accommodation card appears
     */
    driver.useCss();
    driver.waitForAttributeContains('.segment-type-missing-accommodation','class', 'error');
    driver.useXpath();
    driver.waitForText('//*[@class="error-message"]/h3[1]', 'Check out our hotel recommendations, tailored personally for you');
  },

  'step 4 - Click on view hotels and verify you have search hotel screen' : (driver) => {
    /*
      Verify that missing accommodation card appears
     */

    driver.useXpath();
    driver.waitAndClick('//*[@class="error-message"]/button[1]');
    driver.waitForUrlToContain('book-a-hotel#/hotel-results?', 8000);
  },

  'step 5 - Logout' : (driver) => {
    driver.page.logout().logout();
  },

  'step 6 - Login with different user' : (driver) => {
    const login = driver.page.login();
    login.fillLoginDetails(driver.globals.users.growthUser2);
  },

  'step 7 - Check that old missing accommodation card appears' : (driver) => {
    /*
      Verify that missing accommodation card appears
     */
    driver.useCss();
    driver.waitForAttributeContains('#missingAccommodation-1','class', 'slick-slide');
    driver.waitForAttributeContains('.segment-type-missing-accommodation','class', 'hotel-not-eligable');
  },
  'step 8 - Logout' : (driver) => {
    driver.page.logout().logout();
  },
  // 'step 3 - Check that result appear or error card' : (driver) => {
  //   /*
  //       Verify that result is returned with hotel recommendation
  //    */
  //   driver.useCss();
  //   // check animation exist
  //   driver.waitForAttributeContains('.segment-type-hotel-recommendation','class', 'include-loader');
  //   // check if hotel was found
  //   driver.waitForText('.label-text', 'Best match for your stay');
  // },

  // 'step 4 - click on view hotel and verify we got hotel rooms' : (driver) => {
  //   /*
  //       Verify that when you click booking you go to the right place
  //    */
  //   driver.useCss();
  //   driver.waitAndClick('.button-book');
  //   driver.waitForUrlToContain('book-a-hotel#/hotel-details?', 8000);
  // }

 /* 'step 3 - Validate home booking panel' : (driver) => {
    // // Booking panel
    // driver.useXpath();
    // driver.waitForAttributeContains('//*[@id="recommended-banner-new-img"]', 'src', 'travel.stage-mycwt.com/o/cwt-portal-theme/images/_/node_modules/cwt-booking-web-core/dist/assets/images/new.758759c2b6ae90b431a72d7f7665d3c7.png');
    // driver.waitForText('//*[@id="recommended-banner"]', 'EXPRESS HOTEL BOOKING: GET INSTANT & PERSONALIZED RECOMMENDATIONS');
    // Going to
    driver.useXpath();
    driver.waitForText('//*[@id="hotel-search-panel-row"]/div/div[1]/div/label', 'GOING TO');
    driver.useCss();
    driver.waitForText('.autocomplete-placeholder', 'Search for city, airport or landmark');
    driver.useXpath();
    driver.waitForAttributeContains('//*[@id="hotel-search-panel-row"]/div/div[1]/div/div[2]/div/span[2]/i', 'class', 'cwt-icons-search');
    // Check in
    driver.waitForText('//*[@id="hotel-search-panel-row"]/aside[1]/div[1]/div[1]/div[1]', 'CHECK IN');
    driver.waitForText('//*[@id="hotel-search-panel-row"]/aside[1]/div[1]/div[2]/div/div[1]/div[1]/div', 'Select Date');
    driver.waitForAttributeContains('//*[@id="hotel-search-panel-row"]/aside[1]/div[1]/div[1]/i[1]', 'class', 'cwt-icons-checkIn');
    // Check out
    driver.waitForText('//*[@id="hotel-search-panel-row"]/aside[1]/div[1]/div[1]/div[2]', 'CHECK OUT');
    driver.waitForText('//*[@id="hotel-search-panel-row"]/aside[1]/div[1]/div[2]/div/div[1]/div[3]/div', 'Select Date');
    driver.waitForAttributeContains('//*[@id="hotel-search-panel-row"]/aside[1]/div[1]/div[1]/i[2]', 'class', 'cwt-icons-checkOut');

    // Search for location
    driver.useCss();
    driver.waitAndSetValue('.hotel-search-panel .Select-control input', 'rom');
    driver.pause(1000);
    driver.waitAndSetValue('.hotel-search-panel .Select-control input', 'e');      //the text is splitted due to this defect:
    // Select the first option in the results
    driver.waitAndClick('.Select .Select-option:nth-child(1)');
    // Select dates (using 2 days)
    driver.selectDatesInSearchHotelBar();
    // Click on find button
    driver.waitAndClick('#nw-search-hotel');
    // Validate booking page URL
    driver.waitForUrlToContain('travel.stage-mycwt.com/group/incredibles_subunit_4-incredible_tests1/book-a-hotel#', 20000);
  },

  'step 3.1 - Validate travel alerts' : (driver) => {
    // Home title
    driver.waitAndClick('#layout_1');
    // driver.waitForAttributeContains('#alert-icon-warning','class', 'cwt-icons-warning');
    driver.waitForText('#alert-warning-text', 'SAFETY ALERTS');
    driver.waitAndClick('#alert-warning-text');
    // Tooltip
    driver.useXpath();
    driver.waitForText('//*[@id="trips-travel-alerts-popover"]/div[2]/div/div/div[1]/div/h4', 'United Kingdom - Measles');
    driver.waitForText('//*[@id="trips-travel-alerts-popover"]/div[2]/div/div/div[1]/div/div[2]/div', 'AUTOMATION-This is the active to test');
    driver.useCss();
    driver.waitForText('#alert-tooltip-last-updated', 'Last Updated: Mar 26, 2018');
    driver.waitForText('#alert-tooltip-alert-number', '1/3 Alerts');
    driver.waitForText('#alert-tooltip-show-all', 'Show All');
    driver.waitForAttributeContains('#alert-tooltip-service-medical','class', 'cwt-icons-medical');
    driver.waitAndClick('#alert-tooltip-service-medical');
    // Dialog
    driver.waitForText('#alert-main-trip-name', 'Trip to Tokyo');
    driver.waitForText('#alert-main-alert-number', 'Alert 1/3');
    driver.waitForAttributeContains('[data-id=alert-main-service]','class', 'cwt-icons-medical');
    driver.waitForText('#alert-main-category', 'United Kingdom - Measles');
    driver.waitForText('#alert-main-title', 'AUTOMATION-This is the active to test');
    driver.waitForText('#alert-main-description', 'AUTOMATION-This is the summary of the "active to test" - Most cases have been in unvaccinated individuals. Measles is caused by a highly contagious virus that spreads from person-to-person via infectious droplets. Typical symptoms include fever, cough and a characteristic rash. Serious to fatal complications can occur - particularly when very young children, adults or pregnant women are infected. All travellers should ensure they are fully immunised against measles.');
    driver.waitForText('#alert-main-last-updated', 'Last Updated: Mar 26, 2018');
    // Dialog footer
    driver.waitForText('#alert-main-helpful-title', 'Is this alert helpful?');
    driver.waitForAttributeContains('#alert-main-helpful-yes-button', 'value', 'Yes');
    driver.waitForAttributeContains('#alert-main-helpful-no-button', 'value' ,'No');
    driver.waitForText('#alert-main-powered-by-text', 'Powered by:');
    driver.waitForAttributeContains('[data-id=alert-main-isos-logo]','src', 'travel.stage-mycwt.com/o/cwt-portal-theme/images/_/node_modules/cwt-itinerary-portlet-spa/node_modules/trip-alerts/dist/assets/images/isos');
    driver.waitForAttributeContains('[data-id=alert-main-control-risks-logo]','src', 'travel.stage-mycwt.com/o/cwt-portal-theme/images/_/node_modules/cwt-itinerary-portlet-spa/node_modules/trip-alerts/dist/assets/images/control-risk');
    driver.waitAndClick('.modal-container__close');
  },

  'step 4 - Validate home itinerary flight card' : (driver) => {
    driver.useXpath();
    driver.waitForText('//*[@id="air-1"]/div/p', 'WED, JUN 4');
    driver.waitForAttributeContains('//*[@id="air-1"]/div/div/div[2]/span[1]', 'class', 'cwt-icon-plane');
    driver.waitForText('//*[@id="air-1"]/div/div/div[2]/h4', 'Aeroflot 262');
    driver.waitForAttributeContains('//*[@id="air-1"]/div/div/div[2]/span[2]', 'class', 'airline-logo');
    driver.waitForText('//*[@id="air-1"]/div/div/div[3]/div[1]/p[2]/span[2]', 'LHR');
    driver.waitForText('//*[@id="air-1"]/div/div/div[3]/div[1]/p[2]/span[3]', '11:00 AM');
    driver.waitForText('//*[@id="air-1"]/div/div/div[3]/div[3]/p[2]/span[2]', 'SVO');
    driver.waitForText('//*[@id="air-1"]/div/div/div[3]/div[3]/p[2]/span[3]', '4:50 PM');
    driver.waitForText('//*[@id="air-1"]/div/div/div[3]/div[1]/span', 'WED, JUN 04');
    driver.waitForText('//*[@id="air-1"]/div/div/div[3]/div[1]/div/p', 'Heathrow Airport, London, GB');
    driver.waitForText('//*[@id="air-1"]/div/div/div[3]/div[3]/span', 'WED, JUN 04');
    driver.waitForText('//*[@id="air-1"]/div/div/div[3]/div[3]/div/p', 'Sheremetyevo Airport, Moscow, RU');
    // Flight layover
    driver.waitForAttributeContains('//*[@id="flightConnection-1"]/div/div/div[2]/i', 'class', 'cwt-icon-time');
    driver.waitForText('//*[@id="flightConnection-1"]/div/div[1]/div[2]/p', "Layover 2H 10M");
  },

  // 'step 5 - Validate home itinerary missing hotel card' : (driver) => {
  //   driver.useXpath();
  //   driver.waitForText('//*[@id="missingAccommodation-1"]/div/p', 'THU, JUN 5');
  //   driver.waitForAttributeContains('//*[@id="missingAccommodation-1"]/div/div/div/i', 'class', 'cwt-icon-hotel');
  //   driver.waitForText('//*[@id="missingAccommodation-1"]/div/div/div/h4', 'Your itinerary is missing a hotel');
  //   driver.waitForText('//*[@id="missingAccommodation-1"]/div/div/div/div/span', '5 nights | Jun 05 - Jun 10');
  //   driver.waitForText('//*[@id="missingAccommodation-1"]/div/div/p[1]', "Have a reservation that wasn't made with CWT?");
  //   driver.waitForText('//*[@id="missingAccommodation-1"]/div/div/p[2]', 'To add it to your trip, forward your confirmation email to:\nplans@cwttogo.com');
  // },

  'step 6 - Validate home itinerary car card' : (driver) => {
    driver.useCss();
    driver.clickToSlide('#itinerary-next', 2);
    driver.useXpath();
    driver.waitForText('//*[@id="car-1"]/div/p', 'SAT, JUN 7');
    driver.waitForAttributeContains('//*[@id="car-1"]/div/div/div[1]/span', 'class', 'cwt-icon-car');
    driver.waitForText('//*[@id="car-1"]/div/div/div[1]/h4', 'DOLLAR');
    // driver.waitForText('//*[@id="car-1"]/div/div/div[1]/div/ul/li[1]/span', 'Confirmation#: R4083926');      //TODO:DE9294
    driver.waitForText('//*[@id="car-1"]/div/div/div[2]/div[1]/p/span[1]', "PICK-UP");
    driver.waitForText('//*[@id="car-1"]/div/div/div[2]/div[1]/p/span[2]', '1:10 PM');
    driver.waitForText('//*[@id="car-1"]/div/div/div[2]/div[3]/p/span[1]', "DROP-OFF");
    driver.waitForText('//*[@id="car-1"]/div/div/div[2]/div[3]/p/span[2]', '8:20');
    driver.waitForText('//*[@id="car-1"]/div/div/div[2]/div[2]/div[2]/div/span', "1 NIGHT");
    driver.waitForText('//*[@id="car-1"]/div/div/div[2]/div[1]/span', 'SAT, JUN 07');
    driver.waitForText('//*[@id="car-1"]/div/div/div[2]/div[1]/div/p', "DEN");
    driver.waitForText('//*[@id="car-1"]/div/div/div[2]/div[3]/span', 'SAT, JUN 07');
    driver.waitForText('//*[@id="car-1"]/div/div/div[2]/div[3]/div/p', 'DEN');
  },

  'step 7 - Validate home itinerary hotel card' : (driver) => {
    driver.useCss();
    driver.clickToSlide('#itinerary-next', 1);
    driver.useXpath();
    driver.waitForText('//*[@id="hotel-1"]/div/p', 'SUN, JUN 8');
    driver.waitForAttributeContains('//*[@id="hotel-1"]/div/div/div[1]/i', 'class', 'cwt-icon-hotel');
    driver.waitForText('//*[@id="hotel-1"]/div/div/div[1]/h4', 'COUNTRY INN STS DENVER AIR');
    driver.waitForText('//*[@id="hotel-1"]/div/div/div[1]/div/span', '4343 N. Airport Way,');
    driver.waitForText('//*[@id="hotel-1"]/div/div/div[2]/div[1]/p', 'CHECK-IN\nSUN, JUN 08');
    driver.waitForText('//*[@id="hotel-1"]/div/div/div[2]/div[3]/p', 'CHECK-OUT\nMON, JUN 09');
    driver.waitForText('//*[@id="hotel-1"]/div/div/div[2]/div[2]/div[2]/div/span', "1 NIGHT");
    driver.waitForText('//*[@id="hotel-1"]/div/div/div[3]', 'Room Type: Z8XX107');
    // driver.waitForText('//*[@id="hotel-1"]/div/div/ul/li[1]/span', "Confirmation#: 8KQDJH4");   //TODO:DE9294
    driver.waitForAttributeContains('//*[@id="hotel-1"]/div/div/ul/li[2]/span/i', 'class', 'cwt-icon-phone');
    driver.waitForText('//*[@id="hotel-1"]/div/div/ul/li[2]/span/a', '1-303-375-1105');
  },

  'step 8 - validate home itinerary rail card' : (driver) => {
    driver.useCss();
    driver.clickToSlide('#itinerary-next', 2);
    driver.useXpath();
    driver.waitForText('//*[@id="rail-1"]/div/p', 'MON, JUN 9');
    driver.waitForAttributeContains('//*[@id="rail-1"]/div/div/div[1]/span', 'class', 'cwt-icon-rail');
    driver.waitForText('//*[@id="rail-1"]/div/div/div[1]/h4', 'Amtrak');
    driver.waitForText('//*[@id="rail-1"]/div/div/div[1]/div/span', 'Santa Ana John Wayne Santa Ana US');
    driver.waitForText('//*[@id="rail-1"]/div/div/div[2]/div[1]/p[1]/span[3]', '9:30 AM');
    driver.waitForText('//*[@id="rail-1"]/div/div/div[2]/div[3]/p[1]/span[3]', '11:30 AM');
    driver.waitForText('//*[@id="rail-1"]/div/div/div[2]/div[2]/div[2]/div/span', "1D 2H 0M");
    driver.waitForText('//*[@id="rail-1"]/div/div/div[2]/div[1]/span', 'MON, JUN 09');
    driver.waitForText('//*[@id="rail-1"]/div/div/div[2]/div[1]/div/p', "Santa Ana John Wayne Santa Ana US");
    driver.waitForText('//*[@id="rail-1"]/div/div/div[2]/div[3]/span', 'TUE, JUN 10');
    driver.waitForText('//*[@id="rail-1"]/div/div/div[2]/div[3]/div/p', 'San Diego San Diego US');
  },

  'step 8.1 - validate openX banner' : (driver) => {
    driver.validateUrlResponse('https://ox-d.carlsonwagonlit.com/w/1.0/ai?auid=539477932&c.cid=a%3A96fc4&cs=539477932-a_96fc4-jkjtxky8b51a63a4-d171-3ed2-9683-5174a6e6e1c6&c.ulang=en&cb=1533653897552&c.ccountry=US&c.ocountry=GB&c.dcountry=US&c.carrier=SU&c.class=Y&c.ddate=2025-06-04&c.rdate=2025-06-10');
  },

  'step 9 - validate home company news items' : (driver) => {
    driver.scrollToLocation(0, 615);
    driver.useXpath();
    driver.waitForText('//*[@id="portlet_companynewsportlet_WAR_cwtportalportlet"]/div/div/div/div/div/h2', 'Company News');
    driver.waitForText('//*[@id="portlet_companynewsportlet_WAR_cwtportalportlet"]/div/div/div/div/div/div/div[1]/div[2]', 'Welcome to your improved traveler website!');
    driver.waitForText('//*[@id="portlet_companynewsportlet_WAR_cwtportalportlet"]/div/div/div/div/div/div/div[1]/div[3]', 'FEB 28, 2018');
    driver.useCss();
    driver.waitForText('#read-more-link-11138342', 'Read More');
    driver.waitAndClick('#read-more-link-11138342');
    driver.useXpath();
    driver.waitForText('//*[@id="portlet_companynewsportlet_WAR_cwtportalportlet"]/div/div/div/div/div/div/div[2]/div[1]', 'Today marks a big step forward in providing you with a modern, useful online experience.');
    driver.waitForText('//*[@id="portlet_companynewsportlet_WAR_cwtportalportlet"]/div/div/div/div/div/div/div[2]/div[2]/p', 'Your new website, myCWT, is easier to use and provides you with the essential tools you need to plan, book and manage your travel.\nThis is just the beginning! We’ll add new features in upcoming months, so make sure you bookmark https://www.mycwt.com to your favorites bar.');
    driver.useCss();
    driver.waitForText('#read-less-link-11138342', 'Read Less');
    driver.waitAndClick('#read-less-link-11138342');
  },

  'step 10 - Validate home company resources items' : (driver) => {
    driver.useXpath();
    driver.waitForText('//*[@id="portlet_companyresourcesportlet_WAR_cwtportalportlet"]/div/div/div/div/div/h2', 'Company Resources');
    driver.waitForText('//*[@id="portlet_companyresourcesportlet_WAR_cwtportalportlet"]/div/div/div/div/div/ul/li/a', 'Evya URL test 1');
    driver.waitAndClick('//*[@id="portlet_companyresourcesportlet_WAR_cwtportalportlet"]/div/div/div/div/div/ul/li/a');

    // Switch to the second tab [1]
    driver.switchToTab(1);
    // Validate second tab URL
    driver.waitForUrlToContain('edition.cnn.com/', 20000);
    // Close second tab
    driver.closeWindow();
    driver.pause(1000);
    // Switch back to the first tab [0]
    driver.switchToTab(0);
  },

  'step 11 - Validate home navigation links' : (driver) => {
    driver.useCss();
    // Book a hotel
    driver.waitForText('#layout_2', 'BOOK A HOTEL');
    driver.waitAndClick('#layout_2');
    driver.waitForUrlToContain('travel.stage-mycwt.com/group/incredibles_subunit_4-incredible_tests1/book-a-hotel#/', 20000);
    // Home
    driver.waitAndClick('#layout_1');
    driver.waitForUrlToContain('travel.stage-mycwt.com/group/incredibles_subunit_4-incredible_tests1#/', 20000);
    // My Tripsportal-sanity1@mailtest.worldmate.com
    driver.waitForText('#layout_3', 'MY TRIPS');
    driver.waitAndClick('#layout_3');
    driver.pause(3000);
    driver.waitForUrlToContain('travel.stage-mycwt.com/group/incredibles_subunit_4-incredible_tests1/my-trips#/', 20000);

    // My travelers
    driver.waitForText('#layout_4', 'MY TRAVELERS');
    driver.waitAndClick('#layout_4');
    driver.pause(3000);
    driver.waitForUrlToContain('travel.stage-mycwt.com/group/incredibles_subunit_4-incredible_tests1/my-travelers#/', 20000);

    // Traveler tools
    driver.waitForText('#layout_5', 'TRAVEL TOOLS');
    driver.waitAndClick('#layout_5');
    driver.pause(3000);
    driver.waitForUrlToContain('travel.stage-mycwt.com/group/incredibles_subunit_4-incredible_tests1/travel-tools#/', 20000);

    // CWT Analytiqs
    driver.waitForText('#layout_6', 'CWT ANALYTIQS');
    driver.waitAndClick('#layout_6');
    driver.pause(3000);
    // Switch to the second tab [1]
    driver.switchToTab(1);
    // Validate second tab URL
    driver.waitForUrlToContain('analytiqs.preprod.carlsonwagonlit.com');
    // Close second tab
    driver.closeWindow();
    driver.pause(1000);
    // Switch back to the first tab [0]
    driver.switchToTab(0);

    // Home
    driver.waitAndClick('#layout_1');
    driver.waitForUrlToContain('travel.stage-mycwt.com/group/incredibles_subunit_4-incredible_tests1#/', 20000);
    // Admin
    driver.refresh();
    driver.waitForText('#layout_7', 'ADMIN');
    driver.waitAndClick('#layout_7');
    driver.waitForUrlToContain('travel.stage-mycwt.com/group/incredibles_subunit_4-incredible_tests1/admin#/', 40000);
    // Home
    driver.waitAndClick('#layout_1');
    driver.waitForUrlToContain('travel.stage-mycwt.com/group/incredibles_subunit_4-incredible_tests1#/', 20000);
    // Account settings
    // driver.refresh();
    // click on "my account".
    driver.waitForText('#header-my-account-menu', 'My Account');
    driver.waitAndClick('#header-my-account-menu');
    driver.pause(500);
    // click on "account settings".
    driver.waitAndClick('#header-login-settings');
    driver.waitForUrlToContain('travel.stage-mycwt.com/group/incredibles_subunit_4-incredible_tests1/login-settings#/', 20000);
    // validate account settings page open (checking the title)
    driver.useXpath();
    driver.waitForText('//*[@id="accountSettings"]/h1/span','Account Settings');
    // Home
    driver.useCss();
    driver.waitAndClick('#layout_1');
    driver.waitForUrlToContain('travel.stage-mycwt.com/group/incredibles_subunit_4-incredible_tests1#/', 20000);
    // My travel profile
    driver.waitForText('#header-profile-link', 'MY TRAVEL PROFILE');
    driver.waitAndClick('#header-profile-link');

    // Switch to the second tab [1]
    driver.switchToTab(1);
    // Validate second tab URL
    driver.waitForUrlToContain('test2profile.carlsonwagonlit.com/profile/profile-mgmt/edit/portalblue', 20000);
    // Close second tab
    driver.closeWindow();
    driver.pause(1000);
    // Switch to the first tab [0]
    driver.switchToTab(0);
    // Validate first tab URL
    driver.waitForUrlToContain('travel.stage-mycwt.com/group/incredibles_subunit_4-incredible_tests1#/', 20000);
  },


//   ----------------------------------Sanity, view trips----------------------------------


  'step 12 - Validate view trips upcoming' : (driver) => {
    // click on my trips button
    driver.waitAndClick('#layout_3');
    driver.useXpath();

    // this is to overcome "searching for trips" title display on the same selector as "my upcoming trips" selector.
    const titleSelector = '//*[@id="my-trips"]/div/div[1]/h2';
    driver.waitForElementVisible(titleSelector);
    driver.getText(titleSelector, function(result){
      if (result.value === 'Searching for trips...'){
        driver.pause(8000);
      }
    });

    // view trips main title
    driver.waitForText('//*[@id="my-trips"]/div/div[1]/h2', 'My Upcoming trips (1)');
    // trip title
    driver.waitForText('//*[@id="my-trips"]/div/div[1]/ul/li/div/div[1]/div/h6', 'Trip to Tokyo');
    // trip location
    driver.waitForText('//*[@id="my-trips"]/div/div[1]/ul/li/div/div[1]/div/p[1]', 'Tokyo, JP');

    // trip dates and duration (this is to bypass acceptability changes, where all text located in different spans, eliminating "enter" hits)
    const selector = '//*[@id="my-trips"]/div/div[1]/ul/li/div/div[1]/div/p[2]';
    driver.waitForElementVisible(selector);
    driver.getText(selector, function(result){
      const textValue = result.value.replace(/(\r\n\t|\n|\r\t)/gm,"");
      this.assert.equal(textValue, "Starts onJun 4  -  EndsJun 10, 2025 | 6 nights");
    });

    // flight item
    driver.waitForAttributeContains('//*[@id="my-trips"]/div/div[1]/ul/li/div/div[2]/div[1]/span', 'class', 'cwt-icon-plane');
    driver.waitForText('//*[@id="my-trips"]/div/div[1]/ul/li/div/div[2]/div[1]/div/div/span/span', 'LHR - SVO - NRT');
    // missing hotel item
    driver.waitForAttributeContains('//*[@id="my-trips"]/div/div[1]/ul/li/div/div[2]/div[2]/span', 'class', 'cwt-icon-hotel text-danger');
    driver.waitForText('//*[@id="my-trips"]/div/div[1]/ul/li/div/div[2]/div[2]/div/div/span/span', 'Missing Hotel');
    // car item
    driver.waitForAttributeContains('//*[@id="my-trips"]/div/div[1]/ul/li/div/div[2]/div[3]/span', 'class', 'cwt-icon-car');
    driver.waitForText('//*[@id="my-trips"]/div/div[1]/ul/li/div/div[2]/div[3]/div/div/span/span', 'DOLLAR');
    // hotel item
    driver.waitForAttributeContains('//*[@id="my-trips"]/div/div[1]/ul/li/div/div[2]/div[4]/span', 'class', 'cwt-icon-hotel');
    driver.waitForText('//*[@id="my-trips"]/div/div[1]/ul/li/div/div[2]/div[4]/div/div/span/span', 'COUNTRY INN STS DENVER AIR');
    // rail item
    driver.waitForAttributeContains('//*[@id="my-trips"]/div/div[1]/ul/li/div/div[2]/div[5]/span', 'class', 'cwt-icon-rail');
    driver.waitForText('//*[@id="my-trips"]/div/div[1]/ul/li/div/div[2]/div[5]/div/div/span/span', 'Amtrak to San Diego');
  },

  'step 13 - Validate view trips past' : (driver) => {
    driver.useXpath();
    // Past trips main title
    driver.scrollToLocation(0, 541);
    driver.waitForText('//*[@id="my-trips-past-trips-title"]', 'My past trips (1)');
    // Search field pre-text and icon
    driver.useCss();
    driver.waitForAttributeContains('#my-trips-search-input', 'placeholder', 'Search for city airport or landmark');
    driver.waitForAttributeContains('#my-trips-past-search-button', 'class', 'cwt-icon-search');
    // Year title
    driver.useXpath();
    driver.waitForText('//*[@id="my-trips"]/div/div[2]/ul/li/div/p', '2016');
    // Past trip main title
    driver.waitForText('//*[@id="my-trips"]/div/div[2]/ul/li/div/div/div[1]/div/p[1]/span/span', 'Trip to Bangkok');
    // Past trip location
    driver.waitForText('//*[@id="my-trips"]/div/div[2]/ul/li/div/div/div[1]/div/p[2]/span/span', 'Bangkok, TH');

    // Past trip dates (this is to bypass acceptability changes, where all text located in different spans, eliminating "enter" hits)
    const selector = '//*[@id="my-trips"]/div/div[2]/ul/li/div/div/div[1]/div/p[3]';
    driver.waitForElementVisible(selector);
    driver.getText(selector, function(result){
      const textValue = result.value.replace(/(\r\n\t|\n|\r\t)/gm,"");
      this.assert.equal(textValue, "Starts onJul 29  -  EndsOct 29, 2016 | 92 nights");
    });

    // Flight item
    driver.waitForAttributeContains('//*[@id="my-trips"]/div/div[2]/ul/li/div/div/div[2]/div[1]/span', 'class', 'cwt-icon-plane');
    driver.waitForText('//*[@id="my-trips"]/div/div[2]/ul/li/div/div/div[2]/div[1]/div/div/span/span', 'WLG - SYD - BKK');
  },

  'step 14 - Validate view trips search' : (driver) => {
    // Scroll down
    driver.scrollToLocation(0, 541);
    // Add text for existing trip
    driver.useCss();
    driver.waitForElementVisible('#my-trips-search-input');
    driver.waitAndSetValue('#my-trips-search-input', 'Bangkok');
    // validate trip exist in the results
    driver.useXpath();
    driver.waitForText('//*[@id="my-trips"]/div/div[2]/ul/li/div/div/div[1]/div/p[1]/span/mark', 'Bangkok');
    // Clear value
    driver.useCss();
    driver.clearValue('#my-trips-search-input');
    // validate no trip display
    driver.waitAndSetValue('#my-trips-search-input', 'blabla');
    driver.useXpath();
    driver.waitForAttributeContains('//*[@id="my-trips"]/div/div[2]/ul/div/figure', 'class', 'empty-img');
    driver.waitForText('//*[@id="my-trips"]/div/div[2]/ul/div/figcaption', "No trips found for 'blabla'");
  },

//    ----------------------------------Trip details----------------------------------

  'step 15 - Validate trip details header' : (driver) => {
    driver.useXpath();
    // Click on the trip
    driver.waitAndClick('//*[@id="my-trips"]/div/div[1]/ul/li/div/div[1]');
    //TODO: replace with ID once it's fixed (sergey)
    // Home breadcrumb link
    driver.waitForText('//*[@id="tripDetails"]/div[1]/div[1]/div[1]/ol/li[1]/a', 'HOME');
    // click on home link
    driver.waitAndClick('//*[@id="tripDetails"]/div[1]/div[1]/div[1]/ol/li[1]/a');
    // validate home URL
    driver.useCss();
    driver.waitForUrl('https://travel.stage-mycwt.com/group/incredibles_subunit_4-incredible_tests1#/', 20000);
    // Click on my trips tab
    driver.waitAndClick('#layout_3');
    driver.useXpath();
    // click on the first trip
    driver.waitAndClick('//*[@id="my-trips"]/div/div[1]/ul/li/div/div[1]');
    // My trips breadcrumb link
    driver.useCss();
    driver.waitForText('[data-id=breadcrumb-my-trips]', 'MY TRIPS');
    // click on my trips breadcrumb link
    driver.waitAndClick('[data-id=breadcrumb-my-trips]');
    // validate my trips URL
    driver.refresh();
    driver.waitForUrlToContain('travel.stage-mycwt.com/group/incredibles_subunit_4-incredible_tests1/my-trips#', 20000);
    driver.useXpath();
    driver.waitAndClick('//*[@id="my-trips"]/div/div[1]/ul/li/div/div[1]');
    // location and dates
    driver.waitForText('//*[@id="tripDetails"]/div[1]/h1', 'Trip to Tokyo, JP');

    // trip dates (this is to bypass acceptability changes, where all text located in different spans, eliminating "enter" hits)
    const selector = '//*[@id="tripDetails"]/div[1]/p';
    driver.waitForElementVisible(selector);
    driver.getText(selector, function(result){
      const textValue = result.value.replace(/(\r\n\t|\n|\r\t)/gm,"");
      this.assert.equal(textValue, "Starts onJun 4  -  EndsJun 10, 2025 | 6 nights");
    });

    // map
    driver.waitForText('//*[@id="itinerary-map-open"]', 'MAP VIEW');
    driver.waitForAttributeContains('//*[@id="itinerary-map-open"]/i', 'class', 'cwt-icon-location');
    // Open map
    driver.useCss();
    driver.waitAndClick('#itinerary-map-open');
    // Close map
    // driver.useXpath();
    // driver.waitAndClick('//*[@id="itinerary-map-close"]');
    driver.refresh();
    // share
    driver.waitForText('[data-id=action-share-button]', 'SHARE');
    driver.useXpath();
    driver.waitForAttributeContains('//*[@id="header-share-link"]/button/i', 'class', 'cwt-icon cwt-icon-share');
    // Open share dialog
    driver.useCss();
    driver.waitAndClick('#header-share-link');
    // Close share dialog
    driver.waitAndClick('[data-id=share-close-button]');
    // download
    driver.waitForText('[data-id=action-download-button]', 'DOWNLOAD');
    driver.useXpath();
    driver.waitForAttributeContains('//*[@id="tripDetails"]/div[1]/div/div[2]/ul/li[2]/button/i', 'class', 'cwt-icon cwt-icon-download');
    // print
    driver.useCss();
    driver.waitForText('[data-id=action-print-button]', 'PRINT');
    driver.useXpath();
    driver.waitForAttributeContains('//*[@id="tripDetails"]/div[1]/div/div[2]/ul/li[3]/button/i', 'class', 'cwt-icon cwt-icon-print');
    // Travel alerts banner
    driver.waitForAttributeContains('//*[@id="tripDetails"]/div[1]/div[2]/div/i','class', 'cwt-icons-warning');
    driver.waitForText('//*[@id="tripDetails"]/div[1]/div[2]/div/p', '3 active alerts for this trip');
    driver.waitAndClick('//*[@id="tripDetails"]/div[1]/div[2]/div/p');
    driver.useCss();
    driver.waitForAttributeContains('.cwt-icons-medical','class', 'cwt-icons-medical');
    driver.waitForText('.alert-body__category', 'United Kingdom - Measles');
    driver.waitForText('.alert-body__title', 'AUTOMATION-This is the active to test');
    driver.waitForText('.alert-body__description', 'AUTOMATION-This is the summary of the "active to test" - Most cases have been in unvaccinated individuals. Measles is caused by a highly contagious virus that spreads from person-to-person via infectious droplets. Typical symptoms include fever, cough and a characteristic rash. Serious to fatal complications can occur - particularly when very young children, adults or pregnant women are infected. All travellers should ensure they are fully immunised against measles.');
    driver.waitForText('.alert-body__lastUpdateTime', 'Last Updated: Mar 26, 2018');
    driver.waitAndClick('.modal-container__close');
  },


  'step 16 - Validate trip details flight item' : (driver) => {
    driver.scrollToLocation(0, 200);
    driver.useXpath();
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[1]/div/div/p', 'WED, JUN 4');
    driver.waitForAttributeContains('//*[@id="tripDetails"]/div[2]/div/ul/li[1]/div/div/div/div[1]/i', 'class', 'cwt-icon-plane');

    // flight title, airline and number (this is to bypass acceptability changes, where all text located in different spans, eliminating "enter" hits)
    const selector = '//*[@id="tripDetails"]/div[2]/div/ul/li[1]/div/div/div/div[2]/h6';
    driver.waitForElementVisible(selector);
    driver.getText(selector, function(result){
      const textValue = result.value.replace(/(\r\n\t|\n|\r\t)/gm,"");
      this.assert.equal(textValue, "Flight to Moscow (SVO) | Airline carrier and flight code areAeroflot 262");
    });

    // driver.waitForAttributeContains('//*[@id="tripDetails"]/div[2]/div/div[2]/div/div/div[2]/h2/span', 'style', 'https://travel.stage-mycwt.com/public/flights/img/airlines/SU.png');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[1]/div/div/div/div[3]/div/div[1]/div[1]/h6/span[2]', 'LHR');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[1]/div/div/div/div[3]/div/div[1]/div[1]/h6/span[3]', '11:00 AM');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[1]/div/div/div/div[3]/div/div[1]/div[1]/p[2]', 'Heathrow Airport, London, GB');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[1]/div/div/div/div[3]/div/div[1]/div[2]/div/div[2]/div/span', '3H 50M');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[1]/div/div/div/div[3]/div/div[1]/div[3]/h6/span[2]', 'SVO');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[1]/div/div/div/div[3]/div/div[1]/div[3]/h6/span[3]', '4:50 PM');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[1]/div/div/div/div[3]/div/div[1]/div[3]/p[2]', 'Sheremetyevo Airport, Moscow, RU');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[1]/div/div/div/div[3]/div/div[2]/div/div[1]/label', 'TERMINAL');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[1]/div/div/div/div[3]/div/div[2]/div/div[1]/p', '1');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[1]/div/div/div/div[3]/div/div[2]/div/div[2]/label', 'GATE');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[1]/div/div/div/div[3]/div/div[2]/div/div[2]/p', '--');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[1]/div/div/div/div[3]/div/div[2]/div/div[3]/label', 'CONFIRMATION #');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[1]/div/div/div/div[3]/div/div[2]/div/div[3]/p', 'KGGR3Y');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[1]/div/div/div/div[3]/div/div[2]/div/div[4]/label', 'E-TICKET');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[1]/div/div/div/div[3]/div/div[2]/div/div[4]/p', '5558937637555');
    driver.waitForText('//*[@id="flight-check-in"]', 'CHECK-IN');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[1]/div/div/div/div[3]/div/div[4]/div[1]/button/span', 'MORE DETAILS');
    // flight connection
    driver.waitForAttributeContains('//*[@id="tripDetails"]/div[2]/div/ul/li[2]/div/div/div/div[1]/i', 'class', 'cwt-icon-time');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[2]/div/div/div/div[2]/h6', '2 Hours 10 Minutes Layover In SVO');
    // TODO: "Change of terminal" is currently disabled until further notice.
    // driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[2]/div/div/div/div[3]/span', 'Change of terminal is required');
  },

  'step 17 - Validate trip details missing hotel item' : (driver) => {
    driver.scrollToLocation(0, 1083);
    driver.useXpath();
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[4]/div/div/p', 'THU, JUN 5');
    driver.waitForAttributeContains('//*[@id="tripDetails"]/div[2]/div/ul/li[4]/div/div/div/div[2]/i', 'class', 'cwt-icon-hotel');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[4]/div/div/div/div[2]/h6', 'Portal Sanity, your itinerary is missing a hotel');
    // driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[4]/div/div/div/p', 'If you already have booked a hotel simply forward the confirmation email to plans@cwttogo.com');   //TODO: currently removed DE9445
    // driver.waitForAttributeContains('//*[@id="tripDetails"]/div[2]/div/ul/li[4]/div/div/div/p/a', 'href', 'mailto:plans@cwttogo.com');
    driver.useCss();
    driver.waitForText('.dismiss', 'DISMISS');
  },

  'step 18 - Validate trip details car item' : (driver) => {
    driver.scrollToLocation(0, 1323);
    driver.useXpath();
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[5]/div/div/p', 'SAT, JUN 7');
    driver.waitForAttributeContains('//*[@id="tripDetails"]/div[2]/div/ul/li[5]/div/div/div/div[1]/i', 'class', 'cwt-icon-car');

    // car pick-up title and agency name (this is to bypass acceptability changes, where all text located in different spans, eliminating "enter" hits)
    const pickUpSelector = '//*[@id="tripDetails"]/div[2]/div/ul/li[5]/div/div/div/div[2]/h6';
    driver.waitForElementVisible(pickUpSelector);
    driver.getText(pickUpSelector, function(result){
      const textValue = result.value.replace(/(\r\n\t|\n|\r\t)/gm,"");
      this.assert.equal(textValue, "Pick-Up |rental company isDOLLAR");
    });

    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[5]/div/div/div/div[3]/div/div[1]/div[1]/h6/span[1]', 'PICK-UP');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[5]/div/div/div/div[3]/div/div[1]/div[1]/h6/span[2]', '1:10 PM');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[5]/div/div/div/div[3]/div/div[1]/div[2]/div/div[2]/div/span', '1 Days');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[5]/div/div/div/div[3]/div/div[1]/div[3]/h6/span[1]', 'DROP-OFF');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[5]/div/div/div/div[3]/div/div[1]/div[3]/h6/span[2]', '8:20 PM');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[5]/div/div/div/div[3]/div/div[1]/div[3]/span', 'SAT, JUN 07');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[5]/div/div/div/div[3]/div/div[2]/div/div[1]/label', 'ADDRESS');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[5]/div/div/div/div[3]/div/div[2]/div/div[1]/p', 'DEN');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[5]/div/div/div/div[3]/div/div[2]/div/div[2]/label', 'PHONE #');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[5]/div/div/div/div[3]/div/div[2]/div/div[2]/p', '--');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[5]/div/div/div/div[3]/div/div[2]/div/div[3]/label', 'CONFIRMATION #');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[5]/div/div/div/div[3]/div/div[2]/div/div[3]/p', 'R4083926');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[5]/div/div/div/div[3]/div/div[4]/div[1]/button/span', 'MORE DETAILS');
    driver.refresh();
    driver.scrollToLocation(0, 1782);
    driver.waitForAttributeContains('//*[@id="tripDetails"]/div[2]/div/ul/li[6]/div/div/div/div[1]/i', 'class', 'cwt-icon-car');

    // car drop-off title and agency name (this is to bypass acceptability changes, where all text located in different spans, eliminating "enter" hits)
    const dropOffSelector = '//*[@id="tripDetails"]/div[2]/div/ul/li[6]/div/div/div/div[2]/h6';
    driver.waitForElementVisible(dropOffSelector);
    driver.getText(dropOffSelector, function(result){
      const textValue = result.value.replace(/(\r\n\t|\n|\r\t)/gm,"");
      this.assert.equal(textValue, "Drop-off |rental company isDOLLAR");
    });

    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[6]/div/div/div/div[3]/div/div[1]/div/div[1]/label', 'DROP-OFF TIME');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[6]/div/div/div/div[3]/div/div[1]/div/div[1]/p', '8:20');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[6]/div/div/div/div[3]/div/div[1]/div/div[2]/label', 'ADDRESS');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[6]/div/div/div/div[3]/div/div[1]/div/div[2]/p', 'DEN');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[6]/div/div/div/div[3]/div/div[1]/div/div[3]/label', 'PHONE #');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[6]/div/div/div/div[3]/div/div[1]/div/div[3]/p', '--');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[6]/div/div/div/div[3]/div/div[3]/div[1]/button/span', 'MORE DETAILS');
  },

  'step 19 - Validate trip details hotel item' : (driver) => {
    driver.scrollToLocation(0, 2059);
    driver.useXpath();
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[7]/div/div/p', 'SUN, JUN 8');
    driver.waitForAttributeContains('//*[@id="tripDetails"]/div[2]/div/ul/li[7]/div/div/div/div[1]/i', 'class', 'cwt-icon-hotel');

    // hotel check-in title and hotel name (this is to bypass acceptability changes, where all text located in different spans, eliminating "enter" hits)
    const checkInSelector = '//*[@id="tripDetails"]/div[2]/div/ul/li[7]/div/div/div/div[2]/h6';
    driver.waitForElementVisible(checkInSelector);
    driver.getText(checkInSelector, function(result){
      const textValue = result.value.replace(/(\r\n\t|\n|\r\t)/gm,"");
      this.assert.equal(textValue, "Check-in |hotel name isCOUNTRY INN STS DENVER AIR");
    });

    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[7]/div/div/div/div[3]/div/div[1]/div[1]/h6/span[1]', 'CHECK-IN');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[7]/div/div/div/div[3]/div/div[1]/div[1]/h6/span[2]', 'SUN, JUN 08');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[7]/div/div/div/div[3]/div/div[1]/div[2]/div/div[2]/div/span', '1 Nights');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[7]/div/div/div/div[3]/div/div[1]/div[3]/h6/span[1]', 'CHECK-OUT');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[7]/div/div/div/div[3]/div/div[1]/div[3]/h6/span[2]', 'MON, JUN 09');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[7]/div/div/div/div[3]/div/div[2]/div/div[1]/label', 'ADDRESS');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[7]/div/div/div/div[3]/div/div[2]/div/div[1]/p', '4343 N. Airport Way,');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[7]/div/div/div/div[3]/div/div[2]/div/div[2]/label', 'PHONE #');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[7]/div/div/div/div[3]/div/div[2]/div/div[2]/p', '1-303-375-1105');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[7]/div/div/div/div[3]/div/div[2]/div/div[3]/label', 'CONFIRMATION #');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[7]/div/div/div/div[3]/div/div[2]/div/div[3]/p', '8KQDJH4');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[7]/div/div/div/div[3]/div/div[4]/div[1]/button/span', 'MORE DETAILS');
    // check out
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[8]/div/div/p', 'MON, JUN 9');
    driver.waitForAttributeContains('//*[@id="tripDetails"]/div[2]/div/ul/li[8]/div/div/div/div[1]/i', 'class', 'cwt-icon-hotel');

    // hotel check-out title and hotel name (this is to bypass acceptability changes, where all text located in different spans, eliminating "enter" hits)
    const checkOutSelector = '//*[@id="tripDetails"]/div[2]/div/ul/li[8]/div/div/div/div[2]/h6';
    driver.waitForElementVisible(checkOutSelector);
    driver.getText(checkOutSelector, function(result){
      const textValue = result.value.replace(/(\r\n\t|\n|\r\t)/gm,"");
      this.assert.equal(textValue, "Check-out |hotel name isCOUNTRY INN STS DENVER AIR");
    });
  },

  'step 20 - Validate trip details rail item' : (driver) => {
    driver.scrollToLocation(0, 2591);
    driver.useXpath();
    driver.waitForAttributeContains('//*[@id="tripDetails"]/div[2]/div/ul/li[9]/div/div/div/div[1]/i', 'class', 'cwt-icon-rail');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[9]/div/div/div/div[2]/h6', 'Amtrak 566');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[9]/div/div/div/div[3]/div/div[1]/div[1]/h6/span[2]', '9:30 AM');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[9]/div/div/div/div[3]/div/div[1]/div[1]/p[2]', 'Santa Ana John Wayne Santa Ana US');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[9]/div/div/div/div[3]/div/div[1]/div[2]/div/div[2]/div/span', '1D 2H 0M');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[9]/div/div/div/div[3]/div/div[1]/div[3]/h6/span[2]', '11:30 AM');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[9]/div/div/div/div[3]/div/div[1]/div[3]/span/p[1]', '+ 1 day');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[9]/div/div/div/div[3]/div/div[1]/div[3]/span/p[2]', 'San Diego San Diego US');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[9]/div/div/div/div[3]/div/div[2]/div/div[1]/label', 'DEPARTURE PLATFORM');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[9]/div/div/div/div[3]/div/div[2]/div/div[1]/p', '--');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[9]/div/div/div/div[3]/div/div[2]/div/div[2]/label', 'ARRIVAL PLATFORM');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[9]/div/div/div/div[3]/div/div[2]/div/div[2]/p', '--');
    driver.waitForText('//*[@id="tripDetails"]/div[2]/div/ul/li[9]/div/div/div/div[3]/div/div[4]/div[1]/button/span', 'MORE DETAILS');
  },

  'step 21 - Validate trip details share trip' : (driver) => {
    driver.scrollToLocation(0, 0);
    // Click on share button
    driver.useCss();
    driver.waitAndClick('.action-bar-item .btn-link:nth-child(1)');
    // Add email address in teh field and select it from the list
    driver.waitAndSetValue('.Select-input input', 'testmail@yopmail.com');
    // Click on the email suggested
    driver.waitAndClick('.Select-menu-outer');
    // Click on comments button (to open the field)
    driver.waitAndClick('.cwt-icon-open-comments');
    // Add text in comments field
    driver.waitAndSetValue('.form-control', 'Text for test');
    driver.pause(1000);
    // click on share button
    driver.waitAndClick('#modal-share-submit-button');
    // validate success message appear
    driver.waitForText('.share-trip-success', 'Your Itinerary was shared successfully');
    // close dialog
    driver.waitAndClick('.close-modal');
  },

  'step 22 - Validate trip details navigation links' : (driver) => {
    // breadcrumbs home.
    driver.waitForText('[data-id=breadcrumb-home]', 'HOME');
    // driver.refresh();
    driver.waitAndClick('[data-id=breadcrumb-home]');
    // Validate home URL
    driver.waitForUrlToContain('travel.stage-mycwt.com/group/incredibles_subunit_4-incredible_tests1#');
    // Back to the trip details (click on the first flight item)
    driver.waitAndClick('#air-1');
    // Validate trip url (coming from home)
    driver.waitForUrlToContain('travel.stage-mycwt.com/group/incredibles_subunit_4-incredible_tests1/my-trips/#/trip/231663/971131/air-1', 30000);
    // breadcrumbs my trips
    driver.waitForText('[data-id=breadcrumb-my-trips]', 'MY TRIPS');
    driver.waitAndClick('[data-id=breadcrumb-my-trips]');
    // Validate my trips url
    driver.waitForUrlToContain('travel.stage-mycwt.com/group/incredibles_subunit_4-incredible_tests1/my-trips/#/', 20000);
    // back to the trips details (click on the trip)
    driver.useXpath();
    driver.waitAndClick('//*[@id="my-trips"]/div/div[1]/ul/li/div/div[1]');
    // Validate trip url (coming from trip details)
    driver.waitForUrlToContain('travel.stage-mycwt.com/group/incredibles_subunit_4-incredible_tests1/my-trips/#/trip/231663/971131', 20000);
  },*/

  /*'step 23 - Logout' : (driver) => {
    driver.page.logout().logout();
  },*/

};