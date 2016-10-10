import { Component, ViewChild, ElementRef } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  socket: SocketIOClient.Socket;
  chatLog: string[] = [];
  @ViewChild('chatWindow') chatWindow: ElementRef;
  @ViewChild('chatInput') chatInput: ElementRef;

  constructor() {
    this.socket = io.connect('http://localhost:3000');
    Observable.fromEvent(this.socket, 'chat')
      .map((msg) => `${new Date().toLocaleTimeString()}: ${msg}`)
      .subscribe((msg: string) => {
        this.chat(msg);
      });
    Observable.fromEvent(this.socket, 'connect')
      .subscribe(() => {
        this.chat('Connected to chat.');
      });
    Observable.fromEvent(this.socket, 'disconnect')
      .subscribe(() => {
        this.chat('Disconnected from chat.');
      });
    Observable.fromEvent(this.socket, 'error')
      .subscribe((err) => {
        this.chat(`Error: ${err}`);
      });
  }

  chat(msg: string): void {
    this.chatLog.push(msg);
  }

  send(): void {
    this.socket.emit('msg', this.chatInput.nativeElement.value);
    this.chatInput.nativeElement.value = '';
  }
}
