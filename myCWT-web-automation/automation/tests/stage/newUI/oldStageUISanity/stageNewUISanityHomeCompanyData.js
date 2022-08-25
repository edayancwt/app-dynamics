'use strict';

module.exports = {

  '@tags': ['stage', 'sanity', 'portal', 'home', 'company news', 'company resources'],

  before: function (driver) {
    driver.windowMaximize();
  },

  'step 1 - login to portal': (driver) => {
    const login = driver.page.login();
    login.fillLoginDetails(driver.globals.users.portalUser8);
  },

  // 'step 2 - validate openX banner' : (driver) => {
  //   driver.validateUrlResponse('https://ox-d.carlsonwagonlit.com/w/1.0/ai?auid=539477932&c.cid=a%3A96fc4&cs=539477932-a_96fc4-jkjtxky8b51a63a4-d171-3ed2-9683-5174a6e6e1c6&c.ulang=en&cb=1533653897552&c.ccountry=US&c.ocountry=GB&c.dcountry=US&c.carrier=SU&c.class=Y&c.ddate=2025-06-04&c.rdate=2025-06-10');
  // },

  'step 3 - validate home company news items' : (driver) => {
    driver.execute(function() { window.scrollBy(0, 715); }, []);
    driver.waitForTextByCss('[data-testid=company-news-title]', 'Company News');
    driver.waitForTextByCss('[data-testid=company-news-item-title]', 'Welcome to your improved traveler website!');
    driver.waitForTextByCss('[data-testid=company-news-item-date]', 'May 15, 2019');
    // driver.waitForTextByCss('[data-testid=show-more-button]', 'Show more');
    // driver.waitAndClickByCss('[data-testid=show-more-button]');
    // driver.waitForTextByCss('[data-testid=show-more-wrapper]', 'As part of the launch of Global Employee Travel (GET), we are working to align our Buzz Page with myCWT. The GET Buzz Page will be your one stop shop for all things related to Global Employee Travel. Our myCWT site will complement this and provide travelers country specific information. We will categorize the myCWT Company Resources section into two sections.  Doing so will improve the employee experience by allowing users to more easily find information and speed up their booking process:\nMy Global Travel Tools – This category will be focused on tools that are applicable for all countries (ex. CWT Global Website, World Clock, World Weather, Currency Converter, etc.)\nMy Local Travel Tools – Here you will find country specific tools (ex. local Employee Travel Office contact information)\n  These changes will take place over the coming weeks with all markets expected to be updated by March 15.\nIf you have any questions, please post them on the GET Buzz Page.\nhttps://carlsonwagonlit.jiveon.com/docs/DOC-30684\n  Thank you!\nGlobal Employee Travel Team');
    // driver.waitForTextByXpath('//*[@id="shell"]/div[1]/div/div/div[3]/div[1]/div/div/div/button', 'Read less'); //TODO:defect
    // driver.waitAndClickByXpath('//*[@id="shell"]/div[1]/div/div/div[3]/div[1]/div/div/div/button');
  },

  'step 4 - Validate home company resources items' : (driver) => {
    // company resources title
    driver.waitForTextByCss('[data-testid=company-resources-title]', 'Company Resources');
    // check tabs titles
    driver.waitForTextByCss('[data-testid=tabs-button-0]', 'Travel Tools');
    driver.waitForTextByCss('[data-testid=tabs-button-1]', 'New Tab For Test');
    // check first tab links
    driver.waitForAttributeContainsByCss('[data-testid=company-resource-link-11138359]', 'href', 'http://cnn.com');
    // click on the second tab
    driver.waitAndClickByCss('[data-testid=tabs-button-1]');
    // check second tab links
    driver.waitForAttributeContainsByCss('[data-testid=company-resource-link-9230000]', 'href', 'http://www.google.com');
    // driver.waitForAttributeContainsByCss('[data-testid=company-resource-link-9229986]', 'href', 'https://travel.stage-mycwt.com/documents/20133/0/DE368.PNG/e9924310-49e2-47cd-cc16-4d7247d4bb58?t=1501272474069');
    // driver.waitForAttributeContainsByCss('[data-testid=company-resource-link-11096680]', 'href', 'https://travel.stage-mycwt.com/documents/35866/0/Admin-+Tabs+column-tabs+name.png/87b0c3b5-68c8-7ec9-38b8-f5e5e763ddc8?t=1503516590958');
    // driver.waitForAttributeContainsByCss('[data-testid=company-resource-link-12603968]', 'href', 'https://travel.stage-mycwt.com/documents/35866/0/myCWT+Client+Admin+Guide+Part+1+-++Overview+and+Company+News++v1.2+04-Sep-2017.pdf/f44475c8-5e13-3b0a-e977-9de6d69a2669');
    // driver.waitForAttributeContainsByCss('[data-testid=company-resource-link-15480925]', 'href', 'https://travel.stage-mycwt.com/documents/37899/0/Feminist-Ryan-Gosling.jpeg/1651960f-395a-a263-ac0f-57892cd52852?t=1507216687545');
    // click on the first link
    driver.waitAndClickByCss('[data-testid=company-resource-link-9230000]');

    // Switch to the second tab [1]
    driver.switchToTab(1);
    // Validate second tab URL
    driver.waitForUrlToContain('www.google.com', 20000);
    // Close second tab
    driver.closeWindow();
    driver.pause(1000);
    // Switch back to the first tab [0]
    driver.switchToTab(0);
  },
};
