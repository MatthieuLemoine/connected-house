(function(){
    'use strict';
    angular
        .module('app.music')
        .factory('MusicFactory',MusicFactory);

    MusicFactory.$inject = ['$http'];

    function MusicFactory($http){

        return {
            getObjects : getObjects,
            getCount   : getCount
        };

        //////////

        function getObjects(){
            return $http.get('/objects')
                .then(function successQueryObjects (response) {
                    return response;
                });
        }

        function getCount(){
            return $http.get('/objects/count')
                .then(function successQueryCount (response) {
                    return response;
                });
        }

    }
})();
