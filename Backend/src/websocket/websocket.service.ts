import { WebSocket } from 'ws';


export class AppGateway {

    private _socket;
    // private isConnected: 

    constructor() {
        this._socket = new WebSocket.Server({port: 9001});
        this._socket.on('connection', this.onConnect);
        // this._socket.on('connection', (socket, req) =>{
        //     //console.log(req);
        //     // var userID = req.headers['sec-websocket-key']
        //     // console.log(userID)
        // });
        // this._socket.on('message', (event) => {
        //     console.log(event);
        // });
    }
    
    private onConnect(wsClient) {
        console.log('Новый пользователь');
        // отправка приветственного сообщения клиенту
        wsClient.send('Привет');
        
        wsClient.on('message', function(message) {
            console.log(message);
          /* обработчик сообщений от клиента */
        });
        wsClient.on('close', function() {
          // отправка уведомления в консоль
          console.log('Пользователь отключился');
        });
      }
}