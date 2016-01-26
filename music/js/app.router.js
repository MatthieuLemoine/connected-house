(function(){
  'use strict';

  angular.module('app')
    .config(AppRouter);

  AppRouter.$inject = ['$stateProvider','$urlRouterProvider'];

  function AppRouter($stateProvider, $urlRouterProvider) {
    // This seed use angular-ui-router
    // https://github.com/angular-ui/ui-router
    $stateProvider
      .state('music', {
        url: '/music',
        templateUrl: 'templates/music.html'
      });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/music');
  }
})();
