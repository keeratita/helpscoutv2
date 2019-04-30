// Mailbox API 2.0
// https://developer.helpscout.com/mailbox-api/endpoints/mailboxes/list/

const endpoint = 'https://api.helpscout.net/v2/mailboxes';
const { buildRequest } = require('./utils');

/**
 * Mailbox
 * @param {*} settings
 */
function Mailbox(settings) {
  const { oauth_token } = settings;

  if (!(this instanceof Mailbox)) return new Mailbox(settings);
  this.oauth_token = oauth_token;
  this.IsVerified = function IsVerified(options = { oauth_token }) {
    if (!options.oauth_token) throw new Error('Mailbox requires an oauth_token.');
    return true;
  };
}

/**
 * Get list of mailboxes, and get a mailbox
 * @param {*} id
 * @param {*} options
 */
Mailbox.prototype.get = function get(id = '', options = {}) {
  const { oauth_token } = this;

  if (!Number.isNaN(id) && typeof id === 'number') {
    // silence is golden
  } else if (!Number.isNaN(id) && id != null) {
    options = id;
    id = '';
  }

  options = {
    oauth_token,
    ...options
  };

  this.IsVerified(options);

  const api_endpoint = typeof id === 'number' ? `${endpoint}/${id}` : endpoint;
  return buildRequest(api_endpoint, 'GET', null, options);
};

/**
 * Get folders
 * @param {*} id
 * @param {*} options
 */
Mailbox.prototype.getFolders = function getFolders(id = null, options = {}) {
  const { oauth_token } = this;

  options = {
    oauth_token,
    ...options
  };

  this.IsVerified(options);

  if (!Number.isNaN(id) && typeof id !== 'number') {
    throw new Error('Mailbox id is required.');
  }

  const api_endpoint = `${endpoint}/${id}/folders`;
  return buildRequest(api_endpoint, 'GET', null, options);
};

/**
 * Get custom fields
 * @param {*} id
 * @param {*} options
 */
Mailbox.prototype.getCustomFields = function getCustomFields(id = null, options = {}) {
  const { oauth_token } = this;

  options = {
    oauth_token,
    ...options
  };

  this.IsVerified(options);

  if (!Number.isNaN(id) && typeof id !== 'number') {
    throw new Error('Mailbox id is required.');
  }

  const api_endpoint = `${endpoint}/${id}/fields`;
  return buildRequest(api_endpoint, 'GET', null, options);
};

module.exports = settings => new Mailbox(settings);
