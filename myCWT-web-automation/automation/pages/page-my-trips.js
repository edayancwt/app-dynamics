module.exports = {

  selectors: {

    upcomingTrips: {
      upcomingTripsTitle: '[data-testid=upcoming-trips-section-title]',
      firstTripTitle: '[data-testid=trip-name]',
      firstTripLocation: '[data-testid=trip-address-destination]',
      firstTripDateAndDuration: '[data-testid=trip-dates]',
      firstTripFlightIcon: '[data-testid=icon-Plane]',
      firstTripFlightDetails: ':nth-child(1) > [data-testid="trip-segment-card"] > [data-testid="trip-card-timeline"] > [data-testid="trip-segments"] > :nth-child(1) > [data-testid="segment-description"]',
      firstTripMissingHotelIcon: '[data-testid=icon-Hotel]',
      firstTripMissingHotelDetails: '//*[@id="shell"]/div[2]/div/div/div[2]/section/div[1]/div[3]/ul/li[2]/div/div',
      firstTripCarIcon: '[data-testid="icon-Car"]',
      firstTripCarDetails: '//*[@id="shell"]/div[2]/div/div/div[2]/section/div[1]/div[3]/ul/li[3]/div/div',
      firstTripMoreItemsNumber: ':nth-child(1) > [data-testid="trip-segment-card"] > [data-testid="trip-card-timeline"] > [data-testid="trip-segments"] > :nth-child(4) > [data-testid="trip-card-more"]',
      firstTripMoreItemsText: '//*[@id="shell"]/div[2]/div/div/div[2]/section/div[1]/div[3]/ul/li[4]/div/div',
    },

    pastTrips: {
      pastTripsTab: '[data-testid=main] > div > div.style__TabsWrapper-mw6di4-6.fexxYq > div > a.style__TabLink-mw6di4-5.jPbWLk > span',
      pastTripsTitle: '[data-testid="past-trips-section-title"]',
      pastTripsSearchInput: '[data-testid="input-search"]',
      pastTripsSearchIcon: '[data-testid="icon-Search"]',
      pastTripsSearchCloseButton: '[data-testid="icon-Close"]',
      pastTripsFirstYearTitle: '[data-testid=my-trips-year-divider]',
      firstTripTitle: '[data-testid=trip-name]',
      firstTripLocation: '[data-testid=trip-address-destination]',
      firstTripDateAndDuration: '//*[@id="shell"]/div[2]/div/div/div[2]/section/div[2]/div[2]/h2',
      firstTripFlightIcon: '[data-testid=icon-Plane]',
      firstTripFlightDetails: '//*[@id="shell"]/div[2]/div/div/div[2]/section/div[2]/div[3]/ul/li/div/div',
      firstTripMoreItemsNumber: '//*[@id="main-content"]/div/div[2]/section/div[2]/div[3]/ul/li[4]/span',
      firstTripMoreItemsText: '//*[@id="main-content"]/div/div[2]/section/div[2]/div[3]/ul/li[4]/div/div/span/span[1]/span',
      noPastTripsImage: '.NoTrip__NoTripBox-t8fewc-0 > img',
      noPastTripsText: '[data-testid="conditional-state-title"]',
    },
  }
};