'use strict';

module.exports = {
  setupMock(name) {
    if (process.env.NOCK_OFF !== 'true') {
      require(['./mocks', name].join('/'));
    }
  }
};
