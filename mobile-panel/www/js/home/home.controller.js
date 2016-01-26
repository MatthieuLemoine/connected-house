(function(){
    'use strict';

    angular
        .module('panel.music')
        .controller('HomeController',HomeController);

    HomeController.$inject = ['SocketFactory','Weather'];

    function HomeController(SocketFactory,Weather){
        var PING_MUSIC_EVENT   = 'connected-house.ping.music';
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
        refreshStatus();

        //////////

        function onPingReceived(input){
            data.apps.socket.status = true;
            if( input.msg === PING_MUSIC_EVENT ){
                data.apps.music.status = true;
            }
        }

        function refreshStatus(){
            SocketFactory.ping();
            return false;
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
