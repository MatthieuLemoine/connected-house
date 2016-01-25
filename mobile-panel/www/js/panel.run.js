(function(){
  'use strict';

  angular.module('panel')
    .run(PanelRun);

  PanelRun.$inject = ['$ionicPlatform','ProgressFactory'];

  function PanelRun($ionicPlatform,ProgressFactory){
    $ionicPlatform.ready(function() {
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if(window.StatusBar) {
        StatusBar.hide();
      }

      var deploy = new Ionic.Deploy();
      deploy.setChannel("production");

      deploy.watch().then(function() {}, function() {}, function(hasUpdate) {
          console.log('Watch update hasUpdate=',hasUpdate);
          if(hasUpdate){
              //updateApp();
          }
      });

      function updateApp(){
          console.log('UpdateApp');
          deploy.update().then(function(res) {
              ProgressFactory.hideProgress();
              console.log('Ionic Deploy: Update Success! ', res);
          }, function(err) {
              ProgressFactory.hideProgress();
              console.log('Ionic Deploy: Update error! ', err);
          }, function(prog) {
              if(!ProgressFactory.opts.dialog.isShown){
                  ProgressFactory.showProgress('Uploading App','A new version of the Connected House is installing. Please wait...');
              }
              console.log('Ionic Deploy: Progress... ', prog);
          });
      }

    });
  }
})();
