
(function(){
    'use strict';
    angular
        .module('panel')
        .factory('ProgressFactory',ProgressFactory);

    ProgressFactory.$inject = ['$mdDialog'];

    function ProgressFactory($mdDialog){
        var opts = {
            dialog : {
                title : 'Progress Dialog',
                text : 'It\'s a progress dialog',
                isShown : false
            }
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
            opts.dialog.title = title;
            opts.dialog.text = text;
            opts.dialog.isShown = true;
        }

        function hideProgress(){
            $mdDialog.hide();
            opts.dialog.isShown = false;
        }
    }
})();
