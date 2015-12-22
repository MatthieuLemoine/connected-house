(function(){
    'use strict';
    angular
        .module('seed.objects')
        .factory('ObjectsFactory',ObjectsFactory);

    ObjectsFactory.$inject = ['$http','ObjectsModel'];

    function ObjectsFactory($http,ObjectsModel){

        return {
            getObjects : getObjects,
            getCount   : getCount
        };

        //////////

        function getObjects(){
            return $http.get('/objects')
                .then(function successQueryObjects (response) {
                    ObjectsModel.objects = response.data;
                    return ObjectsModel.objects;
                });
        }

        function getCount(){
            return $http.get('/objects/count')
                .then(function successQueryCount (response) {
                    var count = response.data.count;
                    ObjectsModel.count = count;
                    return ObjectsModel.count;
                });
        }

    }
})();
