(function(){
    'use strict';

    angular
        .module('panel.music')
        .controller('HomeController',HomeController);

    HomeController.$inject = ['SocketFactory','Weather'];

    function HomeController(SocketFactory,Weather){
        var data     = {
            apiKey :  Weather.openweather.apikey,
            apps : {
                socket : {
                    name : 'Socket server',
                    status : false
                },
                music : {
                    name : 'Music player',
                    status : false
                }
            },
            wol :{
                computer : {}
            },
            error : {
                wol : {}
            }
        };
        var vm   = this;
        vm.data = data;
        vm.sendWol = sendWol;
        vm.refreshStatus = refreshStatus;

        SocketFactory.addPingListener(onPingReceived);

        //////////

        function onPingReceived(data,evt,err){
            console.log(data);
            console.log(evt);
            console.log(err);
        }

        function refreshStatus(){
            SocketFactory.ping();
        }

        function sendWol(){
            console.log('sendWol');
            if(data.wol.computer.name){
                SocketFactory.sendWol(data.wol.computer.name);
                data.error.wol = {};
            }
            else{
                data.error.wol.required = 'Computer name is required';
            }
        }

    }
})();
