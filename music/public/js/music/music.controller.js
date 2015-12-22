(function(){
    'use strict';

    angular
        .module('app.music')
        .controller('MusicController',MusicController);

    MusicController.$inject = ['MusicFactory'];

    function MusicController(MusicFactory){
        var vm   = this;
        vm.play  = play;
        vm.pause = pause;

        initDeezer();

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
          DZ.player.playPlaylist(1439725805);
        }

        function play(){
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
