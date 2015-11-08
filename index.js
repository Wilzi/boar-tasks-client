'use strict';

var extend = require('deep-extend');

var config = require('./tasks/config');
var defaultKarmaConfig = require('./karma.conf.js');


module.exports.getKarmaConfig = function(customConfig) {
  var finalConfig = extend(config, customConfig);
  return defaultKarmaConfig(finalConfig);
};


module.exports.getTasks = function(gulp, customConfig) {
  var finalConfig = extend(config, customConfig);

  return {
    config: finalConfig,
    client: require('./tasks/client')(gulp, finalConfig),
    build: require('./tasks/build')(gulp, finalConfig),
    package: require('./tasks/package')(gulp, finalConfig),
    s3: require('./tasks/s3')(gulp, finalConfig),
    redirector: require('./tasks/redirector')(gulp, finalConfig)
  };
};

module.exports.lib = {
  revision: require('./lib/revision')
};
