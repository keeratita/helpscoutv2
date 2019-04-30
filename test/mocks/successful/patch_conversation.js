const nock = require('nock');
const { client_id, client_secret } = require('../../config');

nock('https://api.helpscout.net/v2')
  .persist()
  .patch('/conversations/123')
  .reply(204, undefined);
