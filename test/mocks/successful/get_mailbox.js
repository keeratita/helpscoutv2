const nock = require('nock');

nock('https://api.helpscout.net/v2')
  .persist()
  .get('/mailboxes/1')
  .reply(200, require('../fixures/mailbox/get_mailbox_success_response.json'), {
    'Content-Type': 'application/json'
  });
