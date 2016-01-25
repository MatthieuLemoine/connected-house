(function(){
    'use strict';

    angular
        .module('panel.music')
        .controller('MusicController',MusicController);

    MusicController.$inject = ['SocketFactory'];

    function MusicController(SocketFactory){
        var data = {
          track : {
            title : 'Need sync',
            artist : {
              id : 0,
              name : 'Need sync'
            }
          },
          tracklist : {
            tracks : []
          }
      };
        var vm   = this;
        vm.data = data;
        vm.next  = next;
        vm.play  = play;
        vm.pause = pause;
        vm.previous  = previous;
        vm.volDown   = volDown;
        vm.volUp = volUp;
        vm.volMute = volMute;

        SocketFactory.ping();
        SocketFactory.addTrackListener(onTrackChange);
        SocketFactory.addTrackListListener(onTrackListChange);

        //////////

        function next(){
            SocketFactory.musicNext(function onNext(err){
                console.log(err);
            });
        }

        function onTrackChange(track){
          // TODO update track
          console.log(data);
          data.track = track;
        }

        function onTrackListChange(tracklist){
          // TODO update tracklist
          console.log(data);
          data.tracklist = tracklist;
        }
        function pause(){
            SocketFactory.musicPause(function onPause(err){
                console.log(err);
            });
        }

        function play(){
            SocketFactory.musicPlay(function onPlay(err){
                console.log(err);
            });
        }

        function previous(){
            SocketFactory.musicPrev(function onPrevious(err){
                console.log(err);
            });
        }

        function volDown(){
          SocketFactory.musicVolDown(function onVolDown(err){
              console.log(err);
          });
        }

        function volMute(){
            SocketFactory.musicVolMute(function onVolMute(err){
                console.log(err);
            });
        }

        function volUp(){
          SocketFactory.musicVolUp(function onVolUp(err){
              console.log(err);
          });
        }
    }
})();
