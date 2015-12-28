(function(){
  'use strict';

  angular.module('panel')
    .config(PanelRouter);

  PanelRouter.$inject = ['$stateProvider','$urlRouterProvider'];

  function PanelRouter($stateProvider, $urlRouterProvider) {
    // This panel use angular-ui-router
    // https://github.com/angular-ui/ui-router
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'templates/home.html'
      })
      .state('music', {
        url: '/music',
        templateUrl: 'templates/music.html'
      });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/home');
  }
})();
