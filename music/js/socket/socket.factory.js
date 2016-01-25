(function(){
    'use strict';
    angular
        .module('app.socket')
        .factory('SocketFactory',SocketFactory);

    SocketFactory.$inject = ['socketFactory'];

    function SocketFactory(socketFactory){
        var PING_EVENT = 'connected-house.ping';
        var NEXT_EVENT = 'connected-house.music.next';
        var PAUSE_EVENT = 'connected-house.music.pause';
        var PLAY_EVENT = 'connected-house.music.play';
        var PREV_EVENT = 'connected-house.music.prev';
        var VOL_DOWN_EVENT = 'connected-house.music.vol.down';
        var VOL_MUTE_EVENT = 'connected-house.music.vol.mute';
        var VOL_UP_EVENT = 'connected-house.music.vol.up';
        var TRACK_EVENT = 'connected-house.music.track';
        var TRACK_LIST_EVENT = 'connected-house.music.tracklist';

        var socket = socketFactory({
            ioSocket: io.connect('http://socket.connected.house')
        });


        return {
            addNextListener : addNextListener,
            addPlayListener : addPlayListener,
            addPauseListener : addPauseListener,
            addPrevListener : addPrevListener,
            addVolDownListener : addVolDownListener,
            addVolMuteListener : addVolMuteListener,
            addVolUpListener : addVolUpListener,
            ping : ping,
            send : send
        };

        //////////

        function addNextListener(callback){
            socket.addListener(NEXT_EVENT,callback);
        }

        function addPauseListener(callback){
            socket.addListener(PAUSE_EVENT,callback);
        }

        function addPlayListener(callback){
            socket.addListener(PLAY_EVENT,callback);
        }

        function addPrevListener(callback){
            socket.addListener(PREV_EVENT,callback);
        }

        function addVolDownListener(callback){
          socket.addListener(VOL_DOWN_EVENT,callback);
        }

        function addVolMuteListener(callback){
            socket.addListener(VOL_MUTE_EVENT,callback);
        }

        function addVolUpListener(callback){
          socket.addListener(VOL_UP_EVENT,callback);
        }

        function ping(){
            socket.emit(
                PING_EVENT,
                {
                    data : 'Hello from Music'
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
