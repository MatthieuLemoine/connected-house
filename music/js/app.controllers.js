(function(){
    'use strict';

    angular
        .module('app')
        .controller('AppController',AppController);

    AppController.$inject = ['$location','SocketFactory'];

    function AppController($location,SocketFactory){
        var vm       = this;

        SocketFactory.addPingListener(onPing);

        ////////////

        function onPing(){
            SocketFactory.ping();
        }
    }
})();
