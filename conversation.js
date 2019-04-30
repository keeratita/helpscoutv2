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

const defaultReplyParams = {
  customer: null,
  text: null,
  attachments: []
};

/**
 * Conversation
 * @param {*} settings
 */
function Conversation(settings) {
  const { oauth_token } = settings;
  if (!(this instanceof Conversation)) return new Conversation(settings);
  this.oauth_token = oauth_token;
  this.IsVerified = function IsVerified(options = { oauth_token }) {
    if (!options.oauth_token) throw new Error('Conversation requires an oauth_token.');
    return true;
  };
}

/**
 * Get a list of conversations
 * @param {*} params
 * @param {*} options
 */
Conversation.prototype.list = function list(params = defaultListParams, options = {}) {
  const { oauth_token } = this;

  options = {
    oauth_token,
    ...options
  };

  this.IsVerified(options);

  return buildRequest(endpoint, 'GET', params, options);
};

/**
 * Get a conversation
 * @param {*} id
 * @param {*} options
 */
Conversation.prototype.get = function get(id, options = {}) {
  const { oauth_token } = this;

  options = {
    oauth_token,
    expectedStatus: [200, 301],
    ...options
  };

  this.IsVerified(options);

  if (!id) throw new Error('Conversation id is required.');
  if (typeof id !== 'number') throw new Error('Conversation id should be a number.');

  return buildRequest(`${endpoint}/${id}`, 'GET', null, options);
};

/**
 * Create a conversation
 * @param {*} params
 * @param {*} options
 */
Conversation.prototype.create = function create(params = defaultCreateParams, options = {}) {
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

/**
 * Update a conversation
 * @param {*} params
 * @param {*} options
 */
Conversation.prototype.update = function update(id, params = {}, options = {}) {
  const { oauth_token } = this;

  options = {
    oauth_token,
    expectedStatus: 204,
    ...options
  };

  this.IsVerified(options);

  if (!id) throw new Error('Conversation id is required.');
  if (typeof id !== 'number') throw new Error('Conversation id should be a number.');

  return buildRequest(`${endpoint}/${id}`, 'PATCH', params, options)
    .then(data => {
      return true;
    })
    .catch(err => {
      throw err;
    });
};

/**
 * Reply a conversation
 * @param {*} params
 * @param {*} options
 */
Conversation.prototype.reply = function reply(id, params = defaultReplyParams, options = {}) {
  const { oauth_token } = this;

  options = {
    oauth_token,
    expectedStatus: 201,
    ...options
  };

  this.IsVerified(options);

  params = {
    ...defaultReplyParams,
    ...params
  };

  return buildRequest(`${endpoint}/${id}/reply`, 'POST', params, options)
    .then(data => {
      // const { headers } = data;
      return true;
    })
    .catch(err => {
      throw err;
    });
};

module.exports = settings => new Conversation(settings);
