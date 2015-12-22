(function(){
    'use strict';
    angular
        .module('app.socket')
        .factory('SocketFactory',SocketFactory);

    SocketFactory.$inject = ['socketFactory'];

    function SocketFactory(socketFactory){
        var mySocket = socketFactory({
            ioSocket: io.connect('http://socket.connected.house')
        });

        return mySocket;

        //////////

    }
})();
