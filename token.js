// Mailbox API 2.0
// https://developer.helpscout.com/mailbox-api/overview/authentication/

const fetch = require('node-fetch');

const endpoint = 'https://api.helpscout.net/v2/oauth2/token';
const { buildRequest } = require('./utils');

/**
 * Token
 * @param {*} settings
 */
function Token(settings) {
  const { client_id, client_secret } = settings;
  if (!(this instanceof Token)) return new Token(settings);

  this.client_id = client_id;
  this.client_secret = client_secret;
  this.IsVerified = () => {
    if (!client_id) throw new Error('Token requires a client id.');
    if (!client_secret) throw new Error('Token requires a client secret.');

    return true;
  };
}

/**
 * Authentication
 * @param {*} options
 */
Token.prototype.authenticate = function authenticate(options) {
  this.IsVerified();

  const { client_id, client_secret } = this;

  options = {
    grant_type: 'client_credentials',
    client_id,
    client_secret,
    ...options
  };

  return new Promise((resolve, reject) => {
    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(options)
    })
      .then(val => {
        return val.json();
      })
      .then(resp => {
        if (resp.status && resp.status !== 200) {
          return reject(new Error(resp.message));
        }
        return resolve(resp);
      })
      .catch(err => {
        return reject(err);
      });
  });
};

/**
 * Refresh access token
 * @param {*} options
 */
Token.prototype.refreshAccessToken = function refreshAccessToken(options = {}) {
  this.IsVerified();

  const { client_id, client_secret } = this;

  options = {
    grant_type: 'refresh_token',
    client_id,
    client_secret,
    refresh_token: null,
    ...options
  };

  return new Promise((resolve, reject) => {
    if (!options.refresh_token) return reject(new Error('Refresh access token is required.'));

    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(options)
    })
      .then(resp => {
        if (resp.status !== 200) {
          return reject(resp);
        }
        return resp.json();
      })
      .then(resp => {
        if (resp.status && resp.status !== 200) {
          return reject(new Error(resp.message));
        }
        return resolve(resp);
      })
      .catch(err => {
        return reject(err);
      });
  });
};

module.exports = settings => new Token(settings);
