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

module.exports = function construct(config, $http) {
  var m = {};
  config = config ? config : {};
  config = _.defaults(config, {});

  m.login = function(params) {
    return $http.post('/token', params)
      .then(function(res) {
        try {
          var user = JSON.parse(res.body);
          console.log('PARSED USER:', user);
          return p.resolve(user);
        }
        catch (ex) {
          throw 'Failed to login.  Endpoint version mismatch.';
        }
      }, function(err) {
        if (err.status == 401) {
          throw 'Failed to login: invalid credentials.';
        }
        throw 'Failed to login.  Connection failure.';
      });
  };

  m.logout = function() {
    return p.resolve();
  };

  m.reauthenticate = function(params) {
    return m.login(params);
  };

  return m;
};