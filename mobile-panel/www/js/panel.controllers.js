(function(){
    'use strict';

    angular
        .module('panel')
        .controller('PanelController',PanelController);

    PanelController.$inject = ['$location'];

    function PanelController($location){
        var vm       = this;
        vm.selectTab = selectTab;
        var deploy = new Ionic.Deploy();
        deploy.setChannel("production");

        deploy.watch().then(function() {}, function() {}, function(hasUpdate) {
            if(hasUpdate){
                updateApp();
            }
        });

        ////////////

        function selectTab(index){
            switch (index){
                case 0:
                    $location.url('/home');
                    break;
                case 1:
                    $location.url('/music');
                    break;
                default:
                    $location.url('/home');
                    break;
            }
        }

        function updateApp(){
            deploy.update().then(function(res) {
              console.log('Ionic Deploy: Update Success! ', res);
            }, function(err) {
              console.log('Ionic Deploy: Update error! ', err);
            }, function(prog) {
              console.log('Ionic Deploy: Progress... ', prog);
            });
        }


    }
})();
