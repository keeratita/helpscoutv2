const nock = require('nock');
const { client_id, client_secret, refresh_token } = require('../../config');

nock('https://api.helpscout.net/v2')
  .persist()
  .post('/oauth2/token', body => {
    return (
      body.client_id === client_id &&
      body.client_secret === client_secret &&
      body.refresh_token === refresh_token &&
      body.grant_type === 'refresh_token'
    );
  })
  .reply(200, require('../fixures/token/refresh_token_success_response.json'), {
    'Content-Type': 'application/json'
  });
