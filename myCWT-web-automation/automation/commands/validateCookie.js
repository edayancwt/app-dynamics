/**
 * @param validateCookie name, cookie value
 * validate cookie exist and its content
 */

exports.command = function(cookieName, cookieValue) {
  const browser = this;

  browser.getCookie(cookieName, function callback(result) {
    this.assert.equal(result.value, cookieValue);
    this.assert.equal(result.name, cookieName);
  });

  return this;
};
