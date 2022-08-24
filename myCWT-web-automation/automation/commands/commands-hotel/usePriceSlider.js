/**
 * @param {number} selector
 * Catch slide element/input and drag it
 * The slider is 296px width - so minPrice and maxPrice shouldn't be more than 296
 */

exports.command = function(minPrice, maxPrice) {
  const browser = this;

  // use slider (start - min price)
  browser
    .moveToElement('//*[@id="sticky-panel"]/div[1]/div[2]/div[3]/div/div/div/div/span[1]/div', 10, 10)
    .pause(300)
    .mouseButtonDown(0)
    .pause(300)
    .moveToElement('//*[@id="sticky-panel"]/div[1]/div[2]/div[3]/div/div/div/div/span[1]/div', minPrice, 30)
    .pause(300)
    .mouseButtonUp(0);
  // use slider (end - max price)
  browser
    .moveToElement('//*[@id="sticky-panel"]/div[1]/div[2]/div[3]/div/div/div/div/span[2]/div', 10, 10)
    .pause(300)
    .mouseButtonDown(0)
    .pause(300)
    .moveToElement('//*[@id="sticky-panel"]/div[1]/div[2]/div[3]/div/div/div/div/span[2]/div', maxPrice * -1, 30)
    .pause(300)
    .mouseButtonUp(0)
    .pause(300);
};
