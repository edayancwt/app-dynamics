'use strict';

let cardsNumber;
let initCardsNumber;
let initMinPrice;
let initMaxPrice;
let minPrice;
let maxPrice;
let hotelPrice;
let hotelFilterNumber;
let neighborhoodOne;
let neighborhoodTwo;
let classOne;
let classTwo;

module.exports = {

  '@tags': ['hotel', 'booking', 'sanity'],

  before: function (driver) {
    driver.resizeWindow(1920, 1020);
  },

  'step 1 - login to portal': (driver) => {
    const login = driver.page.login();
    login.fillLoginDetails(driver.globals.users.portalUser58);
  },

    //    ----------------------------------Hotel Booking - Result Page -  FILTER ----------------------------------


  'step 2 - general search': (driver) => {
    driver.pause(4000);
    // Search for location
    driver.waitAndSetValueByCss('.hotel-search-panel .Select-control input', 'warsaw');
    driver.pause(2000);
    // Select the first option in the results
    driver.waitAndClickByCss('.Select .Select-option:nth-child(1)');
    // Select dates (using 2 days)
    driver.selectDatesInSearchHotelBar();
    // Click on find button
    driver.waitAndClickByCss('#nw-search-hotel');
    // Validate booking page URL
    driver.waitForUrlToContain('travel.stage-mycwt.com/group/selenium-sub-3-selenium-top/book-a-hotel#/hotel-results', 20000);
    // Wait for hotel results to load
    driver.pause(12000);

    // save init prices for step 5.4
    driver.getText('#sticky-panel > div.left-panel-wrap > div.hotel-result-filter-fields > div.filter-hotel-section.price-section > div > span > span:nth-child(1)', function (result) {
      let str = result.value.split(' ');
      initMinPrice = parseInt(str[1]);
      console.log('-----initMinPrice-----', initMinPrice);
    });
    driver.getText('#sticky-panel > div.left-panel-wrap > div.hotel-result-filter-fields > div.filter-hotel-section.price-section > div > span > span:nth-child(3)', function (result) {
      let str = result.value.split(' ');
      initMaxPrice = parseInt(str[1]);
      console.log('+++++initMaxPrice++++++', initMaxPrice);
    });

  },

  'step 3 - Result Page - Filter - Filter by hotel name: existing hotel name' : (driver) => {
    // Filter  using 'hotel name' input - existing hotel name
    driver.waitAndSetValueByCss('.icon-text-field.input-group input', 'mer');
    driver.pause(1500);
    // Validate that every card contain the string
    driver.elements('css selector', '.hotel-list-item-wrapper', function (elements) {
      for (let i = 0; i < elements.value.length; i++) {
        let element = '.hotel-list-item-wrapper:nth-child(' + (i + 1) + ') h3';
        driver.waitForTextByCss(element, 'Mer');
      }
    });
    driver.waitAndClickByCss('.icon-text-field.input-group input');
    driver.pause(1000);
    // delete input text
    driver.deleteString('mer');

  },

  'step 3.1 - Result Page - Filter - Filter by hotel name: non existing hotel name' : (driver) => {
    // Filter  using 'hotel name' input - existing hotel name
    driver.waitAndSetValueByCss('.icon-text-field.input-group input', 'bla bla');
    driver.pause(1000);
    // Validate that no hotels message appear
    driver.waitForTextByCss('.splash .splash__message span', 'No hotels match your search criteria');
    driver.pause(1000);
    driver.waitAndClickByCss('.icon-text-field.input-group input');
    driver.pause(1000);
    // delete input text
    driver.deleteString('bla bla');

  },

  'step 3.2 - Result Page - Filter - Filter by hotel name: lower + upper case' : (driver) => {
    // Filter  using 'hotel name' input - existing hotel name
    driver.waitAndSetValueByCss('.icon-text-field.input-group input', 'HILTON');
    driver.pause(1500);
    // Validate that every card contain the string
    driver.elements('css selector', '.hotel-list-item-wrapper', function (elements) {
      for (let i = 0; i < elements.value.length; i++) {
        let element = '.hotel-list-item-wrapper:nth-child(' + (i + 1) + ') h3';
        driver.waitForTextByCss(element, 'Hilton');
      }
    });
    // delete input text
    driver.waitAndClickByCss('.icon-text-field.input-group input');
    driver.pause(1000);
    driver.deleteString('hilton');
    driver.pause(1000);
    // Filter  using 'hotel name' input - existing hotel name
    driver.waitAndSetValueByCss('.icon-text-field.input-group input', 'Hilton');
    driver.pause(1500);
    // Validate that every card contain the string
    driver.elements('css selector', '.hotel-list-item-wrapper', function (elements) {
      for (let i = 0; i < elements.value.length; i++) {
        let element = '.hotel-list-item-wrapper:nth-child(' + (i + 1) + ') h3';
        driver.waitForTextByCss(element, 'Hilton');
      }
    });
    // delete partial text
    driver.deleteString('hilton');
    driver.pause(1000);
  },

  'step 3.3 - Result Page - Filter - Filter by hotel name: partial text' : (driver) => {
    // Filter  using 'hotel name' input - existing hotel name
    driver.waitAndSetValueByCss('.icon-text-field.input-group input', 'hilton warsaw hotel');
    driver.pause(1500);
    // Validate that every card contain the string
    driver.elements('css selector', '.hotel-list-item-wrapper', function (elements) {
      for (let i = 0; i < elements.value.length; i++) {
        let element = '.hotel-list-item-wrapper:nth-child(' + (i + 1) + ') h3';
        driver.waitForTextByCss(element, 'Hilton Warsaw Hotel');
      }
    });
    // delete input text
    driver.waitAndClickByCss('.icon-text-field.input-group input');
    driver.pause(1000);
    driver.deleteString('hotel');
    driver.pause(1000);
    // Validate that every card contain the string
    driver.elements('css selector', '.hotel-list-item-wrapper', function (elements) {
      for (let i = 0; i < elements.value.length; i++) {
        let element = '.hotel-list-item-wrapper:nth-child(' + (i + 1) + ') h3';
        driver.waitForTextByCss(element, 'Hilton Warsaw');
      }
    });
    // delete text
    driver.deleteString('Hilton Warsaw');
    driver.pause(1000);
  },

  'step 3.4 - Result Page - Filter - Filter by hotel name: initial results' : (driver) => {
    // Save in a variable the number of cards
    driver.elements('css selector', '.hotel-list-item-wrapper', function (elements) {
      cardsNumber = elements.value.length;
    });
    // Checking that the number of hotel cards is equal to the 25 - the initial quantity of cards
    driver.timeoutsAsyncScript(20000, function() {
      driver.assert.equal(cardsNumber, 25);
    });
  },

  'step 3.5 - Result Page - Filter - Filter by hotel name: search and reset' : (driver) => {
    // Filter  using 'hotel name' input
    driver.waitAndSetValueByCss('.icon-text-field.input-group input', 'hit hotel');
    driver.pause(1500);
    driver.waitForTextByCss('.hotel-list-item-wrapper:nth-child(1) h3', 'Hit Hotel');
    // Reset filters
    driver.waitAndClickByCss('.pull-right');
    driver.pause(1500);
    // Checking that the number of hotel cards is equal to the 25 - the initial quantity of cards
    driver.timeoutsAsyncScript(20000, function() {
      driver.assert.equal(cardsNumber, 25);
    });
  },

  'step 4 - Result Page - Filter - Filter by company preferred' : (driver) => {
    // TODO: Complete "COMPANY PREFERRED with availability" validation when mock will be ready
  },

  'step 5 - Result Page - Filter - hotel price: initial price range' : (driver) => {
    driver.pause(1500);
    driver.getText('#sticky-panel > div.left-panel-wrap > div.hotel-result-filter-fields > div.filter-hotel-section.price-section > div > span > span:nth-child(1)', function (result) {
      let str = result.value.split(' ');
      minPrice = parseInt(str[1]);
      console.log('----------', minPrice);
    });
    driver.getText('#sticky-panel > div.left-panel-wrap > div.hotel-result-filter-fields > div.filter-hotel-section.price-section > div > span > span:nth-child(3)', function (result) {
      let str = result.value.split(' ');
      maxPrice = parseInt(str[1]);
      console.log('+++++++++++', maxPrice);
    });

    driver.elements('css selector', '.hotel-list-item-wrapper', function (elements) {
      for (let i = 1; i < 4 ; i++) {     // TODO: use elements.value.length when Mock will be ready
        let element = '.hotel-list-item-wrapper:nth-child(' + (i + 1) + ') .price';
        driver.getText(element ,function (result) {
          let str = result.value.split(' ');
          hotelPrice = parseInt(str[1]);
          console.log('**    '+i+'    **', hotelPrice);

          if (hotelPrice <= maxPrice && hotelPrice >= minPrice) {
            console.log('!!!!!!!!!!!!!');
          } else {
            driver.waitForTextByCss('.hotel-list-item-wrapper:nth-child(1) h3', 'fail this test');
          }
        });

      }
    });
  },

  'step 5.1 - Result Page - Filter - hotel price: move only min-range' : (driver) => {
    // use slider (start)
    driver.useXpath();
    driver.moveToElement('//*[@id="sticky-panel"]/div[1]/div[2]/div[3]/div/div/div/div/span[1]/div', 10, 10);
    driver.pause(300);
    driver.mouseButtonDown(0);
    driver.pause(300);
    driver.moveToElement('//*[@id="sticky-panel"]/div[1]/div[2]/div[3]/div/div/div/div/span[1]/div', 50, 30);
    driver.pause(300);
    driver.mouseButtonUp(0);
    driver.useCss();
    driver.pause(3000);
    // get the max and min price
    driver.getText('#sticky-panel > div.left-panel-wrap > div.hotel-result-filter-fields > div.filter-hotel-section.price-section > div > span > span:nth-child(1)', function (result) {
      let str = result.value.split(' ');
      minPrice = parseInt(str[1]);
      console.log('----------', minPrice);
    });
    driver.getText('#sticky-panel > div.left-panel-wrap > div.hotel-result-filter-fields > div.filter-hotel-section.price-section > div > span > span:nth-child(3)', function (result) {
      let str = result.value.split(' ');
      maxPrice = parseInt(str[1]);
      console.log('+++++++++++', maxPrice);
    });
    driver.getText('.hotel-list-item-wrapper:nth-child(1) .price', function (result) {
      let str = result.value.split(' ');
      hotelPrice = parseInt(str[1]);
      console.log('***************', hotelPrice);
    });
    // Validate that every card price is in the range between minPrice and maxPrice
    driver.element('css selector', '.hotel-list-item-wrapper:nth-child(1) .price' , () => {
      if (hotelPrice <= maxPrice && hotelPrice >= minPrice) {
        console.log('!!!!!!!!!!!!!');
      } else {
        driver.waitForTextByCss('.hotel-list-item-wrapper:nth-child(1) h3', 'fail this test');
      }
    });
  },

  'step 5.2 - Result Page - Filter - hotel price: move only max-range' : (driver) => {
    // use slider (end)
    driver.useXpath();
    driver.moveToElement('//*[@id="sticky-panel"]/div[1]/div[2]/div[3]/div/div/div/div/span[2]/div', 10, 10);
    driver.pause(300);
    driver.mouseButtonDown(0);
    driver.pause(300);
    driver.moveToElement('//*[@id="sticky-panel"]/div[1]/div[2]/div[3]/div/div/div/div/span[2]/div', -100, 30);
    driver.pause(300);
    driver.mouseButtonUp(0);
    driver.pause(300);
    driver.useCss();
    driver.pause(3000);
    // get the max and min price
    driver.getText('#sticky-panel > div.left-panel-wrap > div.hotel-result-filter-fields > div.filter-hotel-section.price-section > div > span > span:nth-child(1)', function (result) {
      let str = result.value.split(' ');
      minPrice = parseInt(str[1]);
      console.log('----------', minPrice);
    });
    driver.getText('#sticky-panel > div.left-panel-wrap > div.hotel-result-filter-fields > div.filter-hotel-section.price-section > div > span > span:nth-child(3)', function (result) {
      let str = result.value.split(' ');
      maxPrice = parseInt(str[1]);
      console.log('+++++++++++', maxPrice);
    });
    driver.getText('.hotel-list-item-wrapper:nth-child(1) .price', function (result) {
      let str = result.value.split(' ');
      hotelPrice = parseInt(str[1]);
      console.log('***************', hotelPrice);
    });
    // Validate that every card price is in the range between minPrice and maxPrice
    driver.element('css selector', '.hotel-list-item-wrapper:nth-child(1) .price' , () => {
      if (hotelPrice <= maxPrice && hotelPrice >= minPrice) {
        console.log('!!!!!!!!!!!!!');
      } else {
        driver.waitForTextByCss('.hotel-list-item-wrapper:nth-child(1) h3', 'fail this test');
      }
    });
    // Reset filters
    driver.waitAndClickByCss('.pull-right');
    driver.pause(1500);
  },

  'step 5.3 - Result Page - Filter - hotel price: move both min and max' : (driver) => {
      // use slider (start)
      driver.useXpath();
      driver.moveToElement('//*[@id="sticky-panel"]/div[1]/div[2]/div[3]/div/div/div/div/span[1]/div', 10, 10);
      driver.pause(300);
      driver.mouseButtonDown(0);
      driver.pause(300);
      driver.moveToElement('//*[@id="sticky-panel"]/div[1]/div[2]/div[3]/div/div/div/div/span[1]/div', 100, 30);
      driver.pause(300);
      driver.mouseButtonUp(0);
      // use slider (end)
      driver.moveToElement('//*[@id="sticky-panel"]/div[1]/div[2]/div[3]/div/div/div/div/span[2]/div', 10, 10);
      driver.pause(300);
      driver.mouseButtonDown(0);
      driver.pause(300);
      driver.moveToElement('//*[@id="sticky-panel"]/div[1]/div[2]/div[3]/div/div/div/div/span[2]/div', -100, 30);
      driver.pause(300);
      driver.mouseButtonUp(0);
      driver.pause(300);
      driver.useCss();
      driver.pause(3000);
      // get the max and min price
      driver.getText('#sticky-panel > div.left-panel-wrap > div.hotel-result-filter-fields > div.filter-hotel-section.price-section > div > span > span:nth-child(1)', function (result) {
        let str = result.value.split(' ');
        minPrice = parseInt(str[1]);
        console.log('----------', minPrice);
      });
      driver.getText('#sticky-panel > div.left-panel-wrap > div.hotel-result-filter-fields > div.filter-hotel-section.price-section > div > span > span:nth-child(3)', function (result) {
        let str = result.value.split(' ');
        maxPrice = parseInt(str[1]);
        console.log('+++++++++++', maxPrice);
      });
      driver.getText('.hotel-list-item-wrapper:nth-child(1) .price', function (result) {
        let str = result.value.split(' ');
        hotelPrice = parseInt(str[1]);
        console.log('***************', hotelPrice);
      });
      // Validate that every card price is in the range between minPrice and maxPrice
      driver.element('css selector', '.hotel-list-item-wrapper:nth-child(1) .price' , () => {
        if (hotelPrice <= maxPrice && hotelPrice >= minPrice) {
          console.log('!!!!!!!!!!!!!');
        } else {
          driver.waitForTextByCss('.hotel-list-item-wrapper:nth-child(1) h3', 'fail this test');
        }
      });
      // Reset filters
      driver.waitAndClickByCss('.pull-right');
      driver.pause(1500);
  },

  'step 5.4 - Result Page - Filter - hotel price: move both min and max close together' : (driver) => {
    // TODO: risky test - should be work with mock when will be ready
    // use slider (start)
    driver.useXpath();
    driver.moveToElement('//*[@id="sticky-panel"]/div[1]/div[2]/div[3]/div/div/div/div/span[1]/div', 10, 10);
    driver.pause(300);
    driver.mouseButtonDown(0);
    driver.pause(300);
    driver.moveToElement('//*[@id="sticky-panel"]/div[1]/div[2]/div[3]/div/div/div/div/span[1]/div', 150, 30);
    driver.pause(300);
    driver.mouseButtonUp(0);
    // use slider (end)
    driver.moveToElement('//*[@id="sticky-panel"]/div[1]/div[2]/div[3]/div/div/div/div/span[2]/div', 10, 10);
    driver.pause(300);
    driver.mouseButtonDown(0);
    driver.pause(300);
    driver.moveToElement('//*[@id="sticky-panel"]/div[1]/div[2]/div[3]/div/div/div/div/span[2]/div', -140, 30);
    driver.pause(300);
    driver.mouseButtonUp(0);
    driver.pause(300);
    driver.useCss();
    driver.pause(3000);
    // Validate that there are no results in that range
    driver.waitForTextByCss('.splash .splash__message span', 'No hotels match your search criteria');
    // Reset filters
    driver.waitAndClickByCss('.pull-right');
    driver.pause(2000);
    // Save in a variable the number of cards
    driver.elements('css selector', '.hotel-list-item-wrapper', function (elements) {
      initCardsNumber = elements.value.length;
    });
    // Validate that initial results returned
    // Checking that the number of hotel cards is equal to the 25 - the initial quantity of cards
    driver.timeoutsAsyncScript(20000, function() {
      driver.assert.equal(initCardsNumber, 25);
    });
    // Validate the slide ranges returen to their initialed price
    // min
    driver.waitForTextByCss('#sticky-panel > div.left-panel-wrap > div.hotel-result-filter-fields > div.filter-hotel-section.price-section > div > span > span:nth-child(1)', initMinPrice);
    // max
    driver.waitForTextByCss('#sticky-panel > div.left-panel-wrap > div.hotel-result-filter-fields > div.filter-hotel-section.price-section > div > span > span:nth-child(3)', initMaxPrice);
  },

  'step 6 - Result Page - Filter - Filter by hotel neighborhood' : (driver) => {
    // Filter  using 'NEIGHBOURHOOD'
    driver.waitAndClickByCss('#Ochota');
    driver.pause(1500);
    // Validate that every card contain the string
    driver.elements('css selector', '.hotel-list-item-wrapper', function (elements) {
      for (let i = 0; i < elements.value.length; i++) {
        let element = '.hotel-list-item-wrapper:nth-child(' + (i + 1) + ') .location-district';
        driver.waitForTextByCss(element, 'Ochota');
      }
    });

  },

  'step 6.1 - Result Page - Filter - Filter by hotel neighborhood: Neighborhood number' : (driver) => {
    // unselected filter
    driver.waitAndClickByCss('#Ochota');
    // Filter  using 'NEIGHBOURHOOD'
    driver.waitAndClickByCss('#Wawer');
    driver.pause(1500);
    // get the number of hotels on the selected NEIGHBOURHOOD filter
    driver.getText('#chk-Wawer + .counter', function (result) {
      let str = result.value.split('(');
      neighborhoodOne = parseInt(str[1]);
    });

    // Save in a variable the number of cards
    driver.elements('css selector', '.hotel-list-item-wrapper', function (elements) {
      cardsNumber = elements.value.length;
    });
    // Checking that the number of hotel cards is equal to the hotels quantity in the selected neighborhood
    driver.timeoutsAsyncScript(20000, function() {
      driver.assert.equal(cardsNumber, neighborhoodOne);
    });

  },

  'step 6.2 - Result Page - Filter - Filter by hotel neighborhood: Multiple neighborhoods' : (driver) => {
    driver.waitAndClickByCss('#Mokotow');
    driver.pause(1500);
    // get the number of hotels on the selected NEIGHBOURHOOD filter
    driver.getText('#chk-Mokotow + .counter', function (result) {
      let str = result.value.split('(');
      neighborhoodTwo = parseInt(str[1]);
    });

    // Save in a variable the number of cards
    driver.elements('css selector', '.hotel-list-item-wrapper', function (elements) {
      cardsNumber = elements.value.length;
    });
    // Checking that the number of hotel cards is equal to the hotels quantity in the selected neighborhood
    driver.timeoutsAsyncScript(20000, function() {
      driver.assert.equal(cardsNumber, neighborhoodOne + neighborhoodTwo);
    });

  },

  'step 6.3 - Result Page - Filter - Filter by hotel neighborhood: unselected one neighborhood' : (driver) => {
    // unselect one of the checked 'NEIGHBOURHOOD'
    driver.waitAndClickByCss('#Mokotow');
    driver.pause(1500);

    // Validate that every card contain the string 'Wawer'
    driver.elements('css selector', '.hotel-list-item-wrapper', function (elements) {
      for (let i = 0; i < elements.value.length; i++) {
        let element = '.hotel-list-item-wrapper:nth-child(' + (i + 1) + ') .location-district';
        driver.waitForTextByCss(element, 'Wawer');
      }
    });
  },

  'step 6.4 - Result Page - Filter - Filter by hotel neighborhood: unselected all neighborhood' : (driver) => {
    // unselect one of the checked 'NEIGHBOURHOOD'
    driver.waitAndClickByCss('#Wawer');
    driver.pause(1500);

    // Save in a variable the number of cards
    driver.elements('css selector', '.hotel-list-item-wrapper', function (elements) {
      cardsNumber = elements.value.length;
    });
    // Checking that the number of hotel cards is equal to the 25 - the initial quantity of cards
    driver.timeoutsAsyncScript(20000, function() {
      driver.assert.equal(cardsNumber, 25);
    });
  },

  'step 6.5 - Result Page - Filter - Filter by hotel neighborhood: select and reset' : (driver) => {
    // select one of the checked 'NEIGHBOURHOOD'
    driver.waitAndClickByCss('#Mokotow');
    driver.pause(1500);

    // Validate that every card contain the string 'Mokotow'
    driver.elements('css selector', '.hotel-list-item-wrapper', function (elements) {
      for (let i = 0; i < elements.value.length; i++) {
        let element = '.hotel-list-item-wrapper:nth-child(' + (i + 1) + ') .location-district';
        driver.waitForTextByCss(element, 'Mokotow');
      }
    });
    driver.pause(2000);
    // Reset filters
    driver.waitAndClickByCss('.pull-right');
    driver.pause(1500);

    // Save in a variable the number of cards
    driver.elements('css selector', '.hotel-list-item-wrapper', function (elements) {
      cardsNumber = elements.value.length;
    });
    // Checking that the number of hotel cards is equal to the 25 - the initial quantity of cards
    driver.timeoutsAsyncScript(20000, function() {
      driver.assert.equal(cardsNumber, 25);
    });
  },

  'step 7 - Result Page - Filter - Filter by class' : (driver) => {
    // Filter  using 'CLASS'
    driver.waitAndClickByCss('input[aria-labelledby="chk-icon chk-5"]');
    driver.pause(1500);
    // Validate that every card contain the number of stars
    driver.elements('css selector', '.hotel-list-item-wrapper', function (elements) {
      for (let i = 0; i < elements.value.length; i++) {
        let cardHotelClass;
        driver.elements('css selector', '.hotel-list-item-wrapper:nth-child(' + (i + 1) + ') .hotel-result-card-body-stars-and-popular .dv-star-rating-star.dv-star-rating-full-star', function (elements) {
          cardHotelClass = elements.value.length;
          driver.execute(function() { window.scrollBy(0, 300); }, []);
        });
        // Checking that the number of stars (5)
        driver.timeoutsAsyncScript(20000, function() {
          driver.assert.equal(cardHotelClass, 5);
        });
      }
    });

  },

  'step 7.1 - Result Page - Filter - Filter by class: number of hotels' : (driver) => {
    // get the number of hotels on the selected CLASS filter
    driver.getText('#chk-5 + .counter', function (result) {
      let str = result.value.split('(');
      classOne = parseInt(str[1]);
    });

    // Save in a variable the number of cards
    driver.elements('css selector', '.hotel-list-item-wrapper', function (elements) {
      cardsNumber = elements.value.length;
    });
    // Checking that the number of hotel cards is equal to the hotels quantity in the selected class
    driver.timeoutsAsyncScript(20000, function() {
      driver.assert.equal(cardsNumber, classOne);
    });
  },

  'step 7.2 - Result Page - Filter - Filter by class: Multiple classes' : (driver) => {
    // Selecting another 'CLASS'
    driver.waitAndClickByCss('input[aria-labelledby="chk-icon chk-3"]');
    driver.pause(1500);
    // get the number of hotels on the selected CLASS filter
    driver.getText('#chk-3 + .counter', function (result) {
      let str = result.value.split('(');
      classTwo = parseInt(str[1]);
    });

    // Save in a variable the number of cards
    driver.elements('css selector', '.hotel-list-item-wrapper', function (elements) {
      cardsNumber = elements.value.length;
    });
    // Checking that the number of hotel cards is equal to the hotels quantity in the selected classes
    driver.timeoutsAsyncScript(20000, function() {
      driver.assert.equal(cardsNumber, classOne + classTwo);
    });
  },

  'step 7.3 - Result Page - Filter - Filter by class: unselected one class' : (driver) => {
    // unselect one of the checked 'CLASS'
    driver.waitAndClickByCss('input[aria-labelledby="chk-icon chk-5"]');
    driver.pause(1500);

    // Validate that every card contain the number of stars
    driver.elements('css selector', '.hotel-list-item-wrapper', function (elements) {
      for (let i = 0; i < elements.value.length; i++) {
        let cardHotelClass;
        driver.elements('css selector', '.hotel-list-item-wrapper:nth-child(' + (i + 1) + ') .hotel-result-card-body-stars-and-popular .dv-star-rating-star.dv-star-rating-full-star', function (elements) {
          cardHotelClass = elements.value.length;
          driver.execute(function() { window.scrollBy(0, 300); }, []);
        });
        // Checking that the number of stars (3)
        driver.timeoutsAsyncScript(20000, function() {
          driver.assert.equal(cardHotelClass, 3);
        });
      }
    });
  },

  'step 7.4 - Result Page - Filter - Filter by class: unselected all classes' : (driver) => {
    // unselect all checked 'CLASS'
    driver.waitAndClickByCss('input[aria-labelledby="chk-icon chk-3"]');
    driver.pause(1500);

    // Save in a variable the number of cards
    driver.elements('css selector', '.hotel-list-item-wrapper', function (elements) {
      cardsNumber = elements.value.length;
    });
    // Checking that the number of hotel cards is equal to the 25 - the initial quantity of cards
    driver.timeoutsAsyncScript(20000, function() {
      driver.assert.equal(cardsNumber, 25);
    });
  },

  'step 7.5 - Result Page - Filter - Filter by class: select and reset' : (driver) => {
    // select one of the checked 'CLASS'
    driver.waitAndClickByCss('input[aria-labelledby="chk-icon chk-3"]');
    driver.pause(1500);

    // Validate that every card contain the number of stars
    driver.elements('css selector', '.hotel-list-item-wrapper', function (elements) {
      for (let i = 0; i < elements.value.length; i++) {
        let cardHotelClass;
        driver.elements('css selector', '.hotel-list-item-wrapper:nth-child(' + (i + 1) + ') .hotel-result-card-body-stars-and-popular .dv-star-rating-star.dv-star-rating-full-star', function (elements) {
          cardHotelClass = elements.value.length;
          driver.execute(function() { window.scrollBy(0, 300); }, []);
        });
        // Checking that the number of stars (3)
        driver.timeoutsAsyncScript(20000, function() {
          driver.assert.equal(cardHotelClass, 3);
        });
      }
    });
    driver.execute(function() { window.scrollBy(0, -600); }, []);
    driver.pause(2000);
    // Reset filters
    driver.waitAndClickByCss('.pull-right');
    driver.pause(1500);

    // Save in a variable the number of cards
    driver.elements('css selector', '.hotel-list-item-wrapper', function (elements) {
      cardsNumber = elements.value.length;
    });
    // Checking that the number of hotel cards is equal to the 25 - the initial quantity of cards
    driver.timeoutsAsyncScript(20000, function() {
      driver.assert.equal(cardsNumber, 25);
    });
  },

  'step 8 - Result Page - Filter by multiple filter types' : (driver) => {
    // filter with one of the 'CLASS'
    driver.waitAndClickByCss('input[aria-labelledby="chk-icon chk-3"]');
    driver.pause(1500);
    // filter with one of the 'NEIGHBOURHOOD'
    driver.waitAndClickByCss('#Mokotow');
    driver.pause(1500);

    // Validate that every card contain the number of stars
    driver.elements('css selector', '.hotel-list-item-wrapper', function (elements) {
      for (let i = 0; i < elements.value.length; i++) {
        let cardHotelClass;
        driver.elements('css selector', '.hotel-list-item-wrapper:nth-child(' + (i + 1) + ') .hotel-result-card-body-stars-and-popular .dv-star-rating-star.dv-star-rating-full-star', function (elements) {
          cardHotelClass = elements.value.length;
          driver.execute(function() { window.scrollBy(0, 300); }, []);
        });
        // Checking that the number of stars (3)
        driver.timeoutsAsyncScript(20000, function() {
          driver.assert.equal(cardHotelClass, 3);
        });
      }
    });

    // Validate that every card contain the string 'Mokotow'
    driver.elements('css selector', '.hotel-list-item-wrapper', function (elements) {
      for (let i = 0; i < elements.value.length; i++) {
        let element = '.hotel-list-item-wrapper:nth-child(' + (i + 1) + ') .location-district';
        driver.waitForTextByCss(element, 'Mokotow');
      }
    });

  },

  'step 8.1 - Result Page - Filter by multiple filter types: update' : (driver) => {
    // unselect with one of the 'CLASS'
    driver.waitAndClickByCss('input[aria-labelledby="chk-icon chk-3"]');
    driver.pause(1500);


    // Validate that also hotel cards with 5 stars is presented
    driver.elements('css selector', '.hotel-list-item-wrapper', function (elements) {
      for (let i = 0; i < elements.value.length; i++) {
        let cardHotelClass;
        driver.elements('css selector', '.hotel-list-item-wrapper:nth-child(' + (i + 1) + ') .hotel-result-card-body-stars-and-popular .dv-star-rating-star.dv-star-rating-full-star', function (elements) {
          cardHotelClass = elements.value.length;
          driver.execute(function() { window.scrollBy(0, 300); }, []);
          // Validate that every card has any kind of class (stars)
          if (cardHotelClass >= 1) {
            console.log('Has Class');
          } else {
            driver.waitForTextByCss('.hotel-list-item-wrapper:nth-child(1) h3', 'fail this test');
          }
        });

      }
    });

    // Validate that every card contain the string 'Mokotow'
    driver.elements('css selector', '.hotel-list-item-wrapper', function (elements) {
      for (let i = 0; i < elements.value.length; i++) {
        let element = '.hotel-list-item-wrapper:nth-child(' + (i + 1) + ') .location-district';
        driver.waitForTextByCss(element, 'Mokotow');
      }
    });
    driver.execute(function() { window.scrollBy(0, -600); }, []);
  },

  'step 8.2 - Result Page - Filter by multiple filter types: reset' : (driver) => {
    // Reset filters
    driver.waitAndClickByCss('.pull-right');
    driver.pause(1500);

    // Save in a variable the number of cards
    driver.elements('css selector', '.hotel-list-item-wrapper', function (elements) {
      cardsNumber = elements.value.length;
    });
    // Checking that the number of hotel cards is equal to the 25 - the initial quantity of cards
    driver.timeoutsAsyncScript(20000, function() {
      driver.assert.equal(cardsNumber, 25);
    });
  },

};
