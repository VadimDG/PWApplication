import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root',
})
export class SocketService {

  public socket$: Observable<any>;

  constructor(private readonly socket: Socket) { 
    this.socket$ = socket.fromEvent('balance')
  }

  public identifySocket(id: string): void {
    this.socket.emit('identificationMsg', id);
  }
}