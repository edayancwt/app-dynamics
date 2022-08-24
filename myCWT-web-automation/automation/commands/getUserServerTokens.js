'use strict';

const util = require('util');
const events = require('events');
const pfClient = require('cwt-pf-client');
const httpClient = require('cwt-http-client');
const log = require('cwt-logger');

function GetUserServerTokens() {
    events.EventEmitter.call(this);
}

util.inherits(GetUserServerTokens, events.EventEmitter);

/**
 * This commands get a user access and refresh token.
 * @param username
 * @param password
 * @param cb - that will be called with access and refresh tokens
 * @return {this} - used for nightwatch api
 */
GetUserServerTokens.prototype.command = function(username, password, cb) {
    const self = this;

    let ctx = {
      webRequest: httpClient,
      log:log
    };

    pfClient.login({ ctx, username, password }).then((result)=> {
      console.log(`Getting Tokens for ${username} result:`, JSON.stringify(result)); /*log stacktrace*/
      cb(result.body.access_token, result.body.refresh_token);

      self.emit('complete');
    }).catch(err => {
      console.error('Test error:', err); /*log stacktrace*/
      self.api.assert.fail(err.toString());
      self.emit('complete');
    });

    return this;
};

module.exports = GetUserServerTokens;