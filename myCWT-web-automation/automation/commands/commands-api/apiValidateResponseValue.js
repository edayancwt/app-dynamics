 /**
   * apiValidateResponseValue
   * Add any response field to assert its value (e.g. response.headers.server)
   * Enable console.log(response) to see all options
   */

 const request = require('request');

  exports.command = function (url) {
    const browser = this;

      request.get(url, function (error, response) {
        browser.assert.equal(response.headers.server, 'AmazonS3');

        // console.log(myString);
      });
    return this;
  };