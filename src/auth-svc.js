/**
 * @module auth-svc
 * @summary: Provides interfaces to change authentication state.
 *
 * @description:
 *
 * Author: justin
 * Created On: 2015-03-21.
 * @license Apache-2.0
 */

'use strict';
// stick an eventListener that listens for all kinds of events.
// when an event you want logged in the app monitor appears, broadcast to the monitor queue.

// could the eventPublisher and the logger be the same thing?
module.exports = function construct(config, authDriver, storage, logger, $q) {
  var m = {};
  config = config ? config : {};
  config = _.defaults(config, {});

  var currentUser = null; //{id:'',token:''};

  var setCurrentUser = function(user) {
    currentUser = user;

    if (user) {
      logger.log('$login', currentUser.id);
      currentUser.lastLoginTimestamp = new Date().getTime();
      storage.set('user-'+currentUser.id, currentUser);
      storage.set('current-user', currentUser);
    } else {
      storage.set('current-user', null);
      logger.log('Login Failed.');
    }
    return currentUser;
  };

  /**
   * Returns not-null if login was successful.  Otherwise, it returns the object received in response
   * to calling the login endpoint.
   *
   * @param params
   * @returns {*}
   */
  m.login = function(params) {
    logger.log('Logging In...', params);
    //creds = {key: key, secret: secret};
    return authDriver.login(params)
      .then(function(user) {
        return setCurrentUser(user);
      })
      .catch(function(err) {
        logger.logError('An error occurred attempting to login.', err);
        throw err;
      });
  };

  m.logout = function() {
    return authDriver.logout()
      .then(function() {
        storage.remove('user-'+currentUser.id);
        storage.remove('current-user');
        logger.log('$logout', currentUser.id);
        currentUser = null;
      })
      .catch(function(err) {
        logger.logError(err);
        throw err;
      })
  };

  m.currentIdentity = function(userId) {
    if (userId) {
      var user = storage.get('user-'+userId);
      if (user) {
        currentUser = user;
      } else {
        logger.log('User does not exist.');
      }
    } else {
      if (currentUser) return currentUser;
      return currentUser = storage.get('current-user');
    }
  };

  m.reauthenticate = function(userId) {
    var user = storage.get('current-user');
    if (userId) {
      user = storage.get('user-'+userId);
    }

    if (user) {
      // if the user has logged in within a half-day, keep the same credentials.
      if (new Date().getTime() - user.lastLoginTimestamp < 1000*60*60*12) {
        currentUser = user;
        storage.set('current-user', currentUser);
        return $q.when(currentUser);
      } else {
        return authDriver.reauthenticate(user)
          .then(function(user) {
            return setCurrentUser(user);
          })
          .catch(function(err) {
            // TODO: potentially broadcast a $logout event?
            logger.logError('Error Reauthenticating: ', err);
            setCurrentUser(null);
            return null;
          });
      }
    }
    return $q.when(null);
  };

  return m;
};