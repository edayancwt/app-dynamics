'use strict';

let NWTools = require('nightwatch-tools');
let randomNumber = NWTools.randomString(4,'1234567890');
const dateFormat = require('dateformat');
const currentDate = dateFormat(new Date(),"mmm d, yyyy");
//-----------------------------------------------------------------------
let resourcesTitle = "This is the title - "+randomNumber;
let resourcesSummary = "This is the summary - "+randomNumber;
let resourcesTitleDraft = "This is the draft title - "+randomNumber;
let resourcesSummaryDraft = "This is the draft summary - "+randomNumber;
//-----------------------------------------------------------------------

module.exports = {

  '@tags': ['admin', 'company', 'resources', 'document'],

  before: function (driver) {
    driver.windowMaximize();
  },

  'step 1 - login': (driver) => {
    const login = driver.page.login();
    login.fillLoginDetails(driver.globals.users.portalUser50);
  },

  'step 2 - Click on Add new company resources': (driver) => {
    driver.waitAndClick('#layout_7');
    driver.useXpath();
    driver.waitForElementVisible('//*[@id="portlet_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_GBClLzOgm0aS"]');
    driver.useCss();
    // hover to reveal + button
    driver.moveToElement('#portlet_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_GBClLzOgm0aS',5,5);
    // click + button
    driver.waitAndClick('#_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_GBClLzOgm0aS_hjzj_column2_2_menu');
    // click company resources document link button
    driver.waitAndClick('#_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_GBClLzOgm0aS_hjzj__column2__2__menu__document_2d_link');
    driver.pause(2000);
    },

  'step 3 - Add new company resources': (driver) => {
    // switch to frame
    driver.frame(0);
    driver.pause(1000);
    driver.waitAndSetValue('#_com_liferay_journal_web_portlet_JournalPortlet_title', resourcesTitle);
    driver.waitAndSetValue('#_com_liferay_journal_web_portlet_JournalPortlet_description', resourcesSummary);
    // click on select button
    driver.waitAndClick('.lfr-btn-label');
    driver.pause(3000);
    // switch to frame
    driver.frame(null).frame('_com_liferay_journal_web_portlet_JournalPortlet_selectDocumentLibrary_iframe_');
    // click on the file preview
    driver.useXpath();
    driver.waitAndClick('//*[@id="_com_liferay_item_selector_web_portlet_ItemSelectorPortlet_repositoryEntriesSearchContainerSearchContainer"]/ul/li[1]/div/div/div/div');
    // click on add button
    driver.useCss();
    driver.pause(3000);
    // switch to frame
    driver.frame(null);
    // click on add button
    driver.waitAndClick('#addButton');
    // switch to frame
    driver.frame(0);
    // click on publish
    driver.waitAndClick('#_com_liferay_journal_web_portlet_JournalPortlet_publishButton');
    },

  'step 4 - Validate new company resources added': (driver) => {
    driver.useXpath();
    driver.waitForText('//*[@id="portlet_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_GBClLzOgm0aS"]/div/div/div/div[2]/table/tbody/tr/td[1]', resourcesTitle);
    driver.waitForText('//*[@id="portlet_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_GBClLzOgm0aS"]/div/div/div/div[2]/table/tbody/tr/td[2]', 'Published');
    driver.waitForText('//*[@id="portlet_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_GBClLzOgm0aS"]/div/div/div/div[2]/table/tbody/tr/td[3]', currentDate);
    driver.waitForText('//*[@id="portlet_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_GBClLzOgm0aS"]/div/div/div/div[2]/table/tbody/tr/td[4]', 'Never Expires');
    },

  'step 5 - Edit company resources': (driver) => {
    // click on edit button
    driver.useCss();
    driver.waitAndClick('.lexicon-icon.lexicon-icon-pencil');
    // switch to frame
    driver.frame(0).frame(0);
    // Add updated data
    driver.waitAndClick('#_com_liferay_journal_web_portlet_JournalPortlet_title');
    driver.waitAndSetValue('#_com_liferay_journal_web_portlet_JournalPortlet_title', ' - Updated');
    driver.waitAndClick('#_com_liferay_journal_web_portlet_JournalPortlet_description');
    driver.waitAndSetValue('#_com_liferay_journal_web_portlet_JournalPortlet_description', ' - Updated');
    // click on publish
    driver.waitAndClick('#_com_liferay_journal_web_portlet_JournalPortlet_publishButton');
  },

  'step 6 - Validate updated company resources': (driver) => {
    driver.useXpath();
    driver.waitForText('//*[@id="portlet_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_GBClLzOgm0aS"]/div/div/div/div[2]/table/tbody/tr/td[1]', resourcesTitle+' - Updated');
    driver.waitForText('//*[@id="portlet_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_GBClLzOgm0aS"]/div/div/div/div[2]/table/tbody/tr/td[2]', 'Published');
    driver.waitForText('//*[@id="portlet_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_GBClLzOgm0aS"]/div/div/div/div[2]/table/tbody/tr/td[3]', currentDate);
  },

  'step 7 - Add company resources to the home view': (driver) => {
    driver.useCss();
    driver.waitAndClick('#heading');
    driver.scrollToLocation(0, 1000);
    driver.useXpath();
    // click on the icon to open company resources dialog
    driver.waitAndClick('//*[@id="portlet_companyresourcesportlet_WAR_cwtportalportlet"]/div/div/div/div/div/h2/button/i');
    // click on "resources library" button
    driver.waitAndClick('//*[@id="Resources library li"]/button');
    // add search value
    driver.waitAndSetValue('//*[@id="available"]/table/thead/tr/th[1]/div/input', resourcesTitle);
    // validate results display correct
    driver.waitForText('//*[@id="available"]/table/tbody/tr/td[1]', resourcesTitle+' - Updated');
    // click on add button
    driver.waitAndClick('//*[@id="available"]/table/tbody/tr/td[5]/button');
    // click on the first tab
    driver.waitAndClick('//*[@id="popover-context-menu"]/div[2]/ul/li[1]/button');
    // click on save button
    driver.waitAndClick('//*[@id="senna_surface1"]/div[5]/div/div[2]/div/div/div/div/div[2]/button[2]');
  },

  'step 8 - Validate company resource display in home': (driver) => {
    driver.waitForText('//*[@id="portlet_companyresourcesportlet_WAR_cwtportalportlet"]/div/div/div/div/div/ul/li[2]/a', resourcesTitle+' - Updated');
    driver.waitAndClick('//*[@id="portlet_companyresourcesportlet_WAR_cwtportalportlet"]/div/div/div/div/div/ul/li[2]/a');
    driver.switchToTab(1);
    driver.waitForUrlToContain('https://travel.stage-mycwt.com/documents/23019363',20000);
    driver.closeWindow();
    driver.switchToTab(0);
  },

  'step 9 - Remove company resource from home view': (driver) => {
    // click on the icon to open company resource dialog
    driver.waitAndClick('//*[@id="portlet_companyresourcesportlet_WAR_cwtportalportlet"]/div/div/div/div/div/h2/button/i');
    // Validate resource exist in the list with the option to remove
    driver.waitForText('//*[@id="current"]/table/tbody/div/div[1]/div[2]/table/tbody/div/tr[2]/td[2]', resourcesTitle+' - Updated');
    // "remove" button exist
    driver.waitForText('//*[@id="current"]/table/tbody/div/div[1]/div[2]/table/tbody/div/tr/td[5]/button', 'Remove');
    // click on remove button
    driver.waitAndClick('//*[@id="current"]/table/tbody/div/div[1]/div[2]/table/tbody/div/tr/td[5]/button');
    // click on save button
    driver.waitAndClick('//*[@id="senna_surface1"]/div[3]/div/div[2]/div/div/div/div/div[2]/button[2]');
    // validate company resource removed from home
    driver.waitForElementNotPresent('//*[@id="portlet_companyresourcesportlet_WAR_cwtportalportlet"]/div/div/div/div/div/ul/li[2]/a', 20000);
  },

  'step 10 - Delete company resource': (driver) => {
    driver.useCss();
    driver.refresh();
    driver.waitAndClick('#layout_7');
    // click on delete button
    driver.useXpath();
    driver.waitAndClick('//*[@id="portlet_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_GBClLzOgm0aS"]/div/div/div/div[2]/table/tbody/tr/td[6]/span');
    driver.pause(5000);
    // validate company resource removed from the list
    driver.waitForElementNotPresent('//*[@id="portlet_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_GBClLzOgm0aS"]/div/div/div/div[2]/table/tbody/tr/td[1]', 30000);
  },

  'step 11 - Logout' : (driver) => {
    driver.page.logout().logout();
  },

//   ---------------------------------- Draft item ----------------------------------

  'step 12 - login': (driver) => {
    const login = driver.page.login();
    login.fillLoginDetails(driver.globals.users.portalUser50);
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
    // click company resources document link button
    driver.waitAndClick('#_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_GBClLzOgm0aS_hjzj__column2__2__menu__document_2d_link');
    driver.pause(2000);
  },

  'step 14 - Add new company resources draft item': (driver) => {
    // switch to frame
    driver.frame(0);
    driver.pause(1000);
    driver.waitAndSetValue('#_com_liferay_journal_web_portlet_JournalPortlet_title', resourcesTitleDraft);
    driver.waitAndSetValue('#_com_liferay_journal_web_portlet_JournalPortlet_description', resourcesSummaryDraft);
    // click on select button
    driver.waitAndClick('.lfr-btn-label');
    driver.pause(3000);
    // switch to frame
    driver.frame(null).frame('_com_liferay_journal_web_portlet_JournalPortlet_selectDocumentLibrary_iframe_');
    // click on the file preview
    driver.useXpath();
    driver.waitAndClick('//*[@id="_com_liferay_item_selector_web_portlet_ItemSelectorPortlet_repositoryEntriesSearchContainerSearchContainer"]/ul/li[1]/div/div/div/div');
    // click on add button
    driver.useCss();
    driver.pause(3000);
    // switch to frame
    driver.frame(null);
    // click on add button
    driver.waitAndClick('#addButton');
    // switch to frame
    driver.frame(0);
    // click on publish
    driver.waitAndClick('#_com_liferay_journal_web_portlet_JournalPortlet_saveButton');
  },

  'step 15 - Validate new company resources draft item added': (driver) => {
    driver.useXpath();
    driver.waitForText('//*[@id="portlet_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_GBClLzOgm0aS"]/div/div/div/div[2]/table/tbody/tr/td[1]', resourcesTitleDraft);
    driver.waitForText('//*[@id="portlet_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_GBClLzOgm0aS"]/div/div/div/div[2]/table/tbody/tr/td[2]', 'Draft');
    driver.waitForText('//*[@id="portlet_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_GBClLzOgm0aS"]/div/div/div/div[2]/table/tbody/tr/td[3]', currentDate);
    driver.waitForText('//*[@id="portlet_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_GBClLzOgm0aS"]/div/div/div/div[2]/table/tbody/tr/td[4]', 'Never Expires');
  },

  'step 16 - Edit company resources draft item': (driver) => {
    // click on edit button
    driver.useCss();
    driver.waitAndClick('.lexicon-icon.lexicon-icon-pencil');
    // switch to frame
    driver.frame(0).frame(0);
    // Add updated data
    driver.waitAndClick('#_com_liferay_journal_web_portlet_JournalPortlet_title');
    driver.waitAndSetValue('#_com_liferay_journal_web_portlet_JournalPortlet_title', ' - Updated');
    driver.waitAndClick('#_com_liferay_journal_web_portlet_JournalPortlet_description');
    driver.waitAndSetValue('#_com_liferay_journal_web_portlet_JournalPortlet_description', ' - Updated');
    // click on publish
    driver.waitAndClick('#_com_liferay_journal_web_portlet_JournalPortlet_saveButton');
  },

  'step 17 - Validate new company resources draft item updated': (driver) => {
    driver.useXpath();
    driver.waitForText('//*[@id="portlet_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_GBClLzOgm0aS"]/div/div/div/div[2]/table/tbody/tr/td[1]', resourcesTitleDraft+' - Updated');
    driver.waitForText('//*[@id="portlet_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_GBClLzOgm0aS"]/div/div/div/div[2]/table/tbody/tr/td[2]', 'Draft');
    driver.waitForText('//*[@id="portlet_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_GBClLzOgm0aS"]/div/div/div/div[2]/table/tbody/tr/td[3]', currentDate);
    driver.waitForText('//*[@id="portlet_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_GBClLzOgm0aS"]/div/div/div/div[2]/table/tbody/tr/td[4]', 'Never Expires');
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
    driver.waitAndSetValue('//*[@id="available"]/table/thead/tr/th[1]/div/input', resourcesTitle+' - Updated');
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

  'step 22 - Delete company resource draft item': (driver) => {
    driver.useCss();
    driver.refresh();
    driver.waitAndClick('#layout_7');
    // click on delete button
    driver.useXpath();
    driver.waitAndClick('//*[@id="portlet_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_GBClLzOgm0aS"]/div/div/div/div[2]/table/tbody/tr/td[6]/span');
    driver.pause(5000);
    // validate company resource draft item removed from the list
    driver.waitForElementNotPresent('//*[@id="portlet_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_GBClLzOgm0aS"]/div/div/div/div[2]/table/tbody/tr/td[1]', 30000);
  },

  'step 23 - Logout' : (driver) => {
    driver.page.logout().logout();
  },

};