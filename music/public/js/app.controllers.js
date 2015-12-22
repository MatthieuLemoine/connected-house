(function(){
    'use strict';

    angular
        .module('app')
        .controller('AppController',AppController);

    AppController.$inject = ['$location'];

    function AppController($location){
        var vm       = this;
        vm.selectTab = selectTab;

        ////////////

        function selectTab(index){
            switch (index){
                case 0:
                    $location.url('/music');
                    break;
                default:
                    $location.url('/music');
                    break;
            }
        }
    }
})();
