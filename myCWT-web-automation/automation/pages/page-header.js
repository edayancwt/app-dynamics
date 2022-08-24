module.exports = {

  selectors: {

    logo: {
      myCWTLogo: '[data-testid="myCWT-logo"]',
      clientLogo: '[data-testid="client-logo"]' },

    navigation: {
      bookAFlight: '[data-testid="header-navigation-bookFlight"]',
      bookAHotel: '[data-testid="header-navigation-bookHotel"]',
      bookACar: '[data-testid="header-navigation-carRental"]',
      myTrips: '[data-testid=trips-view-trips]',
      myTravelers: '[data-testid="header-navigation-myTravelers"]',
      trainSchedule: '[data-testid="header-navigation-travelTools"]',
      myCWTLogo: '[data-testid="myCWT-logo"]',
      cwtAnalytiqs: '[data-testid=header-navigation-IQ]',
      admin: '[data-testid=header-navigation-admin]',
      myProfileDropdown: '[data-testid="account-dropdown-button"]',
      EditProfile: '[aria-label="Edit Travel Profile"] > .ToolTipNavItem__TitleStyle-sc-2bc66x-1',
      accountSettings: '[data-testid="header-accountSettings"]',
      logout: '[data-testid="header-logout"]',
    },

    currency: {
      currencyIcon: '.CurrencySelectorTooltip__TriggerIcon-eyxjj2-3',
      currencyText: '.CurrencySelectorTooltip__SelectedCurrency-eyxjj2-4',
      currencyDropdown: '[data-testid="currency-converter-dropdown-button"] > [data-testid="icon-Forward"]',
      currencySearchInput: '[data-testid="currency-selector-search-input"]',
      currencySearchClear: '.CurrencySelectorTooltip__SelectedCurrency-eyxjj2-4',
      currencySingleSelection: '.styles__Description-d8l727-9',
    },

    contactUs: {
      contactUsButton: '[data-testid="contact-us-menu-button"]',
    },
  }
};