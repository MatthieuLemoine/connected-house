(function(){
    'use strict';
    angular
        .module('panel.socket')
        .factory('SocketFactory',SocketFactory);

    SocketFactory.$inject = ['socketFactory'];

    function SocketFactory(socketFactory){
        var PING_EVENT  = 'connected-house.ping';
        // Music events
        var NEED_UPDATE_EVENT = 'connected-house.music.needupdate';
        var NEXT_EVENT  = 'connected-house.music.next';
        var PAUSE_EVENT = 'connected-house.music.pause';
        var PLAY_EVENT  = 'connected-house.music.play';
        var PREV_EVENT  = 'connected-house.music.prev';
        var VOL_DOWN_EVENT = 'connected-house.music.vol.down';
        var VOL_MUTE_EVENT = 'connected-house.music.vol.mute';
        var VOL_UP_EVENT = 'connected-house.music.vol.up';
        var TRACK_EVENT = 'connected-house.music.track';
        var TRACK_LIST_EVENT = 'connected-house.music.tracklist';

        // Wol events
        var WOL_EVENT = 'connected-house.wol';
        var WOL_SUCCESS_EVENT = 'connected-house.wol.success';

        var socket = socketFactory({
            ioSocket: io.connect('http://socket.connected.house/')
        });


        return {
            addPingListener : addPingListener,
            addTrackListener : addTrackListener,
            addTrackListListener : addTrackListListener,
            musicNext : musicNext,
            musicPause : musicPause,
            musicPlay : musicPlay,
            musicPrev : musicPrev,
            musicVolDown : musicVolDown,
            musicVolMute : musicVolMute,
            musicVolUp : musicVolUp,
            needUpdatePlayer : needUpdatePlayer,
            ping : ping,
            send : send,
            sendWol : sendWol
        };

        //////////

        function addPingListener(callback){
            socket.addListener(PING_EVENT,callback);
        }

        function addTrackListListener(callback){
          socket.addListener(TRACK_LIST_EVENT,callback);
        }

        function addTrackListener(callback){
          socket.addListener(TRACK_EVENT,callback);
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

        function musicVolDown(){
            socket.emit(
                VOL_DOWN_EVENT,
                {
                    data : 'Vol down'
                },
                function(err){
                    console.log(err);
                }
            );
        }

        function musicVolMute(){
            socket.emit(
                VOL_MUTE_EVENT,
                {
                    data : 'Vol mute'
                },
                function(err){
                    console.log(err);
                }
            );
        }

        function musicVolUp(){
            socket.emit(
                VOL_UP_EVENT,
                {
                    data : 'Vol up'
                },
                function(err){
                    console.log(err);
                }
            );
        }

        function needUpdatePlayer(){
            socket.emit(
                NEED_UPDATE_EVENT,
                {
                    data : 'music need update'
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

        function sendWol(computerName){
            console.log('send wol to',computerName);
            socket.emit(
                WOL_EVENT,
                {
                    computer : {
                        name : computerName
                    }
                },
                function(err){
                    console.log(err);
                }
            );
        }

    }
})();
