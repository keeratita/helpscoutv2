const nock = require('nock');
nock('https://api.helpscout.net/v2')
  .persist()
  .post('/oauth2/token')
  .reply(400, require('../fixures/token/create_token_failure_response.json'), {
    'Content-Type': 'application/json'
  });
