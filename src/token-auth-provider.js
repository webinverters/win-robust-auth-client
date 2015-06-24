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
        if (res.body) {
          throw 'Failed to login.  Endpoint missing.';
        }

        try {
          return p.resolve(res.data);
        }
        catch (ex) {
          console.log('/token API response:', res);
          throw 'Failed to login.  Endpoint version mismatch.';
        }
      }, function(err) {
        if (err.status == 401) {
          throw 'Failed to login: invalid credentials.';
        }
        console.error(err);
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