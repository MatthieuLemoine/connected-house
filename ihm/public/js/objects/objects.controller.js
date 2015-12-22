(function(){
    'use strict';

    angular
        .module('seed.objects')
        .controller('ObjectsController',ObjectsController);

    ObjectsController.$inject = ['ObjectsFactory','ObjectsModel'];

    function ObjectsController(ObjectsFactory,ObjectsModel){
        var vm         = this;
        vm.showLoading = true;
        vm.model       = ObjectsModel;
        vm.getObjects  = getObjects;
        vm.getCount    = getCount;

        //////////

        function getObjects(){
            vm.showLoading      = true;
            ObjectsFactory.getObjects()
                .then(function successGetObjects(response){
                    vm.showLoading      = false;
                    // Process response in ObjectsModel
                },function errorGetObjects(){
                    vm.showLoading = false;
                    // TODO Display error
                });
        }

        function getCount(){
            ObjectsFactory.getCount()
                .then(function successGetCount(response){
                    // Process response in ObjectsModel
                });
        }

    }
})();
