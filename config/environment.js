/* jshint node: true */

// [Report Only] Refused to connect to 'ws://localhost:4200/socket.io/?EIO=3&transport=websocket&sid=hyF0V93oHUmpDTfCAAAA' because it violates the following Content Security Policy directive: "connect-src 'self' ws://localhost:35729 ws://0.0.0.0:35729".

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'sidemirror',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
    contentSecurityPolicy: {
      'style-src': "'self' 'unsafe-inline'",
      'script-src': "'self' *",
      'connect-src': "'self' *"
    },

    config: {
      socketURL: process.env.SOCKET_URL || 'http://localhost:4200'
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    ENV.APP.LOG_TRANSITIONS = true;
    ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
