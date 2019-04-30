const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

const { expect } = chai;
const { oauth_token } = require('../config');

const testHelper = require('../testHelper');

describe('# HelpScout V2: Conversations', () => {
  it('should throw error if missing oauth_token', () => {
    const HelpScoutAPI = require('../../index')({});
    expect(() => HelpScoutAPI.conversation.list()).to.throw('Conversation requires an oauth_token');
  });

  it('should successful get a response from list conversations', done => {
    testHelper.setupMock('successful/list_conversation');

    const HelpScoutAPI = require('../../index')({ oauth_token });
    expect(HelpScoutAPI.conversation.list())
      .eventually.be.fulfilled.then(data => {
        expect(data).to.have.property('_embedded');
        expect(data._embedded).to.have.property('conversations');
        expect(data).to.have.property('page');
        expect(data).to.have.property('_links');
      })
      .should.notify(done);
  });

  it('should successful get a response from conversation `123`', done => {
    testHelper.setupMock('successful/get_conversation');

    const HelpScoutAPI = require('../../index')({ oauth_token });

    expect(HelpScoutAPI.conversation.get(123))
      .eventually.be.fulfilled.then(data => {
        expect(data).to.have.property('id');
        expect(data).to.have.property('number');
        expect(data).to.have.property('threads');
        expect(data).to.have.property('type');
        expect(data).to.have.property('folderId');
        expect(data).to.have.property('tags');
        expect(data).to.have.property('assignee');
        expect(data).to.have.property('createdAt');
        expect(data).to.have.property('userUpdatedAt');
        expect(data).to.have.property('_links');

        expect(data.id).to.equal(123);
      })
      .should.notify(done);
  });

  it('should successful get a moved converation `124`', done => {
    testHelper.setupMock('successful/get_moved_conversation');

    const HelpScoutAPI = require('../../index')({ oauth_token });

    expect(HelpScoutAPI.conversation.get(124))
      .eventually.be.fulfilled.then(data => {
        expect(data).to.have.property('id');
        expect(data).to.have.property('number');
        expect(data).to.have.property('threads');
        expect(data).to.have.property('type');
        expect(data).to.have.property('folderId');
        expect(data).to.have.property('tags');
        expect(data).to.have.property('assignee');
        expect(data).to.have.property('createdAt');
        expect(data).to.have.property('userUpdatedAt');
        expect(data).to.have.property('_links');

        expect(data.id).to.equal(123);
      })
      .should.notify(done);
  });

  it('should throw error if missing converation id', () => {
    const HelpScoutAPI = require('../../index')({ oauth_token });
    expect(() => HelpScoutAPI.conversation.get()).to.throw('Conversation id is required');
  });

  it('should create a conversation', () => {
    testHelper.setupMock('successful/create_conversation');

    const HelpScoutAPI = require('../../index')({ oauth_token });

    const postData = require('../mocks/fixures/conversation/create_conversation_request.json');
    expect(HelpScoutAPI.conversation.create(postData)).eventually.be.fulfilled.then(data => {
      expect(data.id).to.equal('123');
      expect(data.location).to.equal('https://api.helpscout.net/v2/conversations/123');
    });
  });

  it('should update a conversation', () => {
    testHelper.setupMock('successful/patch_conversation');

    const HelpScoutAPI = require('../../index')({ oauth_token });

    const postData = require('../mocks/fixures/conversation/patch_conversation_request.json');
    expect(HelpScoutAPI.conversation.update(123, postData)).eventually.be.fulfilled.then(data => {
      expect(data).to.be.true;
    });
  });
});
