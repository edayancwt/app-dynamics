'use strict';

let selectedCity = 'warsaw';
let selectedHotel = 'Hit';
let startDate = 'Mon, 23 Sep';
let endDate = 'Wed, 25 Sep';

module.exports = {

  '@tags': ['hotel', 'booking', 'sanity'],

  before: function (driver) {
    driver.resizeWindow(1920, 1020);
    driver.windowMaximize();
  },

  'step 1 - login to portal': (driver) => {
    const login = driver.page.login();
    login.fillLoginDetails(driver.globals.users.portalUser8);
  },

  //    ----------------------------------Sanity, Results page ----------------------------------

  'step 2 -  Filter results' : (driver) => {
    // Search for location
    driver.pause(5000);
    driver.waitAndSetValueByCss('[data-testid=search-bar-location] input', selectedCity);
    driver.pause(2000);
    // Select the first option in the results
    // driver.waitAndClickByCss('#cities-1');
    driver.keys([driver.Keys.ENTER]);
    // Select dates
    // driver.waitAndClickByCss('#cwt-date-range-start-date');
    driver.keys([driver.Keys.TAB]);
    driver.waitAndSetValueByCss('#cwt-date-range-start-date', startDate);
    driver.pause(500);
    // driver.waitAndClickByCss('#cwt-date-range-end-date');
    driver.keys([driver.Keys.TAB]);
    driver.waitAndSetValueByCss('#cwt-date-range-end-date', endDate);
    // Click on find button
    driver.waitAndClickByCss('[data-testid=search-bar-search-btn]');

    // Make sure city name display in the search field, if not, add it again
    driver.element('css selector', '.css-1m850ck-singleValue', (isExist) => {
      if (isExist.status !== -1) {
        driver.pause(1000);
        driver.waitAndSetValueByCss('[data-testid=search-bar-location] input', selectedCity);
        driver.pause(2000);
        driver.keys([driver.Keys.ENTER]);
        driver.waitAndClickByCss('[data-testid=search-bar-search-btn]');
      }
    });

    // driver.pause(2000);
    // // Search for location
    // driver.waitAndSetValueByCss('.hotel-search-panel .places-auto-complete .Select-control input', selectedCity);
    // driver.pause(2000);
    // // Select the first option in the results
    // driver.waitAndClickByCss('#cities-1');
    // // Select dates (using 2 days)
    // driver.selectSpecificHotelDates(12, 16);
    // // Click on find button
    // driver.waitAndClickByCss('#nw-search-hotel');
    // // Validate booking page URL
    // driver.waitForUrlToContain('travel.stage-mycwt.com/group/selenium-sub-3-selenium-top/book-a-hotel#/hotel-results', 20000);

    // Wait for hotel results to load
    driver.pause(15000);
    // Filter  using 'COMPANY PREFERRED'
    driver.waitForTextByCss('div.hotel-result-filter-fields > div:nth-child(4) h2 span', 'COMPANY PREFERRED');
    driver.waitAndClickByCss('#preferred-checkbox');
    driver.waitAndClickByCss('#preferred-checkbox');
    // Filter  using 'NEIGHBOURHOOD'
    driver.waitForTextByCss('.neighbourhood-section', 'NEIGHBOURHOOD');
    driver.waitAndClickByCss('.list-unstyled li:last-child .cwt-checkbox input');
    driver.waitAndClickByCss('.list-unstyled li:last-child .cwt-checkbox input');
    // Filter  using 'HOTEL CLASS'
    driver.waitForTextByCss('.hotel-rates h2 span', 'HOTEL CLASS');
    driver.waitAndClickByCss('.list-unstyled li.hotel-star-rate-option:last-child .cwt-checkbox input');
    driver.waitAndClickByCss('.list-unstyled li.hotel-star-rate-option:last-child .cwt-checkbox input');
    // Filter  using 'hotel name' input
    driver.waitAndSetValueByCss('.icon-text-field.input-group input', 'metropol');
    // use slider
    driver.waitForTextByXpath('//*[@id="sticky-panel"]/div[1]/div[2]/div[3]/h2/span', 'PRICE');
    driver.usePriceSlider(100, 100);
    // Reset filters
    driver.execute(function() { window.scrollBy(0, -600); }, []);
    driver.waitAndClickByCss('.pull-right');
    driver.pause(3000);
  },

  'step 3 -  Map View' : (driver) => {

    // Filter  using 'hotel name' input
    driver.waitAndSetValueByCss('.icon-text-field.input-group input', selectedHotel);
    driver.pause(3000);
    // Filter  using 'HOTEL CLASS'
    driver.waitForTextByCss('.hotel-rates h2 span', 'HOTEL CLASS');
    // driver.waitAndClickByCss('.list-unstyled li.hotel-star-rate-option:nth-last-child(2) .cwt-checkbox input');
    driver.pause(3000);
    // Scroll up to view button (just in case the element not clicked)
    driver.execute(function() { window.scrollBy(0, -600); }, []);
    // Click the map button
    driver.waitAndClickByCss('#toggle-btn-wrap .btn.text-uppercase');
    // Validate map is displayed and results view is hidden
    // driver.pause(1500);
    // driver.waitForAttributeContainsByXpath('//*[@id="portlet_hotelmainportlet_WAR_cwtportalportlet"]/div/div/div/div/div/div[2]/div/div[2]/div[3]', 'class', 'hotel-map-results');
    driver.pause(3000);
    // Click on zoom-out
    driver.useCss();
    driver.moveToElement('.H_btn[title="Zoom out"]', 10, 10);
    driver.pause(200);
    driver.mouseButtonDown(0);
    driver.pause(200);
    driver.mouseButtonUp(0);

    // check if the pin or the tooltip with the price display
    driver.element('css selector', '.marker.styled-marker.available-pin', (isExist) => {
      if (isExist.status === 0) {
        driver.waitAndClickByCss('.marker.styled-marker.available-pin');
      }
      else (driver.waitAndClickByCss('.marker.styled-bubble.available-bubble')
      )
    });

    driver.pause(200);
    driver.mouseButtonDown(0);
    driver.pause(200);
    driver.mouseButtonUp(0);
    driver.pause(200);
    // Click on hotel summery
    driver.pause(3000);
    driver.waitAndClickByCss('.hotel-summary');
    driver.pause(5000);
    // Validate Room selection page URL
    driver.waitForUrlToContain('travel.mycwt.com/book-a-hotel#/hotel-details?checkInDate', 20000);
    // Go back to results page
    driver.back();
    // Click the map button
    driver.waitAndClickByCss('#toggle-btn-wrap .btn.text-uppercase');
    // Validate results is displayed and map view is hidden
    // driver.waitForAttributeContainsByXpath('//*[@id="portlet_hotelmainportlet_WAR_cwtportalportlet"]/div/div/div/div/div/div[2]/div/div[2]/div[2]', 'class', 'hotel-result-cards');
    // driver.pause(2000);
  },

  'step 4 -  Validate Hotel-Banner details' : (driver) => {

    // Filter  using 'hotel name' input
    driver.waitAndSetValueByCss('.icon-text-field.input-group input', selectedHotel);
    driver.pause(3000);
    // hotel name
    driver.waitForTextByCss('h3.hotel-result-card-header', 'Hit Hors');
    // Class
    driver.waitForAttributeContainsByXpath('//*[@id="hotel-card-HH120384"]/li/a/div[2]/div[2]/div[1]', 'class', 'hotel-result-card-body-stars-and-popular');
    // Location
    driver.waitForAttributeContainsByXpath('//*[@id="hotel-card-HH120384"]/li/a/div[2]/div[2]/div[2]', 'class', 'location-wrapper display-in-two-lines');
    // Policy
    // driver.waitForTextByCss('span.in-policy span', 'IN - POLICY');
    // Currency
    driver.waitForTextByCss('span.price', 'PLN');
    driver.pause(2000);
    // Reset filters
    driver.waitAndClickByCss('.pull-right');
    driver.pause(5000);
    // scroll to 'show more' button
    driver.moveToElement('.hotels-show-more-btn', 10, 10);
    // Validate 'show more' button
    driver.waitForTextByCss('.hotels-show-more-btn', 'Show More');
    // Click 'show more' button
    driver.waitAndClickByCss('.hotels-show-more-btn');
    driver.pause(3000);

  },
};