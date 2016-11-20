const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io').listen(http);
const rx = require('rxjs');

io.on('connection', chat);

function chat(socket) {
  console.log('New Connection');
  rx.Observable.fromEvent(socket, 'msg')
    .map((msg) => {
      msg.date = (new Date()).toISOString();
      return msg;
    })
    .subscribe((msg) => {
      socket.emit('chat', msg)
    });
}

http.listen(3000, () => console.log('listening on 3000'));
