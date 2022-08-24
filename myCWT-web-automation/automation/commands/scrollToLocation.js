/**
 * @param {scrollToLocation} selector
 * Scroll on the screen using number of pixels.
 */

exports.command = function(verticalValue, horizontalValue) {
  const browser = this;

browser
  .execute(function() { window.scrollBy(verticalValue, horizontalValue); }, []);

  return this;
};
