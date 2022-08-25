'use strict';

let serverTokens = {refreshToken: null, accessToken: null};
let currentPassword;
let VALID = true;
let SHOULD_FAIL = true;

/**
 * Change user password is revoking the user tokens
 *
 */
module.exports = {

  '@tags': ['accountSettings', 'revokeTokens'],

  'STEP 1 - Get user access and refresh tokens': function (browser) {
    let userName = browser.globals.users.portalUserRevokeTokenTest.username;
    let password = browser.globals.users.portalUserRevokeTokenTest.password;

    browser
      .getUserServerTokens(userName, password, function (accessToken, refreshToken) {
        serverTokens = { accessToken, refreshToken };
      })
      .perform(function () {/*use perform so the serverTokens variable would have values*/
        // validate the tokens are valid
        browser
          .validateAccessToken(serverTokens.accessToken, VALID)
          .refreshToken(serverTokens.refreshToken, !SHOULD_FAIL, function (refreshToken) {
            // In case the refresh token was rolled out with a new value we update the current value
            if (refreshToken) {
              serverTokens.refreshToken = refreshToken;
            }
          });
      });
  },

  'STEP2 - Login and navigate to account setup': function (browser) {
    let userName = browser.globals.users.portalUserRevokeTokenTest.username;
    let password = browser.globals.users.portalUserRevokeTokenTest.password;

    // Login to portal
    const login = browser.page.login();
    login.fillLoginDetails(userName, password);

    browser.page.header().goToAccountSettingsPage();
  },
  'STEP3 - Change user password': function (browser) {
    const password = browser.globals.users.portalUserRevokeTokenTest.password;
    const accountSettings = browser.page.accountSettings();

    let newPassword = password + '1';
    accountSettings
      .changePassword(password, newPassword)
      .api.perform(function () {
      currentPassword = newPassword;
    });

  },

  'STEP4 - Validate tokens are revoked': function (browser) {
    browser
      .validateAccessToken(serverTokens.accessToken, !VALID)
      .refreshToken(serverTokens.refreshToken, SHOULD_FAIL, function (refreshToken) {
        // In case the refresh token was rolled out with a new value we update the current value
        if (refreshToken) {
          serverTokens.refreshToken = refreshToken;
        }
      });
  },

  /**
   * After each test we need to make sure that the fixture use has its original password.
   * @param browser
   */
  after: function (browser) {
    let password = browser.globals.users.portalUserRevokeTokenTest.password;

    const accountSettings = browser.page.accountSettings();
    // we need to reset the password only if it was change from its original value.
    // in case it wasnt change, no need for test cleanup and the password is ready to be used in the next test
    if (currentPassword) {
      accountSettings.changePassword(currentPassword, password + '2');
      accountSettings.changePassword(password + '2', password + '3');
      accountSettings.changePassword(password + '3', password + '4');
      accountSettings.changePassword(password + '4', password + '5');
      accountSettings.changePassword(password + '5', password + '6');
      accountSettings.changePassword(password + '6', browser.globals.users.portalUserRevokeTokenTest.password);
    }
  }
};