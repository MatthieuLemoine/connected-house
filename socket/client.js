'use strict';
var io = require('socket.io-client');
var socket = io('http://socket.connected.house');
socket.emit('connected-house.ping',{ data : 'hello !'},function(err){
  console.log(err);
});
