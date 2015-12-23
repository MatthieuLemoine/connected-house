(function(){
    'use strict';

    angular
        .module('panel.music')
        .controller('MusicController',MusicController);

    MusicController.$inject = ['SocketFactory'];

    function MusicController(SocketFactory){
        var vm   = this;
        vm.next  = next;
        vm.play  = play;
        vm.pause = pause;
        vm.previous  = previous;

        SocketFactory.ping();

        //////////

        function play(){
            SocketFactory.musicPlay(function onPlay(err){
                console.log(err);
            });
        }

        function pause(){
            SocketFactory.musicPause(function onPause(err){
                console.log(err);
            });
        }

        function next(){
            SocketFactory.musicNext(function onNext(err){
                console.log(err);
            });
        }

        function previous(){
            SocketFactory.musicPrev(function onPrevious(err){
                console.log(err);
            });
        }

    }
})();
