const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

const { expect } = chai;
const { client_id, client_secret, refresh_token } = require('../config');

const testHelper = require('../testHelper');

describe('# HelpScout V2: Refresh access token', () => {
  it('should throw error if missing client id', () => {
    const HelpScoutAPI = require('../../index')({ client_secret });
    expect(() => HelpScoutAPI.token.authenticate()).to.throw('Token requires a client id.');
  });

  it('should throw error if missing client secret', () => {
    const HelpScoutAPI = require('../../index')({ client_id });
    expect(() => HelpScoutAPI.token.authenticate()).to.throw('Token requires a client secret.');
  });

  it('should throw error if missing refresh access token', () => {
    const HelpScoutAPI = require('../../index')({ client_id, client_secret });
    expect(HelpScoutAPI.token.refreshAccessToken()).eventually.to.be.rejectedWith(
      'Refresh access token is required.'
    );
  });

  it('should sucessfully refresh an access token', done => {
    // set up mock data
    testHelper.setupMock('successful/refresh_token');

    const HelpScoutAPI = require('../../index')({ client_id, client_secret });
    const token = HelpScoutAPI.token.refreshAccessToken({ refresh_token });
    expect(token)
      .to.eventually.be.fulfilled.then(data => {
        expect(data).to.have.property('refresh_token');
        expect(data).to.have.property('token_type');
        expect(data).to.have.property('access_token');
        expect(data).to.have.property('expires_in');

        expect(data.token_type).to.equal('bearer');
        expect(data.expires_in).to.equal(7200);
      })
      .should.notify(done);
  });
});
