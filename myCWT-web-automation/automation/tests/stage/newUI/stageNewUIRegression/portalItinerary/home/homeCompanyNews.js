'use strict';

module.exports = {

  '@tags': ['home', 'company', 'news'],

  before: function (driver) {
    driver.windowMaximize();
  },

  'step 1 - login to portal': (driver) => {
    const login = driver.page.login();
    login.fillLoginDetails(driver.globals.users.portalUser1);
  },

  'step 2 - Company news title': (driver) => {
    driver.scrollToLocation(0,807);
    driver.waitForTextByXpath(".//*[@id='portlet_companynewsportlet_WAR_cwtportalportlet']/div/div/div/div/div/h2", 'Company News');
  },

  'step 3 - Company news article title': (driver) => {
    driver.scrollToLocation(0,834);
    driver.waitForTextByXpath("//*[@id='portlet_companynewsportlet_WAR_cwtportalportlet']/div/div/div/div/div/div/div[1]/h3", 'Automation - Samsung Galaxy Note 7 Device Not Allowed on Aircraft');
  },

  'step 4 - Company news article publish date': (driver) => {
    driver.waitForTextByXpath("//*[@id='portlet_companynewsportlet_WAR_cwtportalportlet']/div/div/div/div/div/div/div[1]/div[2]", 'JUL 12, 2017');
  },

  'step 5 - Company news collapsed article body': (driver) => {
    driver.waitForTextByXpath("//*[@id='portlet_companynewsportlet_WAR_cwtportalportlet']/div/div/div/div/div/div/div[2]/p", 'Automation - The U.S. Department of Transportation (DOT), with the Federal Aviation Administration (FAA) and the Pipeline and Hazardous Materials Safety Administration (PHMSA), today announced it is issuing an emergency order to ban all Samsung Galaxy Note7 smartphone devices from air transportation in the United States because the affected devices…');
  },

  'step 6 - Company news click on read more button': (driver) => {
    driver.waitAndClickByXpath("//*[@id='read-more-link-752940']");
  },

  'step 7 - Company news expanded article body': (driver) => {
    driver.waitForTextByXpath(".//*[@id='portlet_companynewsportlet_WAR_cwtportalportlet']/div/div/div/div/div/div/div[2]/div[1]", 'Automation - The U.S. Department of Transportation (DOT), with the Federal Aviation Administration (FAA) and the Pipeline and Hazardous Materials Safety Administration (PHMSA), today announced it is issuing an emergency order to ban all Samsung Galaxy Note7 smartphone devices from air transportation in the United States because the affected devices can overheat and pose a safety risk');
    driver.waitForTextByXpath(".//*[@id='portlet_companynewsportlet_WAR_cwtportalportlet']/div/div/div/div/div/div/div[2]/div[2]/p", 'Automation - Individuals who own or possess a Samsung Galaxy Note7 device may not transport the device on their person, in carry-on baggage, or in checked baggage on flights to, from, or within the United States. This prohibition includes all Samsung Galaxy Note7 devices. Additionally, the phones cannot be shipped as air cargo. The ban went into effect on Saturday, October 15, 2016, at noon ET. Many air carriers outside the U.S. are also issuing warnings regarding traveling with the devices. For full details from the US DOT, click here.');
    driver.waitForTextByCss("#read-less-link-752940", 'Read less')
  },

  'step 8 - Company news click on read less button': (driver) => {
    driver.waitAndClickByCss("#read-less-link-752940");
  },

  'step 9 - Company news collapsed article body': (driver) => {
    driver.waitForTextByXpath(".//*[@id='portlet_companynewsportlet_WAR_cwtportalportlet']/div/div/div/div/div/div/div[2]", 'Automation - The U.S. Department of Transportation (DOT), with the Federal Aviation Administration (FAA) and the Pipeline and Hazardous Materials Safety Administration (PHMSA), today announced it is issuing an emergency order to ban all Samsung Galaxy Note7 smartphone devices from air transportation in the United States because the affected devices…');
  },

  'step 10 - Logout' : (driver) => {
    driver.page.logout().logout();
  },

};