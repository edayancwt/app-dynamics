/**
 * waitUntilClickable
 */

exports.command = function(selector) {
  this.perform((client, done) => {
    this.waitForElementPresent(selector, result => {
      if (result.value === false) {
        done();
      } else {
        const myInterval = setInterval(() => {
          this.getAttribute(selector, 'disabled', function(result) {
            const isDisabled = result.value === 'true';
            if (!isDisabled) {
              this.assert.ok(true, 'Check if button is not disabled');
              clearInterval(myInterval);
              done();
            }
          });
        }, 1000);
      }
    });
  });
};
