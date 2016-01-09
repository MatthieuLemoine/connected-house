(function(){
  'use strict';

  angular.module('panel')
    .run(PanelRun);

  PanelRun.$inject = ['$ionicPlatform'];

  function PanelRun($ionicPlatform){
    $ionicPlatform.ready(function() {
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }

      var deploy = new Ionic.Deploy();
      deploy.setChannel("production");

      deploy.watch().then(function() {}, function() {}, function(hasUpdate) {
          console.log('Watch update hasUpdate=',hasUpdate);
          if(hasUpdate){
              updateApp();
          }
      });


      function updateApp(){
          console.log('UpdateApp');
          deploy.update().then(function(res) {
            console.log('Ionic Deploy: Update Success! ', res);
          }, function(err) {
            console.log('Ionic Deploy: Update error! ', err);
          }, function(prog) {
            console.log('Ionic Deploy: Progress... ', prog);
          });
      }

    });
  }
})();
