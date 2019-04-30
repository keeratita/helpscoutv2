const nock = require('nock');

nock('https://api.helpscout.net/v2')
  .persist()
  .get('/mailboxes/1/fields')
  .reply(200, require('../fixures/mailbox/get_fields_success_response.json'), {
    'Content-Type': 'application/json'
  });
