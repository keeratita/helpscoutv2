// Mailbox API 2.0
// https://developer.helpscout.com/mailbox-api/endpoints/conversations/list/
const endpoint = 'https://api.helpscout.net/v2/conversations';
const { buildRequest } = require('./utils');

const defaultListParams = {
  mailbox: null,
  folder: null,
  status: 'active',
  tag: null,
  assigned_to: null,
  modifiedSince: null,
  number: null,
  sortField: null,
  sortOrder: 'desc',
  query: null,
  page: null
};

const defaultCreateParams = {
  subject: null,
  autoReply: false,
  imported: false,
  assignTo: null,
  mailboxId: null,
  status: 'active',
  createdAt: new Date(),
  customer: null,
  type: null,
  threads: [],
  tags: [],
  fields: [],
  user: null
};

/**
 * Thread
 * @param {*} settings
 */
function Thread(settings) {
  const { oauth_token } = settings;
  if (!(this instanceof Thread)) return new Thread(settings);
  this.oauth_token = oauth_token;
  this.IsVerified = function IsVerified(options = { oauth_token }) {
    if (!options.oauth_token) throw new Error('Thread requires an oauth_token.');
    return true;
  };
}

/**
 * Create a thread
 * @param {*} params
 * @param {*} options
 */
Thread.prototype.create = function create(params = defaultCreateParams, options = {}) {
  const { oauth_token } = this;

  options = {
    oauth_token,
    expectedStatus: 201,
    ...options
  };

  this.IsVerified(options);

  params = {
    ...defaultCreateParams,
    ...params
  };

  return buildRequest(endpoint, 'POST', params, options)
    .then(data => {
      const { headers } = data;
      return {
        id: headers.get('resource-id'),
        location: headers.get('location')
      };
    })
    .catch(err => {
      throw err;
    });
};

module.exports = settings => new Thread(settings);
