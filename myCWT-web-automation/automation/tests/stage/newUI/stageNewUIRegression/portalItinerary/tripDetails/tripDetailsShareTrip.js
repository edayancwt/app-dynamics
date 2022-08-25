'use strict';

const randomNumber = Math.random(). toString(9).substring(2,8);
const shareEmail = "share-email"+randomNumber+"@mailtest.worldmate.com";

module.exports = {

  '@tags': ['trip', 'details', 'share'],

  before: function (driver) {
    driver.windowMaximize();
  },

  'step 1 - login': (driver) => {
    const login = driver.page.login();
    login.fillLoginDetails(driver.globals.users.portalUser1);
  },

  'step 2 - Navigate to trip details': (driver) => {
    driver.waitAndClick('#air-1');
  },

  'step 3 - Share': (driver) => {
    driver.waitAndClick('[data-id=action-share-button]');
    driver.waitAndSetValue('.Select-input input', shareEmail);
    // Click on the email suggested
    driver.waitAndClick('.Select-menu-outer');
    // Click on comments button (to open the field)
    driver.waitAndClick('.cwt-icon-open-comments');
    // Add text in comments field
    driver.waitAndSetValue('.form-control', 'This is a random number for test traveler modified message: '+randomNumber);
    driver.pause(1000);
    // click on share button
    driver.waitAndClick('#modal-share-submit-button');
    // validate success message appear
    driver.waitForText('.share-trip-success', 'Your Itinerary was shared successfully');
    // Close share dialog
    driver.waitAndClick('[data-id=share-close-button]');
  },

  'step 4 - Validate email message': (driver) => {
    driver.pause(5000);
    driver.url(driver.globals.urls.mailtest_url+shareEmail);
    console.log(driver.globals.urls.mailtest_url+shareEmail);
    driver.useXpath();
    driver.waitForAttributeContains('/html/body/table/tbody/tr/td[2]/table/tbody/tr[2]/td/table/tbody/tr[1]/td/img', 'src', 'https://cdn.worldmate.com/img/emails/LogoCWT2018.png');
    driver.waitForText('/html/body/table/tbody/tr/td[2]/table/tbody/tr[2]/td/table/tbody/tr[4]/td/table/tbody/tr/td/table/tbody/tr[1]/td[2]', 'Hello,');
    driver.waitForText('/html/body/table/tbody/tr/td[2]/table/tbody/tr[2]/td/table/tbody/tr[4]/td/table/tbody/tr/td/table/tbody/tr[3]/td[2]', 'I\'m using myCWT to organize my travel and wanted to share my itinerary with you.');
    driver.waitForText('/html/body/table/tbody/tr/td[2]/table/tbody/tr[2]/td/table/tbody/tr[4]/td/table/tbody/tr/td/table/tbody/tr[4]/td[2]', 'myCWT automatically builds my travel plans and then puts them on my mobile device.');
    //TODO: Check both links.
    // CWT links
    driver.waitForAttributeContains('/html/body/table/tbody/tr/td[2]/table/tbody/tr[2]/td/table/tbody/tr[4]/td/table/tbody/tr/td/table/tbody/tr[3]/td[2]/a', 'href', "https://www.carlsonwagonlit.com/global/en/how-we-do-it/travel-technology/cwt-to-go/");
    driver.waitForAttributeContains('/html/body/table/tbody/tr/td[2]/table/tbody/tr[2]/td/table/tbody/tr[4]/td/table/tbody/tr/td/table/tbody/tr[4]/td[2]/a', 'href', "https://www.carlsonwagonlit.com/global/en/how-we-do-it/travel-technology/cwt-to-go/");
    // User text
    driver.waitForText('/html/body/table/tbody/tr/td[2]/table/tbody/tr[2]/td/table/tbody/tr[4]/td/table/tbody/tr/td/table/tbody/tr[7]/td[2]', 'This is a random number for test traveler modified message: '+randomNumber);
    // Best regards
    driver.waitForText('/html/body/table/tbody/tr/td[2]/table/tbody/tr[2]/td/table/tbody/tr[4]/td/table/tbody/tr/td/table/tbody/tr[11]/td[2]', "Best Regards,\nAportal One One");
  },

  'step 5 - Flights': (driver) => {
    driver.waitForAttributeContains('/html/body/table/tbody/tr/td[2]/table/tbody/tr[2]/td/table/tbody/tr[7]/td/table[1]/tbody/tr[2]/td[1]/img', 'src', "https://cdn.worldmate.com/img/emails/icons_events_flight.png");
    driver.validateUrlResponse('https://cdn.worldmate.com/img/emails/icons_events_flight.png');
    driver.waitForText('/html/body/table/tbody/tr/td[2]/table/tbody/tr[2]/td/table/tbody/tr[7]/td/table[1]/tbody/tr[2]/td[2]', 'Flights');
    // First flight
    driver.waitForText('/html/body/table/tbody/tr/td[2]/table/tbody/tr[2]/td/table/tbody/tr[7]/td/table[1]/tbody/tr[5]/td[2]/table/tbody/tr[1]/td/span', 'Flight SU 262 , London to Moscow');
    driver.waitForText('/html/body/table/tbody/tr/td[2]/table/tbody/tr[2]/td/table/tbody/tr[7]/td/table[1]/tbody/tr[5]/td[2]/table/tbody/tr[3]/td[1]', 'Departure:');
    driver.waitForText('/html/body/table/tbody/tr/td[2]/table/tbody/tr[2]/td/table/tbody/tr[7]/td/table[1]/tbody/tr[5]/td[2]/table/tbody/tr[3]/td[2]', 'LHR, Wednesday, Jun 4 2025, 11:00 AM');
    driver.waitForText('/html/body/table/tbody/tr/td[2]/table/tbody/tr[2]/td/table/tbody/tr[7]/td/table[1]/tbody/tr[5]/td[2]/table/tbody/tr[5]/td[1]', 'Arrival:');
    driver.waitForText('/html/body/table/tbody/tr/td[2]/table/tbody/tr[2]/td/table/tbody/tr[7]/td/table[1]/tbody/tr[5]/td[2]/table/tbody/tr[5]/td[2]', 'SVO, Wednesday, Jun 4 2025, 4:50 PM');
    // Second flight
    driver.waitForText('/html/body/table/tbody/tr/td[2]/table/tbody/tr[2]/td/table/tbody/tr[7]/td/table[1]/tbody/tr[9]/td[2]/table/tbody/tr[1]/td/span', 'Flight SU 262 , Moscow to Tokyo');
    driver.waitForText('/html/body/table/tbody/tr/td[2]/table/tbody/tr[2]/td/table/tbody/tr[7]/td/table[1]/tbody/tr[9]/td[2]/table/tbody/tr[3]/td[1]', 'Departure:');
    driver.waitForText('/html/body/table/tbody/tr/td[2]/table/tbody/tr[2]/td/table/tbody/tr[7]/td/table[1]/tbody/tr[9]/td[2]/table/tbody/tr[3]/td[2]', 'SVO, Wednesday, Jun 4 2025, 7:00 PM');
    driver.waitForText('/html/body/table/tbody/tr/td[2]/table/tbody/tr[2]/td/table/tbody/tr[7]/td/table[1]/tbody/tr[9]/td[2]/table/tbody/tr[5]/td[1]', 'Arrival:');
    driver.waitForText('/html/body/table/tbody/tr/td[2]/table/tbody/tr[2]/td/table/tbody/tr[7]/td/table[1]/tbody/tr[9]/td[2]/table/tbody/tr[5]/td[2]', 'NRT, Thursday, Jun 5 2025, 10:35 AM');
  },

  'step 6 - Car rental': (driver) => {
    driver.waitForAttributeContains('/html/body/table/tbody/tr/td[2]/table/tbody/tr[2]/td/table/tbody/tr[7]/td/table[2]/tbody/tr[2]/td[1]/img', 'src', 'https://cdn.worldmate.com/img/emails/icons_events_car.png');
    driver.validateUrlResponse('https://cdn.worldmate.com/img/emails/icons_events_car.png');
    driver.waitForText('/html/body/table/tbody/tr/td[2]/table/tbody/tr[2]/td/table/tbody/tr[7]/td/table[2]/tbody/tr[2]/td[2]', 'Car Rental');
    driver.waitForText('/html/body/table/tbody/tr/td[2]/table/tbody/tr[2]/td/table/tbody/tr[7]/td/table[2]/tbody/tr[5]/td[2]/table/tbody/tr[1]/td/span', 'DOLLAR');
    driver.waitForText('/html/body/table/tbody/tr/td[2]/table/tbody/tr[2]/td/table/tbody/tr[7]/td/table[2]/tbody/tr[5]/td[2]/table/tbody/tr[3]/td[1]', 'Pick-up:');
    driver.waitForText('/html/body/table/tbody/tr/td[2]/table/tbody/tr[2]/td/table/tbody/tr[7]/td/table[2]/tbody/tr[5]/td[2]/table/tbody/tr[3]/td[2]', 'Friday, Jul 18 2025 3:10 PM - DEN Denver');
    driver.waitForText('/html/body/table/tbody/tr/td[2]/table/tbody/tr[2]/td/table/tbody/tr[7]/td/table[2]/tbody/tr[5]/td[2]/table/tbody/tr[5]/td[1]', 'Drop-off:');
    driver.waitForText('/html/body/table/tbody/tr/td[2]/table/tbody/tr[2]/td/table/tbody/tr[7]/td/table[2]/tbody/tr[5]/td[2]/table/tbody/tr[5]/td[2]', 'Friday, Jul 25 2025 1:20 PM - DEN Denver');
  },

  'step 7 - Hotel': (driver) => {
    driver.waitForAttributeContains('/html/body/table/tbody/tr/td[2]/table/tbody/tr[2]/td/table/tbody/tr[7]/td/table[3]/tbody/tr[2]/td[1]/img', 'src', 'https://cdn.worldmate.com/img/emails/icons_events_hotel.png');
    driver.validateUrlResponse('https://cdn.worldmate.com/img/emails/icons_events_hotel.png');
    driver.waitForText('/html/body/table/tbody/tr/td[2]/table/tbody/tr[2]/td/table/tbody/tr[7]/td/table[3]/tbody/tr[2]/td[2]', 'Hotel');
    driver.waitForText('/html/body/table/tbody/tr/td[2]/table/tbody/tr[2]/td/table/tbody/tr[7]/td/table[3]/tbody/tr[5]/td[2]/table/tbody/tr[1]/td/span', 'COUNTRY INN STS DENVER AIR , 4343 N. Airport Way,');
    driver.waitForText('/html/body/table/tbody/tr/td[2]/table/tbody/tr[2]/td/table/tbody/tr[7]/td/table[3]/tbody/tr[5]/td[2]/table/tbody/tr[3]/td[1]', 'Phone:');
    driver.waitForText('/html/body/table/tbody/tr/td[2]/table/tbody/tr[2]/td/table/tbody/tr[7]/td/table[3]/tbody/tr[5]/td[2]/table/tbody/tr[3]/td[2]', '1-303-375-1105');
    driver.waitForText('/html/body/table/tbody/tr/td[2]/table/tbody/tr[2]/td/table/tbody/tr[7]/td/table[3]/tbody/tr[5]/td[2]/table/tbody/tr[5]/td[1]', 'Check-in:');
    driver.waitForText('/html/body/table/tbody/tr/td[2]/table/tbody/tr[2]/td/table/tbody/tr[7]/td/table[3]/tbody/tr[5]/td[2]/table/tbody/tr[5]/td[2]', 'Monday, Aug 18 2025');
    driver.waitForText('/html/body/table/tbody/tr/td[2]/table/tbody/tr[2]/td/table/tbody/tr[7]/td/table[3]/tbody/tr[5]/td[2]/table/tbody/tr[7]/td[1]', 'Check-out:');
    driver.waitForText('/html/body/table/tbody/tr/td[2]/table/tbody/tr[2]/td/table/tbody/tr[7]/td/table[3]/tbody/tr[5]/td[2]/table/tbody/tr[7]/td[2]', 'Monday, Aug 25 2025');
  },

  'step 8 - Ground Transportation': (driver) => {
    driver.waitForAttributeContains('/html/body/table/tbody/tr/td[2]/table/tbody/tr[2]/td/table/tbody/tr[7]/td/table[4]/tbody/tr[2]/td[1]/img', 'src', 'https://cdn.worldmate.com/img/emails/icons_events_train.png');
    driver.validateUrlResponse('https://cdn.worldmate.com/img/emails/icons_events_train.png');
    driver.waitForText('/html/body/table/tbody/tr/td[2]/table/tbody/tr[2]/td/table/tbody/tr[7]/td/table[4]/tbody/tr[2]/td[2]', 'Ground Transportation');
    driver.waitForText('/html/body/table/tbody/tr/td[2]/table/tbody/tr[2]/td/table/tbody/tr[7]/td/table[4]/tbody/tr[5]/td[2]/table/tbody/tr[1]/td/span', 'Amtrak , Santa Ana to San Diego');
    driver.waitForText('/html/body/table/tbody/tr/td[2]/table/tbody/tr[2]/td/table/tbody/tr[7]/td/table[4]/tbody/tr[5]/td[2]/table/tbody/tr[3]/td[1]', 'Departure:');
    driver.waitForText('/html/body/table/tbody/tr/td[2]/table/tbody/tr[2]/td/table/tbody/tr[7]/td/table[4]/tbody/tr[5]/td[2]/table/tbody/tr[3]/td[2]', 'Santa Ana John Wayne Santa Ana US, Wednesday, Sep 3 2025 9:30 AM');
    driver.waitForText('/html/body/table/tbody/tr/td[2]/table/tbody/tr[2]/td/table/tbody/tr[7]/td/table[4]/tbody/tr[5]/td[2]/table/tbody/tr[5]/td[1]', 'Arrival:');
    driver.waitForText('/html/body/table/tbody/tr/td[2]/table/tbody/tr[2]/td/table/tbody/tr[7]/td/table[4]/tbody/tr[5]/td[2]/table/tbody/tr[5]/td[2]', 'San Diego San Diego US, Wednesday, Sep 3 2025 11:30 AM');
  },

  'step 9 - Meeting': (driver) => {
    driver.waitForAttributeContains('/html/body/table/tbody/tr/td[2]/table/tbody/tr[2]/td/table/tbody/tr[7]/td/table[5]/tbody/tr[2]/td[1]/img', 'src', 'https://cdn.worldmate.com/img/emails/icons_events_meeting.png');
    driver.validateUrlResponse('https://cdn.worldmate.com/img/emails/icons_events_meeting.png');
    driver.waitForText('/html/body/table/tbody/tr/td[2]/table/tbody/tr[2]/td/table/tbody/tr[7]/td/table[5]/tbody/tr[2]/td[2]', 'Meeting');
    driver.waitForText('/html/body/table/tbody/tr/td[2]/table/tbody/tr[2]/td/table/tbody/tr[7]/td/table[5]/tbody/tr[5]/td[2]/table/tbody/tr[1]/td/span', 'Automation meeting');
    driver.waitForText('/html/body/table/tbody/tr/td[2]/table/tbody/tr[2]/td/table/tbody/tr[7]/td/table[5]/tbody/tr[5]/td[2]/table/tbody/tr[3]/td[1]', 'Date/Time:');
    driver.waitForText('/html/body/table/tbody/tr/td[2]/table/tbody/tr[2]/td/table/tbody/tr[7]/td/table[5]/tbody/tr[5]/td[2]/table/tbody/tr[3]/td[2]', 'Wednesday, Sep 3 2025 3:00 PM - 4:00 PM');
    driver.waitForText('/html/body/table/tbody/tr/td[2]/table/tbody/tr[2]/td/table/tbody/tr[7]/td/table[5]/tbody/tr[5]/td[2]/table/tbody/tr[5]/td[1]', 'Location:');
    driver.waitForText('/html/body/table/tbody/tr/td[2]/table/tbody/tr[2]/td/table/tbody/tr[7]/td/table[5]/tbody/tr[5]/td[2]/table/tbody/tr[5]/td[2]', 'San Diego San Diego Ave');
  },

  'step 10 - Email footer': (driver) => {
    driver.waitForText('/html/body/table/tbody/tr/td[2]/table/tbody/tr[2]/td/table/tbody/tr[8]/td/table/tbody/tr[2]/td[2]', "This email was sent to you by Aportal One One (aportal1@yopmail.com) using myCWT.\n\nYou can reply to this email to contact Aportal One One if you have any questions about this email.\n\nFlight departure and arrival times are subject to change. Please check with airline carrier for final arrival times.");
    driver.waitForAttributeContains('/html/body/table/tbody/tr/td[2]/table/tbody/tr[2]/td/table/tbody/tr[8]/td/table/tbody/tr[2]/td[2]/a', 'href', 'mailto:aportal1@yopmail.com');
    driver.waitForText('/html/body/table/tbody/tr/td[2]/table/tbody/tr[2]/td/table/tbody/tr[8]/td/table/tbody/tr[2]/td[2]/a', driver.globals.users.portalUser1.username);
    // Apple/Android line
    driver.waitForText('/html/body/table/tbody/tr/td[2]/table/tbody/tr[2]/td/table/tbody/tr[9]/td/table/tbody/tr[2]/td[1]', 'myCWT Available for iPhone, iPad, Android.');
    driver.waitForAttributeContains('/html/body/table/tbody/tr/td[2]/table/tbody/tr[2]/td/table/tbody/tr[9]/td/table/tbody/tr[2]/td[2]/table/tbody/tr/td[2]/a/img', 'src', 'cwtstage.worldmate.com/images/emails-new-design/share_trip/icons_app_apple.png');
    driver.validateUrlResponse('https://cwtstage.worldmate.com/images/emails-new-design/share_trip/icons_app_apple.png');
    driver.waitForAttributeContains('/html/body/table/tbody/tr/td[2]/table/tbody/tr[2]/td/table/tbody/tr[9]/td/table/tbody/tr[2]/td[2]/table/tbody/tr/td[4]/a/img', 'src', 'cwtstage.worldmate.com/images/emails-new-design/share_trip/icons_app_android.png');
    driver.validateUrlResponse('https://cwtstage.worldmate.com/images/emails-new-design/share_trip/icons_app_android.png');
    // Facebook/Twitter line
    driver.waitForText('/html/body/table/tbody/tr/td[2]/table/tbody/tr[2]/td/table/tbody/tr[9]/td/table/tbody/tr[5]/td/table/tbody/tr/td[1]', 'Find us on:');
    driver.waitForAttributeContains('/html/body/table/tbody/tr/td[2]/table/tbody/tr[2]/td/table/tbody/tr[9]/td/table/tbody/tr[5]/td/table/tbody/tr/td[3]/a/img', 'src', 'cwtstage.worldmate.com/images/emails-new-design/share_trip/icons_social_facebook.png');
    driver.validateUrlResponse('https://cwtstage.worldmate.com/images/emails-new-design/share_trip/icons_social_facebook.png');
    driver.waitForAttributeContains('/html/body/table/tbody/tr/td[2]/table/tbody/tr[2]/td/table/tbody/tr[9]/td/table/tbody/tr[5]/td/table/tbody/tr/td[5]/a/img', 'src', 'cwtstage.worldmate.com/images/emails-new-design/share_trip/icons_social_twitter.png');
    driver.validateUrlResponse('https://cwtstage.worldmate.com/images/emails-new-design/share_trip/icons_social_twitter.png');
    driver.waitForText('/html/body/table/tbody/tr/td[2]/table/tbody/tr[2]/td/table/tbody/tr[9]/td/table/tbody/tr[5]/td/table/tbody/tr/td[9]', 'Copyright © 2018 CWT');
    driver.waitForText('/html/body/table/tbody/tr/td[2]/table/tbody/tr[2]/td/table/tbody/tr[9]/td/table/tbody/tr[5]/td/table/tbody/tr/td[13]', 'Contact us at support@mycwt.com');
    driver.waitForAttributeContains('/html/body/table/tbody/tr/td[2]/table/tbody/tr[2]/td/table/tbody/tr[9]/td/table/tbody/tr[5]/td/table/tbody/tr/td[13]/a', 'href', "mailto:support@mycwt.com");
    },

  'step 11 - Test details' : (driver) => {
    console.log("==================================================================================================================================\n"+
      "Shared email in this mailbox: "+shareEmail+"\nYou can check it here: "+driver.globals.urls.mailtest_url+shareEmail+
      "\n==================================================================================================================================");
  },

};