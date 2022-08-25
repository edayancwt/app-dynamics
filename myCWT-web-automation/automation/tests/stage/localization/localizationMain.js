module.exports = {

  "LocalizationMainTest": function (driver, jsonFile) {


//------------------------------------- Footer -------------------------------------

  // driver.waitForText('[data-id=footer-copyright-text]', jsonFile['footer.copyright']);
  driver.waitForText('#footer-technical-assistance-link', jsonFile["footer.technical.assistance"]);
  // driver.waitForText('[data-id=footer-center-text]', jsonFile["footer.protecting.your.data"]);
  // driver.waitForText('[data-id=footer-end-text]', jsonFile["footer.protection.policy"]);
  // driver.waitForText('#footer-terms-of-use', jsonFile["footer.terms.of.use"]);

//------------------------------------- Company news -------------------------------------

  driver.waitForText('.company-news__read-more', jsonFile["portal.company.news.read.more"]);
  driver.waitAndClick('.company-news__read-more');
  driver.waitForText('.company-news__read-less', jsonFile["portal.company.news.read.less"]);
    driver.waitAndClick('.company-news__read-less');

  },
};