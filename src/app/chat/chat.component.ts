import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

@Component({
  selector: 'obs-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  socket: SocketIOClient.Socket;
  chat$: Observable<any>;
  chatInput: string;
  name: string;

  constructor() {
    this.name = 'Anonymous';
    this.socket = io.connect('http://localhost:3000');
    this.chat$ = Observable.fromEvent(this.socket, 'chat');
  }

  send(): void {
    this.socket.emit('msg', {
      name: this.name,
      message: this.chatInput
    });
    this.chatInput = '';
  }
}
