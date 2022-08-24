/**
 * @param {Validate URL response} URL
 * validateUrlResponse
 * This will open any URL and validate its response (200) - will use for validating images display on screen
 */

const axios = require('axios');

exports.command = function (url) {
  const browser = this;

  browser.url(url);

      axios.get(url)
        .then(function (response) {
          browser.assert.equal(response.status, 200);
          // console.log(response);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });

  return this;
};