'use strict';

let NWTools = require('nightwatch-tools');
let randomNumber = NWTools.randomString(4,'1234567890');
//-----------------------------------------------------------------------
let randomBasicDocTitle = "This is the basic doc title - "+randomNumber;
let randomBasicDescription = "This is the basic doc description - "+randomNumber;
//-----------------------------------------------------------------------

module.exports = {

  '@tags': ['admin', 'document', 'media', 'basic'],

  before: function (driver) {
    driver.windowMaximize();
  },

  'step 1 - login': (driver) => {
    const login = driver.page.login();
    login.fillLoginDetails(driver.globals.users.portalUser51);
  },

  'step 2 - Click on add new basic document': (driver) => {
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
    driver.waitAndClickByCss('.yui3-widget-bd li:nth-child(2)');
    driver.scrollToLocation(0, 1000);
  },

  'step 3 - Add new basic document': (driver) => {
    driver.pause(5000);
    driver.waitAndSetValueByCss('#_com_liferay_document_library_web_portlet_DLPortlet_INSTANCE_hcDpYCsTDMk3_title', randomBasicDocTitle);
    driver.waitAndSetValueByCss('#_com_liferay_document_library_web_portlet_DLPortlet_INSTANCE_hcDpYCsTDMk3_description', randomBasicDescription);
    // click on publish
    driver.waitAndClickByCss('#_com_liferay_document_library_web_portlet_DLPortlet_INSTANCE_hcDpYCsTDMk3_publishButton');
    driver.pause(2000);
    driver.scrollToLocation(0, 1000);
  },

  'step 4 - Search for the new basic document': (driver) => {
    // search for non-existing document
    driver.waitAndSetValueByCss('#_com_liferay_document_library_web_portlet_DLPortlet_INSTANCE_hcDpYCsTDMk3_keywords', 'blabla');
    // click on search button
    driver.waitAndClickByCss('[data-qa-id=searchButton]');
    driver.scrollToLocation(0, 1000);
    driver.pause(4000);
    // validate search title
    driver.waitForTextByXpath('//*[@id="_com_liferay_document_library_web_portlet_DLPortlet_INSTANCE_hcDpYCsTDMk3_searchInfo"]/div/span[1]', 'Searched for blabla everywhere.');
    // validate results
    // driver.waitForTextByXpath('//*[@id="_com_liferay_document_library_web_portlet_DLPortlet_INSTANCE_hcDpYCsTDMk3_entriesContainer"]/div', 'No documents were found that matched the keywords: blabla.');
    // click on clear search button
    driver.waitAndClickByCss('.icon-remove');
    driver.pause(2000);

    // search for the existing document
    driver.waitAndSetValueByCss('#_com_liferay_document_library_web_portlet_DLPortlet_INSTANCE_hcDpYCsTDMk3_keywords', 'This is the basic');
    driver.scrollToLocation(0, 1000);
    // click on search button
    driver.waitAndClickByCss('[data-qa-id=searchButton]');
    driver.pause(2000);
    // validate search title
    driver.waitForTextByXpath('//*[@id="_com_liferay_document_library_web_portlet_DLPortlet_INSTANCE_hcDpYCsTDMk3_searchInfo"]/div/span[1]', 'Searched for This is the basic everywhere.');
    // validate results
    driver.waitForTextByXpath('//*[@id="_com_liferay_document_library_web_portlet_DLPortlet_INSTANCE_hcDpYCsTDMk3_entriesContainer"]/div/a/div/span[1]', randomBasicDocTitle);
    driver.waitForTextByXpath('//*[@id="_com_liferay_document_library_web_portlet_DLPortlet_INSTANCE_hcDpYCsTDMk3_entriesContainer"]/div/a/div/span[2]', randomBasicDescription);
    },

  'step 5 - Edit basic document': (driver) => {
    driver.refresh();
    driver.scrollToLocation(0, 1000);
    // search for the existing document
    driver.waitAndSetValueByCss('#_com_liferay_document_library_web_portlet_DLPortlet_INSTANCE_hcDpYCsTDMk3_keywords', 'This is the basic');
    // click on search button
    driver.waitAndClickByCss('[data-qa-id=searchButton]');
    // click on the document title
    driver.pause(2000);
    driver.waitAndClickByXpath('//*[@id="_com_liferay_document_library_web_portlet_DLPortlet_INSTANCE_hcDpYCsTDMk3_entriesContainer"]/div/a/div/span[1]');
    driver.scrollToLocation(0, 1000);
    // click on edit button
    driver.pause(2000);
    driver.waitAndClickByXpath('//*[@id="_com_liferay_document_library_web_portlet_DLPortlet_INSTANCE_hcDpYCsTDMk3_infoPanelId"]/div[2]/a[2]');
    driver.pause(2000);
    driver.scrollToLocation(0, 1000);
    driver.waitAndSetValueByCss('#_com_liferay_document_library_web_portlet_DLPortlet_INSTANCE_hcDpYCsTDMk3_title', ' - updated');
    driver.waitAndSetValueByCss('#_com_liferay_document_library_web_portlet_DLPortlet_INSTANCE_hcDpYCsTDMk3_description', ' - updated');
    // click on publish
    driver.waitAndClickByCss('#_com_liferay_document_library_web_portlet_DLPortlet_INSTANCE_hcDpYCsTDMk3_publishButton');
    driver.pause(4000);
    driver.waitAndClickByCss('#layout_7');
    driver.pause(2000);
  },

  'step 6 - Validate updated document': (driver) => {
    driver.scrollToLocation(0, 1000);
    // search for the existing document
    driver.waitAndSetValueByCss('#_com_liferay_document_library_web_portlet_DLPortlet_INSTANCE_hcDpYCsTDMk3_keywords', 'This is the basic');
    // click on search button
    driver.waitAndClickByCss('[data-qa-id=searchButton]');
    driver.scrollToLocation(0, 1000);
    driver.pause(2000);
    // validate search title
    driver.waitForTextByXpath('//*[@id="_com_liferay_document_library_web_portlet_DLPortlet_INSTANCE_hcDpYCsTDMk3_searchInfo"]/div/span[1]', 'Searched for This is the basic everywhere.');
    // validate results
    driver.waitForTextByXpath('//*[@id="_com_liferay_document_library_web_portlet_DLPortlet_INSTANCE_hcDpYCsTDMk3_entriesContainer"]/div/a/div/span[1]', randomBasicDocTitle+' - updated');
    driver.waitForTextByXpath('//*[@id="_com_liferay_document_library_web_portlet_DLPortlet_INSTANCE_hcDpYCsTDMk3_entriesContainer"]/div/a/div/span[2]', randomBasicDescription+' - updated');
  },

  'step 7 - Delete document': (driver) => {
    // click on the document title
    driver.pause(2000);
    driver.waitAndClickByXpath('//*[@id="_com_liferay_document_library_web_portlet_DLPortlet_INSTANCE_hcDpYCsTDMk3_entriesContainer"]/div/a/div/span[1]');
    driver.scrollToLocation(0, 1000);
    // click on move to recycle bin button
    driver.pause(2000);
    driver.waitAndClickByXpath('//*[@id="_com_liferay_document_library_web_portlet_DLPortlet_INSTANCE_hcDpYCsTDMk3_infoPanelId"]/div[2]/a[6]');
    // validate deleted document message
    driver.waitForTextByCss('#_com_liferay_document_library_web_portlet_DLPortlet_INSTANCE_hcDpYCsTDMk3_undoForm', 'The Document '+randomBasicDocTitle+' - updated was moved to the Recycle Bin.\nUNDO');
    // driver.waitForTextByCss('.lfr-btn-label', 'Undo');
  },
};