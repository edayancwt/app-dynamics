'use strict';

const globals = require('../../../nightwatch.globals');
const pageHome = require('../../../pages/page-home');
const pageHeader = require('../../../pages/page-header');
const pageMyTrips = require('../../../pages/page-my-trips');
const pageTripDetails = require('../../../pages/page-trip-details');
const pageFooter = require('../../../pages/page-footer');
const pageTechnicalAssistance = require('../../../pages/page-technical-assistance');

let NWTools = require('nightwatch-tools');
let randomNumber = NWTools.randomString(4,'1234567890');

module.exports = {

  '@tags': ['sanity', 'portal', 'production'],

  before: function (browser) {
    browser.windowMaximize();
  },

  'step 1 - Login': (browser) => {
    browser
      .loginToPortalProd(globals.users.portalUser45.username, globals.users.portalUser45.password);
  },

  //    ---------------------------------- Portal home ---------------------------------- Portal home ---------------------------------- Portal home ----------------------------------

  'step 2 - Header items' : (browser) => {
    browser
      .waitForTextByCss(pageHome.selectors.welcome.welcomeFullTitle, 'Hello Portal Sanity, book your travelers\' next trips')
      .waitForTextByCss(pageHome.selectors.welcome.bookFullTripText, 'Book a full trip');
      // .waitForTextByCss(pageHome.selectors.welcome.bookFullTripContinueButton, 'CONTINUE')
      // .waitForAttributeContainsByCss(pageHome.selectors.welcome.bookFullTripContinueButton, 'href', 'https://accounts.mycwt.com/idp/startSSO.ping?PartnerSpId=https%3A%2F%2Fus.api.concursolutions.com%2Fsaml2')
      // Hero default video
      // .waitForAttributeContainsByCss(pageHome.selectors.welcome.headerVideo, 'src', 'https://cdn.worldmate.com/portal-hero-video/default.mp4');
  },

  'step 3 - Booking panel' : (browser) => {
    browser
      // .stop()
      .waitAndClickByXpath(pageHome.selectors.hotelBookingPanel.panelTabTitle)
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
      // Click on booking for
      .waitAndClickByCss(pageHome.selectors.hotelSearch.bookingForInput)
      // Select booking for me
      .waitAndClickByCss(pageHome.selectors.hotelSearch.bookingForFirstOption)

      // Search for location
      .waitAndSetValueByCss(pageHome.selectors.hotelSearch.goingToInput, 'rome')
      // Select the first option in the results
      // .stop()
      .waitAndClickByCss(pageHome.selectors.hotelSearch.searchResult1Prod)
      // Select check in and check out dates
      .selectSpecificUpcomingHotelDates(12, 15)
      // Click on search button
      .waitAndClickByCss(pageHome.selectors.hotelSearch.searchButton)
      // Validate booking page URL
      .waitForUrlToContain('travel.mycwt.com/book-a-hotel#/hotel-results')
      // Click on the logo to go back to home page
      .waitAndClickByCss(pageHeader.selectors.logo.myCWTLogo);
  },

  'step 4 - Travel alerts - TBD' : (browser) => {
    // todo: need to add alerts for this user and add the steps here
  },

  'step 5 - Flight card' : (browser) => {
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

  'step 6 - Layover card' : (browser) => {
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

  'step 7 - Missing hotel card' : (browser) => {
    browser
      // Navigate forward
      .multipleClicks(pageHome.selectors.navigation.cardsNavigationForward, 1)
      // Validate title
      .waitForTextByCss(pageHome.selectors.cards.missingHotelTitle, 'Portal Sanity, your itinerary is missing a hotel')
      // Validate content text
      .waitForTextByCss(pageHome.selectors.cards.missingHotelContent, 'Check out our hotel recommendations, tailored personally for you')
      // Validate button text
      .waitForTextByCss(pageHome.selectors.cards.missingHotelViewHotelsButton, 'VIEW HOTELS')
      // Validate missing location and dates
      .waitForTextByCss(pageHome.selectors.cards.missingHotelLocationAndDateText, 'Tokyo | 5 nights | Jun 05 - Jun 10')
      // click on view hotels button
      .waitAndClickByCss(pageHome.selectors.cards.missingHotelViewHotelsButton)
      // Validate booking page URL
      .waitForUrlToContain('travel.mycwt.com/book-a-hotel#/hotel-results', 20000)
      // Back to home
      .waitAndClickByCss(pageHeader.selectors.logo.myCWTLogo)
      // Navigate forward
      .multipleClicks(pageHome.selectors.navigation.cardsNavigationForward, 2);
  },

  'step 8 - Car card' : (browser) => {
    browser
      // Car icon
      .waitForAttributeContainsByCss(pageHome.selectors.cards.carIcon, 'data-testid', 'icon-Car')
      // Car title
      // .waitForTextByXpath(pageHome.selectors.cards.carTitle, 'DOLLAR car')
      // Pick up time
      .waitForTextByCss(pageHome.selectors.cards.carPickUpTime, '1:10 PM')
      // Drop off time
      .waitForTextByCss(pageHome.selectors.cards.carDropOffTime, '8:20 PM')
      // Duration
      .waitForTextByCss(pageHome.selectors.cards.carDuration, '1 DAY')
      // Pick up date
      .waitForTextByCss(pageHome.selectors.cards.carPickUpDate, 'SAT, JUN 07')
      // Drop off date
      .waitForTextByCss(pageHome.selectors.cards.carDropOffDate, 'SAT, JUN 07')
      // Pick up location
      .waitForTextByXpath(pageHome.selectors.cards.carPickUpLocation, 'DEN, Denver, CO')
      // Drop off location
      .waitForTextByXpath(pageHome.selectors.cards.carDropOffLocation, 'DEN, Denver, CO');
  },

  'step 9 - Hotel card' : (browser) => {
    browser
      // Hotel icon
      .waitForAttributeContainsByCss(pageHome.selectors.cards.hotelIcon, 'data-testid', 'icon-Hotel')
      // Hotel name
      .waitForTextByCss(pageHome.selectors.cards.hotelTitle, 'COUNTRY INN STS DENVER AIR')
      // Hotel check in
      .waitForTextByCss(pageHome.selectors.cards.hotelCheckIn, 'SUN,JUN 08')
      // Hotel check out
      .waitForTextByCss(pageHome.selectors.cards.hotelCheckOut, 'MON,JUN 09')
      // Hotel duration
      .waitForTextByCss(pageHome.selectors.cards.hotelDuration, '1 NIGHT')
      // Hotel address
      .waitForTextByCss(pageHome.selectors.cards.hotelAddress, '4343 N. Airport Way,');
  },

  'step 10 - Rail card' : (browser) => {
    browser
      // Navigate forward
      .multipleClicks(pageHome.selectors.navigation.cardsNavigationForward, 2)
      // Rail icon
      .waitForAttributeContainsByCss(pageHome.selectors.cards.railIcon, 'data-testid', 'icon-Train')
      // Rail title
      .waitForTextByCss(pageHome.selectors.cards.railTitle, 'Amtrak')
      // Rail departure time
      .waitForTextByCss(pageHome.selectors.cards.railDepartureTime, '9:30 AM')
      // Rail arrival time
      .waitForTextByCss(pageHome.selectors.cards.railArrivalTime, '11:30 AM')
      // Rail duration
      .waitForTextByCss(pageHome.selectors.cards.railDuration, '26 HOURS')
      // Rail departure date
      .waitForTextByCss(pageHome.selectors.cards.railDepartureDate, 'MON, JUN 09')
      // Rail arrival date
      .waitForTextByCss(pageHome.selectors.cards.railArrivalDate, 'TUE, JUN 10')
      // Rail origin station
      .waitForTextByXpath(pageHome.selectors.cards.railOriginStationProd, 'Santa Ana John\nWayne, Santa Ana,...')
      // Rail destination station
      .waitForTextByXpath(pageHome.selectors.cards.railDestinationStationProd, 'San Diego, San\nDiego, US');
  },

  'step 11 - Meeting card' : (browser) => {
    browser
      // Meeting icon
      .waitForAttributeContainsByCss(pageHome.selectors.cards.meetingIcon, 'data-testid', 'icon-Meeting')
      // Meeting title
      .waitForTextByCss(pageHome.selectors.cards.meetingTitle, 'Meeting With Misha')
      // Meeting start time
      .waitForTextByCss(pageHome.selectors.cards.meetingStartTime, '2:00 PM')
      // Meeting end time
      .waitForTextByCss(pageHome.selectors.cards.meetingEndTime, '3:00 PM')
      // Meeting duration
      .waitForTextByCss(pageHome.selectors.cards.meetingDuration, '1H 0M')
      // Meeting start date
      .waitForTextByCss(pageHome.selectors.cards.meetingStartDate, 'TUE, JUN 10')
      // Meeting end date
      .waitForTextByCss(pageHome.selectors.cards.meetingEndDate, 'TUE, JUN 10');
      // Meeting address
      // .waitForTextByXpath(pageHome.selectors.cards.meetingAddressProd, 'Shibuya, Tokyo%0ATokyo‎ Shibuya%0AJapan')
      // Meeting contact
      // .waitForTextByXpath(pageHome.selectors.cards.railDestinationStation, 'San Diego, San\nDiego, US')
  },

  'step 12 - Company news' : (browser) => {
    browser
      .execute(function() { window.scrollBy(0, 2000); }, [])
      // Company news title
      .waitForTextByCss(pageHome.selectors.companyNews.companyNewsTitle, 'Company News')
      // Company news 7th article title
      .waitForTextByCss(pageHome.selectors.companyNews.companyNewsArticleTitle, 'US - Employee Travel Office Contact')
      // Company news 7th article date
      .waitForTextByCss(pageHome.selectors.companyNews.companyNewsArticleDate, 'Apr 10, 2019')
      // Show more button
      .waitForTextByCss(pageHome.selectors.companyNews.companyNewsShowMoreButton, 'Show more')
      // Click on show more
      .waitAndClickByCss(pageHome.selectors.companyNews.companyNewsShowMoreButton)
      // Scroll down
      .execute(function() { window.scrollBy(0, 2500); }, [])
      // Company news 7th article content
      .waitForTextByCss(pageHome.selectors.companyNews.companyNewsArticleContent, 'CWT Employee Travel Office')
      // Show less button
      .waitForTextByCss(pageHome.selectors.companyNews.companyNewsShowLessButton, 'Show less')
      // Click on show less
      .waitAndClickByCss(pageHome.selectors.companyNews.companyNewsShowLessButton);
  },

  'step 13 - Company resources' : (browser) => {
    browser
      // Company resources title
      .waitForTextByCss(pageHome.selectors.companyResources.companyResourcesTitle, 'Company Resources')
      // Company resources links title
      .waitForTextByCss(pageHome.selectors.companyResources.companyResourcesLinksToggle, 'MY COMPANY LINKS')
      // Click on toggle button twice
      .multipleClicks(pageHome.selectors.companyResources.companyResourcesLinksToggle, 2);
      // .refresh()
      // .execute(function() { window.scrollBy(0, 500); }, [])
      // Click on the first link
      // .stop()
      // .waitAndClickByCss(pageHome.selectors.companyResources.companyResourcesLink1Prod)
      // // Switch to the second tab and check the url
      // .switchToTab(1)
      // .waitForUrlToContain('https://www.mycwt.com/')
      // .closeWindow()
      // .pause(1000)
      // .switchToTab(0);
  },

  'step 14 - Navigation links' : (browser) => {
    browser
      // Book a flight
      .waitForTextByCss(pageHeader.selectors.navigation.bookAFlight, 'BOOK A FLIGHT')
      // CLick on book flight
      .waitAndClickByCss(pageHeader.selectors.navigation.bookAFlight)
      // Validate book flight url
      .waitForUrlToContain('https://travel.mycwt.com/book-a-flight#/', 30000)
      // Click on the logo (back home)
      .waitAndClickByCss(pageHeader.selectors.navigation.myCWTLogo)
      // Validate home page
      .waitForUrlToContain('https://travel.mycwt.com/', 30000)

      // Book a hotel
      .waitForTextByCss(pageHeader.selectors.navigation.bookAHotel, 'BOOK A HOTEL')
      // CLick on book hotel
      .waitAndClickByCss(pageHeader.selectors.navigation.bookAHotel)
      // Validate book hotel url
      .waitForUrlToContain('https://travel.mycwt.com/book-a-hotel#/', 30000)
      // Click on the logo (back home)
      .waitAndClickByCss(pageHeader.selectors.navigation.myCWTLogo)
      // Validate home page
      .waitForUrlToContain('https://travel.mycwt.com/', 30000)

      // My trips
      .waitForTextByCss(pageHeader.selectors.navigation.myTrips, 'VIEW TRIPS')
      // Click on my trips
      .waitAndClickByCss(pageHeader.selectors.navigation.myTrips)
      .pause(1000)
      .waitForUrlToContain('https://travel.mycwt.com/my-trips#/', 30000)
      // Click on the logo (back home)
      .waitAndClickByCss(pageHeader.selectors.navigation.myCWTLogo)
      // Validate home page
      .waitForUrlToContain('https://travel.mycwt.com/', 30000)

      // Train schedule
      .waitForTextByCss(pageHeader.selectors.navigation.trainSchedule, 'TRAIN SCHEDULE')
      // Click on train schedule
      .waitAndClickByCss(pageHeader.selectors.navigation.trainSchedule)
      .pause(1000)
      .waitForUrlToContain('https://travel.mycwt.com/travel-tools#/', 30000)
      // Click on the logo (back home)
      .waitAndClickByCss(pageHeader.selectors.navigation.myCWTLogo)
      // Validate home page
      .waitForUrlToContain('https://travel.mycwt.com/', 30000)

      // CWT ANALYTIQS
      .waitForTextByCss(pageHeader.selectors.navigation.cwtAnalytiqs, 'CWT ANALYTIQS')
      // Click on cwt analytiqs
      .waitAndClickByCss(pageHeader.selectors.navigation.cwtAnalytiqs)
      .pause(1000)
      // Switch to the second tab and check the edit profile url
      .switchToTab(1)
      .waitForUrlToContain('https://www.cwtanalytiqs.com/', 30000)
      .closeWindow()
      .pause(1000)
      .switchToTab(0)

      // Admin
      .waitForTextByCss(pageHeader.selectors.navigation.admin, 'ADMIN')
      // Click on Admin
      .waitAndClickByCss(pageHeader.selectors.navigation.admin)
      .pause(3000)
      // Check the url
      .waitForUrlToContain('https://travel.mycwt.com/admin#/', 30000)


      // My travel profile
      .waitForTextByCss(pageHeader.selectors.navigation.myProfileDropdown, 'MY PROFILE')
      // Click on my profile dropdown
      .waitAndClickByCss(pageHeader.selectors.navigation.myProfileDropdown)
      // Click on edit profile
      .waitAndClickByCss(pageHeader.selectors.navigation.EditProfile)
      .pause(2000)
      // Switch to the second tab and check the edit profile url
      .switchToTab(1)
      .waitForUrlToContain('https://profile.mycwt.com/profile/profile-mgmt/edit/portalblue', 30000)
      .closeWindow()
      .pause(1000)
      .switchToTab(0);
  },

//   ---------------------------------- My Trips ---------------------------------- My Trips ---------------------------------- My Trips ----------------------------------

  'step 15 - My trips - Upcoming' : (browser) => {
    browser
      // click on my trips in the navigation bar
      .waitAndClickByCss(pageHeader.selectors.navigation.myTrips)
      // View trips main title
      .waitForTextByCss(pageMyTrips.selectors.upcomingTrips.upcomingTripsTitle, 'Upcoming Trips (1)')
      // Trip title
      .waitForTextByCss(pageMyTrips.selectors.upcomingTrips.firstTripTitle, 'Trip to Tokyo')
      // Trip location
      .waitForTextByCss(pageMyTrips.selectors.upcomingTrips.firstTripLocation, 'Tokyo, JP')
      // Trip date and duration
      .waitForTextByCss(pageMyTrips.selectors.upcomingTrips.firstTripDateAndDuration, 'Jun 4, 2025 - Jun 10, 2025 | 7 days')

      // flight item
      .waitForAttributeContainsByCss(pageMyTrips.selectors.upcomingTrips.firstTripFlightIcon, 'data-testid', 'icon-Plane')
      .waitForTextByCss(pageMyTrips.selectors.upcomingTrips.firstTripFlightDetails, 'LHR - SVO - NRT')
      // missing hotel item
      .waitForAttributeContainsByCss(pageMyTrips.selectors.upcomingTrips.firstTripMissingHotelIcon, 'data-testid', 'icon-Hotel')
      .waitForTextByXpath(pageMyTrips.selectors.upcomingTrips.firstTripMissingHotelDetails, 'Missing Hotel')
      // car item
      .waitForAttributeContainsByCss(pageMyTrips.selectors.upcomingTrips.firstTripCarIcon, 'data-testid', 'icon-Car')
      .waitForTextByXpath(pageMyTrips.selectors.upcomingTrips.firstTripCarDetails, 'DOLLAR')
      // More items
      .waitForTextByCss(pageMyTrips.selectors.upcomingTrips.firstTripMoreItemsNumber, '+ 2')
      .waitForTextByXpath(pageMyTrips.selectors.upcomingTrips.firstTripMoreItemsText, 'More items');
  },

  'step 16 - My trips - Past' : (browser) => {
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
      .waitForTextByCss(pageMyTrips.selectors.pastTrips.firstTripTitle, 'Trip to Bangkok')
      // Past trip location
      .waitForTextByCss(pageMyTrips.selectors.pastTrips.firstTripLocation, 'Bangkok, TH')
      // Past trip dates and duration
      .waitForTextByXpath(pageMyTrips.selectors.pastTrips.firstTripDateAndDuration, 'Jul 29, 2016 - Oct 29, 2016 | 93 days')
      // Flight item
      .waitForAttributeContainsByCss(pageMyTrips.selectors.pastTrips.firstTripFlightIcon, 'data-testid', 'icon-Plane')
      .waitForTextByXpath(pageMyTrips.selectors.pastTrips.firstTripFlightDetails, 'WLG - SYD - BKK\n- PHL - PHL')
      // Search field pre-text
      .waitForAttributeContainsByCss(pageMyTrips.selectors.pastTrips.pastTripsSearchInput, 'placeholder', 'Search for city airport or landmark')
      // Search field icon
      .waitForAttributeContainsByCss(pageMyTrips.selectors.pastTrips.pastTripsSearchIcon, 'data-testid', 'icon-Search');
  },

  'step 17 - Past trips search' : (browser) => {
    browser
      // Add text for existing trip
      .waitAndSetValueByCss(pageMyTrips.selectors.pastTrips.pastTripsSearchInput, 'Bangkok')
      // validate trip exist in the results
      .waitForTextByCss(pageMyTrips.selectors.pastTrips.firstTripTitle, 'Trip to Bangkok')
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
      .waitForTextByCss(pageMyTrips.selectors.pastTrips.firstTripTitle, 'Trip to Bangkok');
  },

//    ---------------------------------- Trip details ---------------------------------- Trip details ---------------------------------- Trip details ----------------------------------

  'step 18 - Trip details header' : (browser) => {
    browser
      // Click on the first trip title
      .waitAndClickByCss(pageMyTrips.selectors.upcomingTrips.firstTripTitle)
      // Home breadcrumb link
      .waitForTextByCss(pageTripDetails.selectors.innerHeader.breadcrumbsHome, 'HOME')
      // My trips breadcrumb link
      .waitForTextByCss(pageTripDetails.selectors.innerHeader.breadcrumbsMyTrips, 'MY TRIPS')
      // Breadcrumb seperator icon
      .waitForAttributeContainsByCss(pageTripDetails.selectors.innerHeader.breadcrumbsSeperator1, 'data-testid', 'icon-Forward')

      // click on home
      .waitAndClickByCss(pageTripDetails.selectors.innerHeader.breadcrumbsHome)
      // validate home URL
      .waitForUrlToContain('https://travel.mycwt.com/', 30000)
      // Click on my trips tab
      .waitAndClickByCss(pageHeader.selectors.navigation.myTrips)
      // click on the first trip title
      .waitAndClickByCss(pageMyTrips.selectors.upcomingTrips.firstTripTitle)

      // click on my trips breadcrumb link
      .waitAndClickByCss(pageTripDetails.selectors.innerHeader.breadcrumbsMyTrips)
      // validate my trips URL
      .waitForUrlToContain('https://travel.mycwt.com/my-trips#/', 30000)
      // click on the first trip title
      .waitAndClickByCss(pageMyTrips.selectors.upcomingTrips.firstTripTitle)
      // Validate first trip location
      .waitForTextByCss(pageTripDetails.selectors.innerHeader.tripName, 'Trip to Tokyo, JP')
      // Validate first trip dates
      .waitForTextByCss(pageTripDetails.selectors.innerHeader.tripDates, 'Jun 4, 2025 - Jun 10, 2025 | 7 days')

      // Click on the map link
      .waitAndClickByCss(pageTripDetails.selectors.innerHeader.mapText)
      // Close the map
      .waitAndClickByCss(pageTripDetails.selectors.map.closeMapButton)
      .pause(1000)


      // Click on share button
      .waitAndClickByCss(pageTripDetails.selectors.share.shareButtonText)
      // Share dialog trip title
      .waitForTextByCss(pageTripDetails.selectors.share.shareDialogTripTitle, 'Share Trip to Tokyo')
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
      .waitForAttributeContainsByCss(pageTripDetails.selectors.innerHeader.printIcon, 'data-testid', 'icon-Printer');
  },

  'step 19 - Trip details flight item' : (browser) => {
    browser
      // Flight icon
      .waitForAttributeContainsByCss(pageTripDetails.selectors.flight.firstFlightIcon, 'data-testid', 'icon-Plane')
      // Flight title (airline + number)
      .waitForTextByCss(pageTripDetails.selectors.flight.firstFlightTitle, 'WED, JUN 04\nTypeAirline Carrier And Flight Code Are\nFlight To Moscow (SVO) | Aeroflot 262')
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

  'step 20 - Trip details missing hotel item' : (browser) => {
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

  'step 21 - Trip details car item' : (browser) => {
    browser
      // Car main date title
      .waitForTextByCss(pageTripDetails.selectors.carPickUp.carDate, 'SAT, JUN 07')
      // Car icon
      .waitForAttributeContainsByCss(pageTripDetails.selectors.carPickUp.carIcon, 'data-testid', 'icon-Car')
      // Car title
      .waitForTextByCss(pageTripDetails.selectors.carPickUp.carTitle, 'SAT, JUN 07\nTyperental Company Is\nPick-Up | DOLLAR')
      // Car pick-up time
      .waitForTextByCss(pageTripDetails.selectors.carPickUp.carPickUpTime, '1:10 PM')
      // Car drop-off time
      .waitForTextByCss(pageTripDetails.selectors.carPickUp.carDropOffTime, '8:20 PM')
      // Car duration
      .waitForTextByCss(pageTripDetails.selectors.carPickUp.carDuration, '1 DAY')
      // Car pick-up date
      .waitForTextByCss(pageTripDetails.selectors.carPickUp.carPickUpDate, 'SAT, JUN 07')
      // Car drop-off date
      .waitForTextByCss(pageTripDetails.selectors.carPickUp.carDropOffDate, 'SAT, JUN 07')

      // Car pick-up location
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
      // Car drop-pff title
      .waitForTextByCss(pageTripDetails.selectors.carDropOff.carTitle, 'Typerental Company Is\nDrop-Off | DOLLAR')
      // Car drop-pff time
      .waitForTextByCss(pageTripDetails.selectors.carDropOff.carDropOffTime, '8:20 pm')
      // Car drop-pff location icon
      .waitForAttributeContainsByCss(pageTripDetails.selectors.carDropOff.carDropOffLocationIcon, 'data-testid', 'icon-Location')
      // Car drop-pff location
      .waitForTextByCss(pageTripDetails.selectors.carDropOff.carDropOffLocation, 'DEN, Denver, CO');
  },

  'step 22 - Trip details hotel item' : (browser) => {
    browser
      // Scroll down
      .execute(function() { window.scrollBy(0, 500); }, [])
      // Hotel icon
      .waitForAttributeContainsByCss(pageTripDetails.selectors.hotel.hotelIcon, 'data-testid', 'icon-Hotel')
      // Hotel check-in date
      .waitForTextByCss(pageTripDetails.selectors.hotel.hotelDate, 'SUN, JUN 08')
      // Hotel title
      .waitForTextByCss(pageTripDetails.selectors.hotel.hotelTitle, 'SUN, JUN 08\nType. Hotel Name Is\nCheck-In | COUNTRY INN STS DENVER AIR')
      // Hotel check-in title
      .waitForTextByCss(pageTripDetails.selectors.hotel.hotelCheckInTitle, 'CHECK-IN')
      // Hotel check-out title
      .waitForTextByCss(pageTripDetails.selectors.hotel.hotelCheckOutTitle, 'CHECK-OUT')
      // Hotel check-in date
      .waitForTextByCss(pageTripDetails.selectors.hotel.hotelCheckInDate, 'SUN,JUN 08')
      // Hotel check-out date
      .waitForTextByCss(pageTripDetails.selectors.hotel.hotelCheckOutDate, 'MON,JUN 09')
      // Hotel duration
      .waitForTextByCss(pageTripDetails.selectors.hotel.hotelDuration, '1 NIGHT')
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
      .waitForTextByCss(pageTripDetails.selectors.hotelCheckOut.hotelCheckOutDate, 'MON, JUN 09')
      // Check-out title
      .waitForTextByCss(pageTripDetails.selectors.hotelCheckOut.hotelCheckOutTitle, 'MON, JUN 09\nType. Hotel Name Is\nCheck-Out | COUNTRY INN STS DENVER AIR');
  },

  'step 23 - Trip details rail item' : (browser) => {
    browser
      // Scroll down
      .execute(function() { window.scrollBy(0, 500); }, [])
      // Rail icon
      .waitForAttributeContainsByCss(pageTripDetails.selectors.rail.railIcon, 'data-testid', 'icon-Train')
      // Rail title
      .waitForTextByCss(pageTripDetails.selectors.rail.railTitle, 'Amtrak 566')
      // Rail departure time
      .waitForTextByCss(pageTripDetails.selectors.rail.railDepartureTime, '9:30 AM')
      // Rail arrival time
      .waitForTextByCss(pageTripDetails.selectors.rail.railArrivalTime, '11:30 AM')
      // Rail duration
      .waitForTextByCss(pageTripDetails.selectors.rail.railDuration, '1D 2H 0M')
      // Rail departure date
      .waitForTextByCss(pageTripDetails.selectors.rail.railDepartureDate, 'MON, JUN 09')
      // Rail arrival date
      .waitForTextByCss(pageTripDetails.selectors.rail.railArrivalDate, 'TUE, JUN 10')
      // Rail departure address
      .waitForTextByXpath(pageTripDetails.selectors.rail.railDepartureAddressProd, 'Santa Ana John Wayne,\nSanta Ana, US')
      // Rail arrival address
      .waitForTextByXpath(pageTripDetails.selectors.rail.railArrivalAddressProd, 'San Diego, San Diego, US')
      // Rail confirmation
      .waitForTextByCss(pageTripDetails.selectors.rail.railConfirmation, 'Confirmation #:\n0D1212')
      // Rail trip locator
      .waitForTextByCss(pageTripDetails.selectors.rail.railTripLocator, 'Trip Locator:\nPoexdr6')
      // Rail more details text
      .waitForTextByCss(pageTripDetails.selectors.rail.railMoreDetailsText, 'MORE DETAILS')
      // Rail more details icon
      .waitForAttributeContainsByCss(pageTripDetails.selectors.rail.railMoreDetailsButton, 'data-testid', 'icon-DownArrow');
  },

  'step 24 - Trip details meeting item' : (browser) => {
    browser
      // Scroll down
      .execute(function() { window.scrollBy(0, 500); }, [])
      // Meeting icon
      .waitForAttributeContainsByCss(pageTripDetails.selectors.meeting.meetingIcon, 'data-testid', 'icon-Meeting')
      // Meeting title
      .waitForTextByCss(pageTripDetails.selectors.meeting.meetingTitle, 'Meeting With Misha')
      // Meeting start title
      .waitForTextByCss(pageTripDetails.selectors.meeting.meetingStartTitle, 'STARTS')
      // Meeting end title
      .waitForTextByCss(pageTripDetails.selectors.meeting.meetingEndTitle, 'ENDS')
      // Meeting start time
      .waitForTextByCss(pageTripDetails.selectors.meeting.meetingStartTime, '2:00 PM')
      // Meeting end time
      .waitForTextByCss(pageTripDetails.selectors.meeting.meetingEndTime, '3:00 PM')
      // Meeting duration
      .waitForTextByCss(pageTripDetails.selectors.meeting.meetingDuration, '1 Hour')
      // Meeting start date
      .waitForTextByCss(pageTripDetails.selectors.meeting.meetingStartDate, 'TUE, JUN 10')
      // Meeting end date
      .waitForTextByCss(pageTripDetails.selectors.meeting.meetingEndDate, 'TUE, JUN 10')
      // Meeting address
      .waitForTextByCss(pageTripDetails.selectors.meeting.meetingAddress, 'Shibuya City, Tokyo, Japan')
      // Meeting address icon
      .waitForAttributeContainsByCss(pageTripDetails.selectors.meeting.meetingAddressIcon, 'data-testid', 'icon-Location')
      // Meeting more details text
      .waitForTextByCss(pageTripDetails.selectors.meeting.meetingMoreDetailsText, 'MORE DETAILS')
      // Meeting more details icon
      .waitForAttributeContainsByCss(pageTripDetails.selectors.meeting.meetingMoreDetailsButton, 'data-testid', 'icon-DownArrow');
  },

  'step 25 - Navigating to trip details' : (browser) => {
    browser
    // Via home cards
      .refresh()
      // .stop()
      // Validate breadcrumbs home title and click on it
      .waitForTextByCss(pageTripDetails.selectors.innerHeader.breadcrumbsHome, 'HOME')
      .waitAndClickByCss(pageTripDetails.selectors.innerHeader.breadcrumbsHome)
      // Validate home URL
      .waitForUrlToContain('https://travel.mycwt.com/', 20000)
      // Navigate to the trip details via click on trip card
      .waitAndClickByCss(pageHome.selectors.cards.firstFlightIcon)
      // Validate trip url (coming from home)
      .waitForUrlToContain('https://travel.mycwt.com/my-trips#/277558572', 30000)

    // Via my click on trip in "My trips"
      // Validate breadcrumbs my trips title and click on it
      .waitForTextByCss(pageHeader.selectors.navigation.myTrips, 'VIEW TRIPS')
      .waitAndClickByCss(pageHeader.selectors.navigation.myTrips)
      // Validate my trips url
      .waitForUrlToContain('https://travel.mycwt.com/my-trips#/', 20000)
      // Navigate to trip details (via click on the trip)
      .waitAndClickByCss(pageMyTrips.selectors.upcomingTrips.firstTripTitle)
      .pause(1000)
      // Validate trip url (coming from trip details)
      .waitForUrlToContain('https://travel.mycwt.com/my-trips#/277558572', 20000)
      .pause(1000)
      .waitAndClickByCss(pageTripDetails.selectors.innerHeader.breadcrumbsHome);
  },

//    -------------------------------- Footer -------------------------------- Footer -------------------------------- Footer --------------------------------

  'step 26 - footer': (browser) => {
    browser
      // scroll down
      .execute(function () {window.scrollBy(0, 3000);}, [])
      // Validate entire footer text
      .waitForTextByCss(pageFooter.selectors.fullFooterText, 'Copyright © 2022 CWT All rights reserved | Technical Assistance\n' +
        'We are committed to protecting your personal data and privacy.Read CWT’s Global Privacy Policy and Notice to understand what information CWT collects and why, how CWT uses it and stores it.Also read our Cookie Policy to select your cookie preferences.For further information, please see Terms of Use.')

      // Validate global privacy URL
      .validateUrlOnSecondTab(pageFooter.selectors.globalPrivacyLink, 'www.mycwt.com/legal/global-privacy-policy/')
      // Validate cookie policy URL
      .validateUrlOnSecondTab(pageFooter.selectors.cookiePolicyLink, 'https://www.mycwt.com/legal/cookies-policy/')
      // Validate terms of use URL
      .validateUrlOnSecondTab(pageFooter.selectors.termsOfUseLink, 'https://www.mycwt.com/legal/platform-terms-of-use/');
  },

//    -------------------------------- Footer Technical assistance dialog --------------------------------

  'step 27 - footer - Technical assistance': (browser) => {
    browser
      // Open technical assistance dialog.
      .waitAndClickByCss(pageFooter.selectors.technicalAssistanceLink)
      // Main title
      .waitForTextByCss(pageTechnicalAssistance.selectors.title, 'We\'re here to help')
      // Main content
      .waitForTextByCss(pageTechnicalAssistance.selectors.content, 'For immediate travel/reservation requests or assistance, please contact a CWT Counsellor. For any other technical issue fill in the form and we’ll get back to you shortly')
      // Description title
      .waitForTextByCss(pageTechnicalAssistance.selectors.descriptionTitle, 'Description\n(minimum 6 characters long)')
      // Description pre-text
      .waitForAttributeContainsByCss(pageTechnicalAssistance.selectors.descriptionInput, 'placeholder', 'Enter description')
      // Number of characters text
      .waitForTextByCss(pageTechnicalAssistance.selectors.descriptionNumberOfCharacters, '1,000 characters left')
      // Get back title
      .waitForTextByCss(pageTechnicalAssistance.selectors.getBackTitle, 'Get back to me by:')
      // Email title
      .waitForTextByCss(pageTechnicalAssistance.selectors.emailText, 'Email')
      // Phone title
      .waitForTextByCss(pageTechnicalAssistance.selectors.phoneText, 'Phone')
      // Default email
      .waitForAttributeContainsByCss(pageTechnicalAssistance.selectors.emailPhoneInput, 'value', 'portal-sanity1@mailtest.worldmate.com')
      // Cancel button text
      .waitForTextByCss(pageTechnicalAssistance.selectors.cancelButton, 'CANCEL')
      // Submit button text
      .waitForTextByXpath(pageTechnicalAssistance.selectors.submitButton, 'SUBMIT')

      // Add description
      .waitAndSetValueByCss(pageTechnicalAssistance.selectors.descriptionInput, 'This is my description')
      // Click on submit button
      .waitAndClickByXpath(pageTechnicalAssistance.selectors.submitButton)
      // Validate message sent
      .waitForTextByCss(pageTechnicalAssistance.selectors.successTitle, 'Your request has been processed!')
      // Close the dialog
      .waitAndClickByCss(pageTechnicalAssistance.selectors.successCloseIcon);
  },

  'step 28 - Logout': (browser) => {
    browser
      .portalLogout();
  }
};