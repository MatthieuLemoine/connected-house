(function(){
    'use strict';
    angular
        .module('panel.socket')
        .factory('SocketFactory',SocketFactory);

    SocketFactory.$inject = ['socketFactory'];

    function SocketFactory(socketFactory){
        var PING_EVENT  = 'connected-house.ping';
        var NEXT_EVENT  = 'connected-house.music.next';
        var PAUSE_EVENT = 'connected-house.music.pause';
        var PLAY_EVENT  = 'connected-house.music.play';
        var PREV_EVENT  = 'connected-house.music.prev';

        var socket = socketFactory({
            ioSocket: io.connect('http://socket.connected.house/')
        });


        return {
            addPingListener : addPingListener,
            musicNext : musicNext,
            musicPause : musicPause,
            musicPlay : musicPlay,
            musicPrev : musicPrev,
            ping : ping,
            send : send
        };

        //////////

        function addPingListener(callback){
            socket.addListener(PING_EVENT,callback);
        }

        function musicNext(){
            socket.emit(
                NEXT_EVENT,
                {
                    data : 'Next track'
                },
                function(err){
                    console.log(err);
                }
            );
        }

        function musicPause(){
            socket.emit(
                PAUSE_EVENT,
                {
                    data : 'Pause player'
                },
                function(err){
                    console.log(err);
                }
            );
        }

        function musicPlay(){
            socket.emit(
                PLAY_EVENT,
                {
                    data : 'Play player'
                },
                function(err){
                    console.log(err);
                }
            );
        }

        function musicPrev(){
            socket.emit(
                PREV_EVENT,
                {
                    data : 'Previous track'
                },
                function(err){
                    console.log(err);
                }
            );
        }

        function ping(){
            socket.emit(
                PING_EVENT,
                {
                    data : 'Hello from Web Panel'
                },
                function(err){
                    console.log(err);
                }
            );
        }

        function send(event,message,callback){
            socket.emit(event,message,callback);
        }

    }
})();
