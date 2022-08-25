'use strict';

//todo: complete this test

const globals = require('../../../nightwatch.globals');
const pageHeader = require('../../../pages/page-header');
const pageMyTravelers = require('../../../pages/page-my-travelers');

module.exports = {

  '@tags': ['sanity', 'portal', 'production'],

  before: function (browser) {
    browser.windowMaximize();
  },

  'step 1 - Login': (browser) => {
    browser
      .loginToPortalProd(globals.users.portalUser112.username, globals.users.portalUser112.password);
  },

  'step 2 - My travelers list': (browser) => {
    browser
      // click on my travelers link
      .waitAndClickByCss(pageHeader.selectors.navigation.myTravelers)
      // Validate my travelers title
      .waitForTextByCss(pageMyTravelers.selectors.myTravelers.travelersTitle, 'My travellers view')
      // Validate search field pre-text
      .waitForTextByCss(pageMyTravelers.selectors.myTravelers.searchPreText, 'Search for travelers')
      // First traveler - name
      .waitForTextByCss(pageMyTravelers.selectors.traveler1.travelerName, 'Nilson aawe')
      // First traveler - location
      .waitForTextByCss(pageMyTravelers.selectors.traveler1.tripLocation, 'Trip to Tokyo')
      // First traveler - dates
      .waitForTextByCss(pageMyTravelers.selectors.traveler1.tripDate, '4 Jun 2028 - 3 Sep 2028')
      // First traveler - missing hotel label
      .waitForTextByCss(pageMyTravelers.selectors.traveler1.missingHotelLabel, 'Missing hotel')
      // First traveler - view all trips label
      .waitForTextByCss(pageMyTravelers.selectors.traveler1.viewAllTrips, 'view all trips')
      // First traveler - booking a hotel
      .waitForTextByCss(pageMyTravelers.selectors.traveler1.bookAHotel, 'BOOK HOTEL');
  },

  'step 3 - Travel arranger - Search': (browser) => {
    browser
      // Search for existing traveler
      .waitAndSetValueByCss(pageMyTravelers.selectors.myTravelers.searchInput, 'Nilson Two')
      // Validate search result name
      .waitForTextByCss(pageMyTravelers.selectors.myTravelers.searchResultName, 'Nilson Two')
      // Validate search result email
      .waitForTextByCss(pageMyTravelers.selectors.myTravelers.searchResultEmail, 'nilson2@yopmail.com')
      // Clear search field
      .clearValue(pageMyTravelers.selectors.myTravelers.searchInput)

      // Search for non-existing traveler
      .waitAndSetValueByCss(pageMyTravelers.selectors.myTravelers.searchInput, 'Fake traveler')
      // Validate no travelers text
      .waitForTextByCss(pageMyTravelers.selectors.myTravelers.searchNoTravelersText, 'No travelers found');
  },

  'step 4 - Traveler with no trips': (browser) => {
    browser
      .clearValue(pageMyTravelers.selectors.myTravelers.searchInput)
      // Type traveler name with no trips
      .waitAndSetValueByCss(pageMyTravelers.selectors.myTravelers.searchInput, 'Nilson Three')
      // Click on the result
      .waitAndClickByCss(pageMyTravelers.selectors.myTravelers.searchResultName)

      // Traveler name
      .waitForTextByCss(pageMyTravelers.selectors.traveler1.travelerName, 'Nilson Three')
      // No upcoming trips text
      .waitForTextByCss(pageMyTravelers.selectors.traveler1.noUpcomingTripsLabel, 'no upcoming trips')
      // View all trips disabled
      .waitForAttributeContainsByCss(pageMyTravelers.selectors.traveler1.viewAllTripsDisabled, 'class', 'Disabled')

      // Link to book a hotel
      .waitAndClickByCss(pageMyTravelers.selectors.traveler1.bookAHotel)
      // Validate URL
      .waitForUrlToContain('https://travel.mycwt.com/book-a-hotel#/')
      // Back to My travelers list
      .waitAndClickByCss(pageHeader.selectors.navigation.myTravelers);
  },

  'step 5 - Traveler links': (browser) => {
    browser
      // Link to the trip
      .waitAndClickByCss(pageMyTravelers.selectors.traveler1.tripLocation)
      // Validate URL
      .waitForUrlToContain('https://travel.mycwt.com/my-travelers#/43149871/376344397')
      // Back to My travelers list
      .waitAndClickByCss(pageHeader.selectors.navigation.myTravelers)

      // Link to view all trips
      .waitAndClickByCss(pageMyTravelers.selectors.traveler1.viewAllTrips)
      // Validate URL
      .waitForUrlToContain('https://travel.mycwt.com/my-travelers#/43149871')
      // Back to My travelers list
      .waitAndClickByCss(pageHeader.selectors.navigation.myTravelers)

      // Link to book a hotel
      .waitAndClickByCss(pageMyTravelers.selectors.traveler1.bookAHotel)
      // Validate URL
      .waitForUrlToContain('https://travel.mycwt.com/book-a-hotel')
      // Back to My travelers list
      .waitAndClickByCss(pageHeader.selectors.navigation.myTravelers);
  },
};