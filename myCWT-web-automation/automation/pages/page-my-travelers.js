module.exports = {

  selectors: {

    myTravelers: {
      travelersTitle: '[data-testid="page-title"]',
      searchInput: '[aria-autocomplete="list"]',
      searchIcon: '[data-testid="icon-Search"]',
      searchPreText: '.css-obiawd-placeholder',
      searchResultName: '[data-testid="highlight"]',
      searchResultEmail: 'p > :nth-child(1) > span',
      searchNoTravelersText: '[data-testid="my-travelers-no-travelers"]',
    },

    traveler1: {
      travelerName: '[data-testid="traveler-1"] > [data-testid="ta-info-col"] > [data-testid="ta-name"] > h3',
      tripLocation: '[data-testid="upcoming-trip-link-1"]',
      tripDate: '[data-testid="traveler-1"] > [data-testid="ta-info-col"] > [data-testid="ta-details"] > [data-testid="ta-duration"] > [data-testid="ta-trip-dates"]',
      missingHotelLabel: '[data-testid="traveler-1"] > [data-testid="ta-info-col"] > [data-testid="ta-details"] > [data-testid="ta-duration"] > [data-testid="ta-ma-indicator"]',
      viewAllTrips: '[data-testid="view-all-trips-link-1"]',
      viewAllTripsDisabled: '.styles__DisabledLinkText-l9cka9-3',
      bookAHotel: '[data-testid="book-hotel-btn-1"]',
      noUpcomingTripsLabel: '[data-testid="ta-details"]',
    },

    traveler2: {
      travelerName: '[data-testid="traveler-2"] > [data-testid="ta-info-col"] > [data-testid="ta-name"] > h3',
      tripLocation: '[data-testid="upcoming-trip-link-2"]',
      tripDate: '[data-testid="traveler-2"] > [data-testid="ta-info-col"] > [data-testid="ta-details"] > [data-testid="ta-duration"] > [data-testid="ta-trip-dates"]',
      missingHotelLabel: '[data-testid="traveler-2"] > [data-testid="ta-info-col"] > [data-testid="ta-details"] > [data-testid="ta-duration"] > [data-testid="ta-ma-indicator"]',
      viewAllTrips: '[data-testid="view-all-trips-link-2"]',
      bookAHotel: '[data-testid="book-hotel-btn-2"]',
    },
  }
};