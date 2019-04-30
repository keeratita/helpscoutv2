const nock = require('nock');
const { client_id, client_secret } = require('../../config');

nock('https://api.helpscout.net/v2')
  .persist()
  .post('/oauth2/token', body => {
    return (
      body.client_id === client_id &&
      body.client_secret === client_secret &&
      body.grant_type === 'client_credentials'
    );
  })
  .reply(200, require('../fixures/token/create_token_success_response.json'), {
    'Content-Type': 'application/json'
  });
