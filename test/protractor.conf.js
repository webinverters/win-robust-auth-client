/**
 * @module myModule
 * @summary: This module's purpose is to:
 *
 * @description:
 *
 * Author: Justin Mooser
 * Created On: 2015-05-14.
 * @license Apache-2.0
 */

"use strict";

exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  //specs: ['tests/e2e/*.js'],
  //protractor protractor.conf.js --suite mainpage
  suites: {
    mainpage: ['tests/e2e/*.spec.js']
  },
  multiCapabilities: [{
    browserName: 'firefox'
  }, {
    browserName: 'chrome'
  }],

  // This can be changed via the command line as:
  // --params.login.user 'ngrocks'
  params: {
    login: {
      user: 'protractor-br',
      password: '#ng123#'
    }
  }

  // setup the size of the window before tests start:
  //onPrepare: function() {
  //  browser.driver.manage().window().setSize(1600, 800);
  //}
};