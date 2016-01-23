(function(){
    'use strict';
    angular
        .module('app.music')
        .factory('DeezerUser',DeezerUser);

    DeezerUser.$inject = [];

    function DeezerUser(){
        return {
            access_token : '',
            playlists : []
        };
    }
})();
