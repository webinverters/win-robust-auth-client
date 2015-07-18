/**
 * @module index.js
 * @summary: Wires up the library.
 *
 * @description:
 *
 * Author: justin
 * Created On: 2015-03-21.
 * @license Apache-2.0
 */

angular.module('win.robust-auth-client',[])
  .service('authProvider', ['config', '$http', '$q', require('./src/token-auth-provider')])
  .service('authSvc', ['config', 'authProvider', 'storage', 'logger', '$q', require('./src/auth-svc.js')])
;
