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
// PING APPS EVENTS
const PING_APPS = PING + '.apps';
const PING_MUSIC = PING + '.music';
const PING_SOCKET = PING + '.socket';
// WOL EVENTS
const WOL = APP_NAMESPACE + 'wol';
const SUCCESS_WOL = APP_NAMESPACE + 'wol.success';
// MUSIC EVENTS
const MUSIC_NAMESPACE = APP_NAMESPACE + 'music.';
const MUSIC_PLAYER_NAMESPACE = MUSIC_NAMESPACE + 'player.';
const MUSIC_PLAYER_CHANGE_TRACK = MUSIC_NAMESPACE + 'changetrack';
const MUSIC_PLAYER_NEED_UPDATE = MUSIC_NAMESPACE + 'needupdate';
const MUSIC_PLAYER_PLAY = MUSIC_NAMESPACE + 'play';
const MUSIC_PLAYER_PAUSE = MUSIC_NAMESPACE + 'pause';
const MUSIC_PLAYER_NEXT = MUSIC_NAMESPACE + 'next';
const MUSIC_PLAYER_PREV = MUSIC_NAMESPACE + 'prev';
const MUSIC_PLAYER_VOL_DOWN = MUSIC_NAMESPACE + 'vol.down';
const MUSIC_PLAYER_VOL_MUTE = MUSIC_NAMESPACE + 'vol.mute';
const MUSIC_PLAYER_VOL_UP = MUSIC_NAMESPACE + 'vol.up';
const MUSIC_PLAYER_TRACK = MUSIC_NAMESPACE + 'track';
const MUSIC_PLAYER_TRACKLIST = MUSIC_NAMESPACE + 'tracklist';

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
  socket.on(MUSIC_PLAYER_CHANGE_TRACK,function(data){
    socket.broadcast.emit(MUSIC_PLAYER_CHANGE_TRACK,{ msg: data });
  });
  socket.on(MUSIC_PLAYER_NEED_UPDATE,function(data){
    socket.broadcast.emit(MUSIC_PLAYER_NEED_UPDATE,{ msg: 'Music need update' });
  });
  socket.on(MUSIC_PLAYER_PLAY,function(data){
    socket.broadcast.emit(MUSIC_PLAYER_PLAY,{ msg: 'Play music please' });
  });
  socket.on(MUSIC_PLAYER_PAUSE,function(data){
    socket.broadcast.emit(MUSIC_PLAYER_PAUSE,{ msg: 'Pause music please' });
  });
  socket.on(MUSIC_PLAYER_NEXT,function(data){
    socket.broadcast.emit(MUSIC_PLAYER_NEXT,{ msg: 'Next track please' });
  });
  socket.on(MUSIC_PLAYER_PREV,function(data){
    socket.broadcast.emit(MUSIC_PLAYER_PREV,{ msg: 'Prev track please' });
  });
  socket.on(MUSIC_PLAYER_VOL_UP,function(data){
    socket.broadcast.emit(MUSIC_PLAYER_VOL_UP,{ msg: 'Vol up please' });
  });
  socket.on(MUSIC_PLAYER_VOL_DOWN,function(data){
    socket.broadcast.emit(MUSIC_PLAYER_VOL_DOWN,{ msg: 'Vol down please' });
  });
  socket.on(MUSIC_PLAYER_VOL_MUTE,function(data){
    socket.broadcast.emit(MUSIC_PLAYER_VOL_MUTE,{ msg: 'Vol mute please' });
  });
  socket.on(MUSIC_PLAYER_TRACK,function(data){
    socket.broadcast.emit(MUSIC_PLAYER_TRACK,{ msg: data });
  });
  socket.on(MUSIC_PLAYER_TRACKLIST,function(data){
    socket.broadcast.emit(MUSIC_PLAYER_TRACKLIST,{ msg: data });
  });
  socket.on(PING_APPS,function(data){
    console.log('Ping apps');
    // PING ALL APPS
    socket.broadcast.emit(PING_APPS,{ msg : data });
    // SOCKET ANSWER
    socket.broadcast.emit(PING_SOCKET,{ msg : data });
  });
  socket.on(PING_SOCKET,function(data){
    console.log('Ping socket answer');
    socket.broadcast.emit(PING_SOCKET,{ msg : data });
  });
  socket.on(PING_MUSIC,function(data){
    console.log('Ping music answer');
    socket.broadcast.emit(PING_MUSIC,{ msg : data });
  });
});
