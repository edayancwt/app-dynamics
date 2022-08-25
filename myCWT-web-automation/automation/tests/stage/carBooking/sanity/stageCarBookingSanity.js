'use strict';

const globals = require('../../../../nightwatch.globals');
const pageHome = require('../../../../pages/page-home');
const pageHeader = require('../../../../pages/page-header');
const pageCarResults = require('../../../../pages/page-car-results');

module.exports = {
  '@tags': ['car', 'booking', 'sanity'],

  before: function (browser) {
    browser.windowMaximize();
  },

  'step 1 - login to portal': (browser) => {
    browser
      .loginToPortalStage(globals.users.portalUser143.username, globals.users.portalUser143.password);
  },

  'step 2 - Search locations - valid results': browser => {
    browser
      // Click on car booking tab (in the panel)
      .waitAndClickByCss(pageHome.selectors.carSearch.carTab)
      // Add pick up location
      .waitAndSetValueByCss(pageHome.selectors.carSearch.carPickUpLocationInput, 'berlin')
      // .stop()
      .waitForTextByCss('#react-select-6-option-0', 'Berlin')
      .waitForTextByCss('#react-select-6-option-1', 'Berlin Brandenburg Airport (BER)')
      .waitForTextByCss('#react-select-6-option-2', 'Berlin Airport (BML)')
      .waitForTextByCss('#react-select-6-option-3', 'New Berlin')
      .waitForTextByCss('#react-select-6-option-4', 'New Berlin')
      .waitForTextByCss('#react-select-6-option-5', 'Friedrichshain')
      .waitForTextByCss('#react-select-6-option-6', 'Lichtenberg')
      // .waitForTextByCss('#react-select-6-option-7', 'BERLIN CHARLOTTENB')
      // .waitForTextByCss('#react-select-6-option-8', 'BAYRISCHZELL')
      // .waitForTextByCss('#react-select-6-option-9', 'Potsdamer Platz')

      // Add drop off location
      .waitAndSetValueByCss(pageHome.selectors.carSearch.carDropOffLocationInput, 'berlin')
      .waitForTextByCss('#react-select-7-option-0', 'Berlin')
      .waitForTextByCss('#react-select-7-option-1', 'Berlin Brandenburg Airport (BER)')
      .waitForTextByCss('#react-select-7-option-2', 'Berlin Airport (BML)')
      .waitForTextByCss('#react-select-7-option-3', 'New Berlin')
      .waitForTextByCss('#react-select-7-option-4', 'New Berlin')
      .waitForTextByCss('#react-select-7-option-5', 'Friedrichshain')
      .waitForTextByCss('#react-select-7-option-6', 'Lichtenberg')
    // .waitForTextByCss('#react-select-7-option-7', 'BERLIN CHARLOTTENB')
    // .waitForTextByCss('#react-select-7-option-8', 'BAYRISCHZELL')
    // .waitForTextByCss('#react-select-7-option-9', 'Potsdamer Platz')
    ;
  },

  'step 3 - Search locations - invalid results': browser => {
    browser
      .clearValueByCss(pageHome.selectors.carSearch.carPickUpLocationInput)
      // Add none existing pick up location
      .waitAndSetValueByCss(pageHome.selectors.carSearch.carPickUpLocationInput, 'linfortormentrs').pause(2000)
      // Validate no results message
      .waitForTextByCss(pageHome.selectors.carSearch.carLocationNoResultsText, 'No results')
      // Add none existing drop off location
      .waitAndSetValueByCss(pageHome.selectors.carSearch.carDropOffLocationInput, 'linfortormentrs').pause(2000)
      // Validate no results message
      .waitForTextByCss(pageHome.selectors.carSearch.carLocationNoResultsText, 'No results');
  },

  'step 4 - Required fields': browser => {
    browser
      // ----------- Missing dates -----------
      // Click on find my car button
      .waitAndClickByCss(pageHome.selectors.carSearch.findMyCarButton)
      // validate pick up location focused (red line display)
      .elementPresentByCss('[data-testid="search-bar-location-wrapper-locationFrom"] > .css-t8xanh-container > [data-testid="search-bar-location"] > hr')

      // Add pick up location
      .waitAndSetValueByCss(pageHome.selectors.carSearch.carPickUpLocationInput, 'jfk')
      // Hit Enter
      .pause(1000).keys([browser.Keys.ENTER])
      // Add drop off location
      .waitAndSetValueByCss(pageHome.selectors.carSearch.carDropOffLocationInput, 'jfk')
      // Hit Enter
      .pause(1000).keys([browser.Keys.ENTER])
      // Click on find my car button
      .waitAndClickByCss(pageHome.selectors.carSearch.findMyCarButton)
      // validate pick up date focused (red line display)
      .elementPresentByCss(pageHome.selectors.carSearch.carPickUpDateMandatoryLine)


      // ----------- Missing locations -----------
      // Select pick up and drop off dates
      .selectSpecificUpcomingCarDates(14, 15)
      .pause(1000)
      // Clear pick up location
      .waitAndClickByCss(pageHome.selectors.carSearch.carPickUpLocationClearButton)
      // Clear drop off location
      .waitAndClickByCss(pageHome.selectors.carSearch.carDropOffLocationClearButton)
      // Click on find my car button (twice)
      .waitAndClickByCss(pageHome.selectors.carSearch.findMyCarButton).pause(2000).waitAndClickByCss(pageHome.selectors.carSearch.findMyCarButton)
      // validate pick up time focused (red line display)
      .elementPresentByCss(pageHome.selectors.carSearch.carPickUpLocationMandatoryLine)

      // ----------- Missing pick up time -----------
      // Add pick up location
      .waitAndSetValueByCss(pageHome.selectors.carSearch.carPickUpLocationInput, 'cdg')
      // Hit Enter
      .pause(1000).keys([browser.Keys.ENTER])
      // Add drop off location
      .waitAndSetValueByCss(pageHome.selectors.carSearch.carDropOffLocationInput, 'cdg')
      // Hit Enter
      .pause(1000).keys([browser.Keys.ENTER])
      // Click on find my car button (twice)
      .waitAndClickByCss(pageHome.selectors.carSearch.findMyCarButton).pause(2000).waitAndClickByCss(pageHome.selectors.carSearch.findMyCarButton)
      // Select pick up time
      .pause(2000).waitAndClickByXpath(pageHome.selectors.carSearch.selectPickUpTime2pm)
      // Select drop off time
      .waitAndClickByXpath(pageHome.selectors.carSearch.selectDropOffTime4pm);
  },

  'step 5 - Valid search - Airports': browser => {
    browser
      // Click on car booking header tab
      .waitAndClickByCss(pageHeader.selectors.navigation.bookACar)
      // Add pick up location
      .waitAndSetValueByCss(pageHome.selectors.carSearch.carPickUpLocationInput, 'tlv')
      // Hit Enter
      .pause(2000).keys([browser.Keys.ENTER])
      // Add drop off location
      .waitAndSetValueByCss(pageHome.selectors.carSearch.carDropOffLocationInput, 'tlv')
      // Hit Enter
      .pause(2000).keys([browser.Keys.ENTER])
      // Select check in and checkout dates
      .selectSpecificUpcomingCarDates(5, 7)
      .pause(2000)
      // Select pick up time
      .waitAndClickByXpath(pageHome.selectors.carSearch.selectPickUpTime3pm)
      // Select drop off time
      .waitAndClickByXpath(pageHome.selectors.carSearch.selectDropOffTime4pm)
      // Click on find my car button
      .waitAndClickByCss(pageHome.selectors.carSearch.findMyCarButton)
      // validate results page display (filter clear button)
      .waitForTextByCss(pageCarResults.selectors.filter.clearButton, 'Clear');
  },

  'step 6 - Valid search - None airports': browser => {
    browser
      // Click on car booking header tab
      .waitAndClickByCss(pageHeader.selectors.navigation.bookACar)
      // Add pick up location
      .waitAndSetValueByCss(pageHome.selectors.carSearch.carPickUpLocationInput, 'Berlin')
      // Hit Enter
      .pause(2000).keys([browser.Keys.ENTER])
      // Add drop off location
      .waitAndSetValueByCss(pageHome.selectors.carSearch.carDropOffLocationInput, 'Berlin')
      // Hit Enter
      .pause(2000).keys([browser.Keys.ENTER])
      // Select check in and checkout dates
      .selectSpecificUpcomingCarDates(7, 9)
      .pause(1000)
      // Select pick up time
      .waitAndClickByXpath(pageHome.selectors.carSearch.selectPickUpTime3pm)
      // Select drop off time
      .waitAndClickByXpath(pageHome.selectors.carSearch.selectDropOffTime4pm)
      // Click on find my car button
      .waitAndClickByCss(pageHome.selectors.carSearch.findMyCarButton)
      // validate results page display (filter clear button)
      .waitForTextByCss(pageCarResults.selectors.filter.clearButton, 'Clear');
  },

  'step 7 - Valid search - None airports': browser => {
    browser
      // Click on car booking header tab
      .waitAndClickByCss(pageHeader.selectors.navigation.bookACar)
      // Add pick up location
      .waitAndSetValueByCss(pageHome.selectors.carSearch.carPickUpLocationInput, '19 Florentin st')
      // Hit Enter
      .pause(2000).keys([browser.Keys.ENTER])
      // Add drop off location
      .waitAndSetValueByCss(pageHome.selectors.carSearch.carDropOffLocationInput, '19 Florentine st')
      // Hit Enter
      .pause(2000).keys([browser.Keys.ENTER])
      // Select check in and checkout dates
      .selectSpecificUpcomingCarDates(9, 11)
      .pause(1000)
      // Select pick up time
      .waitAndClickByXpath(pageHome.selectors.carSearch.selectPickUpTime3pm)
      // Select drop off time
      .waitAndClickByXpath(pageHome.selectors.carSearch.selectDropOffTime4pm)
      // Click on find my car button
      .waitAndClickByCss(pageHome.selectors.carSearch.findMyCarButton)
      // validate results page display (filter clear button)
      .waitForTextByCss(pageCarResults.selectors.filter.clearButton, 'Clear');
  }
};
