/**
 * @param .
 * setValidPassword
 * Set 10 characters valid password in password field.
 */

exports.command = function() {
  const browser = this;
  const randomPassword = 'pass' + Math.random().toString(9).substring(2, 8);

  browser.useCss().waitAndSetValue('#newPassword', randomPassword);
  console.log('\n------------------ Your new password is: ' + randomPassword + ' ------------------\n');

  return randomPassword;
};
