/**
 * @module myModule
 * @summary: This module's purpose is to:
 *
 * @description:
 *
 * Author: Justin Mooser
 * Created On: 2015-05-15.
 * @license Apache-2.0
 */

"use strict";


require('angular');
require('angular-extend-promises');
window._ = require('lodash');

require('../index');

var app = angular.module('demo', ['robustAuth', 'angular-extend-promises'])
  .constant('config', { })
  .service('storage', function() {
    return {
      get: function() {},
      set: function() {}
    }
  })
  .service('logger', function() {
    var logger = {
      log: function(eventLabel, details, eventOptions) {
        console.log(eventLabel, details, eventOptions);
      },
      logError: function(eventLabel, errDetails) {
        console.error(eventLabel, errDetails);
      },
      logException: function(eventLabel, exDetails) {

      },
      createChild: function(prefix) {
        return logger;
      }
    };
    logger = logger.createChild('auth-svc');
    return logger;
  })
  .run(function(authSvc, $q) {
    window.p = $q;
    authSvc.login({
      key: 'justin',
      secret: 'justinlovesellie',
      rememberMe: false
    });
  });
