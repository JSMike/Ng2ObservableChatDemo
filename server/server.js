const express = require('express');
const app = express();
const http = require('http').Server(app);
const morgan = require('morgan');
const io = require('socket.io').listen(http);
const rx = require('rxjs');

app.use(morgan('dev'));

io.on('connection', chat);

function chat(socket) {
  console.log('New Connection');
  rx.Observable.fromEvent(socket, 'msg')
    .subscribe((msg) => {
      socket.emit('chat', msg)
    });
}

http.listen(3000, () => console.log('listening on 3000'));
