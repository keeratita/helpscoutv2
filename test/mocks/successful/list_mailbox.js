const nock = require('nock');
nock('https://api.helpscout.net/v2')
  .persist()
  .get('/mailboxes')
  .reply(200, require('../fixures/mailbox/list_mailbox_success_response.json'), {
    'Content-Type': 'application/json'
  });
