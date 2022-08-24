'use strict';

/**
 * This command is responsible for getting the authorisation code from the url and acquire a token with it.
 * This commands also validate the token
 */
const util = require('util');
const events = require('events');
const pfClient = require('cwt-pf-client');
const httpClient = require('cwt-http-client');
const log = require('cwt-logger');

function RefreshToken() {
  events.EventEmitter.call(this);
}

util.inherits(RefreshToken, events.EventEmitter);

/**
 * This commands validate a user access token
 * @param refreshToken - The refresh token tp be refreshed
 * @param shouldFail - a boolean indicating if the user refresh token operation should fail.
 * @param cb - callback to return a new refreh token in case the operation was success and the refresh token was
 * rolled out to a new value
 * @return {this} - used for nightwatch api
 */
RefreshToken.prototype.command = function (refreshToken, shouldFail, cb) {
  const self = this;

  let ctx = {
    webRequest: httpClient,
    log: log
  };

  pfClient.refreshToken({ctx, refreshToken}).then((result) => {
    console.log(`Operation of refreshing the token ${refreshToken} resulted:`, JSON.stringify(result));
    /*log stacktrace*/
    self.api.assert.equal(shouldFail, false, 'Refresh token operation succeeded  with result:' + JSON.stringify(result));
    cb(result.body.refresh_token);
    self.emit('complete');
  }).catch(err => {
    self.api.assert.equal(shouldFail, true, 'Refresh token operation failed  with resulted:' + JSON.stringify(err));
    self.emit('complete');
  });

  return this;
};

module.exports = RefreshToken;