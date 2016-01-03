'use strict';
var app = require('http').createServer(handler);
var io = require('socket.io')(app);
var fs = require('fs');
var wol = require('wake_on_lan');
var conf = require('./conf');

// EVENTS
const APP_NAMESPACE = 'connected-house.';
const PING = APP_NAMESPACE + 'ping';
const HELLO = APP_NAMESPACE + 'hello';
// Wake on lan event
const WOL = APP_NAMESPACE + 'wol';
const SUCCESS_WOL = APP_NAMESPACE + 'wol.success';

// MUSIC EVENTS
const MUSIC_NAMESPACE = APP_NAMESPACE + 'music.';
const MUSIC_PLAYER_NAMESPACE = MUSIC_NAMESPACE + 'player.';
const MUSIC_PLAYER_PLAY = MUSIC_NAMESPACE + 'play';
const MUSIC_PLAYER_PAUSE = MUSIC_NAMESPACE + 'pause';
const MUSIC_PLAYER_NEXT = MUSIC_NAMESPACE + 'next';
const MUSIC_PLAYER_PREV = MUSIC_NAMESPACE + 'prev';

app.listen(3003);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.on('connection', function (socket) {
  socket.emit(HELLO, { msg: 'Hello World !' });
  socket.on(PING, function (data) {
    console.log('PING received');
  });
  socket.on(WOL,function(data){
    console.log('WOL received',data);
    if(data.computer){
      var name = data.computer.name;
      var computer = conf.computers.get(name);
      if(computer){
        wol.wake(computer.mac, function(error) {
          if (error) {
            console.log('Error sending magic packet to',name);
          } else {
            console.log('Done sending magic packet to',name);
            socket.broadcast.emit(SUCCESS_WOL,{ msg: name+' has been started' });
          }
        });
      }
    }
  });
  socket.on(MUSIC_PLAYER_PLAY,function(data){
    console.log('Broadcast play music command');
    socket.broadcast.emit(MUSIC_PLAYER_PLAY,{ msg: 'Play music please' });
  });
  socket.on(MUSIC_PLAYER_PAUSE,function(data){
    console.log('Broadcast pause music command');
    socket.broadcast.emit(MUSIC_PLAYER_PAUSE,{ msg: 'Pause music please' });
  });
  socket.on(MUSIC_PLAYER_NEXT,function(data){
    console.log('Broadcast next music command');
    socket.broadcast.emit(MUSIC_PLAYER_NEXT,{ msg: 'Next track please' });
  });
  socket.on(MUSIC_PLAYER_PREV,function(data){
    console.log('Broadcast prev music command');
    socket.broadcast.emit(MUSIC_PLAYER_PREV,{ msg: 'Prev track please' });
  });
});
