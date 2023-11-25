import { WebSocketServer }  from 'ws';
import configureSocket from '../server/configureSocket.js';

class WsServerFactory  {
    constructor () {

    }

    createWebSocket (params) {
        let wsServer = new WebSocketServer({ noServer: true });
        configureSocket(wsServer, params);
        return wsServer;
    }
}

export default WsServerFactory