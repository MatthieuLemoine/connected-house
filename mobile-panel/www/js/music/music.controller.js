(function(){
    'use strict';

    angular
        .module('panel.music')
        .controller('MusicController',MusicController);

    MusicController.$inject = ['SocketFactory'];

    function MusicController(SocketFactory){
        var data = {
          item : {
            track : {
              title : 'Need sync',
              artist : {
                id : 0,
                name : 'Need sync'
              }
            }
          },
          tracklist : {
            tracks : []
          }
        };
        var vm   = this;
        vm.data = data;
        vm.next  = next;
        vm.onTrackSelect = onTrackSelect;
        vm.play  = play;
        vm.pause = pause;
        vm.previous  = previous;
        vm.volDown   = volDown;
        vm.volUp = volUp;
        vm.volMute = volMute;

        SocketFactory.needUpdatePlayer();
        SocketFactory.addTrackListener(onTrackChange);
        SocketFactory.addTrackListListener(onTrackListChange);

        //////////

        function next(){
            SocketFactory.musicNext(function onNext(err){
                console.log(err);
            });
        }

        function onTrackChange(track){
          data.item = track.msg;
        }

        function onTrackListChange(tracklist){
          data.tracklist = tracklist.msg;
        }

        function onTrackSelect(track_selected,index){
            var track = {
                track : track_selected,
                index : index
            };
            SocketFactory.setTrack(track);
            return false;
        }

        function pause(){
            SocketFactory.musicPause();
        }

        function play(){
            SocketFactory.musicPlay();
        }

        function previous(){
            SocketFactory.musicPrev();
        }

        function volDown(){
          SocketFactory.musicVolDown();
        }

        function volMute(){
            SocketFactory.musicVolMute();
        }

        function volUp(){
          SocketFactory.musicVolUp();
        }
    }
})();
