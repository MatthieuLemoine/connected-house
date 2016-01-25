(function(){
    'use strict';
    angular
        .module('app.music')
        .factory('MusicFactory',MusicFactory);

    MusicFactory.$inject = ['$http','$q','DeezerConf','DeezerUser'];

    function MusicFactory($http,$q,DeezerConf,DeezerUser){
        return {
            getPlaylists : getPlaylists,
            init : init,
            login : login
        };

        //////////

        function init(callback){
            return $q(function(resolve,reject){
                DZ.init({
                  appId : DeezerConf.app_id,
                  channelUrl : DeezerConf.channelUrl,
                  player: {
                    container: 'player',
                    width : 400,
                    height : 100,
                    onload : callback
                  }
                });
                resolve();
            });
        }

        function login(){
            return $q(function(resolve,reject){
                DZ.login(function(response) {
                    if(response.authResponse){
                    	if (response.authResponse.access_token === undefined) {
                            DeezerUser.access_token = DeezerConf.default_access_token;
                            resolve(null);
                    	}
                        else{
                            DeezerUser.access_token = response.authResponse.access_token;
                            resolve(null);
                        }
                    } else {
                        reject('Error : user cancelled login');
                	}
                }, {perms: DeezerConf.perms});
            });
        }

        function getPlaylists(){
            return $http.get('https://api.deezer.com/user/me/playlists',{
                params : {
                    app_id : DeezerConf.app_id,
                    access_token : DeezerUser.access_token
                }
            })
                .then(function doneGetPlaylists (response) {
                    var playlists = response.data.data.map(function(item){
                        return {
                            id : item.id,
                            duration : item.duration,
                            link : item.link,
                            nb_tracks : item.nb_tracks,
                            picture : item.picture,
                            title : item.title,
                            tracklist : item.tracklist
                        };
                    });

                    DeezerUser.playlists = playlists;
                    return null;
                });
        }
    }
})();
