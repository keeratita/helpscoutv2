const fetch = require('node-fetch');
const querystring = require('querystring');
const { TokenExpired } = require('./errors');

const defaultOptions = {
  expectedStatus: 200,
  'Content-Type': 'application/json; charset=UTF-8'
};

function isArray(ar) {
  return (
    ar instanceof Array ||
    Array.isArray(ar) ||
    (ar && ar !== Object.prototype && isArray(ar.__proto__))
  );
}

function isJSONHeader(headers) {
  let index;
  let value;
  const contentTypes = headers.get('Content-Type');

  if (isArray(contentTypes)) {
    for (index = 0; index < contentTypes.length; ++index) {
      value = contentTypes[index];

      if (value.indexOf('json') > -1) {
        return true;
      }
    }
  }

  if (typeof contentTypes === 'string') {
    if (contentTypes.indexOf('json') > -1) {
      return true;
    }
  }

  return false;
}

function buildRequest(endpoint, method = 'GET', params = null, options = null) {
  options = { ...defaultOptions, ...options };

  return new Promise((resolve, reject) => {
    if (!options.oauth_token) return reject(new Error('OAuth token is required.'));

    let api_endpoint = endpoint;

    const requestOption = {
      method,
      headers: {
        'Content-Type': options['Content-Type'],
        Authorization: `Bearer ${options.oauth_token}`
      }
    };

    // build params array to a query string
    if (method === 'GET' && params) {
      const qs = querystring.stringify(params);
      api_endpoint = `${endpoint}?${qs}`;
      params = null;
    } else if (params) {
      requestOption.body = JSON.stringify(params);
    }

    // request to endpoint
    fetch(api_endpoint, requestOption)
      .then(resp => {
        const isJsonResponse = isJSONHeader(resp.headers);
        let expectedReponse = typeof resp.status !== 'undefined';

        if (isArray(options.expectedStatus)) {
          expectedReponse = expectedReponse && options.expectedStatus.includes(resp.status);
        } else {
          expectedReponse = expectedReponse && resp.status === options.expectedStatus;
        }

        if (!expectedReponse) {
          // Token is expired
          if (resp.status === 401) {
            Error.captureStackTrace(resp, Error);
            return reject(new TokenExpired(resp));
          }

          Error.captureStackTrace(resp, Error);
          return reject(resp);
        }

        return isJsonResponse ? resp.json() : resp;
      })
      .then(resp => {
        return resolve(resp);
      })
      .catch(err => {
        return reject(err);
      });
  });
}

module.exports = {
  buildRequest,
  isArray
};
