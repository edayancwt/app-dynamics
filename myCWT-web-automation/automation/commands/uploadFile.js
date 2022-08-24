/**
 * uploadFIle
 */

exports.command = function(filePath) {
  const browser = this;

  browser

    .waitAndSetValueByCss('input[type="file"]', require('path').resolve(filePath));

  return this;
};
