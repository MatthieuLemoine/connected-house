(function(){
    'use strict';
    angular
        .module('seed.objects')
        .factory('ObjectsModel',ObjectsModel);

    function ObjectsModel(){
        return {
            objects : [],
            count   : 0
        };
    }
})();
