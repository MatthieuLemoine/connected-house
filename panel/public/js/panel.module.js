(function(){
  'use strict';

  angular.module('panel', [
    'ui.router',
    'ngMaterial',
    'btford.socket-io',
    'panel.home',
    'panel.music',
    'panel.socket'
  ]);

})();
