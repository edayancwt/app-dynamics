'use strict';

let NWTools = require('nightwatch-tools');
let randomNumber = NWTools.randomString(4,'1234567890');
const dateFormat = require('dateformat');
const currentDate = dateFormat(new Date(),"mmm d, yyyy");
//-----------------------------------------------------------------------
let resourcesTitle = "This is the title - "+randomNumber;
let resourcesSummary = "This is the summary - "+randomNumber;
let resourcesUrl = "www.google.com";
let resourcesTitleDraft = "This is the draft title - "+randomNumber;
let resourcesSummaryDraft = "This is the draft summary - "+randomNumber;
let resourcesUrlDraft = "www.google.com/"+randomNumber;
//-----------------------------------------------------------------------

module.exports = {

  '@tags': ['admin', 'company', 'resources', 'url'],

  before: function (driver) {
    driver.windowMaximize();
  },

  'step 1 - login': (driver) => {
    const login = driver.page.login();
    login.fillLoginDetails(driver.globals.users.portalUser50.username, driver.globals.users.portalUser50.password);
  },

  'step 2 - Click on Add new company resources url link': (driver) => {
    driver.waitAndClick('#layout_7');
    driver.useXpath();
    driver.waitForElementVisible('//*[@id="portlet_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_GBClLzOgm0aS"]');
    driver.useCss();
    // hover to reveal + button
    driver.moveToElement('#portlet_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_GBClLzOgm0aS',5,5);
    // click + button
    driver.waitAndClick('#_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_GBClLzOgm0aS_hjzj_column2_2_menu');
    // click company resources URL link button
    driver.waitAndClick('#_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_GBClLzOgm0aS_hjzj__column2__2__menu__url_2d_link');
    driver.pause(2000);
    },

  'step 3 - Add new company resources url link': (driver) => {
    // switch to frame
    driver.frame(0);
    driver.waitAndSetValue('#_com_liferay_journal_web_portlet_JournalPortlet_title', resourcesTitle);
    driver.waitAndSetValue('#_com_liferay_journal_web_portlet_JournalPortlet_description', resourcesSummary);
    driver.waitAndSetValue('.lfr-ddm-container input:nth-child(2)', resourcesUrl);
    // click on publish
    driver.waitAndClick('#_com_liferay_journal_web_portlet_JournalPortlet_publishButton');
    },

  'step 4 - Validate new company resources url link added': (driver) => {
    driver.useXpath();
    driver.waitForText('//*[@id="portlet_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_GBClLzOgm0aS"]/div/div/div/div[2]/table/tbody', resourcesTitle);
    driver.waitForText('//*[@id="portlet_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_GBClLzOgm0aS"]/div/div/div/div[2]/table/tbody/tr/td[2]', 'Published');
    driver.waitForText('//*[@id="portlet_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_GBClLzOgm0aS"]/div/div/div/div[2]/table/tbody/tr/td[3]', currentDate);
    driver.waitForText('//*[@id="portlet_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_GBClLzOgm0aS"]/div/div/div/div[2]/table/tbody/tr/td[4]', 'Never Expires');
  },

  'step 5 - Edit company resources url link': (driver) => {
    // click on edit button
    driver.useCss();
    driver.waitAndClick('.lexicon-icon.lexicon-icon-pencil');
    driver.frame(0).frame(0);
    // Add updated data
    driver.waitAndClick('#_com_liferay_journal_web_portlet_JournalPortlet_title');
    driver.waitAndSetValue('#_com_liferay_journal_web_portlet_JournalPortlet_title', ' - Updated');
    driver.waitAndClick('#_com_liferay_journal_web_portlet_JournalPortlet_description');
    driver.waitAndSetValue('#_com_liferay_journal_web_portlet_JournalPortlet_description', ' - Updated');
    // click on never expire checkbox
    driver.waitAndClick('.form-group.form-inline.input-checkbox-wrapper');
    // click on publish
    driver.waitAndClick('#_com_liferay_journal_web_portlet_JournalPortlet_publishButton');
  },

  'step 6 - Validate updated company resources url link': (driver) => {
    driver.useXpath();
    driver.waitForText('//*[@id="portlet_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_GBClLzOgm0aS"]/div/div/div/div[2]/table/tbody', resourcesTitle+' - Updated');
    driver.waitForText('//*[@id="portlet_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_GBClLzOgm0aS"]/div/div/div/div[2]/table/tbody/tr/td[2]', 'Published');
    driver.waitForText('//*[@id="portlet_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_GBClLzOgm0aS"]/div/div/div/div[2]/table/tbody/tr/td[3]', currentDate);
  },

  'step 7 - Add company resources url link to the home view': (driver) => {
    driver.useCss();
    driver.waitAndClick('#heading');
    driver.pause(1000);
    driver.scrollToLocation(0, 1000);
    driver.useXpath();
    // click on the icon to open company resources dialog
    driver.waitAndClick('//*[@id="portlet_companyresourcesportlet_WAR_cwtportalportlet"]/div/div/div/div/div/h2/button/i');
    // click on "resource library" button
    driver.waitAndClick('//*[@id="Resources library li"]/button');
    // add search value
    driver.waitAndSetValue('//*[@id="available"]/table/thead/tr/th[1]/div/input', resourcesTitle);
    // validate results display correct
    driver.waitForText('//*[@id="available"]/table/tbody/tr/td[1]', resourcesTitle+' - Updated');
    // click on add button
    driver.waitAndClick('//*[@id="available"]/table/tbody/tr/td[5]/button');
    // select the first tab
    driver.waitAndClick('//*[@id="popover-context-menu"]/div[2]/ul/li[1]/button');
    // click on save button
    driver.waitAndClick('//*[@id="senna_surface1"]/div[5]/div/div[2]/div/div/div/div/div[2]/button[2]');
    driver.pause(4000);
  },

  'step 8 - Validate company resources url link display in home': (driver) => {
    driver.waitForTextByXpath("//*[@id=\"list-resource\"]/li/a", resourcesTitle+' - Updated');
  },

  'step 9 - Remove company resources from home view': (driver) => {
    // click on the icon to open company resources dialog
    driver.waitAndClick('//*[@id="portlet_companyresourcesportlet_WAR_cwtportalportlet"]/div/div/div/div/div/h2/button/i');
    // Validate resource exist in the list with the option to remove
    driver.waitForText("//*[@id=\"current\"]/table/tbody/div/div[1]/div[2]/table/tbody/div/tr/td[2]", resourcesTitle+' - Updated');
    // "remove" button exist
    driver.waitForText("//*[@id=\"current\"]/table/tbody/div/div[1]/div[2]/table/tbody/div/tr/td[5]/button", 'Remove');
    // click on remove button
    driver.waitAndClick('//*[@id="current"]/table/tbody/div/div[1]/div[2]/table/tbody/div/tr/td[5]/button');
    // click on save button
    driver.waitAndClick('//*[@id="senna_surface1"]/div[5]/div/div[2]/div/div/div/div/div[2]/button[2]');
    // validate company resources removed from home
    driver.waitForElementNotPresent('//*[@id="portlet_companyresourcesportlet_WAR_cwtportalportlet"]/div/div/div/div/div/ul/li[2]/a', 20000);
  },

  'step 10 - Delete company resource': (driver) => {
    driver.pause(2000);
    driver.waitAndClickByCss('#layout_7');
    // click on delete button
    driver.waitAndClickByCss('.icon-monospaced.ajax-request-reload');
    driver.pause(5000);
    // validate company resource removed from the list
    driver.waitForElementNotPresent('//*[@id="portlet_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_GBClLzOgm0aS"]/div/div/div/div[2]/table/tbody/tr/td[1]', 30000);
    // navigate to home
    driver.waitAndClickByCss('#heading');
    // validate company news removed from home
    driver.useXpath();
    driver.waitForElementNotPresent('//*[@id="portlet_companyresourcesportlet_WAR_cwtportalportlet"]/div/div/div/div/div/ul/li[2]/a', 30000);
  },

  'step 11 - Logout' : (driver) => {
    driver.page.logout().logout();
  },

//   ---------------------------------- Draft item ----------------------------------

  'step 12 - login': (driver) => {
    const login = driver.page.login();
    login.fillLoginDetails(driver.globals.users.portalUser50.username, driver.globals.users.portalUser50.password);
  },

  'step 13 - Click on Add new company resources': (driver) => {
    driver.useCss();
    driver.waitAndClick('#layout_7');
    driver.useXpath();
    driver.waitForElementVisible('//*[@id="portlet_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_GBClLzOgm0aS"]');
    driver.useCss();
    // hover to reveal + button
    driver.moveToElement('#portlet_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_GBClLzOgm0aS',5,5);
    // click + button
    driver.waitAndClick('#_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_GBClLzOgm0aS_hjzj_column2_2_menu');
    // click company resources url link button
    driver.waitAndClick('#_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_GBClLzOgm0aS_hjzj__column2__2__menu__url_2d_link');
    driver.pause(2000);
  },

  'step 14 - Add new company resources draft url link': (driver) => {
    // switch to frame
    driver.frame(0);
    driver.waitAndSetValue('#_com_liferay_journal_web_portlet_JournalPortlet_title', resourcesTitleDraft);
    driver.waitAndSetValue('#_com_liferay_journal_web_portlet_JournalPortlet_description', resourcesSummaryDraft);
    driver.waitAndSetValue('.lfr-ddm-container input:nth-child(2)', resourcesUrlDraft);
    // click on publish
    driver.waitAndClick('#_com_liferay_journal_web_portlet_JournalPortlet_saveButton');
  },

  'step 15 - Validate new company resources draft url link added': (driver) => {
    driver.useXpath();
    driver.waitForText('//*[@id="portlet_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_GBClLzOgm0aS"]/div/div/div/div[2]/table/tbody', resourcesTitleDraft);
    driver.waitForText('//*[@id="portlet_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_GBClLzOgm0aS"]/div/div/div/div[2]/table/tbody/tr/td[2]', 'Draft');
    driver.waitForText('//*[@id="portlet_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_GBClLzOgm0aS"]/div/div/div/div[2]/table/tbody/tr/td[3]', currentDate);
    driver.waitForText('//*[@id="portlet_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_GBClLzOgm0aS"]/div/div/div/div[2]/table/tbody/tr/td[4]', 'Never Expires');
  },

  'step 16 - Edit company resources draft url link': (driver) => {
    // click on edit button
    driver.useCss();
    driver.waitAndClick('.lexicon-icon.lexicon-icon-pencil');
    driver.frame(0).frame(0);
    // Add updated data
    driver.waitAndClick('#_com_liferay_journal_web_portlet_JournalPortlet_title');
    driver.waitAndSetValue('#_com_liferay_journal_web_portlet_JournalPortlet_title', ' - Updated');
    driver.waitAndClick('#_com_liferay_journal_web_portlet_JournalPortlet_description');
    driver.waitAndSetValue('#_com_liferay_journal_web_portlet_JournalPortlet_description', ' - Updated');
    // click on never expire checkbox
    driver.waitAndClick('.form-group.form-inline.input-checkbox-wrapper');
    // click on publish
    driver.waitAndClick('#_com_liferay_journal_web_portlet_JournalPortlet_saveButton');
  },

  'step 17 - Validate updated company resources draft url link': (driver) => {
    driver.useXpath();
    driver.waitForText('//*[@id="portlet_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_GBClLzOgm0aS"]/div/div/div/div[2]/table/tbody', resourcesTitleDraft+' - Updated');
    driver.waitForText('//*[@id="portlet_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_GBClLzOgm0aS"]/div/div/div/div[2]/table/tbody/tr/td[2]', 'Draft');
    driver.waitForText('//*[@id="portlet_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_GBClLzOgm0aS"]/div/div/div/div[2]/table/tbody/tr/td[3]', currentDate);
  },

  'step 18 - Validate company resources draft item not available for adding': (driver) => {
    driver.useCss();
    driver.waitAndClick('#heading');
    driver.scrollToLocation(0, 1000);
    driver.useXpath();
    // click on the icon to open company resources dialog
    driver.waitAndClick('//*[@id="portlet_companyresourcesportlet_WAR_cwtportalportlet"]/div/div/div/div/div/h2/button/i');
    // click on "resources library" button
    driver.waitAndClick('//*[@id="Resources library li"]/button');
    // add search value
    driver.waitAndSetValue('//*[@id="available"]/table/thead/tr/th[1]/div/input', resourcesTitleDraft+' - Updated');
    // validate no results display
    driver.waitForElementNotPresent('//*[@id="available"]/table/tbody/tr/td[1]');
    // switch back to "Current company resources" button
    driver.waitAndClick('//*[@id="Current company resources li"]/button');
    // click on cancel button
    driver.waitAndClick('//*[@id="senna_surface1"]/div[5]/div/div[2]/div/div/div/div/div[2]/button[1]');
  },

  //   ---------------------------------- Switch draft item to published ----------------------------------

  'step 19 - Save draft as published': (driver) => {
    driver.refresh();
    driver.useCss();
    driver.waitAndClick('#layout_7');
    // click on edit button
    driver.waitAndClick('.lexicon-icon.lexicon-icon-pencil');
    driver.frame(0).frame(0);
    // Add text in title field
    driver.waitAndClick('#_com_liferay_journal_web_portlet_JournalPortlet_title');
    driver.waitAndSetValue('#_com_liferay_journal_web_portlet_JournalPortlet_title', ' - Now item is published');
    // click on publish
    driver.waitAndClick('#_com_liferay_journal_web_portlet_JournalPortlet_publishButton');
  },

  'step 20 - Validate updated company resources url link': (driver) => {
    driver.useXpath();
    driver.waitForText('//*[@id="portlet_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_GBClLzOgm0aS"]/div/div/div/div[2]/table/tbody', resourcesTitleDraft+' - Updated - Now item is published');
    driver.waitForText('//*[@id="portlet_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_GBClLzOgm0aS"]/div/div/div/div[2]/table/tbody/tr/td[2]', 'Published');
    driver.waitForText('//*[@id="portlet_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_GBClLzOgm0aS"]/div/div/div/div[2]/table/tbody/tr/td[3]', currentDate);
  },

  'step 21 - Validate published updated company resource display in the adding list': (driver) => {
    driver.useCss();
    driver.waitAndClick('#heading');
    driver.scrollToLocation(0, 1000);
    driver.useXpath();
    // click on the icon to open company news dialog
    driver.waitAndClick('//*[@id="portlet_companyresourcesportlet_WAR_cwtportalportlet"]/div/div/div/div/div/h2/button/i');
    // click on "resource library" button
    driver.waitAndClick('//*[@id="Resources library li"]/button');
    // add search value
    driver.waitAndSetValue('//*[@id="available"]/table/thead/tr/th[1]/div/input', resourcesTitleDraft+' - Updated - Now item is published');
    // validate results display correct
    driver.waitForText('//*[@id="available"]/table/tbody/tr/td[1]', resourcesTitleDraft+' - Updated - Now item is published');
    // switch back to "current company resources" tab
    driver.waitAndClick('//*[@id="Current company resources li"]/button');
    // click on cancel button
    driver.waitAndClick('//*[@id="senna_surface1"]/div[5]/div/div[2]/div/div/div/div/div[2]/button[1]');
  },

  'step 22 - Delete company resource item': (driver) => {
    driver.useCss();
    driver.refresh();
    driver.waitAndClick('#layout_7');
    // click on delete button
    driver.useXpath();
    driver.waitAndClick('//*[@id="portlet_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_GBClLzOgm0aS"]/div/div/div/div[2]/table/tbody/tr/td[6]/span');
    driver.pause(5000);
    // validate company resource item removed from the list
    driver.waitForElementNotPresent('//*[@id="portlet_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_GBClLzOgm0aS"]/div/div/div/div[2]/table/tbody/tr/td[1]', 30000);
  },

  'step 23 - Logout' : (driver) => {
    driver.page.logout().logout();
  },

};