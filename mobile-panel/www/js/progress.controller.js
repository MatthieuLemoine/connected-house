(function(){
    'use strict';

    angular
        .module('panel')
        .controller('ProgressController',ProgressController);

    ProgressController.$inject = ['ProgressFactory'];

    function ProgressController(ProgressFactory){
        var vm   = this;
        vm.opts = ProgressFactory.opts;
    }
})();
