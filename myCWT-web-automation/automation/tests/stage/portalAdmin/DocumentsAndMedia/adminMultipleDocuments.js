'use strict';

module.exports = {

  '@tags': ['admin', 'document', 'media', 'basic'],

  before: function (driver) {
    driver.windowMaximize();
  },

  'step 1 - login': (driver) => {
    const login = driver.page.login();
    login.fillLoginDetails(driver.globals.users.portalUser51);
  },

  'step 2 - Click on add new multiple documents': (driver) => {
    driver.waitAndClickByCss('#layout_7');
    driver.useXpath();
    driver.waitForElementVisible('//*[@id="portlet_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_GBClLzOgm0aS"]');
    driver.useCss();
    // hover to reveal + button
    driver.moveToElement('#portlet_com_liferay_document_library_web_portlet_DLPortlet_INSTANCE_hcDpYCsTDMk3',5,5);
    // click + button
    driver.waitAndClickByCss('#portlet-title-menu_com_liferay_document_library_web_portlet_DLPortlet_INSTANCE_hcDpYCsTDMk3_1');
    // click on basic document link button
    driver.pause(1000);
    driver.waitAndClickByCss('.yui3-widget-bd li:nth-child(1)');
    driver.scrollToLocation(0, 1000);
  },

  'step 3 - Validate multiple documents dialog': (driver) => {
    // validate title
    driver.waitForTextByXpath('//*[@id="portlet_com_liferay_document_library_web_portlet_DLPortlet_INSTANCE_hcDpYCsTDMk3"]/div/div/div/div/div[1]/h3/span', 'Add Multiple Documents');
    // drop files title
    driver.waitForTextByXpath('//*[@id="_com_liferay_document_library_web_portlet_DLPortlet_INSTANCE_hcDpYCsTDMk3_uploaderContent"]/h4', 'Drop Files Here to Upload');
    driver.waitForTextByXpath('//*[@id="_com_liferay_document_library_web_portlet_DLPortlet_INSTANCE_hcDpYCsTDMk3_uploaderContent"]/h4/span', 'or');
    driver.waitForTextByCss('#_com_liferay_document_library_web_portlet_DLPortlet_INSTANCE_hcDpYCsTDMk3_selectFilesButton', 'Select Files');
  },

  'step 4 - Click on back button': (driver) => {
    // Click on it
    driver.waitAndClickByCss('#_com_liferay_document_library_web_portlet_DLPortlet_INSTANCE_hcDpYCsTDMk3_TabsBack');
    // validate drop files title don't display
    driver.useXpath();
    driver.waitForElementNotPresent('//*[@id="_com_liferay_document_library_web_portlet_DLPortlet_INSTANCE_hcDpYCsTDMk3_uploaderContent"]/h4', 20000);
  },

};