
(function(){
    'use strict';
    angular
        .module('panel')
        .factory('ProgressFactory',ProgressFactory);

    ProgressFactory.$inject = ['$mdDialog'];

    function ProgressFactory($mdDialog){
        var opts = {
                title : 'Progress Dialog',
                text : 'It\'s a progress dialog'
        };

        return {
            opts         : opts,
            showProgress : showProgress,
            hideProgress : hideProgress
        };

        //////////

        function showProgress(title,text){
            $mdDialog.show({
                controller: 'ProgressController',
                templateUrl: 'templates/progress.html',
                parent: angular.element(document.body),
                clickOutsideToClose:false
            });
        }

        function hideProgress(){
            $mdDialog.hide();
        }
    }
})();
