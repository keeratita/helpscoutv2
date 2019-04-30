const errors = require('./errors');

/**
 * settings: { client_id, client_secret, oauth_token }
 */
module.exports = settings => {
  function resourceName(name) {
    const path = ['./', name].join('');
    return require(`${path}`)(settings);
  }

  return {
    token: resourceName('token'),
    mailbox: resourceName('mailbox'),
    conversation: resourceName('conversation'),
    errors
  };
};
