(function(){
  'use strict';

  angular.module('seed')
    .config(SeedRouter);

  SeedRouter.$inject = ['$stateProvider','$urlRouterProvider'];

  function SeedRouter($stateProvider, $urlRouterProvider) {
    // This seed use angular-ui-router
    // https://github.com/angular-ui/ui-router
    $stateProvider
      .state('objects', {
        url: '/objects',
        templateUrl: 'templates/objects.html'
      });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/objects');
  }
})();
