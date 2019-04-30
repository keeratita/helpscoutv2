const nock = require('nock');

nock('https://api.helpscout.net/v2')
  .persist()
  .get('/conversations/123')
  .reply(200, require('../fixures/conversation/get_conversation_success_response.json'), {
    'Content-Type': 'application/hal+json;charset=UTF-8'
  });
