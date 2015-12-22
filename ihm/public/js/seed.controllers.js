(function(){
    'use strict';

    angular
        .module('seed')
        .controller('SeedController',SeedController);

    SeedController.$inject = ['$location'];

    function SeedController($location){
        var vm       = this;
        vm.selectTab = selectTab;

        ////////////

        function selectTab(index){
            switch (index){
                case 0:
                    $location.url('/objects');
                    break;
                default:
                    $location.url('/objects');
                    break;
            }
        }
    }
})();
