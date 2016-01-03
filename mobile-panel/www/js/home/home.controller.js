(function(){
    'use strict';

    angular
        .module('panel.music')
        .controller('HomeController',HomeController);

    HomeController.$inject = ['SocketFactory'];

    function HomeController(SocketFactory){
        var vm   = this;
        vm.sendWol = sendWol;
        vm.error = {
            wol: {}
        };
        vm.wol = {
            computer : {}
        };

        SocketFactory.ping();
        
        //////////

        function sendWol(){
            console.log('sendWol');
            if(vm.wol.computer.name){
                SocketFactory.sendWol(vm.wol.computer.name);
                vm.error.wol = {};
            }
            else{
                vm.error.wol.required = 'Computer name is required';
            }
        }

    }
})();
