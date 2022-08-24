/**
 * @param {String} selector
 * stop
 */

exports.command = function() {
  const browser = this;

  browser
    .pause(9000000);

  return this;
};
