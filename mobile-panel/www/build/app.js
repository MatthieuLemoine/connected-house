(function(){
  'use strict';

  angular.module('panel', [
    'ionic',
    'ui.router',
    'ngMaterial',
    'btford.socket-io',
    'panel.home',
    'panel.music',
    'panel.socket'
  ]);

})();

(function(){
    'use strict';
    angular
        .module('panel.home', []);

})();

(function(){
    'use strict';
    angular
        .module('panel.music', []);

})();

(function(){
    'use strict';
    angular
        .module('panel.socket', []);

})();

(function(){
    'use strict';

    angular
        .module('panel')
        .controller('PanelController',PanelController);

    PanelController.$inject = ['$location'];

    function PanelController($location){
        var vm       = this;
        vm.selectTab = selectTab;

        ////////////

        function selectTab(index){
            switch (index){
                case 0:
                    $location.url('/home');
                    break;
                case 1:
                    $location.url('/music');
                    break;
                default:
                    $location.url('/home');
                    break;
            }
        }
    }
})();

(function(){
  'use strict';

  angular.module('panel')
    .config(PanelRouter);

  PanelRouter.$inject = ['$stateProvider','$urlRouterProvider'];

  function PanelRouter($stateProvider, $urlRouterProvider) {
    // This panel use angular-ui-router
    // https://github.com/angular-ui/ui-router
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'templates/home.html'
      })
      .state('music', {
        url: '/music',
        templateUrl: 'templates/music.html'
      });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/home');
  }
})();

(function(){
  'use strict';

  angular.module('panel')
    .run(PanelRun);

  PanelRun.$inject = ['$ionicPlatform'];

  function PanelRun($ionicPlatform){
    $ionicPlatform.ready(function() {
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  }
})();

(function(){
    'use strict';

    angular
        .module('panel.music')
        .controller('HomeController',HomeController);

    HomeController.$inject = [];

    function HomeController(){
        var vm   = this;

        //////////

    }
})();

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

(function(){
    'use strict';
    angular
        .module('panel.socket')
        .factory('SocketFactory',SocketFactory);

    SocketFactory.$inject = ['socketFactory'];

    function SocketFactory(socketFactory){
        var PING_EVENT  = 'connected-house.ping';
        var NEXT_EVENT  = 'connected-house.music.next';
        var PAUSE_EVENT = 'connected-house.music.pause';
        var PLAY_EVENT  = 'connected-house.music.play';
        var PREV_EVENT  = 'connected-house.music.prev';

        var socket = socketFactory({
            ioSocket: io.connect('http://socket.connected.house/')
        });


        return {
            addPingListener : addPingListener,
            musicNext : musicNext,
            musicPause : musicPause,
            musicPlay : musicPlay,
            musicPrev : musicPrev,
            ping : ping,
            send : send
        };

        //////////

        function addPingListener(callback){
            socket.addListener(PING_EVENT,callback);
        }

        function musicNext(){
            socket.emit(
                NEXT_EVENT,
                {
                    data : 'Next track'
                },
                function(err){
                    console.log(err);
                }
            );
        }

        function musicPause(){
            socket.emit(
                PAUSE_EVENT,
                {
                    data : 'Pause player'
                },
                function(err){
                    console.log(err);
                }
            );
        }

        function musicPlay(){
            socket.emit(
                PLAY_EVENT,
                {
                    data : 'Play player'
                },
                function(err){
                    console.log(err);
                }
            );
        }

        function musicPrev(){
            socket.emit(
                PREV_EVENT,
                {
                    data : 'Previous track'
                },
                function(err){
                    console.log(err);
                }
            );
        }

        function ping(){
            socket.emit(
                PING_EVENT,
                {
                    data : 'Hello from Web Panel'
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
