const nock = require('nock');

nock('https://api.helpscout.net/v2')
  .persist()
  .get('/conversations')
  .query(true)
  .reply(200, require('../fixures/conversation/list_conversation_success_response.json'), {
    'Content-Type': 'application/json'
  });
