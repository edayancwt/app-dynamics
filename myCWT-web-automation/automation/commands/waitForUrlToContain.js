/**
 * waitForUrlToContain
 */

exports.command = function (url) {
  const browser = this;

  browser
    .expect.url().to.contain(url);

  return this;
};