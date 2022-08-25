'use strict';

const globals = require('../../../nightwatch.globals');
const pageHome = require('../../../pages/page-home');
const pageHeader = require('../../../pages/page-header');
const pageMyTravelers = require('../../../pages/page-my-travelers');
module.exports = {

'@tags': ['sanity', 'TA'],

  before: function (browser) {
    browser.windowMaximize();
  },

  'step 1 - Login': (browser) => {
    browser
      .loginToPortalStage(globals.users.portalUser85.username, globals.users.portalUser85.password);
  },

  'step 2 - Validate home navigation links' : (browser) => {
    browser
      // Book a hotel
      .waitForTextByCss(pageHeader.selectors.navigation.bookAHotel, 'BOOK A HOTEL')
      .waitAndClickByCss(pageHeader.selectors.navigation.bookAHotel)
      .waitForUrlToContain('https://travel.stage-mycwt.com/book-a-hotel#/', 20000)
      // Home (CWT logo)
      .waitAndClickByCss(pageHeader.selectors.navigation.myCWTLogo)
      .waitForUrlToContain('https://travel.stage-mycwt.com/',20000)

      // My trips
      .waitForTextByCss(pageHeader.selectors.navigation.myTrips, 'MY TRIPS')
      .waitAndClickByCss(pageHeader.selectors.navigation.myTrips)
      .waitForUrlToContain('https://travel.stage-mycwt.com/my-trips#/',20000)
      // .refresh()
      // Home (CWT logo)
      .waitAndClickByCss(pageHeader.selectors.navigation.myCWTLogo)
      .waitForUrlToContain('https://travel.stage-mycwt.com/',20000)

      // my travelers
      .waitForTextByCss(pageHeader.selectors.navigation.myTravelers, 'MY TRAVELERS')
      .waitAndClickByCss(pageHeader.selectors.navigation.myTravelers)
      .waitForUrlToContain('https://travel.stage-mycwt.com/my-travelers#/',20000)
      // Home (CWT logo)
      .waitAndClickByCss(pageHeader.selectors.navigation.myCWTLogo)
      .waitForUrlToContain('https://travel.stage-mycwt.com/',20000)

      // Train schedule
      .waitForTextByCss(pageHeader.selectors.navigation.trainSchedule, 'TRAIN SCHEDULE')
      .waitAndClickByCss(pageHeader.selectors.navigation.trainSchedule)
      .waitForUrlToContain('https://travel.stage-mycwt.com/travel-tools#/',20000)
      // Home (CWT logo)
      .waitAndClickByCss(pageHeader.selectors.navigation.myCWTLogo)
      .waitForUrlToContain('https://travel.stage-mycwt.com/',20000)

      // // CWT Analitiqs
      // .waitForTextByCss(pageHeader.selectors.navigation.cwtAnalytiqs, 'CWT ANALYTIQS')
      // .waitAndClickByCss(pageHeader.selectors.navigation.cwtAnalytiqs)
      // .switchToTab(1)
      // .waitForUrlToContain('https://ext.preprod-cwtanalytiqs.com/',20000)
      // .closeWindow()
      // .switchToTab(0)
      // // Home (CWT logo)
      // .waitAndClickByCss(pageHeader.selectors.navigation.myCWTLogo)
      // .waitForUrlToContain('https://travel.stage-mycwt.com/',20000)

      // Admin
      .waitForTextByCss(pageHeader.selectors.navigation.admin, 'ADMIN')
      .waitAndClickByCss(pageHeader.selectors.navigation.admin)
      .waitForUrlToContain('https://travel.stage-mycwt.com/admin#/',20000)

      // My travel profile
      .waitForTextByCss(pageHeader.selectors.navigation.myProfileDropdown, 'MY PROFILE')
      // Click on my profile dropdown
      .waitAndClickByCss(pageHeader.selectors.navigation.myProfileDropdown)
      // Click on edit profile
      .waitAndClickByCss(pageHeader.selectors.navigation.EditProfile)
      .pause(2000)
      // Switch to the second tab and check the edit profile url
      .switchToTab(1)
      .waitForUrlToContain('https://profile.stage-mycwt.com/profile/profile-mgmt/edit/portalblue', 30000)
      .closeWindow()
      .pause(1000)
      .switchToTab(0)

      // Account settings
      // Click on my profile dropdown
      .waitAndClickByCss(pageHeader.selectors.navigation.myProfileDropdown)
      // Click on account settings
      .waitAndClickByCss(pageHeader.selectors.navigation.accountSettings)
      // Validate account settings URL
      .waitForUrlToContain('https://travel.stage-mycwt.com/account-settings#/', 30000)
      // Home (CWT logo)
      .waitAndClickByCss(pageHeader.selectors.navigation.myCWTLogo)
      .waitForUrlToContain('https://travel.stage-mycwt.com/',20000)

      // Currency selection
      // Click on currency dropdown
      .waitAndClickByCss(pageHeader.selectors.currency.currencyDropdown)
      // Add new currency in the search field
      .waitAndSetValueByCss(pageHeader.selectors.currency.currencySearchInput, 'ILS')
      // Select the new currency
      .waitAndClickByCss(pageHeader.selectors.currency.currencySingleSelection)
      // Validate new currency display in the header
      .waitForTextByCss(pageHeader.selectors.currency.currencyText, '₪ (ILS)');
  },

  'step 3 - Validate home header items' : (browser) => {
    browser
      // Greeting message
      .waitForTextByCss(pageHome.selectors.welcome.welcomeGreeting, 'book your travelers\' next trips')
      // Username
      .waitForTextByCss(pageHome.selectors.welcome.welcomeUsername, 'plata')
      // Full title
      .waitForTextByCss(pageHome.selectors.welcome.welcomeFullTitle, 'Hello plata, book your travelers\' next trips');
  },

  'step 4 - Travel arranger - my travelers list' : (browser) => {
    browser
      // Click on my travelers link
      .waitAndClickByCss(pageHeader.selectors.navigation.myTravelers)
      // Check title
      .waitForTextByCss(pageMyTravelers.selectors.myTravelers.travelersTitle, 'My travelers view')
      // Validate search field pre-text
      .waitForTextByCss(pageMyTravelers.selectors.myTravelers.searchPreText, 'Search for travelers')
      // First traveler - name
      .waitForTextByCss(pageMyTravelers.selectors.traveler1.travelerName, 'plata Two')
      // First traveler - location
      .waitForTextByCss(pageMyTravelers.selectors.traveler1.tripLocation, 'Trip to Denver, CO')
      // First traveler - dates
      .waitForTextByCss(pageMyTravelers.selectors.traveler1.tripDate, 'Jan 1, 2028 - Jan 14, 2028')
      // First traveler - missing hotel label
      .waitForTextByCss(pageMyTravelers.selectors.traveler1.missingHotelLabel, 'Missing Hotel')
      // First traveler - view all trips label
      .waitForTextByCss(pageMyTravelers.selectors.traveler1.viewAllTrips, 'view all trips')
      // First traveler - booking a hotel
      .waitForTextByCss(pageMyTravelers.selectors.traveler1.bookAHotel, 'BOOK HOTEL');
  },

  'step 5 - Travel arranger - Search' : (browser) => {
    browser
      // Search for existing traveler
      .waitAndSetValueByCss(pageMyTravelers.selectors.myTravelers.searchInput, 'plata Two')
      // Validate search result name
      .waitForTextByCss(pageMyTravelers.selectors.myTravelers.searchResultName, 'plata Two')
      // Validate search result email
      .waitForTextByCss(pageMyTravelers.selectors.myTravelers.searchResultEmail, 'plata2@yopmail.com')
      // Clear search field
      .clearValue(pageMyTravelers.selectors.myTravelers.searchInput)

      // Search for non-existing traveler
      .waitAndSetValueByCss(pageMyTravelers.selectors.myTravelers.searchInput, 'Fake traveler')
      // Validate no travelers text
      .waitForTextByCss(pageMyTravelers.selectors.myTravelers.searchNoTravelersText, 'No travelers found');
  },

  'step 6 - Travel arranger - Traveler with no trips' : (browser) => {
    browser
      .clearValue(pageMyTravelers.selectors.myTravelers.searchInput)
      // Type traveler name with no trips
      .waitAndSetValueByCss(pageMyTravelers.selectors.myTravelers.searchInput, 'plata Eighteen')
      // Click on the result
      .waitAndClickByCss(pageMyTravelers.selectors.myTravelers.searchResultName)

      // Traveler name
      .waitForTextByCss(pageMyTravelers.selectors.traveler1.travelerName, 'plata Eighteen')
      // No upcoming trips text
      .waitForTextByCss(pageMyTravelers.selectors.traveler1.noUpcomingTripsLabel, 'no upcoming trips')
      // View all trips disabled
      .waitForAttributeContainsByCss(pageMyTravelers.selectors.traveler1.viewAllTripsDisabled, 'class', 'Disabled')

      // Link to book a hotel
      .waitAndClickByCss(pageMyTravelers.selectors.traveler1.bookAHotel)
      // Validate URL
      .waitForUrlToContain('https://travel.stage-mycwt.com/book-a-hotel')
      // Back to My travelers list
      .waitAndClickByCss(pageHeader.selectors.navigation.myTravelers);
  },

  'step 7 - Travel arranger - Traveler links' : (browser) => {
    browser
      // Link to the trip
      .waitAndClickByCss(pageMyTravelers.selectors.traveler1.tripLocation)
      // Validate URL
      .waitForUrlToContain('https://travel.stage-mycwt.com/my-travelers#/256636/999160')
      // Back to My travelers list
      .waitAndClickByCss(pageHeader.selectors.navigation.myTravelers)

      // Link to view all trips
      .waitAndClickByCss(pageMyTravelers.selectors.traveler1.viewAllTrips)
      // Validate URL
      .waitForUrlToContain('https://travel.stage-mycwt.com/my-travelers#/256636')
      // Back to My travelers list
      .waitAndClickByCss(pageHeader.selectors.navigation.myTravelers)

      // Link to book a hotel
      .waitAndClickByCss(pageMyTravelers.selectors.traveler1.bookAHotel)
      // Validate URL
      .waitForUrlToContain('https://travel.stage-mycwt.com/book-a-hotel')
      // Back to My travelers list
      .waitAndClickByCss(pageHeader.selectors.navigation.myTravelers)
  },
};