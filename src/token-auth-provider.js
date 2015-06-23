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
      .success(function(res) {
        var user = JSON.parse(res.body);
        return p.resolve(user);
      })
      .error(function(err) {
        return p.reject(err);
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