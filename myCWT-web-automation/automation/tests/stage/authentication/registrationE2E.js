'use strict';

let NWTools = require('nightwatch-tools');
let randomString = NWTools.randomString(5,'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz');
let randomNumber = NWTools.randomString(3,'1234567890');
const clc = require('cli-color');

let adminID = "UEXD332";
let adminPassword = "password1";
let firstName = "FirstName "+randomString;
let lastName = "LastName "+randomString;
let newEmail = "automation-" + randomString + "@mailtest.worldmate.com";
let clientName = "Selenium top";
let subunitName = "Selenium sub";
let newPassword = "pa$$word" + randomNumber;
let newUserDetails = [];

module.exports = {

  '@tags': ['IDM', 'registration'],

  before: function (driver) {
    driver.windowMaximize();
  },

  'step 1 - Navigate to stage portrait admin url': (driver) => {
    driver.url('http://test2maint.carlsonwagonlit.com/');
  },

  'step 2 - Login with admin credentials': (driver) => {
    driver.clearValue('#UserID');
    driver.waitAndSetValueByCss('#UserID', adminID);
    driver.clearValue('#UserIdentifier');
    driver.waitAndSetValueByCss('#UserIdentifier', adminPassword);
    driver.waitAndClickByXpath('html/body/form/table/tbody/tr[3]/td/table/tbody/tr/td[2]/table/tbody/tr[4]/td/table/tbody/tr/td[3]/input');
  },

  'step 3 - Navigate to profile section in the menu': (driver) => {
    driver.useXpath();
    driver.moveToElement('//*[@id="yui-gen1"]/a',1,1);
    driver.waitAndClickByXpath('//*[@id="yui-gen2"]/a');
    driver.switchToTab(1);
  },

  'step 4 - Add top details': (driver) => {
    driver.waitAndSetValueByCss('input[data-reactid=".0.0.0.1.0.1.$travelerSearch/=1$travelerSearch.0.0.0.0.0.0.2.2.0.1.1.1.1.0"]', clientName);
    newUserDetails.push("Your client name is: "+(clc.blue(clientName)));
  },

  'step 5 - Select the client from the list': (driver) => {
    driver.pause(2000);
    driver.waitAndClickByCss(".Select-option.is-focused");
    driver.pause(2000);
    driver.waitAndClickByXpath('//*[@id="root"]/div/div/div/div[2]/div/div/div/div/table/tbody/tr/td[1]/div/div[2]/form/div[8]/button[1]');
    driver.pause(3000);

    // This condition here to overcome "Authentication" error display sometimes after selecting client.
    driver.element('xpath','//*[@id="root"]/div/div/div/div/div[2]/span', (isExist) => {
      if (isExist.status !== -1){
        driver.closeWindow();
        driver.useXpath();
        driver.switchToTab(0);
        driver.moveToElement('//*[@id="yui-gen1"]/a', 1, 1);
        driver.waitAndClickByXpath('//*[@id="yui-gen2"]/a');
        driver.switchToTab(1);
        driver.waitAndSetValueByCss('input[data-reactid=".0.0.0.1.0.1.$travelerSearch/=1$travelerSearch.0.0.0.0.0.0.2.2.0.1.1.1.1.0"]', clientName);
        driver.pause(2000);
        driver.waitAndClickByCss(".Select-option.is-focused");
        driver.pause(2000);
        driver.waitAndClickByXpath('//*[@id="root"]/div/div/div/div[2]/div/div/div/div/table/tbody/tr/td[1]/div/div[2]/form/div[8]/button[1]');
        driver.pause(3000);
      }
    })
  },

  'step 6 - Select subunit': (driver) => {
    driver.waitAndClickByXpath('//*[@id="root"]/div/div/div/div[2]/div/div/div/div/table/tbody/tr/td[2]/div[2]/div[2]/table/tbody/tr/td/div/div[1]/div[2]/div/div/div[2]/div/form/div[1]/div/div[2]/div/div/div/select');
    driver.waitAndClickByXpath('//*[@id="root"]/div/div/div/div[2]/div/div/div/div/table/tbody/tr/td[2]/div[2]/div[2]/table/tbody/tr/td/div/div[1]/div[2]/div/div/div[2]/div/form/div[1]/div/div[2]/div/div/div/select/option[2]');
    newUserDetails.push("Your subunit name is: "+(clc.blue(subunitName)));
  },

  'step 7 - Select traveler type': (driver) => {
    driver.waitAndClickByXpath('//*[@id="root"]/div/div/div/div[2]/div/div/div/div/table/tbody/tr/td[2]/div[2]/div[2]/table/tbody/tr/td/div/div[1]/div[2]/div/div/div[2]/div/form/div[2]/div/div[2]/div/div/div/select');
    driver.waitAndClickByXpath('//*[@id="root"]/div/div/div/div[2]/div/div/div/div/table/tbody/tr/td[2]/div[2]/div[2]/table/tbody/tr/td/div/div[1]/div[2]/div/div/div[2]/div/form/div[2]/div/div[2]/div/div/div/select/option[2]');
  },

  'step 8 - Add first and last names (random)': (driver) => {
    driver.waitAndSetValueByXpath(".//*[@id='root']/div/div/div/div[2]/div/div/div/div/table/tbody/tr/td[2]/div[2]/div[2]/table/tbody/tr/td/div/div[1]/div[2]/div/div/div[2]/div/form/div[3]/div/div[2]/div/div/div/input", firstName);
    driver.waitAndSetValueByXpath(".//*[@id='root']/div/div/div/div[2]/div/div/div/div/table/tbody/tr/td[2]/div[2]/div[2]/table/tbody/tr/td/div/div[1]/div[2]/div/div/div[2]/div/form/div[5]/div/div[2]/div/div/div/input", lastName);
    newUserDetails.push("Your first name is: "+(clc.blue(firstName)));
    newUserDetails.push("Your last name is: "+(clc.blue(lastName)));
  },

  'step 9 - Select prefix': (driver) => {
    driver.waitAndClickByXpath('//*[@id="root"]/div/div/div/div[2]/div/div/div/div/table/tbody/tr/td[2]/div[2]/div[2]/table/tbody/tr/td/div/div[1]/div[2]/div/div/div[2]/div/form/div[6]/div/div[2]/div/div/div/select');
    driver.pause(1000);
    driver.waitAndClickByXpath('//*[@id="root"]/div/div/div/div[2]/div/div/div/div/table/tbody/tr/td[2]/div[2]/div[2]/table/tbody/tr/td/div/div[1]/div[2]/div/div/div[2]/div/form/div[6]/div/div[2]/div/div/div/select/option[3]');
  },

  'step 10 - Add email (using the randomString)': (driver) => {
    driver.waitAndSetValueByXpath('//*[@id="root"]/div/div/div/div[2]/div/div/div/div/table/tbody/tr/td[2]/div[2]/div[2]/table/tbody/tr/td/div/div[2]/div/div/div/div[2]/div/form/div[2]/div/div[2]/div/div/div/input', newEmail);
    console.log(clc.blue(newEmail));
    newUserDetails.push("Your user is: "+(clc.blue(newEmail)));
  },

  'step 11 - Click on save button': (driver) => {
    driver.waitAndClickByXpath('//*[@id="root"]/div/div/div/div[2]/div/div/div/div/table/tbody/tr/td[2]/div[2]/div[2]/div[1]/button[1]');
  },

//    ---------------------------------- Welcome email (Get started) ----------------------------------

  'step 12 - Navigate to the registration welcome email': (driver) => {
    driver.url('https://travel.stage-mycwt.com/mailtest/emails?username=' + newEmail);
  },

  'step 13 - Validate welcome email': (driver) => {
    driver.isElementExistWithRefresh('/html/body/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[2]/td/h2', 20, 6000);
    // CWT logo
    driver.waitForAttributeContainsByXpath('/html/body/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[1]/td/p/img', 'src', 'http://image.email1.carlsonwagonlit.com/lib/fe8f13727563037871/m/1/normal.png');
    //Main title
    driver.waitForTextByXpath('/html/body/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[2]/td/h2', "Hi " + firstName);
    //First text box
    driver.waitForTextByXpath('/html/body/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[2]/td/p[1]', "As a traveler of " +clientName+ ", you can take advantage of our travel tools to plan and book your business travel plus get real-time updates while on the go. Please click the button below to verify your email address and activate your account.");
    //GET STARTED button title
    driver.waitForTextByXpath('/html/body/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/a', "GET STARTED");
    //Secondary text box (copy link)
    driver.waitForTextByXpath('/html/body/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[2]/td/p[2]', "If the button doesn’t work you can paste this link into your browser:\n" + "https://accounts.stage-mycwt.com/ext/reg/Registration?adapterId=UserReg");
    //Third text box (If you encounter issues)
    driver.waitForTextByXpath('/html/body/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[2]/td/p[3]', "If you encounter issues registering your CWT account, please contact our Help Center team for assistance.");
    driver.waitForAttributeContainsByXpath('/html/body/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[2]/td/p[3]/a', 'href', 'http://click.email1.carlsonwagonlit.com/');
    driver.waitForTextByXpath('/html/body/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[2]/td/p[2]/a', "https://accounts.stage-mycwt.com/ext/reg/Registration?adapterId=UserReg");
    //Forth text box (Thanks you)
    driver.waitForTextByXpath('/html/body/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[2]/td/p[4]', "Thank you,\n" + "The myCWT Team");
    //Fifth text box (Need help)
    driver.waitForTextByXpath('/html/body/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr[1]/td', "Need help?\nContact our Help Center and we'll be happy to answer your questions.");
    //Sixth text box (You are receiving this email)
    driver.waitForTextByXpath('/html/body/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr[2]/td/span', "You are receiving this email because your company uses CWT as its travel management company. CWT is committed to protecting the personal data of our clients travelers. Your company has authorized the use of this data.");
    //last text box (Terms of use)
    driver.waitForTextByXpath('/html/body/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr[3]/td/a[1]', "Terms of use");
    driver.waitForTextByXpath('/html/body/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr[3]/td/a[2]', "Global privacy policy");
  },

//    ---------------------------------- Create account page ----------------------------------


  'step 14 - Click on welcome email get started button': (driver) => {
    driver.waitAndClickByXpath('/html/body/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/a');
    driver.switchToTab(2);
  },

  'step 15 - Validate create your account page display': (driver) => {
    driver.waitForUrl('https://accounts.stage-mycwt.com/ext/reg/Registration?adapterId=UserReg');
  },

  'step 16 - Add the new email in create your account page': (driver) => {
    driver.waitAndSetValueByCss('#email', newEmail);
  },

  'step 17 - Click on create your account next button': (driver) => {
    driver.waitAndClickByXpath('//*[@id="right"]/div[3]/form/div[2]/div/button');
  },

  'step 18 - Validate check your email page display': (driver) => {
    driver.waitForAttributeContainsByXpath('//*[@id="right"]/div[2]/div/i', 'class', 'icon-email-sent');
    driver.waitForTextByXpath('//*[@id="right"]/div[2]/div/h3', "Check your email");
    driver.waitForTextByXpath('//*[@id="right"]/div[2]/div/p[1]', "We sent you an email to\n" + newEmail + "\nwith instructions on how to register your account.\n" + "It may take few minutes to come through.");
    driver.waitForTextByXpath('//*[@id="right"]/div[2]/div/p[2]', "Didn't get the email?\n" + "Check your spam folder or\n" + "re-send email");
  },

//    ---------------------------------- Registration email (Activate account) ----------------------------------

  'step 19 - Navigate to the registration activation email': (driver) => {
    driver.url('https://travel.stage-mycwt.com/mailtest/emails?username=' + newEmail);
  },

  'step 20 - Validate activation email display as expected': (driver) => {
    //Main title
    driver.isElementExistWithRefresh('/html/body/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[2]/td/div/p/span[1]', 20, 6000);
    driver.waitForTextByXpath('/html/body/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[2]/td/h2', "Hi " + firstName);
    //First text box
    driver.waitForTextByXpath('/html/body/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[2]/td/p[1]', "Welcome to myCWT. Please click the button below to verify your email address and activate your account.");
    //Employee name
    driver.waitForTextByXpath('/html/body/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[2]/td/div/p/span[1]', "Employee name:");
    driver.waitForTextByXpath('/html/body/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[2]/td/div/p/span[2]', firstName +" "+ lastName);
    //ACTIVATE ACCOUNT button title
    driver.waitForTextByXpath('/html/body/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/a', "ACTIVATE ACCOUNT");

    //Secondary text box (copy link)
    // driver.waitForTextByXpath('/html/body/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[2]/td/p[2]/text()', "If the button doesn’t work you can paste this link into your browser:");
    //TODO - Need to separate the text line from the link (talk to Shiran team)

    //Third text box (If you didn't try to create an account)
    driver.waitForTextByXpath('/html/body/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[2]/td/p[3]', "If you didn't try to create an account for "+newEmail+", don't worry - we haven't done anything, and you can safely ignore this message.");
    //Forth text box (Thanks you)
    driver.waitForTextByXpath('/html/body/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[2]/td/p[4]', "Thank you,\nThe myCWT Team");
    //Fifth text box (Need help)
    driver.waitForTextByXpath('/html/body/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr[1]/td', "Need help?\nContact our Help Center and we’ll be happy to answer your questions");
    //Sixth text box (You are receiving this email)
    driver.waitForTextByXpath('/html/body/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr[2]/td/span', "You are receiving this email because your company uses CWT as its travel management company. CWT is committed to protecting the personal data of our clients' travelers. Your company has authorized the use of this data.");
    //last text box (Terms of use)
    driver.waitForTextByXpath('/html/body/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr[3]/td/a[1]', "Terms of use");
    driver.waitForTextByXpath('/html/body/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr[3]/td/a[2]', "Global Privacy Policy");
  },

//    ---------------------------------- Activate account (email/password) ----------------------------------

  'step 21 - Click on activation email activate account button': (driver) => {
    driver.waitAndClickByXpath('/html/body/table/tbody/tr/td[2]/div/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/a');
    driver.switchToTab(3);
  },

  'step 22 - Validate activation page display': (driver) => {
    //Login link
    driver.waitForAttributeContainsByXpath('//*[@id="right"]/div[1]/ul/li[1]/a', 'href', 'https://travel.stage-mycwt.com');
    //Language link
    driver.waitForTextByCss('#locale-selection-dropdown', "English (US)");
    //V image
    driver.waitForAttributeContainsByCss('#registration-page-title-icon', 'class', 'icon-ok');
    //User email next to the V image
    driver.waitForTextByCss('#registration-page-title-email', newEmail);
    //Username title
    driver.waitForTextByCss('#your-username-title', "Your username");
    //User email display by default in the username field
    driver.waitForAttributeContainsByCss('#newUsername', 'value', newEmail);
    //Username icon
    driver.waitForAttributeContainsByCss('#new-user-name-icon', 'class', 'cwt-icon-user');
    //Password title
    driver.waitForTextByCss('#your-password-title', "Create password");
    //"Password" pre-text display by default in the password field
    driver.waitForAttributeContainsByCss('#newPassword', 'placeholder', 'Password');
    //Password icon
    driver.waitForAttributeContainsByCss('#create-password-icon', 'class', 'cwt-icon-lock');
    //SIGN UP button
    driver.waitForTextByCss('#submit-button', "SIGN UP");
    //Help center
    driver.waitForAttributeContainsByCss('#help-center-link', 'href', 'http://help.mycwt.com/');
    //Terms of use
    driver.waitForAttributeContainsByCss('#terms-of-use-link', 'href', 'https://www.carlsonwagonlit.com/global/en/legal/platform-terms-of-use/');
    //Global privacy
    driver.waitForAttributeContainsByCss('#privacy-policy-link', 'href', 'http://www.carlsonwagonlit.com/content/cwt/global/en/legal/global-privacy-policy.html');
    //2017 title
    driver.waitForTextByCss('#copyrights', "©2018 CWT");
  },

  'step 23 - Validate activation page links': (driver) => {
    //Language list
    driver.waitAndClickByCss('#locale-selection-dropdown');
    driver.waitForTextByXpath('//*[@id="right"]/div[1]/ul/li[3]/ul/li[1]/a', "Danish");
    driver.waitForTextByXpath('//*[@id="right"]/div[1]/ul/li[3]/ul/li[2]/a', "Dutch (NL)");
    driver.waitForTextByXpath('//*[@id="right"]/div[1]/ul/li[3]/ul/li[3]/a', "English (Canada)");
    driver.waitForTextByXpath('//*[@id="right"]/div[1]/ul/li[3]/ul/li[4]/a', "English (GB)");
    driver.waitForTextByXpath('//*[@id="right"]/div[1]/ul/li[3]/ul/li[5]/a', "English (US)");
    driver.waitForTextByXpath('//*[@id="right"]/div[1]/ul/li[3]/ul/li[6]/a', "Finnish");
    driver.waitForTextByXpath('//*[@id="right"]/div[1]/ul/li[3]/ul/li[7]/a', "French (Canada)");
    driver.waitForTextByXpath('//*[@id="right"]/div[1]/ul/li[3]/ul/li[8]/a', "French (FR)");
    driver.waitForTextByXpath('//*[@id="right"]/div[1]/ul/li[3]/ul/li[9]/a', "German");
    driver.waitForTextByXpath('//*[@id="right"]/div[1]/ul/li[3]/ul/li[10]/a', "Italian");
    driver.waitForTextByXpath('//*[@id="right"]/div[1]/ul/li[3]/ul/li[11]/a', "Norwegian");
    driver.waitForTextByXpath('//*[@id="right"]/div[1]/ul/li[3]/ul/li[12]/a', "Portuguese (BR)");
    driver.waitForTextByXpath('//*[@id="right"]/div[1]/ul/li[3]/ul/li[13]/a', "Russian");
    driver.waitForTextByXpath('//*[@id="right"]/div[1]/ul/li[3]/ul/li[14]/a', "Spanish (ES)");
    driver.waitForTextByXpath('//*[@id="right"]/div[1]/ul/li[3]/ul/li[15]/a', "Spanish (Latin America)");
    driver.waitForTextByXpath('//*[@id="right"]/div[1]/ul/li[3]/ul/li[16]/a', "Swedish");
    //Username tooltip
    driver.waitAndClickByCss('#newUsername');
    driver.waitForTextByCss('.m-b-xs', "Changing your username");
    driver.waitForTextByCss('.m-b-0', "Username other than your work email will prevent you from using myCWT.");
    //Password tooltip
    driver.waitAndClickByCss('#newPassword');
// TODO: need to add the new ID dudi will create
//     driver.waitForTextByCss('.policy-list', "Password policy\nMust be 8-32 characters long\nMust have at least one non-alphabetic character\nMust be different from your username\nMust be different from 5 previous passwords");
    //Help center
    driver.waitAndClickByCss('#help-center-link');
    driver.switchToTab(4);
    driver.waitForUrlToContain('http://help.mycwt.com/',20000);
    driver.closeWindow();
    driver.switchToTab(3);
    //Terms of use
    driver.waitAndClickByCss('#terms-of-use-link');
    driver.switchToTab(4);
    driver.waitForUrlToContain('www.carlsonwagonlit.com/legal/platform-terms-of-use/',20000);
    driver.closeWindow();
    driver.switchToTab(3);
    //Global privacy
    driver.waitAndClickByCss('#privacy-policy-link');
    driver.switchToTab(4);
    driver.waitForUrlToContain('www.carlsonwagonlit.com/legal/global-privacy-policy/',25000);
    driver.closeWindow();
    driver.switchToTab(3);
  },

  'step 24 - Add valid password in password field': (driver) => {
    driver.waitAndSetValueByCss('#newPassword', newPassword);
    newUserDetails.push("Your password is: "+(clc.blue(newPassword)));
  },

  'step 25 - Click on sign up button': (driver) => {
    driver.waitAndClickByXpath('//*[@id="right"]/div[3]/form/div[5]/div/button');
  },

//    ---------------------------------- Traveler notice and login ----------------------------------

  'step 26 - Validate traveler notice page display': (driver) => {
    //Traveler notice title
    driver.waitForTextByXpath('//*[@id="right"]/div[1]/form/h1', "Traveler Notice");
    //Content
    // driver.waitForTextByCss("CWT GLOBAL PRIVACY POLICY AND NOTICE" +
    //   "The Global Privacy Policy is available in English and in the following languages. Please note that some of these pages are currently being translated." +
    //   "Bulgarian" +
    //   "Croatian" +
    //   "Czech" +
    //   "Danish" +
    //   "Dutch" +
    //   "English" +
    //   "Finnish" +
    //   "French" +
    //   "Gaelic" +
    //   "German" +
    //   "Greek" +
    //   "Hungarian" +
    //   "Italian" +
    //   "Latvian" +
    //   "Lithuanian" +
    //   "Maltese" +
    //   "Norwegian" +
    //   "Polish" +
    //   "Portuguese" +
    //   "Slovak" +
    //   "Slovenian" +
    //   "Spanish" +
    //   "Swedish" +
    //   "Turkish" +
    //   "Last updated May 2018" +
    //   "Your privacy matters" +
    //   "Carlson Wagonlit Travel (CWT Global B.V. and its affiliates, together CWT) is a travel management company with operations in many countries around the world. We provide business travel and hospitality, as well as meetings and events, services to our corporate clients. CWT is committed to transparency and respecting your online privacy, and recognises the need for appropriate protection and management of the personal data you share with us. This Global Privacy Notice and Policy describes the personal data we collect, how we used it and with whom we share it, in the context of the provision of our services and when you visit our websites and online tools." +
    //   "Why do we collect personal data?" +
    //   "Personal data is information that enables us to identify you when providing our services. The use, processing or transfer of your personal data is regulated by applicable data protection and privacy laws and regulations." +
    //   "CWT collects personal information from (i) corporate clients, their travelers and meetings and events attendees, for the performance of the commercial agreements concluded with our clients, and (ii) the visitors and users of CWT websites. The purposes for which we collect your personal information is related to the provision of business travel, hospitality and meetings and events services, such as:" +
    //   "Travel, transportation and hospitality booking;" +
    //   "Meeting and events booking including the provision of badges and stationary;" +
    //   "Catering and audio-visual services;" +
    //   "Visa application assistance;" +
    //   "Account administration and billing;" +
    //   "Travel client policy compliance and expenses consolidation reporting;" +
    //   "Communication of essential travel information including itineraries and alerts, as well as updates on CWT products and services including customer satisfaction surveys;" +
    //   "Fraud detection and prevention including, where relevant, security and sanctions screenings as prescribed by local applicable laws;" +
    //   "Internal market analysis." +
    //   "The personal data we collect is therefore necessary for the performance of our contract with our corporate clients and without which, we wouldn’t be able to fulfil their travel, hospitality or meetings and events’ needs and requirements." +
    //   "We also collect business contact information for the purposes of direct- marketing (described under Direct-Marketing Communications’ Notice)." +
    //   "What personal information do we collect?" +
    //   "The personal data that we collect for the above purposes may include: name, surname, phone number, email and address, company name, gender, date of birth, form of payment and card numbers, travel preferences where expressed (seat, meal, smoking, special services, etc.), passport and visa details, Passenger Name Record (PNR) as well as next of kin information." +
    //   "CWT also collects contact information from visitors to CWT websites via “Contact Us” online forms, whose fields contain name, surname, phone number, email and address, company name." +
    //   "How do we collect or receive your personal information?" +
    //   "When servicing our corporate clients for their travel and hospitality needs, an electronic ‘Traveler Profile’ is created in CWT’s proprietary tool called CWT Portrait. The personal information is entered through feeds from the corporate clients, and/or by the traveler or authorized travel manager. The profile information can also be received from an online booking tool service provider (OBT) where such provider’s services are requested by our clients." +
    //   "When organizing meetings and events for our corporate clients, CWT processes list of attendee names and attendee information directly received from clients or indirectly through online management providers that may be selected by the client." +
    //   "How do we use your personal data?" +
    //   "We use your personal data to provide our services as described under our commercial agreements." +
    //   "For example, when a reservation is made, CWT processes a PNR containing the personal data that we have received, along with the reservation information that is needed to fulfil the travel request, and,, in some cases with further information required for compliance with local travel regulations such as the Secure Flight Program in the United States and the Advanced Passenger Information System prevalent in several countries such as the United Kingdom and China." +
    //   "How long do we keep your personal data?" +
    //   "We retain your personal data as needed to perform our agreements and provide our services, respond to inquiries from our corporate clients on past travel and other business activities, and to comply with our legal obligations, meet our regulatory requirements such as financial reporting laws, resolve disputes or address claims or litigation." +
    //   "With whom do we share your personal information?" +
    //   "To make travel and hospitality reservations, and in line with travel industry practices, CWT needs to share personal information that is has collected and processed (usually the PNR) with various third-party travel suppliers such as:" +
    //   "Travel industry service providers, i.e., the airlines, hotels, car rental companies;" +
    //   "OBTs;" +
    //   "Safety and security service providers;" +
    //   "General Distribution Systems (GDS), which are computerized network systems that enable travel and hospitality transactions between travel industry service providers and travel management companies like CWT, via aggregating real-time inventory (of number of hotel rooms, flight seats and cars available, etc.);" +
    //   "Computer reservation systems, which are is reservation systems used by the service providers (airlines, hotels, etc.) and which hold the inventory (of number of hotel rooms, flight seats and cars available, etc.);" +
    //   "Card payment companies; and" +
    //   "From time to time in accordance with regulatory requirements, government bodies such as the Department of Homeland Services in the US." +
    //   "Without sharing personal information among such travel industry parties, travel will not be possible." +
    //   "To arrange and manage our clients’ meetings and events, and in line with industry practices, CWT needs to share personal information with various third-party suppliers such as:" +
    //   "Transportation providers (cars, bus and coaches);" +
    //   "Service providers of badges and stationary;" +
    //   "Catering providers (for dietary requirements);" +
    //   "Audio-visual services companies (for presentations and conferences)." +
    //   "Furthermore, CWT uses certain authorized third-party processors (i.e. sub-contractors) for the management of certain administrative and information technology tools and platforms. Such subcontractors may access your personal data but only for, on behalf of, and under the instructions of CWT, and are required to adhere to CWT policies, procedures and processes and comply with applicable privacy laws." +
    //   "We reserve the right to disclose personal data if required to do so by law or in the good faith belief that such action is reasonably necessary to comply with all applicable laws." +
    //   "Is your personal data transferred outside the EU/EEA?" +
    //   "Given the international nature of CWT services, international personal data transfers are made throughout CWT, its affiliates, joint ventures and global partner network to support travel-related services such as airline ticket issuance and technical help-desk requests, as well as management of meetings and events." +
    //   "In circumstances where personal data is transferred to, or centrally stored in, countries in which there is not a similar level of protection as in your country, CWT has, where relevant, taken steps to ensure an adequate level of protection of the transferred data by entering into appropriate inter-company data transfer agreements based on the European Standard Contractual Clauses (also known as EU Model Clauses)." +
    //   "How do we ensure your personal data is safe?" +
    //   "We continuously implement and maintain, appropriate administrative, organizational, technical and physical security measures to ensure confidentiality, integrity, availability and resilience of our systems that process your personal data. These measures are monitored to prevent the accidental or unlawful destruction, alteration or any unauthorized disclosure or access to your personal data, or other unlawful forms of processing." +
    //   "Compliance with this Policy and data protection laws" +
    //   "All entities within the CWT group comply with this Global Privacy Policy and Notice and are committed to complying with all applicable privacy principles and regulations." +
    //   "Direct Marketing Communications’ Notice" +
    //   "When you visit CWT websites and online tools, you can always elect not to provide us with certain information. If you choose not to provide the contact data we request, you can still visit most of CWT’s web pages but you may be unable to access certain services that involve our interaction with you." +
    //   "Where you have received a communication from us on our products and services, it is either because you or your company have requested such communication or because we believe the communication is of interest to you or your company. In some cases, we will have collected your contact details from publicly available sources or through a third-party with whom you or your company have agreed onward sharing. We rely on our legitimate interest to keep you informed of our products and services however if you no longer wish to receive further marketing communications, please click on the ‘unsubscribe’ link at the bottom of the communication and your contact details will no longer be used in that regard." +
    //   "Where we engage third-party sub-contractors to manage our marketing campaigns, they do so on our behalf and under our instructions, and we ensure they commit to complying with our policies and applicable privacy laws and do not use your data for any other purposes than the agreed purposes." +
    //   "As a global travel management service provider, we may transfer your personal data outside of the European Union and European Economic Area. Where we do so to any country not deemed a country of adequate protection by European Commissioners, we make sure such transfers are validated via the recognised European Standard Clauses (also known as ‘European Model Clauses’) so that your rights are safeguarded." +
    //   "CWT shall retain your information only so long as you wish to receive/keep receiving our marketing communications and/or to comply with legal obligations, a Court order or regulatory requirements, and to fulfil your request to ‘unsubscribe’ from marketing communications." +
    //   "Your Rights" +
    //   "You are entitled to several rights in relation to your personal data, such as a right of access to the data CWT collects about you, a right of rectification, a right of deletion, a right to object to the processing of your personal data on legitimate grounds." +
    //   "If you wish to exercise your rights, for example make an access request or a rectification request, please complete our SAR Form." +
    //   "We are at your disposal for any query that you may have (please use our contact email below), any request or issue, including complaints. We will handle such with the level of care that you are entitled to expect from us. However, should you not be satisfied with the way in which we have handled such topics, and depending on the country in which you reside, you may also have a right to lodge a complaint with the supervisory data protection authority." +
    //   "Contact Information" +
    //   "To contact CWT with questions or issues about this Global Privacy Policy and Notice, please contact us at globalprivacy@carlsonwagonlit.com" +
    //   "This policy is subject to change. The changes will be posted from time to time on this website, so please be sure to check the site regularly.");

    //I give my consent.
    driver.waitForTextByXpath('//*[@id="right"]/div[1]/form/div[2]/label', "I give my consent to CWT to send me information on travel products");
    //Continue button
    driver.waitForTextByXpath('//*[@id="right"]/div[1]/form/div[3]/button', "CONTINUE");
    //Help center
    driver.waitForAttributeContainsByXpath('//*[@id="right"]/div[2]/ul/li[1]/a', 'href', 'http://help.mycwt.com/');
    // Terms of use
    driver.waitForAttributeContainsByXpath('//*[@id="right"]/div[2]/ul/li[3]/a', 'href', 'www.carlsonwagonlit.com/content/cwt/global/en/legal/terms-of-use.html');
    //Global privacy
    driver.waitForAttributeContainsByXpath('//*[@id="right"]/div[2]/ul/li[5]/a', 'href', 'www.carlsonwagonlit.com/content/cwt/global/en/legal/global-privacy-policy.html');
    //2018 title
    driver.waitForTextByXpath('//*[@id="right"]/div[2]/ul/li[7]', "©2017 CWT");
  },

  'step 27 - Mark consent checkbox and click on continue button': (driver) => {
    // Checkbox select
    driver.waitAndClickByXpath('//*[@id="right"]/div[1]/form/div[2]/label/input');
    driver.pause(1000);
    // Click on continue button
    driver.waitAndClickByXpath('//*[@id="right"]/div[1]/form/div[3]/button');
    driver.pause(3000);
  },

  'step 28 - Validate login page display as expected': (driver) => {
    driver.waitForUrlToContain(driver.globals.urls.login_url, 20000);
    console.log('----------------------------------------------------------------\nNew user details:\n----------------------------------------------------------------');
    for(let i=0 ; i<newUserDetails.length ; i++) {
      console.log(newUserDetails[i]);
    }
    console.log("----------------------------------------------------------------");
  },
};
