(function(){
  'use strict';

  angular.module('panel', [
    'ionic',
    'ionic.service.core',
    'ionic.service.deploy',
    'ui.router',
    'ngMaterial',
    'btford.socket-io',
    'angular-weather',
    'panel.home',
    'panel.music',
    'panel.socket'
  ]);

})();
