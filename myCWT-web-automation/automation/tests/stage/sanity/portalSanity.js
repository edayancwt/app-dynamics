'use strict';

const globals = require('../../../nightwatch.globals');
const pageHome = require('../../../pages/page-home');
const pageLogout = require('../../../pages/page-logout');
const pageHeader = require('../../../pages/page-header');
const pageMyTrips = require('../../../pages/page-my-trips');
const pageTripDetails = require('../../../pages/page-trip-details');

let NWTools = require('nightwatch-tools');
let randomNumber = NWTools.randomString(4,'1234567890');

module.exports = {

'@tags': ['sanity', 'portal'],

  before: function (browser) {
    browser.windowMaximize();
  },

 //    ----------------------------------Sanity, home----------------------------------

  'step 1 - Login': (browser) => {
    browser
      .loginToPortalStage(globals.users.portalUser1.username, globals.users.portalUser1.password);
  },

  'step 2 - Validate home header items' : (browser) => {
    browser
      // .waitForElementVisible('[data-testid="hero-welcome-message"] > :nth-child(1)', 20000)
      // Validate username
      .waitForTextByCss(pageHome.selectors.welcome.welcomeUsername, 'Aportal One')
      // Validate greeting text
      .waitForTextByCss(pageHome.selectors.welcome.welcomeGreeting, '');
  },

   'step 3 - Validate home booking panel' : (browser) => {
    browser
      // Going to
      // Validate search panel title
      .waitForTextByCss(pageHome.selectors.hotelSearch.panelTitle, 'myCWT hotel booking')
      // Validate going to title
      .waitForTextByCss(pageHome.selectors.hotelSearch.goingToTitle, 'GOING TO')
      // Validate going to pretext
      .waitForTextByCss(pageHome.selectors.hotelSearch.goingToPretext, 'Search for city, airport, office or landmark')
      // Validate going to icon
      .waitForAttributeContainsByCss(pageHome.selectors.hotelSearch.goingToIcon, 'class', 'CwtIcons__StyledIcon-sc-1zecbe-0')
      // todo - need to add ids
      // Check in
      // .waitForTextByXpath('//*[@id="shell"]/div[2]/div/div/div[2]/div[2]/div/div/div[2]/div[2]/div/div[3]/div[1]/div/div/div/div[1]', 'CHECK IN')
      // .waitForTextByCss('#cwt-date-range-start-date', 'Select Date')
      // .waitForAttributeContainsByXpath('//*[@id="hotel-search-panel-row"]/aside[1]/div[1]/div[1]/i[1]', 'class', 'cwt-icons-checkIn')

      //   // Check out
      //   browser.waitForTextByXpath('//*[@id="hotel-search-panel-row"]/aside[1]/div[1]/div[1]/div[2]', 'CHECK OUT');
      //   browser.waitForTextByXpath('//*[@id="hotel-search-panel-row"]/aside[1]/div[1]/div[2]/div/div[1]/div[3]/div', 'Select Date');
      //   browser.waitForAttributeContainsByXpath('//*[@id="hotel-search-panel-row"]/aside[1]/div[1]/div[1]/i[2]', 'class', 'cwt-icons-checkOut');
      //
      // Search for location
      .waitAndSetValueByCss(pageHome.selectors.hotelSearch.goingToInput, 'rome')
      // Select the first option in the results
      .waitAndClickByCss(pageHome.selectors.hotelSearch.searchResult1)
      // Select check in and checkout dates
      .selectSpecificUpcomingHotelDates(4, 7)
      // Click on search button
      .waitAndClickByCss(pageHome.selectors.hotelSearch.searchButton)
      // Validate booking page URL
      .waitForUrlToContain('travel.stage-mycwt.com/book-a-hotel#/hotel-results')
      // Click on the logo to go back to home page
      .waitAndClickByCss(pageHeader.selectors.logo.myCWTLogo);
  },
  'step 4 - Validate upcoming trip line' : (browser) => {
    browser
      .waitForTextByCss(pageHome.selectors.upcomingTrip.upcomingTripTitle, 'Your upcoming trip:')
      .waitForTextByCss(pageHome.selectors.upcomingTrip.upcomingTripText, 'Denver, CO | Jun 4, 2025 - Sep 3, 2025 (92 days)');
  },

  'step 5 - Validate travel alerts' : (browser) => {
    browser
      // Home title
      // Validate alerts icon
      .waitForAttributeContainsByCss(pageHome.selectors.alerts.alertsIcon,'class', 'CwtIcons__StyledIcon-sc-1zecbe-0 CwtIcons-sc-1zecbe-1 haenKD')
      // Validate alerts title
      .waitForTextByCss(pageHome.selectors.alerts.alertsTitle, 'SAFETY ALERTS')
      // Click on alerts title to open the tooltip
      .waitAndClickByCss(pageHome.selectors.alerts.alertsTitle)

      // Tooltip title
      .waitForTextByCss(pageHome.selectors.alerts.alertTooltipTitle, 'United Kingdom - Measles')
      // Tooltip text content
      .waitForTextByCss(pageHome.selectors.alerts.alertTooltipContent, 'AUTOMATION-This is the active to test')
      // Last updated
      .waitForTextByCss(pageHome.selectors.alerts.alertTooltipLastUpdated, 'LAST UPDATED: MAR 26, 2018')
      // Alert number (out of)
      .waitForTextByCss(pageHome.selectors.alerts.alertTooltipAlertNumber, '1/3 Alerts')
      // Show all button
      .waitForTextByCss(pageHome.selectors.alerts.alertTooltipShowAllTitle, 'Show All')
      // Tooltip alert icon
      .waitForAttributeContainsByCss(pageHome.selectors.alerts.alertTooltipIcon,'class', 'CwtIcons__StyledIcon-sc-1zecbe-0 CwtIcons-sc-1zecbe-1 gToFgf TravelAlertsTooltipContent__TravelAlertsCategoryIcon-sc-1fqmzm0-2 hGAQxp')
      // Click on the icon
      .waitAndClickByCss(pageHome.selectors.alerts.alertTooltipIcon)

      // Popup
      // Alert destination
      .waitForTextByCss(pageHome.selectors.alerts.alertPopupDestination, 'Trip to Denver, CO')
      // Number of alerts
      .waitForTextByCss(pageHome.selectors.alerts.alertPopupAlertNumber, '1/3 Alerts')
      // Alert icon
      .waitForAttributeContainsByCss(pageHome.selectors.alerts.alertPopupIcon,'class', 'CwtIcons__StyledIcon-sc-1zecbe-0 CwtIcons-sc-1zecbe-1 gToFgf TravelAlertPage__TravelAlertsCategoryIcon-sc-1kosn3o-1 cApZaD')
      // First title
      .waitForTextByCss(pageHome.selectors.alerts.alertPopupTitle1, 'United Kingdom - Measles')
      // Second title
      .waitForTextByCss(pageHome.selectors.alerts.alertPopupTitle2, 'AUTOMATION-This is the active to test')
      // Main text content
      .waitForTextByCss(pageHome.selectors.alerts.alertPopupContent, 'AUTOMATION-This is the summary of the "active to test" - Most cases have been in unvaccinated individuals. Measles is caused by a highly contagious virus that spreads from person-to-person via infectious droplets. Typical symptoms include fever, cough and a characteristic rash. Serious to fatal complications can occur - particularly when very young children, adults or pregnant women are infected. All travellers should ensure they are fully immunised against measles.')
      // Last updated
      .waitForTextByCss(pageHome.selectors.alerts.alertPopupLastUpdated, 'LAST UPDATED: MAR 26, 2018')

      // Popup footer
      // Helpful text
      .waitForTextByCss(pageHome.selectors.alerts.alertPopupHelpfulTitle, 'Is this alert helpful?')
      // Yes button
      .waitForTextByCss(pageHome.selectors.alerts.alertPopupHelpfulYes, 'YES')
      // No button
      .waitForTextByCss(pageHome.selectors.alerts.alertPopupHelpfulNo,'NO')
      // Powered by text
      .waitForTextByCss(pageHome.selectors.alerts.alertPopupPoweredBy, 'Powered by:')
      // First image
      .waitForAttributeContainsByCss(pageHome.selectors.alerts.alertPopupPoweredByImage1,'src', 'https://travel.stage-mycwt.com/my-cwt-spa/images/isos.jpg')
      // Second image
      .waitForAttributeContainsByCss(pageHome.selectors.alerts.alertPopupPoweredByImage2,'src', 'https://travel.stage-mycwt.com/my-cwt-spa/images/control-risk.jpg')
      // Click on close popup button (x)
      .waitAndClickByCss(pageHome.selectors.alerts.alertPopupCloseButton);
  },

  'step 6 - Validate home itinerary flight card' : (browser) => {
    browser
      // Flight icon
      .waitForAttributeContainsByCss(pageHome.selectors.cards.firstFlightIcon, 'data-testid', 'icon-Plane')
      // FLight title (airline + number)
      .waitForTextByXpath(pageHome.selectors.cards.firstFlightTitle, 'Aeroflot 262')
      // Flight airline icon
      .waitForAttributeContainsByCss(pageHome.selectors.cards.firstFlightAirlineIcon, 'data-testid', 'card-header-segment-vendor-icon')
      // Departure time
      .waitForTextByCss(pageHome.selectors.cards.firstFlightDepartureTime, '11:00 AM')
      // Arrival time
      .waitForTextByCss(pageHome.selectors.cards.firstFlightArrivalTime, '4:50 PM')
      // Departure date
      .waitForTextByCss(pageHome.selectors.cards.firstFlightDepartureDate, 'WED, JUN 04')
      // Arrival date
      .waitForTextByCss(pageHome.selectors.cards.firstFlightArrivalDate, 'WED, JUN 04')
      // Origin text
      .waitForTextByXpath(pageHome.selectors.cards.firstFlightAirportOrigin, 'Heathrow Airport,\nLondon, GB')
      // Destination text
      .waitForTextByXpath(pageHome.selectors.cards.firstFlightAirportDestination, 'Sheremetyevo\nAirport, Moscow, RU');
  },

    'step 7 - Validate layover' : (browser) => {
      browser
      // Layover icon
      .waitForAttributeContainsByCss(pageHome.selectors.cards.layoverIcon, 'data-testid', 'icon-History')
      // Layover duration
      .waitForTextByCss(pageHome.selectors.cards.layoverDurationTime, '2H 10M')
      // Layover title
      .waitForTextByCss(pageHome.selectors.cards.layoverDurationText, 'Layover')
      // Layover alert
      .waitForTextByCss(pageHome.selectors.cards.layoverAlert, 'Change of terminal is required');
  },

  'step 8 - Validate home itinerary missing hotel card' : (browser) => {
    browser
      // Navigate forward
      .multipleClicks(pageHome.selectors.navigation.cardsNavigationForward, 1)
      // Validate title
      .waitForTextByCss(pageHome.selectors.cards.missingHotelTitle, 'Aportal One, your itinerary is missing a hotel')
      // Validate content text
      .waitForTextByCss(pageHome.selectors.cards.missingHotelContent, 'Check out our hotel recommendations, tailored personally for you')
      // Validate button text
      .waitForTextByCss(pageHome.selectors.cards.missingHotelViewHotelsButton, 'VIEW HOTELS')
      // Validate missing location and dates
      .waitForTextByCss(pageHome.selectors.cards.missingHotelLocationAndDateText, 'Tokyo | 28 nights | Jun 05 - Jul 03')
      // click on view hotels button
      .waitAndClickByCss(pageHome.selectors.cards.missingHotelViewHotelsButton)
      // Validate booking page URL
      .waitForUrlToContain('travel.stage-mycwt.com/book-a-hotel#/hotel-results?', 20000)
      // Back to home
      .waitAndClickByCss(pageHeader.selectors.logo.myCWTLogo)
      // Navigate forward
      .multipleClicks(pageHome.selectors.navigation.cardsNavigationForward, 2);
    },

  'step 9 - Validate home itinerary car card' : (browser) => {
    browser
      // Car icon
      .waitForAttributeContainsByCss(pageHome.selectors.cards.carIcon, 'data-testid', 'icon-Car')
      // Car title
      // .waitForTextByXpath(pageHome.selectors.cards.carTitle, 'DOLLAR car')
      // Pick up time
      .waitForTextByCss(pageHome.selectors.cards.carPickUpTime, '3:10 PM')
      // Drop off time
      .waitForTextByCss(pageHome.selectors.cards.carDropOffTime, '1:20 PM')
      // Duration
      .waitForTextByCss(pageHome.selectors.cards.carDuration, '7 DAYS')
      // Pick up date
      .waitForTextByCss(pageHome.selectors.cards.carPickUpDate, 'FRI, JUL 18')
      // Drop off date
      .waitForTextByCss(pageHome.selectors.cards.carDropOffDate, 'FRI, JUL 25')
      // Pick up location
      .waitForTextByXpath(pageHome.selectors.cards.carPickUpLocation, 'DEN, Denver, CO')
      // Drop off location
      .waitForTextByXpath(pageHome.selectors.cards.carDropOffLocation, 'DEN, Denver, CO');
  },

  'step 10 - Validate home itinerary hotel card' : (browser) => {
    browser
      // Hotel icon
      .waitForAttributeContainsByCss(pageHome.selectors.cards.hotelIcon, 'data-testid', 'icon-Hotel')
      // Hotel name
      .waitForTextByCss(pageHome.selectors.cards.hotelTitle, 'COUNTRY INN STS DENVER AIR')
      // Hotel check in
      .waitForTextByCss(pageHome.selectors.cards.hotelCheckIn, 'MON,AUG 18')
      // Hotel check out
      .waitForTextByCss(pageHome.selectors.cards.hotelCheckOut, 'MON,AUG 25')
      // Hotel duration
      .waitForTextByCss(pageHome.selectors.cards.hotelDuration, '7 NIGHTS')
      // Hotel address
      .waitForTextByCss(pageHome.selectors.cards.hotelAddress, '4343 N. Airport Way,');
  },

  'step 11 - validate home itinerary rail card' : (browser) => {
    browser
      // Navigate forward
      .multipleClicks(pageHome.selectors.navigation.cardsNavigationForward, 3)
      // Rail icon
      .waitForAttributeContainsByCss(pageHome.selectors.cards.railIcon, 'data-testid', 'icon-Train')
      // Rail title
      .waitForTextByCss(pageHome.selectors.cards.railTitle, 'Amtrak')
      // Rail departure time
      .waitForTextByCss(pageHome.selectors.cards.railDepartureTime, '9:30 AM')
      // Rail arrival time
      .waitForTextByCss(pageHome.selectors.cards.railArrivalTime, '11:30 AM')
      // Rail duration
      .waitForTextByCss(pageHome.selectors.cards.railDuration, '2 HOURS')
      // Rail departure date
      .waitForTextByCss(pageHome.selectors.cards.railDepartureDate, 'WED, SEP 03')
      // Rail arrival date
      .waitForTextByCss(pageHome.selectors.cards.railArrivalDate, 'WED, SEP 03')
      // Rail origin station
      .waitForTextByXpath(pageHome.selectors.cards.railOriginStation, 'Santa Ana John\nWayne, Santa Ana,...')
      // Rail destination station
      .waitForTextByXpath(pageHome.selectors.cards.railDestinationStation, 'San Diego, San\nDiego, US');
  },

  'step 12 - validate home itinerary meeting card' : (browser) => {
    browser
      // Meeting icon
      .waitForAttributeContainsByCss(pageHome.selectors.cards.meetingIcon, 'data-testid', 'icon-Meeting')
      // Meeting title
      .waitForTextByCss(pageHome.selectors.cards.meetingTitle, 'Automation Meeting')
      // Meeting start time
      .waitForTextByCss(pageHome.selectors.cards.meetingStartTime, '3:00 PM')
      // Meeting end time
      .waitForTextByCss(pageHome.selectors.cards.meetingEndTime, '4:00 PM')
      // Meeting duration
      .waitForTextByCss(pageHome.selectors.cards.meetingDuration, '1H 0M')
      // Meeting start date
      .waitForTextByCss(pageHome.selectors.cards.meetingStartDate, 'WED, SEP 03')
      // Meeting end date
      .waitForTextByCss(pageHome.selectors.cards.meetingEndDate, 'WED, SEP 03')
      // Meeting address
      .waitForTextByXpath(pageHome.selectors.cards.meetingAddress, 'Broocleaners LLC 244 Malcolm X Blvd, Brooklyn, NY 11233,\nUnited States')
      // Meeting contact
      .waitForTextByXpath(pageHome.selectors.cards.railDestinationStation, 'San Diego, San\nDiego, US');
  },

  'step 13 - validate home company news' : (browser) => {
    browser
      .execute(function() { window.scrollBy(0, 2000); }, [])
      // Company news title
      .waitForTextByCss(pageHome.selectors.companyNews.companyNewsTitle, 'Company News')
      // Company news 7th article title
      .waitForTextByCss(pageHome.selectors.companyNews.companyNewsArticleTitle, 'Welcome to your improved traveler website!')
      // Company news 7th article date
      .waitForTextByCss(pageHome.selectors.companyNews.companyNewsArticleDate, 'Apr 11, 2022')
      // Show more button
      .waitForTextByCss(pageHome.selectors.companyNews.companyNewsShowMoreButton, 'Show more')
      // Click on show more
      .waitAndClickByCss(pageHome.selectors.companyNews.companyNewsShowMoreButton)
      // Scroll down
      .execute(function() { window.scrollBy(0, 2500); }, [])
      // Company news 7th article content
      .waitForTextByCss(pageHome.selectors.companyNews.companyNewsArticleContent, 'Welcome to your improved traveler website!\n Today marks a big step forward in providing you with a modern, useful online experience. ')
      // Show less button
      .waitForTextByCss(pageHome.selectors.companyNews.companyNewsShowLessButton, 'Show less')
      // Click on show less
      .waitAndClickByCss(pageHome.selectors.companyNews.companyNewsShowLessButton);
  },

  'step 14 - Validate home company resources' : (browser) => {
    browser
      // Company resources title
      .waitForTextByCss(pageHome.selectors.companyResources.companyResourcesTitle, 'Company Resources')
      // Company resources links title
      .waitForTextByCss(pageHome.selectors.companyResources.companyResourcesLinksToggle, 'MY COMPANY LINKS')
      // Click on the first link and validate url
      .validateUrlOnSecondTab(pageHome.selectors.companyResources.companyResourcesLink1, 'help.mycwt.com/en/');
  },

  'step 15 - Validate home navigation links' : (browser) => {
    browser
      // Book a hotel
      .waitForTextByCss(pageHeader.selectors.navigation.bookAHotel, 'BOOK A HOTEL')
      // CLick on book hotel
      .waitAndClickByCss(pageHeader.selectors.navigation.bookAHotel)
      // Validate book hotel url
      .waitForUrlToContain('https://travel.stage-mycwt.com/book-a-hotel#/', 30000)
      // Click on the logo (back home)
      .waitAndClickByCss(pageHeader.selectors.navigation.myCWTLogo)
      // Validate home page
      .waitForUrlToContain('https://travel.stage-mycwt.com/', 30000)
      // My trips
      .waitForTextByCss(pageHeader.selectors.navigation.myTrips, 'VIEW TRIPS')
      // Click on my trips
      .waitAndClickByCss(pageHeader.selectors.navigation.myTrips)
      .pause(1000)
      .waitForUrlToContain('https://travel.stage-mycwt.com/my-trips#/', 30000)
      // Click on the logo (back home)
      .waitAndClickByCss(pageHeader.selectors.navigation.myCWTLogo)
      // Validate home page
      .waitForUrlToContain('https://travel.stage-mycwt.com/', 30000)

      // Train schedule
      .waitForTextByCss(pageHeader.selectors.navigation.trainSchedule, 'TRAIN SCHEDULE')
      // Click on train schedule
      .waitAndClickByCss(pageHeader.selectors.navigation.trainSchedule)
      .pause(1000)
      .waitForUrlToContain('https://travel.stage-mycwt.com/travel-tools#/', 30000)
      // Click on the logo (back home)
      .waitAndClickByCss(pageHeader.selectors.navigation.myCWTLogo)
      // Validate home page
      .waitForUrlToContain('https://travel.stage-mycwt.com/', 30000)

      // CWT ANALYTIQS
      .waitForTextByCss(pageHeader.selectors.navigation.cwtAnalytiqs, 'CWT ANALYTIQS')
      // Click on cwt analytiqs
      .waitAndClickByCss(pageHeader.selectors.navigation.cwtAnalytiqs)
      .pause(1000)
      // Switch to the second tab and check the url
      .switchToTab(1)
      .waitForUrlToContain('https://accounts.stage-mycwt.com/idp/startSSO.ping?PartnerSpId=AnalytiQs', 30000)
      .closeWindow()
      .pause(1000)
      .switchToTab(0)

      // Admin
      .waitForTextByCss(pageHeader.selectors.navigation.admin, 'ADMIN')
      // Click on Admin
      .waitAndClickByCss(pageHeader.selectors.navigation.admin)
      .pause(1000)
      // Check the admin url
      // .waitForUrlToContain('https://travel.stage-mycwt.com/admin#/', 30000)

        // My travel profile
        .waitForTextByCss(pageHeader.selectors.navigation.myProfileDropdown, 'MY PROFILE')
        // Click on my profile dropdown
        .waitAndClickByCss(pageHeader.selectors.navigation.myProfileDropdown)
        // Click on edit profile
        .waitAndClickByCss(pageHeader.selectors.navigation.EditProfile)
        .pause(2000)
        // Switch to the second tab and check the url
        .switchToTab(1)
        .waitForUrlToContain('https://profile.stage-mycwt.com/profile/profile-mgmt/edit/portalblue', 30000)
        .closeWindow()
        .pause(1000)
        .switchToTab(0);
  },

//   ----------------------------------Sanity, my trips----------------------------------


  'step 16 - Validate view trips upcoming' : (browser) => {
    browser
      // click on my trips in the navigation bar
      .waitAndClickByCss(pageHeader.selectors.navigation.myTrips)
      // View trips main title
      // .stop()
      .waitForTextByCss(pageMyTrips.selectors.upcomingTrips.upcomingTripsTitle, 'Upcoming Trips (1)')
      // Trip title

      .waitForTextByCss(pageMyTrips.selectors.upcomingTrips.firstTripTitle, 'Trip to Denver, CO')
      // Trip location
      .waitForTextByCss(pageMyTrips.selectors.upcomingTrips.firstTripLocation, 'Denver, CO')
      // Trip date and duration
      .waitForTextByCss(pageMyTrips.selectors.upcomingTrips.firstTripDateAndDuration, 'Jun 4, 2025 - Sep 3, 2025 | 92 days')

      // flight item
      .waitForAttributeContainsByCss(pageMyTrips.selectors.upcomingTrips.firstTripFlightIcon, 'data-testid', 'icon-Plane')
      .waitForTextByCss(pageMyTrips.selectors.upcomingTrips.firstTripFlightDetails, 'LHR - SVO - NRT')
      // missing hotel item
      .waitForAttributeContainsByCss(pageMyTrips.selectors.upcomingTrips.firstTripMissingHotelIcon, 'data-testid', 'icon-Hotel')

      // .waitForTextByCss(pageMyTrips.selectors.upcomingTrips.firstTripMissingHotelDetails, 'Missing Hotel')   //missing uniq selector
      // car item
      .waitForAttributeContainsByCss(pageMyTrips.selectors.upcomingTrips.firstTripCarIcon, 'data-testid', 'icon-Car')
      // .waitForTextByCss(pageMyTrips.selectors.upcomingTrips.firstTripCarDetails, 'DOLLAR')   //missing uniq selector
      // More items
      .waitForTextByCss(pageMyTrips.selectors.upcomingTrips.firstTripMoreItemsNumber, '+ 3');
      // .waitForTextByCss(pageMyTrips.selectors.upcomingTrips.firstTripMoreItemsText, 'More items');   //missing uniq selector
  },

  'step 17 - Validate view trips past' : (browser) => {
    browser
      // Past trips tab title
      .waitForTextByCss(pageMyTrips.selectors.pastTrips.pastTripsTab, 'Past Trips')
      // Click on past trips tab
      .waitAndClickByCss(pageMyTrips.selectors.pastTrips.pastTripsTab)
      // Past trips main title
      .waitForTextByCss(pageMyTrips.selectors.pastTrips.pastTripsTitle, 'Past Trips (1)')
      // Year title

      .waitForTextByCss(pageMyTrips.selectors.pastTrips.pastTripsFirstYearTitle, '2016')
      // Past trip main title
      .waitForTextByCss(pageMyTrips.selectors.pastTrips.firstTripTitle, 'Trip to Santa Ana, CA')
      // Past trip location
      // .stop()
      // .waitForTextByCss(pageMyTrips.selectors.pastTrips.firstTripLocation, 'Santa Ana, CA')
      // Past trip dates and duration
      .waitForTextByCss(pageMyTrips.selectors.pastTrips.firstTripDateAndDuration, 'Oct 30, 2016 - Nov 12, 2016 | 14 days')
      // Flight item
      .waitForAttributeContainsByXpath(pageMyTrips.selectors.pastTrips.firstTripFlightIcon, 'data-testid', 'icon-Plane')

      .waitForTextByXpath(pageMyTrips.selectors.pastTrips.firstTripFlightDetails, 'AMS - DEN')
      // More items
      .waitForTextByXpath(pageMyTrips.selectors.pastTrips.firstTripMoreItemsNumber, '+ 11')
      .waitForTextByXpath(pageMyTrips.selectors.pastTrips.firstTripMoreItemsText, 'More items')
      // Search field pre-text
      .waitForAttributeContainsByCss(pageMyTrips.selectors.pastTrips.pastTripsSearchInput, 'placeholder', 'Search for city airport or landmark')
      // Search field icon
      .waitForAttributeContainsByCss(pageMyTrips.selectors.pastTrips.pastTripsSearchIcon, 'data-testid', 'icon-Search');
  },

  'step 18 - Validate past trips search' : (browser) => {
    browser
      // Add text for existing trip
      .waitAndSetValueByCss(pageMyTrips.selectors.pastTrips.pastTripsSearchInput, 'Santa')
      // validate trip exist in the results
      .waitForTextByCss(pageMyTrips.selectors.pastTrips.firstTripTitle, 'Trip to Santa Ana, CA')
      // Clear value
      .clearValue(pageMyTrips.selectors.pastTrips.pastTripsSearchInput)
      // Add text for existing trip
      .waitAndSetValueByCss(pageMyTrips.selectors.pastTrips.pastTripsSearchInput, 'FAKE TRIP')
      // validate no trip display
      .waitForTextByCss(pageMyTrips.selectors.pastTrips.pastTripsTitle, 'Past Trips (0)')
      // No trips image
      .waitForAttributeContainsByCss(pageMyTrips.selectors.pastTrips.noPastTripsImage, 'alt', 'No Upcoming Trips')
      // No trips text
      .waitForTextByCss(pageMyTrips.selectors.pastTrips.noPastTripsText, 'no trips found')
      // Clear field by click on close button
      .waitAndClickByCss(pageMyTrips.selectors.pastTrips.pastTripsSearchCloseButton)
      // validate trip exist in the results
      .waitForTextByCss(pageMyTrips.selectors.pastTrips.firstTripTitle, 'Trip to Santa Ana, CA');
  },

//    ----------------------------------Trip details----------------------------------

  'step 19 - Validate trip details header' : (browser) => {
    browser
      // Click on the first trip title
      .waitAndClickByCss(pageMyTrips.selectors.upcomingTrips.firstTripTitle)
      // .stop()
      // Home breadcrumb link
      .waitForTextByCss(pageTripDetails.selectors.innerHeader.breadcrumbsHome, 'HOME')
      // My trips breadcrumb link
      .waitForTextByCss(pageTripDetails.selectors.innerHeader.breadcrumbsMyTrips, 'MY TRIPS')
      // Breadcrumb seperator icon
      .waitForAttributeContainsByCss(pageTripDetails.selectors.innerHeader.breadcrumbsSeperator1, 'data-testid', 'icon-Forward')

      // click on home
      .waitAndClickByCss(pageTripDetails.selectors.innerHeader.breadcrumbsHome)
      // validate home URL
      .waitForUrlToContain('https://travel.stage-mycwt.com/', 30000)
      // Click on my trips tab
      .waitAndClickByCss(pageHeader.selectors.navigation.myTrips)
      // click on the first trip title
      .waitAndClickByCss(pageMyTrips.selectors.upcomingTrips.firstTripTitle)

      // click on my trips breadcrumb link
      .waitAndClickByCss(pageTripDetails.selectors.innerHeader.breadcrumbsMyTrips)
      // validate my trips URL
      .waitForUrlToContain('https://travel.stage-mycwt.com/my-trips#/', 30000)
      // click on the first trip title
      .waitAndClickByCss(pageMyTrips.selectors.upcomingTrips.firstTripTitle)
      // Validate first trip location
      .waitForTextByCss(pageTripDetails.selectors.innerHeader.tripName, 'Trip to Denver, CO, US')
      // Validate first trip dates
      .waitForTextByCss(pageTripDetails.selectors.innerHeader.tripDates, 'Jun 4, 2025 - Sep 3, 2025 | 92 days')

      // Click on the map link
      .waitAndClickByCss(pageTripDetails.selectors.innerHeader.mapText)
      // Close the map
      .waitAndClickByCss(pageTripDetails.selectors.map.closeMapButton)
      .pause(1000)
      // Click on share button
      .waitAndClickByCss(pageTripDetails.selectors.share.shareButtonText)

      // Share dialog trip title
      .waitForTextByCss(pageTripDetails.selectors.share.shareDialogTripTitle, 'Trip to Denver, CO')
      // Share dialog text
      .waitForTextByCss(pageTripDetails.selectors.share.shareDialogTitle, 'Add any email address')
      // Share dialog input text
      .waitForTextByCss(pageTripDetails.selectors.share.shareDialogEmailInputPreText, 'Enter recipients email')
      // Share dialog message input text
      .waitForAttributeContainsByCss(pageTripDetails.selectors.share.shareDialogMessageInput, 'placeholder', 'Add your personal message here.')

      // Share dialog share via CWT title
      .waitForTextByCss(pageTripDetails.selectors.share.shareDialogShareViaCWTTitle, 'Share with colleagues via myCWT')
      // Share dialog share via CWT text 1
      .waitForTextByCss(pageTripDetails.selectors.share.shareDialogShareViaCWTText1, 'Registered myCWT users will see your latest itinerary.')
      // Share dialog share via CWT text 2
      .waitForTextByCss(pageTripDetails.selectors.share.shareDialogShareViaCWTText2, 'Check if your flight is on time\nKnow where you are staying\nView updates as itinerary changes')
      // Share dialog share via email title
      .waitForTextByCss(pageTripDetails.selectors.share.shareDialogShareViaEmailTitle, 'Share via email')
      // Share dialog share via email text
      .waitForTextByCss(pageTripDetails.selectors.share.shareDialogShareViaEmailText, 'Recipients will receive an email with your itinerary. What will be shared?')
      // Share dialog share trip button
      .waitForTextByCss(pageTripDetails.selectors.share.shareDialogShareTripButton, 'SHARE TRIP')
      // Add email address 1
      .waitAndSetValueByCss(pageTripDetails.selectors.share.shareDialogEmailInput, '123@yopmail.com')
      .keys([browser.Keys.SPACE])
      // Add email address 2
      .waitAndSetValueByCss(pageTripDetails.selectors.share.shareDialogEmailInput, '321@yopmail.com')
      .keys([browser.Keys.SPACE])
      // Add message
      .waitAndSetValueByCss(pageTripDetails.selectors.share.shareDialogMessageInput, 'This is the message')
      // Disable share via CWT (leave email share only)
      .waitAndClickByCss(pageTripDetails.selectors.share.shareDialogShareViaCWTButton)
      // Click on share trip button
      .waitAndClickByCss(pageTripDetails.selectors.share.shareDialogShareTripButton)
      // Validate success message title
      .waitForTextByCss(pageTripDetails.selectors.share.shareSuccessMessageTitle, 'Thank you for sharing your trip')
      // Validate success message text
      .waitForTextByCss(pageTripDetails.selectors.share.shareSuccessMessageText, 'Recipients will receive your shared itinerary')
      // Close success message dialog
      .waitAndClickByCss(pageTripDetails.selectors.share.shareSuccessMessageCloseButton)

      // Download
      .waitForTextByCss(pageTripDetails.selectors.innerHeader.downloadText, 'DOWNLOAD')
      // Download icon
      .waitForAttributeContainsByCss(pageTripDetails.selectors.innerHeader.downloadIcon, 'data-testid', 'icon-Download')
      // Print title
      .waitForTextByCss(pageTripDetails.selectors.innerHeader.printText, 'PRINT')
      // Print icon
      .waitForAttributeContainsByCss(pageTripDetails.selectors.innerHeader.printIcon, 'data-testid', 'icon-Printer')

      // Validate travel alerts banner icon
      .waitForAttributeContainsByCss(pageTripDetails.selectors.alerts.alertsIcon,'data-testid', 'icon-Warning')
      // Validate alerts text
      .waitForTextByCss(pageTripDetails.selectors.alerts.alertsText, '3 active alerts for this trip')
      // Click on the alerts text
      .waitAndClickByCss(pageTripDetails.selectors.alerts.alertsText)

      // ------------  First alert  ------------
      // Alerts dialog - destination
      .waitForTextByCss(pageTripDetails.selectors.alerts.alertPopupDestination, 'Trip to Denver, CO')
      // Alerts dialog - alert numbers
      .waitForTextByCss(pageTripDetails.selectors.alerts.alertPopupAlertNumber, '1/3 Alerts')
      // Alerts dialog - numbers back button
      .waitForAttributeContainsByCss(pageTripDetails.selectors.alerts.alertPopupBackwardButton,'data-testid', 'icon-Back')
      // Alerts dialog - numbers forward button
      .waitForAttributeContainsByCss(pageTripDetails.selectors.alerts.alertPopupForwardButton,'data-testid', 'icon-Forward')
      // Alerts dialog - alert icon (medical)
      .waitForAttributeContainsByCss(pageTripDetails.selectors.alerts.alertPopupIconMedical,'data-testid', 'icon-Medical')
      // Alerts dialog - First title
      .waitForTextByCss(pageTripDetails.selectors.alerts.alertPopupTitle1, 'United Kingdom - Measles')
      // Alerts dialog - Second title
      .waitForTextByCss(pageTripDetails.selectors.alerts.alertPopupTitle2, 'AUTOMATION-This is the active to test')
      // Alerts dialog - alert content
      .waitForTextByCss(pageTripDetails.selectors.alerts.alertPopupContent, 'AUTOMATION-This is the summary of the "active to test" - Most cases have been in unvaccinated individuals. Measles is caused by a highly contagious virus that spreads from person-to-person via infectious droplets. Typical symptoms include fever, cough and a characteristic rash. Serious to fatal complications can occur - particularly when very young children, adults or pregnant women are infected. All travellers should ensure they are fully immunised against measles.')
      // Alerts dialog - last updated line
      .waitForTextByCss(pageTripDetails.selectors.alerts.alertPopupLastUpdated, 'LAST UPDATED: MAR 26, 2018')
      // Alerts dialog - helpful title
      .waitForTextByCss(pageTripDetails.selectors.alerts.alertPopupHelpfulTitle, 'Is this alert helpful?')
      // Alerts dialog - helpful title
      .waitForTextByCss(pageTripDetails.selectors.alerts.alertPopupHelpfulTitle, 'Is this alert helpful?')
      // Alerts dialog - helpful yes answer
      .waitForTextByCss(pageTripDetails.selectors.alerts.alertPopupHelpfulYes, 'YES')
      // Alerts dialog - helpful no answer
      .waitForTextByCss(pageTripDetails.selectors.alerts.alertPopupHelpfulNo, 'NO')
      // Alerts dialog - powered by title
      .waitForTextByCss(pageTripDetails.selectors.alerts.alertPopupPoweredBy, 'Powered by:')
      // Alerts dialog - powered by image 1
      .waitForAttributeContainsByCss(pageTripDetails.selectors.alerts.alertPopupPoweredByImage1,'data-testid', 'alert-page-footer-poweredby-img')
      // Alerts dialog - powered by image 2
      .waitForAttributeContainsByCss(pageTripDetails.selectors.alerts.alertPopupPoweredByImage2,'data-testid', 'alert-page-footer-poweredby-img-risk')
      // Alerts dialog - close
      .waitAndClickByCss(pageTripDetails.selectors.alerts.alertPopupCloseButton);
  },


  'step 20 - Validate trip details flight item' : (browser) => {
    browser
        // Flight icon
        .waitForAttributeContainsByCss(pageTripDetails.selectors.flight.firstFlightIcon, 'data-testid', 'icon-Plane')
        // Flight title (airline + number)
        .waitForTextByCss(pageTripDetails.selectors.flight.firstFlightTitle, 'Aeroflot 262')
        // Flight airline icon
        .waitForAttributeContainsByCss(pageTripDetails.selectors.flight.firstFlightAirlineIcon, 'data-testid', 'trip-card-vendor-icon')
        // Departure time
        .waitForTextByCss(pageTripDetails.selectors.flight.firstFlightDepartureTime, '11:00 AM')
        // AArrival time
        .waitForTextByCss(pageTripDetails.selectors.flight.firstFlightArrivalTime, '4:50 PM')
        // Departure date
        .waitForTextByCss(pageTripDetails.selectors.flight.firstFlightDepartureDate, 'WED, JUN 04')
        // Arrival date
        .waitForTextByCss(pageTripDetails.selectors.flight.firstFlightArrivalDate, 'WED, JUN 04')
        // // Origin text // todo: need to add id's
        // .waitForTextByXpath(pageTripDetails.selectors.flight.firstFlightAirportOrigin, 'Heathrow Airport,\nLondon, GB')
        // // Destination text
        // .waitForTextByXpath(pageTripDetails.selectors.flight.firstFlightAirportDestination, 'Sheremetyevo\nAirport, Moscow, RU')

        // Flight connection icon
        .waitForAttributeContainsByCss(pageTripDetails.selectors.layover.layoverIcon, 'data-testid', 'icon-History')
        // Flight connection title
        .waitForTextByCss(pageTripDetails.selectors.layover.layoverTitle, 'Flight Connection\n2H 10M Layover In SVO')
        // Flight connection alert
        .waitForTextByCss(pageTripDetails.selectors.layover.layoverAlert, 'Change of terminal is required');
  },

  'step 21 - Validate trip details missing hotel item' : (browser) => {
    browser
      // Scroll down
      .execute(function() { window.scrollBy(0, 1200); }, [])
      // Missing hotel icon
      .waitForAttributeContainsByCss(pageTripDetails.selectors.missingHotel.missingHotelIcon, 'data-testid', 'icon-Hotel')
      // Missing hotel title
      .waitForTextByCss(pageTripDetails.selectors.missingHotel.missingHotelTitle, 'Your itinerary is missing a hotel')
      // Missing hotel "dismiss" button
      .waitForTextByCss(pageTripDetails.selectors.missingHotel.missingHotelDismiss, 'DISMISS');
  },

  'step 22 - Validate trip details car item' : (browser) => {
    browser
      // Car main date title
      .waitForTextByCss(pageTripDetails.selectors.carPickUp.carDate, 'FRI, JUL 18')
      // Car icon
      .waitForAttributeContainsByCss(pageTripDetails.selectors.carPickUp.carIcon, 'data-testid', 'icon-Car')
      // Car title
      .waitForTextByCss(pageTripDetails.selectors.carPickUp.carTitle, 'FRI, JUL 18\nTyperental Company Is\nPick-Up | DOLLAR')
      // Car pick-up time
      .waitForTextByCss(pageTripDetails.selectors.carPickUp.carPickUpTime, '3:10 PM')
      // Car drop-off time
      .waitForTextByCss(pageTripDetails.selectors.carPickUp.carDropOffTime, '1:20 PM')
      // Car duration
      .waitForTextByCss(pageTripDetails.selectors.carPickUp.carDuration, '7 DAYS')
      // Car pick-up date
      .waitForTextByCss(pageTripDetails.selectors.carPickUp.carPickUpDate, 'FRI, JUL 18')
      // Car drop-off date
      .waitForTextByCss(pageTripDetails.selectors.carPickUp.carDropOffDate, 'FRI, JUL 25')
      // Car pick-up location
      // .stop()
      .waitForTextByXpath(pageTripDetails.selectors.carPickUp.carPickUpLocation, 'DEN, Denver, CO')
      // Car drop-off location
      .waitForTextByXpath(pageTripDetails.selectors.carPickUp.carDropOffLocation, 'DEN, Denver, CO')
      // Car confirmation title and number
      .waitForTextByCss(pageTripDetails.selectors.carPickUp.carConfirmationNumber, 'Confirmation #:\nR4083926')
      // Car more details title
      .waitForTextByCss(pageTripDetails.selectors.carPickUp.carMoreDetailsText, 'MORE DETAILS')
      // Car more details icon
      .waitForAttributeContainsByCss(pageTripDetails.selectors.carPickUp.carMoreDetailsButton, 'data-testid', 'trip-segment-card-toggle')

      // Car drop-off icon
      .waitForAttributeContainsByCss(pageTripDetails.selectors.carDropOff.carIcon, 'data-testid', 'icon-Car')
      // Car drop-off date
      .waitForTextByCss(pageTripDetails.selectors.carDropOff.carDate, 'FRI, JUL 25')
      // Car drop-pff title
      .waitForTextByCss(pageTripDetails.selectors.carDropOff.carTitle, 'FRI, JUL 25\nTyperental Company Is\nDrop-Off | DOLLAR')
      // Car drop-pff time
      .waitForTextByCss(pageTripDetails.selectors.carDropOff.carDropOffTime, '1:20 pm')
      // Car drop-pff location icon
      .waitForAttributeContainsByCss(pageTripDetails.selectors.carDropOff.carDropOffLocationIcon, 'data-testid', 'icon-Location')
      // Car drop-pff location
      .waitForTextByCss(pageTripDetails.selectors.carDropOff.carDropOffLocation, 'DEN, Denver, CO');
  },

  'step 23 - Validate trip details hotel item' : (browser) => {
    browser
      // Scroll down
      .execute(function() { window.scrollBy(0, 500); }, [])
      // Hotel icon
      .waitForAttributeContainsByCss(pageTripDetails.selectors.hotel.hotelIcon, 'data-testid', 'icon-Hotel')
      // Hotel check-in date
      .waitForTextByCss(pageTripDetails.selectors.hotel.hotelDate, 'MON, AUG 18')
      // Hotel title
      .waitForTextByCss(pageTripDetails.selectors.hotel.hotelTitle, 'MON, AUG 18\nType. Hotel Name Is\nCheck-In | COUNTRY INN STS DENVER AIR')
      // Hotel check-in title
      .waitForTextByCss(pageTripDetails.selectors.hotel.hotelCheckInTitle, 'CHECK-IN')
      // Hotel check-out title
      .waitForTextByCss(pageTripDetails.selectors.hotel.hotelCheckOutTitle, 'CHECK-OUT')
      // Hotel check-in date
      .waitForTextByCss(pageTripDetails.selectors.hotel.hotelCheckInDate, 'MON,AUG 18')
      // Hotel check-out date
      .waitForTextByCss(pageTripDetails.selectors.hotel.hotelCheckOutDate, 'MON,AUG 25')
      // Hotel duration
      .waitForTextByCss(pageTripDetails.selectors.hotel.hotelDuration, '7 NIGHTS')
      // Hotel address icon
      .waitForAttributeContainsByCss(pageTripDetails.selectors.hotel.hotelAddressIcon, 'data-testid', 'field-list-item-location')
      // Hotel address
      .waitForTextByCss(pageTripDetails.selectors.hotel.hotelAddress, '4343 N. Airport Way,')
      // Hotel phone icon
      .waitForAttributeContainsByCss(pageTripDetails.selectors.hotel.hotelPhoneIcon, 'data-testid', 'field-list-item-location')
      // Hotel phone
      .waitForTextByCss(pageTripDetails.selectors.hotel.hotelPhone, '1-303-375-1105')
      // Hotel confirmation
      .waitForTextByCss(pageTripDetails.selectors.hotel.hotelConfirmation, 'Confirmation #:\n8KQDJH4')
      // Hotel more details text
      .waitForTextByCss(pageTripDetails.selectors.hotel.hotelMoreDetailsText, 'MORE DETAILS')
      // Hotel more details icon
      .waitForAttributeContainsByCss(pageTripDetails.selectors.hotel.hotelMoreDetailsButton, 'data-testid', 'icon-DownArrow')

      // Check-out icon
      .waitForAttributeContainsByCss(pageTripDetails.selectors.hotelCheckOut.hotelCheckOutIcon, 'data-testid', 'icon-Hotel')
      // Check-out date
      .waitForTextByCss(pageTripDetails.selectors.hotelCheckOut.hotelCheckOutDate, 'MON, AUG 25')
      // Check-out title
      .waitForTextByCss(pageTripDetails.selectors.hotelCheckOut.hotelCheckOutTitle, 'MON, AUG 25\nType. Hotel Name Is\nCheck-Out | COUNTRY INN STS DENVER AIR');
},

  'step 24 - Validate trip details rail item' : (browser) => {
    browser
      // Scroll down
      .execute(function() { window.scrollBy(0, 500); }, [])
      // Rail icon
      .waitForAttributeContainsByCss(pageTripDetails.selectors.rail.railIcon, 'data-testid', 'icon-Train')
      // Rail check-in date
      .waitForTextByCss(pageTripDetails.selectors.rail.railDate, 'WED, SEP 03')
      // Rail title
      .waitForTextByCss(pageTripDetails.selectors.rail.railTitle, 'Amtrak 566')
      // Rail departure time
      .waitForTextByCss(pageTripDetails.selectors.rail.railDepartureTime, '9:30 AM')
      // Rail arrival time
      .waitForTextByCss(pageTripDetails.selectors.rail.railArrivalTime, '11:30 AM')
      // Rail duration
      .waitForTextByCss(pageTripDetails.selectors.rail.railDuration, '2H 0M')
      // Rail departure date
      .waitForTextByCss(pageTripDetails.selectors.rail.railDepartureDate, 'WED, SEP 03')
      // Rail arrival date
      .waitForTextByCss(pageTripDetails.selectors.rail.railArrivalDate, 'WED, SEP 03')
      // Rail departure address
      // .stop()
      .waitForTextByXpath(pageTripDetails.selectors.rail.railDepartureAddress, 'Santa Ana John Wayne,\nSanta Ana, US')
      // Rail arrival address
      .waitForTextByXpath(pageTripDetails.selectors.rail.railArrivalAddress, 'San Diego, San Diego, US')
      // Rail confirmation
      .waitForTextByCss(pageTripDetails.selectors.rail.railConfirmation, 'Confirmation #:\n0D1212')
      // Rail trip locator
      .waitForTextByCss(pageTripDetails.selectors.rail.railTripLocator, 'Trip Locator:\nPoli3eer4')
      // Rail more details text
      .waitForTextByCss(pageTripDetails.selectors.rail.railMoreDetailsText, 'MORE DETAILS')
      // Rail more details icon
      .waitForAttributeContainsByCss(pageTripDetails.selectors.rail.railMoreDetailsButton, 'data-testid', 'icon-DownArrow');
  },

  'step 25 - Validate trip details meeting item' : (browser) => {
    browser
      // Scroll down
      .execute(function() { window.scrollBy(0, 500); }, [])
      // Meeting icon
      .waitForAttributeContainsByCss(pageTripDetails.selectors.meeting.meetingIcon, 'data-testid', 'icon-Meeting')
      // Meeting title
      .waitForTextByCss(pageTripDetails.selectors.meeting.meetingTitle, 'BUSINESS\nAutomation Meeting')
      // Meeting start title
      .waitForTextByCss(pageTripDetails.selectors.meeting.meetingStartTitle, 'STARTS')
      // Meeting end title
      .waitForTextByCss(pageTripDetails.selectors.meeting.meetingEndTitle, 'ENDS')
      // Meeting start time
      .waitForTextByCss(pageTripDetails.selectors.meeting.meetingStartTime, '3:00 PM')
      // Meeting end time
      .waitForTextByCss(pageTripDetails.selectors.meeting.meetingEndTime, '4:00 PM')
      // Meeting duration
      .waitForTextByCss(pageTripDetails.selectors.meeting.meetingDuration, '1 Hour')
      // Meeting start date
      .waitForTextByCss(pageTripDetails.selectors.meeting.meetingStartDate, 'WED, SEP 03')
      // Meeting end date
      .waitForTextByCss(pageTripDetails.selectors.meeting.meetingEndDate, 'WED, SEP 03')
      // Meeting address
      .waitForTextByCss(pageTripDetails.selectors.meeting.meetingAddress, 'San Diego Ave')
      // Meeting address icon
      .waitForAttributeContainsByCss(pageTripDetails.selectors.meeting.meetingAddressIcon, 'data-testid', 'icon-Location')
      // Meeting more details text
      .waitForTextByCss(pageTripDetails.selectors.meeting.meetingMoreDetailsText, 'MORE DETAILS')
      // Meeting more details icon
      .waitForAttributeContainsByCss(pageTripDetails.selectors.meeting.meetingMoreDetailsButton, 'data-testid', 'icon-DownArrow');
  },

  'step 26 - Logout' : (browser) => {
    browser
      .portalLogout();
  },
};