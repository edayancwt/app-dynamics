'use strict';

let shareEmail = 'test-share@mailtest.worldmate.com';
module.exports = {

  '@tags': ['stage', 'sanity', 'portal', 'trip details'],

  before: function (driver) {
    driver.windowMaximize();
  },

  'step 1 - login to portal': (driver) => {
    const login = driver.page.login();
    login.fillLoginDetails(driver.globals.users.portalUser8);
  },

  'step 2 - Validate trip details header' : (driver) => {
    // Click on the first flight
    driver.waitForElementVisible('[data-testid=air-1]');
    driver.pause(2000);driver.waitAndClickByCss('[data-testid=air-1]');
    // Home breadcrumb link
    driver.waitForTextByCss('[data-testid=home-link]', 'HOME');
    // Click on home link
    driver.waitAndClickByCss('[data-testid=home-link]');
    // Validate home URL
    driver.waitForUrlToContain('travel.mycwt.com', 20000);
    // Click on my trips tab
    driver.waitAndClickByCss('[data-testid=header-navigation-myTrips]');
    // Click on the first trip
    driver.waitAndClickByCss('[data-testid=trip-277558572]');
    // My trips breadcrumb link
    driver.waitForTextByCss('[data-testid=my-trips-link]', 'MY TRIPS');
    // Click on my trips breadcrumb link
    driver.waitAndClickByCss('[data-testid=my-trips-link]');
    // Validate my trips URL
    driver.waitForUrlToContain('travel.mycwt.com/my-trips', 20000);
    // Location
    driver.waitForTextByCss('[data-testid=trip-277558572] [data-testid=trip-name]', 'Trip to Tokyo');
    driver.waitForTextByCss('[data-testid=trip-277558572] [data-testid=trip-address-destination]', 'Tokyo, JP');
    // Dates
    driver.waitForTextByCss('[data-testid=trip-277558572] [data-testid=trip-dates]', 'Jun 4 - Jun 10, 2025 | 7 days');
    // Click on the first trip
    driver.waitAndClickByCss('[data-testid=trip-277558572]');
    // Trips details header - location
    driver.waitForTextByCss('[data-testid=hero-title]', 'Trip to Tokyo');
    // Trips details header - dates
    driver.waitForTextByCss('[data-testid=hero-dates]', 'Jun 4 - Jun 10, 2025 | 7 days');
    // Map text
    driver.waitForTextByCss('[data-testid=icon-link-router-link-Location] [data-testid=router-link-Location-text]', 'MAP');
    // Map icon
    // driver.waitForAttributeContainsByCss('[data-testid=icon-link-router-link-Location] [data-testid=icon-Location]', 'class', 'CwtIcons__StyledIcon-sc-1zecbe-0 Links__LinkIcon-l19ljx-0 kHEtAx CwtIcons-sc-1zecbe-1 lGgAA');
    // Open map
    driver.waitAndClickByCss('[data-testid=icon-link-router-link-Location] [data-testid=router-link-Location-text]');
    // Close map
    driver.pause(1000);
    driver.waitAndClickByCss('[data-testid=modal-close-button]');

    // Share text
    driver.waitForTextByCss('[data-testid=icon-link-router-link-Link] [data-testid=router-link-Link-text]', 'SHARE');
    // Share icon
    // driver.waitForAttributeContainsByCss('[data-testid=icon-link-router-link-Link] [data-testid=icon-Link]', 'class', 'CwtIcons__StyledIcon-sc-1zecbe-0 Links__LinkIcon-l19ljx-0 kHEtAx CwtIcons-sc-1zecbe-1 iukakz');
    // Open share dialog
    driver.pause(1000);
    driver.waitAndClickByCss('[data-testid=icon-link-router-link-Link] [data-testid=router-link-Link-text]');
    // Close share dialog
    driver.pause(1000);
    driver.waitAndClickByCss('[data-testid=modal-close-button]');

    // Download text
    driver.waitForTextByCss('[data-testid=icon-link-router-link-Download] [data-testid=router-link-Download-text]', 'DOWNLOAD');
    // download icon
    // driver.waitForAttributeContainsByCss('[data-testid=icon-link-router-link-Download] [data-testid=icon-Download]', 'class', 'CwtIcons__StyledIcon-sc-1zecbe-0 Links__LinkIcon-l19ljx-0 kHEtAx CwtIcons-sc-1zecbe-1 hYEfmx');

    // Print
    driver.waitForTextByCss('[data-testid=icon-link-router-link-Printer] [data-testid=router-link-Printer-text]', 'PRINT');
    // driver.waitForAttributeContainsByCss('[data-testid=icon-link-router-link-Printer] [data-testid=icon-Printer]', 'class', 'CwtIcons__StyledIcon-sc-1zecbe-0 Links__LinkIcon-l19ljx-0 kHEtAx CwtIcons-sc-1zecbe-1 iUryHQ');

    // // Invoice text
    // driver.waitForTextByXpath('//*[@id="shell"]/div/div[1]/div/div[1]/div/div/div[1]/div/a[5]/span', 'INVOICE');
    // // Invoice icon
    // driver.waitForAttributeContainsByXpath('//*[@id="shell"]/div/div[1]/div/div[1]/div/div/div[1]/div/a[5]/i', 'class', 'CwtIcons__StyledIcon-sc-1zecbe-0 Links__LinkIcon-l19ljx-0 czcnEG CwtIcons-sc-1zecbe-1 bwugWV');

    // Travel alerts banner //TODO: no travel alerts in production, real data keep changing.
    // driver.waitForAttributeContainsByCss('[data-testid=travel-alert-icon]','class', 'CwtIcons__StyledIcon-sc-1zecbe-0 AlertBar__TravelAlertsIcon-sc-19hpbet-1 eSKsJe CwtIcons-sc-1zecbe-1 frwFAl');
    // driver.waitForTextByCss('[data-testid=alert-bar-text]', '3 active alerts for this trip');
    // driver.refresh();
    // driver.waitAndClickByCss('[data-testid=alert-bar-text]');
    // driver.waitForAttributeContainsByCss('[data-testid=alerts-modal-category-icon]','aria-label', 'Medical Category Icon');
    // driver.waitForTextByCss('[data-testid=alert-main-category]', 'United Kingdom - Measles');
    // driver.waitForTextByCss('[data-testid=alert-main-title]', 'AUTOMATION-This is the active to test');
    // driver.waitForTextByCss('[data-testid=alert-main-description]', 'AUTOMATION-This is the summary of the "active to test" - Most cases have been in unvaccinated individuals. Measles is caused by a highly contagious virus that spreads from person-to-person via infectious droplets. Typical symptoms include fever, cough and a characteristic rash. Serious to fatal complications can occur - particularly when very young children, adults or pregnant women are infected. All travellers should ensure they are fully immunised against measles.');
    // driver.waitForTextByCss('[data-testid=alert-main-last-updated]', 'LAST UPDATED: MAR 26, 2018');
    // driver.waitAndClickByCss('[data-testid=modal-close-button]');
  },


  'step 3 - Validate trip details flight item' : (driver) => {
    driver.scrollToLocation(0, 200);
    // Data
    driver.waitForTextByCss('[data-testid=air-1] [data-testid=trip-card-header-date]', 'WED, JUN 04');
    // Timeline icon (flight)
    driver.waitForAttributeContainsByCss('[data-testid=air-1] [data-testid=trip-card-header-line-icon]', 'class', 'CwtIcons__StyledIcon-sc-1zecbe-0 style__Icon-sc-1xp50pz-1 bzZdOu CwtIcons-sc-1zecbe-1 tMHET');

    // Flight title
    driver.waitForTextByCss('[data-testid=air-1] [data-testid=trip-card-title]', 'WED, JUN 04\nTypeAirline Carrier And Flight Code Are\nFlight To Moscow (SVO) | Aeroflot 262');
    driver.waitForAttributeContainsByCss('[data-testid=air-1] [data-testid=trip-card-vendor-icon]', 'class', 'style__VendorIcon-sc-1xp50pz-4 gGNZmf');

    driver.waitForTextByCss('[data-testid=air-1] [data-testid=segment-dates-column-start] [data-testid=code]', 'LHR');
    driver.waitForTextByCss('[data-testid=air-1] [data-testid=segment-dates-column-start] [data-testid=time-text]', '11:00 AM');
    driver.waitForTextByCss('[data-testid=air-1] [data-testid=segment-dates-column-start] [data-testid=segment-column-date]', 'WED, JUN 04');
    driver.waitForTextByCss('[data-testid=air-1] [data-testid=segment-dates-column-start] [data-testid=tooltip-base]', 'Heathrow Airport, London,\nGB');

    driver.waitForTextByCss('[data-testid=air-1] [data-testid=segment-dates-column-end] [data-testid=code]', 'SVO');
    driver.waitForTextByCss('[data-testid=air-1] [data-testid=segment-dates-column-end] [data-testid=time-text]', '4:50 PM');
    driver.waitForTextByCss('[data-testid=air-1] [data-testid=segment-dates-column-end] [data-testid=segment-column-date]', 'WED, JUN 04');
    driver.waitForTextByCss('[data-testid=air-1] [data-testid=segment-dates-column-end] [data-testid=tooltip-base]', 'Sheremetyevo Airport,\nMoscow, RU');

    driver.waitForTextByCss('[data-testid=air-1] [data-testid=duration-text]', '3H 50M');
    driver.waitForTextByCss('[data-testid=air-1] [data-testid=field-list-item-eticket]', 'E-Ticket #:\n5558937637555');
    driver.waitForTextByCss('[data-testid=air-1] [data-testid=field-list-item-trip-locator]', 'Trip Locator:\nPoexdr6');


    // flight connection
    driver.waitForAttributeContainsByCss('[data-testid=flightConnection-1] [data-testid=trip-card-header-line-icon]', 'class', 'CwtIcons__StyledIcon-sc-1zecbe-0 style__Icon-sc-1xp50pz-1 bzZdOu CwtIcons-sc-1zecbe-1 fnRQYH');
    driver.waitForTextByCss('[data-testid=flightConnection-1] [data-testid=trip-card-title]', '2H 10M Layover In SVO');
    driver.waitForTextByCss('[data-testid=flightConnection-1] [data-testid=trip-segment-connection-alert]', 'Change of terminal is required');
  },

  'step 4 - Validate trip details missing hotel item' : (driver) => {
    driver.scrollToLocation(0, 1083);
    // driver.waitForTextByXpath('//*[@id="tripDetails"]/div[2]/div/ul/li[4]/div/div/p', 'THU, JUN 5');
    driver.waitForAttributeContainsByCss('[data-testid=missingAccommodation-1] [data-testid=icon-Hotel]', 'class', 'CwtIcons__StyledIcon-sc-1zecbe-0 CwtIcons-sc-1zecbe-1 cwBKRA');
    driver.waitForTextByCss('[data-testid=missingAccommodation-1] [data-testid=segment-title]', 'Your itinerary is missing a hotel');
    driver.waitForTextByCss('[data-testid=missingAccommodation-1] [data-testid=dismiss-action]', 'DISMISS');
  },

  'step 5 - Validate trip details car item' : (driver) => {
    driver.scrollToLocation(0, 1323);
    driver.waitForTextByCss('[data-testid=car-1] [data-testid=trip-card-header-date]', 'SAT, JUN 07');
    driver.waitForAttributeContainsByCss('[data-testid=car-1] [data-testid=trip-card-header-line-icon]', 'class', 'CwtIcons__StyledIcon-sc-1zecbe-0 style__Icon-sc-1xp50pz-1 bzZdOu CwtIcons-sc-1zecbe-1 figTwR');

    driver.waitForTextByCss('[data-testid=car-1] [data-testid=trip-card-title]', 'SAT, JUN 07\nTyperental Company Is\nPick-Up | DOLLAR');
    driver.waitForTextByCss('[data-testid=car-1] [data-testid=segment-dates-column-start] [data-testid=time-text]', '1:10 PM');
    driver.waitForTextByCss('[data-testid=car-1] [data-testid=segment-dates-column-start] [data-testid=segment-column-date]', 'SAT, JUN 07');
    driver.waitForTextByCss('[data-testid=car-1] [data-testid=segment-dates-column-start] [data-testid=tooltip-base]', 'DEN');

    driver.waitForTextByCss('[data-testid=car-1] [data-testid=segment-dates-column-end] [data-testid=time-text]', '8:20 PM');
    driver.waitForTextByCss('[data-testid=car-1] [data-testid=segment-dates-column-end] [data-testid=segment-column-date]', 'SAT, JUN 07');
    driver.waitForTextByCss('[data-testid=car-1] [data-testid=segment-dates-column-end] [data-testid=tooltip-base]', 'DEN');

    driver.waitForTextByCss('[data-testid=car-1] [data-testid=duration-text]', '1 DAY');
    driver.waitForTextByCss('[data-testid=car-1] [data-testid=field-list-item-confirmation]', 'Confirmation #:\nR4083926');
    driver.waitForTextByCss('[data-testid=car-1] [data-testid=trip-segment-card-toggle]', 'MORE DETAILS');
    driver.scrollToLocation(0, 1782);
    driver.waitForAttributeContainsByCss('[data-testid=car-1] [data-testid=trip-segment-card-toggle-icon]', 'class', 'CwtIcons__StyledIcon-sc-1zecbe-0 styles__ToogleIcon-sc-17znhxp-8 fuJNYd CwtIcons-sc-1zecbe-1 bOulyP');

    driver.waitForTextByCss('[data-testid=car-1-checkout] [data-testid=trip-card-title]', 'Drop-off | DOLLAR');
    driver.waitForTextByCss('[data-testid=car-1-checkout] [data-testid=field-list-item-time]', '8:20 pm');
    driver.waitForAttributeContainsByCss('[data-testid=car-1-checkout] [data-testid=text-field-icon]', 'class', 'CwtIcons__StyledIcon-sc-1zecbe-0 Field__TypeIcon-sc-159qzul-1 bQoeGs CwtIcons-sc-1zecbe-1 lGgAA');
    driver.waitForTextByCss('[data-testid=car-1-checkout] [data-testid=field-list-item-location]', 'DEN');
  },

  'step 6 - Validate trip details hotel item' : (driver) => {
    driver.scrollToLocation(0, 2059);
    driver.waitForTextByCss('[data-testid=hotel-1] [data-testid=trip-card-header-date]', 'SUN, JUN 08');
    driver.waitForAttributeContainsByCss('[data-testid=hotel-1] [data-testid=trip-card-header-line-icon]', 'class', 'CwtIcons__StyledIcon-sc-1zecbe-0 style__Icon-sc-1xp50pz-1 bzZdOu CwtIcons-sc-1zecbe-1 cwBKRA');
    // driver.waitForTextByCss('[data-testid=hotel-1] [data-testid=trip-card-title]', 'SUN, JUN 08\nCheck-in | COUNTRY INN STS DENVER AIR'); //TODO: fix accesability text
    driver.waitForTextByCss('[data-testid=hotel-1] [data-testid=segment-dates-column-start] [data-testid=segment-column-status]', 'CHECK-IN');
    driver.waitForTextByCss('[data-testid=hotel-1] [data-testid=segment-dates-column-start] [data-testid=segment-column-main]', 'SUN,JUN 08');
    driver.waitForTextByCss('[data-testid=hotel-1] [data-testid=segment-dates-column-end] [data-testid=segment-column-status]', 'CHECK-OUT');
    driver.waitForTextByCss('[data-testid=hotel-1] [data-testid=segment-dates-column-end] [data-testid=segment-column-main]', 'MON,JUN 09');
    driver.waitForTextByCss('[data-testid=hotel-1] [data-testid=duration-text]', '1 NIGHT');
    // driver.waitForAttributeContainsByXpath('//*[@id="shell"]/div[1]/div/div[2]/div/ul/li[7]/div[2]/div[2]/ul/li[1]/i', 'class', 'CwtIcons__StyledIcon-sc-1zecbe-0 Field__TypeIcon-sc-159qzul-1 bQoeGs CwtIcons-sc-1zecbe-1 lGgAA');
    driver.waitForTextByCss('[data-testid=hotel-1] [data-testid=field-list-item-location]', '4343 N. Airport Way,');
    // driver.waitForAttributeContainsByXpath('//*[@id="shell"]/div[1]/div/div[2]/div/ul/li[7]/div[2]/div[2]/ul/li[2]/i', 'class', 'CwtIcons__StyledIcon-sc-1zecbe-0 Field__TypeIcon-sc-159qzul-1 bQoeGs CwtIcons-sc-1zecbe-1 gmNocY');
    driver.waitForTextByCss('[data-testid=hotel-1] [data-testid=field-list-item-phone]', '1-303-375-1105');
    driver.waitForTextByCss('[data-testid=hotel-1] [data-testid=field-list-item-confirmation]', 'Confirmation #:\n8KQDJH4');
    driver.waitForTextByCss('[data-testid=hotel-1] [data-testid=trip-segment-card-toggle]', 'MORE DETAILS');
    // driver.waitForAttributeContainsByCss('[data-testid=hotel-1] [data-testid=trip-segment-card-toggle-icon]', 'class', 'CwtIcons__StyledIcon-sc-1zecbe-0 styles__ToogleIcon-sc-17znhxp-8 fuJNYd CwtIcons-sc-1zecbe-1 bOulyP');
    // check out
    driver.waitForTextByCss('[data-testid=hotel-1] [data-testid=trip-card-header-date]', 'SUN, JUN 08');
    // driver.waitForAttributeContainsByCss('[data-testid=hotel-1-checkout] [data-testid=trip-card-header-line-icon]', 'class', 'CwtIcons__StyledIcon-sc-1zecbe-0 style__Icon-sc-1xp50pz-1 bzZdOu CwtIcons-sc-1zecbe-1 cwBKRA');
    driver.waitForTextByCss('[data-testid=hotel-1-checkout] [data-testid=trip-card-title]', 'Check-out | COUNTRY INN STS DENVER AIR');
  },

  'step 7 - Validate trip details rail item' : (driver) => {
    driver.scrollToLocation(0, 2591);
    driver.waitForAttributeContainsByCss('[data-testid=rail-1] [data-testid=trip-card-header-line-icon]', 'class', 'CwtIcons__StyledIcon-sc-1zecbe-0 style__Icon-sc-1xp50pz-1 bzZdOu CwtIcons-sc-1zecbe-1 fXFaBP');
    driver.waitForTextByCss('[data-testid=rail-1] [data-testid=trip-card-title]', 'Rail\nAmtrak 566');
    driver.waitForTextByCss('[data-testid=rail-1] [data-testid=time-text]', '9:30 AM');
    driver.waitForTextByCss('[data-testid=rail-1] [data-testid=segment-dates-column-start] [data-testid=segment-column-date]', 'MON, JUN 09');
    driver.waitForTextByCss('[data-testid=rail-1] [data-testid=segment-dates-column-start] [data-testid=tooltip-base]', 'Santa Ana John Wayne,\nSanta Ana, US');

    driver.waitForTextByCss('[data-testid=rail-1] [data-testid=segment-dates-column-end] [data-testid=time-text]', '11:30 AM');
    driver.waitForTextByCss('[data-testid=rail-1] [data-testid=segment-dates-column-end] [data-testid=segment-column-date]', 'TUE, JUN 10');
    driver.waitForTextByCss('[data-testid=rail-1] [data-testid=segment-dates-column-end] [data-testid=tooltip-base]', 'San Diego, San Diego, US');

    driver.waitForTextByCss('[data-testid=rail-1] [data-testid=duration-text]', '1D 2H 0M');
    driver.waitForTextByCss('[data-testid=rail-1] [data-testid=field-list-item-confirmation]', 'Confirmation #:\n0D1212');
    driver.waitForTextByCss('[data-testid=rail-1] [data-testid=field-list-item-trip-locator]', 'Trip Locator:\nPoexdr6');
    driver.waitForTextByCss('[data-testid=rail-1] [data-testid=trip-segment-card-toggle]', 'MORE DETAILS');
    driver.waitForAttributeContainsByCss('[data-testid=rail-1] [data-testid=trip-segment-card-toggle-icon]', 'class', 'CwtIcons__StyledIcon-sc-1zecbe-0 styles__ToogleIcon-sc-17znhxp-8 fuJNYd CwtIcons-sc-1zecbe-1 bOulyP');
  },

  'step 8 - Validate trip details meeting item' : (driver) => {
    driver.scrollToLocation(0, 2591);
    driver.waitForTextByCss('[data-testid=meeting-1] [data-testid=trip-card-header-date]', 'TUE, JUN 10');
    driver.waitForAttributeContainsByCss('[data-testid=meeting-1] [data-testid=trip-card-header-line-icon]', 'class', 'CwtIcons__StyledIcon-sc-1zecbe-0 style__Icon-sc-1xp50pz-1 bzZdOu CwtIcons-sc-1zecbe-1 kEqNau');
    driver.waitForTextByCss('[data-testid=meeting-1] [data-testid=trip-card-title]', 'TUE, JUN 10\nBUSINESS\nMeeting With Misha');

    driver.waitForTextByCss('[data-testid=meeting-1] [data-testid=segment-dates-column-start] [data-testid=segment-column-status]', 'STARTS');
    driver.waitForTextByCss('[data-testid=meeting-1] [data-testid=segment-dates-column-start] [data-testid=time-text]', '2:00 PM');
    driver.waitForTextByCss('[data-testid=meeting-1] [data-testid=segment-dates-column-start] [data-testid=segment-column-date]', 'TUE, JUN 10');

    driver.waitForTextByCss('[data-testid=meeting-1] [data-testid=segment-dates-column-end] [data-testid=segment-column-status]', 'ENDS');
    driver.waitForTextByCss('[data-testid=meeting-1] [data-testid=segment-dates-column-end] [data-testid=time-text]', '3:00 PM');
    driver.waitForTextByCss('[data-testid=meeting-1] [data-testid=segment-dates-column-end] [data-testid=segment-column-date]', 'TUE, JUN 10');
    driver.waitForTextByCss('[data-testid=meeting-1] [data-testid=duration-text]', '1 Hour');
    // driver.waitForAttributeContainsByCss('[data-testid=meeting-1] [data-testid=text-field-icon]', 'class', 'CwtIcons__StyledIcon-sc-1zecbe-0 Field__TypeIcon-sc-159qzul-1 bQoeGs CwtIcons-sc-1zecbe-1 lGgAA');
    driver.waitForTextByCss('[data-testid=meeting-1] [data-testid=field-list-item-address]', 'Shibuya City, Tokyo, Japan');
    driver.waitForTextByCss('[data-testid=meeting-1] [data-testid=trip-segment-card-toggle]', 'MORE DETAILS');
    // driver.waitForAttributeContainsByCss('[data-testid=meeting-1] [data-testid=trip-segment-card-toggle-icon]', 'class', 'CwtIcons__StyledIcon-sc-1zecbe-0 styles__ToogleIcon-sc-17znhxp-8 fuJNYd CwtIcons-sc-1zecbe-1 bOulyP');
  },

  'step 9 - Validate trip details share trip' : (driver) => {
    // Click on share button
    driver.waitAndClickByCss('[data-testid=icon-link-router-link-Link]');
    driver.pause(2000);
    // Add email address in teh field and select it from the list
    driver.waitAndSetValueByCss("#emails input", shareEmail);
    driver.pause(1000);
    // Hit ENTER key
    driver.keys([driver.Keys.ENTER]);
    // Click on comments button (to open the field)
    driver.waitAndClickByCss('[data-testid=icon-Plus]');
    // Add text in comments field
    driver.waitAndSetValueByCss('[data-testid=textarea]', 'Text for test');
    driver.pause(1000);
    // click on share button
    driver.waitAndClickByCss('#shareBtn');
    // validate success message appear
    driver.pause(4000);
    // driver.waitForTextByXpath('//*[@id="shell"]/div[3]/div/div/h2', 'Your itinerary was shared successfully!');
    // success message icon
    // driver.waitForAttributeContainsByCss('[data-testid=technical-assistance-success-icon]', 'class', 'styles__SuccessIcon-sc-1xzi3ch-6 bDnIrz');
    // close dialog
    driver.waitAndClickByCss('[data-testid=modal-close-button]');
    // Navigate to the mailbox
    driver.waitAndClickByCss('[data-testid=new-tab-link]');
    driver.switchToTab(1);
    driver.url(driver.globals.urls.mailtest_url + shareEmail);
    // Check the email message
    driver.useXpath();
    driver.isElementExistWithRefresh('/html/body/table/tbody/tr/td[2]/table/tbody/tr[2]/td/table/tbody/tr[1]/td/img', 6, 5000);
    driver.waitForAttributeContains('/html/body/table/tbody/tr/td[2]/table/tbody/tr[2]/td/table/tbody/tr[1]/td/img', 'src', 'https://cdn.worldmate.com/img/emails/cwtLogo2019.png');
    driver.waitForTextByXpath('/html/body/table/tbody/tr/td[2]/table/tbody/tr[2]/td/table/tbody/tr[4]/td/table/tbody/tr/td/table/tbody/tr[7]/td[2]', 'Text for test');
    driver.closeWindow();
    driver.pause(1000);
    driver.switchToTab(0);
  },

  // 'step 10 - Logout' : (driver) => {
  //   driver.waitAndClickByCss('[data-testid=account-dropdown-button]');
  //   driver.pause(1000);
  //   driver.waitAndClickByCss('[data-testid=header-logout]');
  // },

};
