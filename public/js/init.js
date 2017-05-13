/*jslint browser: true*/
/*global console, Framework7, angular, Dom7*/
var myapp = myapp || {};
myapp.init = (function () {
  'use strict';
  var exports = {};
  document.addEventListener("DOMContentLoaded", function(event) {
    // Initialize app
    var fw7App = new Framework7(),
      fw7ViewOptions = {
        dynamicNavbar: true,
        domCache: true,
        precompileTemplates: true,
        animateNavBackIcon: true,
        template7Pages: true,
        template7Data: context
      },
      mainView = fw7App.addView('.view-main', fw7ViewOptions),
      $$ = Framework7.$,
      ipc = new myapp.appIndex(fw7App, $$);
      welcome = new myapp.welcome(fw7App, $$);
		  appjs = new myapp.myappjs(fw7App, $$);
  });
  return exports;
}());
