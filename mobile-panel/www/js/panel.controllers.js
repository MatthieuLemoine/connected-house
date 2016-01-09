(function(){
    'use strict';

    angular
        .module('panel')
        .controller('PanelController',PanelController);

    PanelController.$inject = ['$location'];

    function PanelController($location){
        var vm       = this;
        vm.selectTab = selectTab;


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
    }
})();
