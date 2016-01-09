(function(){
    'use strict';

    angular
        .module('panel')
        .controller('PanelController',PanelController);

    PanelController.$inject = ['$location','ProgressFactory'];

    function PanelController($location,ProgressFactory){
        var vm       = this;
        vm.selectTab = selectTab;

        var deploy = new Ionic.Deploy();
        deploy.setChannel("production");

        deploy.watch().then(function() {}, function() {}, function(hasUpdate) {
            console.log('Watch update hasUpdate=',hasUpdate);
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
            console.log('UpdateApp');
            deploy.update().then(function(res) {
                ProgressFactory.hideProgress();
                console.log('Ionic Deploy: Update Success! ', res);
            }, function(err) {
                ProgressFactory.hideProgress();
                console.log('Ionic Deploy: Update error! ', err);
            }, function(prog) {
                if(prog === 1){
                    ProgressFactory.showProgress('Uploading App','A new version of the Connected House is installing. Please wait...');
                }
                ProgressFactory.opts.progress = prog;
                console.log('Ionic Deploy: Progress... ', prog);
            });
        }
    }
})();
