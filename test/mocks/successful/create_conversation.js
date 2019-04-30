const nock = require('nock');
const { client_id, client_secret } = require('../../config');

nock('https://api.helpscout.net/v2')
  .persist()
  .post('/conversations')
  // , body => {
  //   return (
  //     body.client_id === client_id &&
  //     body.client_secret === client_secret &&
  //     body.grant_type === 'client_credentials'
  //   );
  // })
  .reply(201, undefined, {
    'Resource-ID': 123,
    Location: 'https://api.helpscout.net/v2/conversations/123'
  });
