import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  private connectedUsers = {};

  @SubscribeMessage('identificationMsg')
  handleMessage(client: Socket, payload: string): void {    
    delete this.connectedUsers[client.id];
    this.connectedUsers[payload] = client;
  }

  handleDisconnect(client: Socket) {
    if (client.id in this.connectedUsers) {
      delete this.connectedUsers[client.id];
    }
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.connectedUsers[client.id] = client;
  }

  getClientsDict(): any {
    return this.connectedUsers;
  }
}