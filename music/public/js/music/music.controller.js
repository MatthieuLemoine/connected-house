(function(){
    'use strict';

    angular
        .module('app.music')
        .controller('MusicController',MusicController);

    MusicController.$inject = ['MusicFactory','SocketFactory'];

    function MusicController(MusicFactory,SocketFactory){
        var vm   = this;
        vm.play  = play;
        vm.pause = pause;

        initDeezer();
        // PING Socket server
        SocketFactory.ping();

        //////////

        function initDeezer(){
            DZ.init({
              appId : '170161',
              channelUrl : 'http://music.connected.house/channel.html',
              player: {
                container: 'player',
                width : 400,
                height : 100,
                onload : playerReady
              }
            });

        }

        function playerReady(response){
            // Start player
            DZ.player.playPlaylist(1439725805);

            // Add listeners to socket events
            SocketFactory.addNextListener(next);
            SocketFactory.addPauseListener(pause);
            SocketFactory.addPlayListener(play);
            SocketFactory.addPrevListener(previous);
        }

        function play(){
            console.log('play');
            DZ.player.play();
        }

        function pause(){
            DZ.player.pause();
        }

        function next(){
            DZ.player.next();
        }

        function previous(){
            DZ.player.prev();
        }

    }
})();
