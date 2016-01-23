(function(){
    'use strict';

    angular
        .module('app.music')
        .controller('MusicController',MusicController);

    MusicController.$inject = ['MusicFactory','SocketFactory','DeezerUser'];

    function MusicController(MusicFactory,SocketFactory,DeezerUser){
        var vm   = this;
        vm.DeezerUser = DeezerUser;

        initDeezer();
        // PING Socket server
        SocketFactory.ping();

        //////////

        function afterLogin(authResponse){
            console.log(authResponse);
            MusicFactory.getPlaylists(function(err){
                if(err)
                    console.log(err);
            });
        }

        function initDeezer(){
            MusicFactory.init(playerReady);
            MusicFactory.login().then(afterLogin);
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
