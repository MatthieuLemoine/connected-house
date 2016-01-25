(function(){
    'use strict';

    angular
        .module('app.music')
        .controller('MusicController',MusicController);

    MusicController.$inject = ['MusicFactory','SocketFactory','DeezerUser','DeezerConf'];

    function MusicController(MusicFactory,SocketFactory,DeezerUser,DeezerConf){
        var TRACK_EVENT = 'connected-house.music.track';
        var TRACK_LIST_EVENT = 'connected-house.music.tracklist';
        var vm   = this;
        vm.DeezerUser = DeezerUser;

        initDeezer();
        // PING Socket server
        SocketFactory.ping();

        //////////

        function afterLogin(authResponse){
          MusicFactory.getPlaylists(function(err){
              if(err)
                  console.log(err);
          });
        }

        function initDeezer(){
          DeezerUser.access_token = DeezerConf.default_access_token;
          MusicFactory.init(playerReady);
          MusicFactory.login().then(afterLogin);
          afterLogin();
        }

        function needUpdate(){
            onTrackChange(DZ.player.getCurrentTrack());
            onTrackListChange();
        }

        function playerReady(response){
          // Subscribe to player events
          DZ.Event.subscribe('current_track', onTrackChange);
          DZ.Event.subscribe('tracklist_changed', onTrackListChange);

          // Start player
          DZ.player.playPlaylist(1439725805);

          // Add listeners to socket events
          SocketFactory.addNextListener(next);
          SocketFactory.addPauseListener(pause);
          SocketFactory.addPlayListener(play);
          SocketFactory.addPrevListener(previous);
          SocketFactory.addVolDownListener(volDown);
          SocketFactory.addVolUpListener(volUp);
          SocketFactory.addVolMuteListener(volMute);
          SocketFactory.addNeedUpdateListener(needUpdate);
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

        function volDown(){
          var volume = DZ.player.getVolume() - 10;
          if(volume < 0){
            volume = 0;
          }
          DZ.player.setVolume(volume);
        }

        function volMute(){
            DZ.player.setMute(!DZ.player.getMute());
        }

        function volUp(){
          var volume = DZ.player.getVolume() + 10;
          if(volume > 100){
            volume = 100;
          }
          DZ.player.setVolume(volume);
        }

        function onTrackChange(track){
          console.log("Currently playing track", track);
          SocketFactory.send(TRACK_EVENT,track);
        }

        function onTrackListChange(){
          console.log("Track list has changed");
          SocketFactory.send(TRACK_LIST_EVENT,DZ.player.getTrackList());
        }
    }
})();
