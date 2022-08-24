'use strict';

/**
 * This command is responsible for getting the authorisation code from the url and acquire a token with it.
 * This commands also validate the token
 */
const util = require('util');
const events = require('events');
// const pfClient = require('cwt-pf-client');
// const httpClient = require('cwt-http-client');

function ValidatetUserServerTokens() {
    events.EventEmitter.call(this);
}

util.inherits(ValidatetUserServerTokens, events.EventEmitter);

/**
 * This commands validate a user access token
 * @param accessToken - The access token to be validated
 * @param isTokenValid - a boolean indicating if the user toke should be valid
 * @return {this} - used for nightwatch api
 */
ValidatetUserServerTokens.prototype.command = function(accessToken, isTokenValid) {
    const self = this;

    let ctx = {
      webRequest: httpClient,
    };

    pfClient.validate({ ctx, accessToken }).then((result)=> {
      console.log(`validated access token ${accessToken} result:`, JSON.stringify(result)); /*log stacktrace*/
      self.api.assert.equal(isTokenValid, true, 'Access token succeeded with response:' + JSON.stringify(result));

      self.emit('complete');
    }).catch(err => {
      self.api.assert.equal(isTokenValid, false, 'Access token failed with response:' + JSON.stringify(err));
      self.emit('complete');
    });

    return this;
};

module.exports = ValidatetUserServerTokens;