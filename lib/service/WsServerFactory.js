import { WebSocketServer }  from 'ws';
import configureSocket from '../server/configureSocket.js';

class WsServerFactory  {
    constructor () {

    }

    createWebSocket () {
        let ws = new WebSocketServer({ noServer: true });
        configureSocket(ws);
        return ws;
    }
}

export default WsServerFactory