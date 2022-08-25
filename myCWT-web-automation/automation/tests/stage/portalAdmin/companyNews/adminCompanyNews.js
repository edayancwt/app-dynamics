'use strict';

let NWTools = require('nightwatch-tools');
let randomNumber = NWTools.randomString(4,'1234567890');
const dateFormat = require('dateformat');
const currentDate = dateFormat(new Date(),"mmm d, yyyy");
//-----------------------------------------------------------------------
let newsTitle = "This is the title - "+randomNumber;
let newsSummary = "This is the summary - "+randomNumber;
let newsContent = "This is the content - "+randomNumber;
let newsTitleDraft = "This is the draft title - "+randomNumber;
let newsSummaryDraft = "This is the draft summary - "+randomNumber;
let newsContentDraft = "This is the draft content - "+randomNumber;
//-----------------------------------------------------------------------
module.exports = {

  '@tags': ['admin', 'company', 'news'],

  before: function (driver) {
    driver.windowMaximize();
  },

  'step 1 - login': (driver) => {
    const login = driver.page.login();
    login.fillLoginDetails(driver.globals.users.portalUser49);
  },

  'step 2 - Click on Add new company news': (driver) => {
    driver.waitAndClick('#layout_7');
    driver.useXpath();
    driver.waitForElementVisible('//*[@id="portlet_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_MHV1mN9nSdKH"]/div/h2');
    driver.useCss();
    // hover to reveal + button
    driver.moveToElement('#portlet_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_MHV1mN9nSdKH',5,5);
    // click + button
    driver.waitAndClick('#_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_MHV1mN9nSdKH_tiym_column2_1_menu');
    // click company news button
    driver.waitAndClick('#_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_MHV1mN9nSdKH_tiym__column2__1__menu__company_2d_news__1');
    driver.pause(2000);
    },

  'step 3 - Add new company news': (driver) => {
    driver.frame(0);
    driver.pause(3000);
    driver.waitAndSetValue('#_com_liferay_journal_web_portlet_JournalPortlet_title', newsTitle);
    driver.waitAndSetValue('#_com_liferay_journal_web_portlet_JournalPortlet_description', newsSummary);
    driver.waitAndSetValue('.alloy-editor.alloy-editor-placeholder.form-control.cke_editable.cke_editable_inline.cke_contents_ltr.ae-editable.cke_show_borders.ae-placeholder', newsContent);
    // click on publish
    driver.waitAndClick('#_com_liferay_journal_web_portlet_JournalPortlet_publishButton');
    },

  'step 4 - Validate new company news added': (driver) => {
    driver.useXpath();
    driver.waitForText('//*[@id="portlet_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_MHV1mN9nSdKH"]/div/div/div/div[2]/table/tbody/tr/td[1]', newsTitle);
    driver.waitForText('//*[@id="portlet_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_MHV1mN9nSdKH"]/div/div/div/div[2]/table/tbody/tr/td[2]', 'Published');
    driver.waitForText('//*[@id="portlet_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_MHV1mN9nSdKH"]/div/div/div/div[2]/table/tbody/tr/td[3]', currentDate);
    driver.waitForText('//*[@id="portlet_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_MHV1mN9nSdKH"]/div/div/div/div[2]/table/tbody/tr/td[4]', 'Never Expires');
    },

  'step 5 - Edit company news': (driver) => {
    // click on edit button
    driver.useCss();
    driver.waitAndClick('.lexicon-icon.lexicon-icon-pencil');
    driver.frame(0).frame(0);
    // Add updated data
    driver.waitAndClick('#_com_liferay_journal_web_portlet_JournalPortlet_title');
    driver.waitAndSetValue('#_com_liferay_journal_web_portlet_JournalPortlet_title', ' - Updated');
    driver.waitAndSetValue('#_com_liferay_journal_web_portlet_JournalPortlet_description', ' - Updated');
    driver.waitAndClick('.alloy-editor.alloy-editor-placeholder.form-control.cke_editable.cke_editable_inline.cke_contents_ltr.ae-editable.cke_show_borders');
    driver.waitAndSetValue('.alloy-editor.alloy-editor-placeholder.form-control.cke_editable.cke_editable_inline.cke_contents_ltr.ae-editable.cke_show_borders', ' - Updated');   //TODO: find the right selector for "content" field(ID is dynamic)
    // click on publish
    driver.waitAndClick('#_com_liferay_journal_web_portlet_JournalPortlet_publishButton');
  },

  'step 6 - Validate updated company news': (driver) => {
    driver.useXpath();
    driver.waitForText('//*[@id="portlet_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_MHV1mN9nSdKH"]/div/div/div/div[2]/table/tbody/tr/td[1]', newsTitle+' - Updated');
    driver.waitForText('//*[@id="portlet_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_MHV1mN9nSdKH"]/div/div/div/div[2]/table/tbody/tr/td[2]', 'Published');
    driver.waitForText('//*[@id="portlet_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_MHV1mN9nSdKH"]/div/div/div/div[2]/table/tbody/tr/td[3]', currentDate);
    driver.waitForText('//*[@id="portlet_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_MHV1mN9nSdKH"]/div/div/div/div[2]/table/tbody/tr/td[4]', 'Never Expires');
  },

  'step 7 - Add company news to the home view': (driver) => {
    driver.useCss();
    driver.waitAndClick('.header-logo__custom--wrapper');
    driver.scrollToLocation(0, 1000);
    driver.useXpath();
    // click on the icon to open company news dialog
    driver.waitAndClick('//*[@id="portlet_companynewsportlet_WAR_cwtportalportlet"]/div/div/div/div/div/h2/button/i');
    // click on "news library" button
    driver.waitAndClick('//*[@id="News library li"]/button');
    // add search value
    driver.waitAndSetValue('//*[@id="News library"]/table/thead/tr/th[1]/div/input', newsTitle);
    // validate results display correct
    driver.waitForText('//*[@id="News library"]/table/tbody/div/tr/td[1]', newsTitle+' - Updated');
    // click on add button
    driver.waitAndClick('//*[@id="News library"]/table/tbody/div/tr/td[5]/button');
    // click on save button
    driver.useCss();
    driver.waitAndClick('.btn.btn-primary.btn-md.btn-w-150');
  },

  'step 8 - Validate company news display in home': (driver) => {
    driver.scrollToLocation(0,2000);
    // click on read more button
    driver.pause(1000);
    driver.waitAndClick('.company-news__read-more');
    driver.useXpath();
    driver.waitForText("//*[@id=\"portlet_companynewsportlet_WAR_cwtportalportlet\"]/div/div/div/div/div/h2", 'Company News');
    driver.waitForText("//*[@id=\"portlet_companynewsportlet_WAR_cwtportalportlet\"]/div/div/div/div/div/div/div[1]/h3", newsTitle+' - Updated');
    driver.waitForText("//*[@id=\"portlet_companynewsportlet_WAR_cwtportalportlet\"]/div/div/div/div/div/div/div[2]/div[1]", newsSummary+' - Updated');
    driver.waitForText("//*[@id=\"portlet_companynewsportlet_WAR_cwtportalportlet\"]/div/div/div/div/div/div/div[2]/div[2]/p", newsContent+' - Updated');
  },

  'step 9 - Remove company news from home view': (driver) => {
    // click on the icon to open company news dialog
    driver.waitAndClick('//*[@id="portlet_companynewsportlet_WAR_cwtportalportlet"]/div/div/div/div/div/h2/button/i');
    // Validate article exist in the list with the option to remove
    driver.waitForText("//*[@id=\"Current company news\"]/table/tbody/div/tr/td[2]", newsTitle+' - Updated');
    // "remove" button exist
    driver.waitForText("//*[@id=\"Current company news\"]/table/tbody/div/tr/td[6]/button", 'Remove');
    // click on remove button
    driver.waitAndClick('//*[@id="Current company news"]/table/tbody/div/tr/td[6]/button');
    // click on save button
    driver.useCss();
    driver.waitAndClick('.btn.btn-primary.btn-md.btn-w-150');
    // validate company news removed from home
    driver.useXpath();
    driver.waitForElementNotPresent('//*[@id="portlet_companynewsportlet_WAR_cwtportalportlet"]/div/div/div/div/div/div/div[1]/div[2]', 20000);
  },

  'step 10 - Delete company news': (driver) => {
    driver.useCss();
    driver.waitAndClick('#layout_7');
    // click on delete button
    driver.useXpath();
    driver.waitAndClick('//*[@id="portlet_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_MHV1mN9nSdKH"]/div/div/div/div[2]/table/tbody/tr/td[6]/span');
    driver.pause(5000);
    // validate company news removed from the list
    driver.useCss();
    driver.waitForElementNotPresent('.journal_article', 30000);
    // navigate to home
    driver.waitAndClick('.header-logo__custom--wrapper');
    // validate company news removed from home
    driver.useXpath();
    driver.waitForElementNotPresent('//*[@id="portlet_companynewsportlet_WAR_cwtportalportlet"]/div/div/div/div/div/h2', 30000);
  },

  'step 11 - Logout' : (driver) => {
    driver.page.logout().logout();
  },

//   ---------------------------------- Draft item ----------------------------------

  'step 12 - login': (driver) => {
    const login = driver.page.login();
    login.fillLoginDetails(driver.globals.users.portalUser49);
  },

  'step 13 - Click on Add new company news': (driver) => {
    driver.useCss();
    driver.waitAndClick('#layout_7');
    driver.useXpath();
    driver.waitForElementVisible('//*[@id="portlet_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_MHV1mN9nSdKH"]/div/h2');
    // hover to reveal + button
    driver.useCss();
    driver.moveToElement('#portlet_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_MHV1mN9nSdKH',5,5);
    // click + button
    driver.waitAndClick('#_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_MHV1mN9nSdKH_tiym_column2_1_menu');
    // click company news button
    driver.waitAndClick('#_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_MHV1mN9nSdKH_tiym__column2__1__menu__company_2d_news__1');
    driver.pause(2000);
  },

  'step 14 - Add new company news draft item': (driver) => {
    driver.frame(0);
    driver.pause(3000);
    driver.waitAndSetValue('#_com_liferay_journal_web_portlet_JournalPortlet_title', newsTitleDraft);
    driver.waitAndSetValue('#_com_liferay_journal_web_portlet_JournalPortlet_description', newsSummaryDraft);
    driver.waitAndSetValue('.alloy-editor.alloy-editor-placeholder.form-control.cke_editable.cke_editable_inline.cke_contents_ltr.ae-editable.cke_show_borders.ae-placeholder', newsContentDraft);
    // click on save as draft button
    driver.waitAndClick('#_com_liferay_journal_web_portlet_JournalPortlet_saveButton');
  },

  'step 15 - Validate new company news draft item added': (driver) => {
    driver.useXpath();
    driver.waitForText('//*[@id="portlet_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_MHV1mN9nSdKH"]/div/div/div/div[2]/table/tbody/tr/td[1]', newsTitleDraft);
    driver.waitForText('//*[@id="portlet_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_MHV1mN9nSdKH"]/div/div/div/div[2]/table/tbody/tr/td[2]', 'Draft');
    driver.waitForText('//*[@id="portlet_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_MHV1mN9nSdKH"]/div/div/div/div[2]/table/tbody/tr/td[3]', currentDate);
    driver.waitForText('//*[@id="portlet_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_MHV1mN9nSdKH"]/div/div/div/div[2]/table/tbody/tr/td[4]', 'Never Expires');
  },

  'step 16 - Edit company news draft item': (driver) => {
    // click on edit button
    driver.useCss();
    driver.waitAndClick('.lexicon-icon.lexicon-icon-pencil');
    driver.pause(2000);
    driver.frame('_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_MHV1mN9nSdKH_editAsset_iframe_');
    // Add updated data
    driver.waitAndClick('#_com_liferay_journal_web_portlet_JournalPortlet_title');
    driver.waitAndSetValue('#_com_liferay_journal_web_portlet_JournalPortlet_title', ' - Updated');
    driver.waitAndSetValue('#_com_liferay_journal_web_portlet_JournalPortlet_description', ' - Updated');
    driver.waitAndClick('.alloy-editor.alloy-editor-placeholder.form-control.cke_editable.cke_editable_inline.cke_contents_ltr.ae-editable.cke_show_borders');
    driver.waitAndSetValue('.alloy-editor.alloy-editor-placeholder.form-control.cke_editable.cke_editable_inline.cke_contents_ltr.ae-editable.cke_show_borders', ' - Updated');
    // click on save as draft button
    driver.waitAndClick('#_com_liferay_journal_web_portlet_JournalPortlet_saveButton');
  },

  'step 17 - Validate updated company news draft item': (driver) => {
    driver.useXpath();
    driver.waitForText('//*[@id="portlet_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_MHV1mN9nSdKH"]/div/div/div/div[2]/table/tbody/tr/td[1]', newsTitleDraft+' - Updated');
    driver.waitForText('//*[@id="portlet_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_MHV1mN9nSdKH"]/div/div/div/div[2]/table/tbody/tr/td[2]', 'Draft');
    driver.waitForText('//*[@id="portlet_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_MHV1mN9nSdKH"]/div/div/div/div[2]/table/tbody/tr/td[3]', currentDate);
    driver.waitForText('//*[@id="portlet_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_MHV1mN9nSdKH"]/div/div/div/div[2]/table/tbody/tr/td[4]', 'Never Expires');
  },

  'step 18 - Validate company news draft item dont display in company news publish list': (driver) => {
    driver.useCss();
    driver.waitAndClick('.header-logo__custom--wrapper');
    driver.scrollToLocation(0, 1000);
    driver.useXpath();
    // click on the icon to open company news dialog
    driver.waitAndClick('//*[@id="portlet_companynewsportlet_WAR_cwtportalportlet"]/div/div/div/div/div/h2/button/i');
    // click on "news library" button
    driver.waitAndClick('//*[@id="News library li"]/button');
    // add search value
    driver.waitAndSetValue('//*[@id="News library"]/table/thead/tr/th[1]/div/input', newsTitleDraft);
    // validate no results display
    driver.waitForElementNotPresent('//*[@id="News library"]/table/tbody/div/tr/td[1]', 30000);
    driver.waitForText('//*[@id="News library"]/table/tbody/div', 'No news to display');
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

  'step 20 - Validate published updated company news': (driver) => {
    driver.useXpath();
    driver.waitForText('//*[@id="portlet_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_MHV1mN9nSdKH"]/div/div/div/div[2]/table/tbody/tr/td[1]', newsTitleDraft+' - Updated - Now item is published');
    driver.waitForText('//*[@id="portlet_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_MHV1mN9nSdKH"]/div/div/div/div[2]/table/tbody/tr/td[2]', 'Published');
    driver.waitForText('//*[@id="portlet_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_MHV1mN9nSdKH"]/div/div/div/div[2]/table/tbody/tr/td[3]', currentDate);
    driver.waitForText('//*[@id="portlet_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_MHV1mN9nSdKH"]/div/div/div/div[2]/table/tbody/tr/td[4]', 'Never Expires');
  },

  'step 21 - Validate published updated company news display in the adding list': (driver) => {
    driver.useCss();
    driver.waitAndClick('.header-logo__custom--wrapper');
    driver.scrollToLocation(0, 1000);
    driver.useXpath();
    // click on the icon to open company news dialog
    driver.waitAndClick('//*[@id="portlet_companynewsportlet_WAR_cwtportalportlet"]/div/div/div/div/div/h2/button/i');
    // click on "news library" button
    driver.waitAndClick('//*[@id="News library li"]/button');
    // add search value
    driver.waitAndSetValue('//*[@id="News library"]/table/thead/tr/th[1]/div/input', newsTitleDraft+' - Updated - Now item is published');
    // validate results display correct
    driver.waitForText('//*[@id="News library"]/table/tbody/div/tr/td[1]', newsTitleDraft+' - Updated - Now item is published');
    // switch back to "current company news" tab
    driver.waitAndClick('//*[@id="Current company news li"]/button');
    // click on cancel button
    driver.waitAndClick('//*[@id="senna_surface1"]/div[5]/div/div[2]/div/div/div/div/div[2]/button[1]');
  },

  'step 22 - Delete published company news': (driver) => {
    driver.refresh();
    driver.useCss();
    driver.waitAndClick('#layout_7');
    // click on delete button
    driver.useXpath();
    driver.waitAndClick('//*[@id="portlet_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_MHV1mN9nSdKH"]/div/div/div/div[2]/table/tbody/tr/td[6]/span');
    driver.pause(5000);
    // validate published updated company news removed from the list
    driver.waitForElementNotPresent('//*[@id="portlet_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_MHV1mN9nSdKH"]/div/div/div/div[2]/table/tbody/tr/td[1]', 30000);
  },

  'step 23 - Logout' : (driver) => {
    driver.page.logout().logout();
  },

};