(function(){
  'use strict';

  angular.module('app', [
    'ui.router',
    'ngMaterial',
    'btford.socket-io',
    'app.music',
    'app.socket'
  ]);

})();

(function(){
    'use strict';
    angular
        .module('app.music', []);

})();

(function(){
    'use strict';
    angular
        .module('app.socket', []);

})();

(function(){
    'use strict';

    angular
        .module('app')
        .controller('AppController',AppController);

    AppController.$inject = ['$location'];

    function AppController($location){
        var vm       = this;

        ////////////
    }
})();

(function(){
  'use strict';

  angular.module('app')
    .config(AppRouter);

  AppRouter.$inject = ['$stateProvider','$urlRouterProvider'];

  function AppRouter($stateProvider, $urlRouterProvider) {
    // This seed use angular-ui-router
    // https://github.com/angular-ui/ui-router
    $stateProvider
      .state('music', {
        url: '/music',
        templateUrl: 'music.html'
      });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/music');
  }
})();

(function(){
  'use strict';

  var DeezerConf = {
    app_id : '170161',
    channelUrl : 'http://matthieulemoine.com/channel.html',
    perms : 'basic_access,email,offline_access,manage_library',
    default_access_token : 'frrotepQs65681b98ca5ea67um893DX5681b98ca5ee6j3Y6dd'
  }

  angular.module('app.music')
    .constant('DeezerConf',DeezerConf);

})();

(function(){
  'use strict';

  var DeezerConf = {
    app_id : 'your_app_id',
    channelUrl : 'your_channel_url',
    perms : 'basic_access,email,offline_access,manage_library',
    default_access_token : 'hard_coded_access_token'
  };

  angular.module('app.music')
    .constant('DeezerConfSample',DeezerConf);

})();

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

(function(){
    'use strict';
    angular
        .module('app.music')
        .factory('MusicFactory',MusicFactory);

    MusicFactory.$inject = ['$http','$q','DeezerConf','DeezerUser'];

    function MusicFactory($http,$q,DeezerConf,DeezerUser){
        console.log(DeezerConf);
        console.log(DeezerConf.app_id);
        return {
            getPlaylists : getPlaylists,
            init : init,
            login : login
        };

        //////////

        function init(callback){
            return $q(function(resolve,reject){
                console.log(DeezerConf);
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
                		console.log('User cancelled login or did not fully authorize.');
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

(function(){
    'use strict';
    angular
        .module('app.socket')
        .factory('SocketFactory',SocketFactory);

    SocketFactory.$inject = ['socketFactory'];

    function SocketFactory(socketFactory){
        var PING_EVENT = 'connected-house.ping';
        var NEXT_EVENT = 'connected-house.music.next';
        var PAUSE_EVENT = 'connected-house.music.pause';
        var PLAY_EVENT = 'connected-house.music.play';
        var PREV_EVENT = 'connected-house.music.prev';

        var socket = socketFactory({
            ioSocket: io.connect('http://socket.connected.house')
        });


        return {
            addNextListener : addNextListener,
            addPlayListener : addPlayListener,
            addPauseListener : addPauseListener,
            addPrevListener : addPrevListener,
            ping : ping,
            send : send
        };

        //////////

        function addNextListener(callback){
            socket.addListener(NEXT_EVENT,callback);
        }

        function addPauseListener(callback){
            socket.addListener(PAUSE_EVENT,callback);
        }

        function addPlayListener(callback){
            socket.addListener(PLAY_EVENT,callback);
        }

        function addPrevListener(callback){
            socket.addListener(PREV_EVENT,callback);
        }

        function ping(){
            socket.emit(
                PING_EVENT,
                {
                    data : 'Hello from Music'
                },
                function(err){
                    console.log(err);
                }
            );
        }

        function send(event,message,callback){
            socket.emit(event,message,callback);
        }

    }
})();
