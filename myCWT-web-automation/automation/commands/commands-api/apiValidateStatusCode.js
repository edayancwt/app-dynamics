 /**
   * apiValidateStatusCode
   */

 const request = require('request');

  exports.command = function (url) {
    const browser = this;

      request.get(url, function (error, response) {
        browser.assert.equal(response.statusCode, 200);

        // console.log(response);
      });
    return this;
  };