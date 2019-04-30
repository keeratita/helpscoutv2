const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

const { expect } = chai;
const { oauth_token } = require('../config');

const testHelper = require('../testHelper');

describe('# HelpScout V2: Mailboxes', () => {
  it('should throw error if missing oauth_token', () => {
    const HelpScoutAPI = require('../../index')({});
    expect(() => HelpScoutAPI.mailbox.get()).to.throw('Mailbox requires an oauth_token');
  });

  it('should successful get a response from list mailboxes', done => {
    testHelper.setupMock('successful/list_mailbox');

    const HelpScoutAPI = require('../../index')({ oauth_token });
    expect(HelpScoutAPI.mailbox.get())
      .eventually.be.fulfilled.then(data => {
        expect(data).to.have.property('_embedded');
        expect(data).to.have.property('page');
        expect(data).to.have.property('_links');
      })
      .should.notify(done);
  });

  it('should successful get a response from mailbox `1`', done => {
    testHelper.setupMock('successful/get_mailbox');

    const HelpScoutAPI = require('../../index')({ oauth_token });
    expect(HelpScoutAPI.mailbox.get(1))
      .eventually.be.fulfilled.then(data => {
        expect(data).to.have.property('id');
        expect(data).to.have.property('name');
        expect(data).to.have.property('slug');
        expect(data).to.have.property('email');
        expect(data).to.have.property('createdAt');
        expect(data).to.have.property('updatedAt');
        expect(data).to.have.property('_links');

        expect(data.id).to.equal(1);
      })
      .should.notify(done);
  });

  it('should successful get a list of folders from mailbox `1`', done => {
    testHelper.setupMock('successful/get_mailbox_folders');

    const HelpScoutAPI = require('../../index')({ oauth_token });
    expect(HelpScoutAPI.mailbox.getFolders(1))
      .eventually.be.fulfilled.then(data => {
        expect(data).to.have.property('_embedded');
        expect(data._embedded).to.have.property('folders');
        expect(data).to.have.property('page');
        expect(data).to.have.property('_links');

        expect(data._embedded.folders[0].id).to.equal(1234);
      })
      .should.notify(done);
  });

  it('should throw error if missing mailbox id', () => {
    const HelpScoutAPI = require('../../index')({ oauth_token });
    expect(() => HelpScoutAPI.mailbox.getFolders()).to.throw('Mailbox id is required');
  });

  it('should successful get a list of custom fields from mailbox `1`', done => {
    testHelper.setupMock('successful/get_mailbox_fields');

    const HelpScoutAPI = require('../../index')({ oauth_token });
    expect(HelpScoutAPI.mailbox.getCustomFields(1))
      .eventually.be.fulfilled.then(data => {
        expect(data).to.have.property('_embedded');
        expect(data._embedded).to.have.property('fields');
        expect(data).to.have.property('page');
        expect(data).to.have.property('_links');

        expect(data._embedded.fields[0].id).to.equal(104);
      })
      .should.notify(done);
  });

  it('should throw error if missing mailbox id', () => {
    const HelpScoutAPI = require('../../index')({ oauth_token });
    expect(() => HelpScoutAPI.mailbox.getCustomFields()).to.throw('Mailbox id is required');
  });
});
