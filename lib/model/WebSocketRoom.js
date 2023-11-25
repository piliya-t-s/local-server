import WebSocket, { WebSocketServer }  from 'ws';
import configureHandlers from '../server/configureHandlers.js';
import { ServerWritableStreamImpl } from '@grpc/grpc-js/build/src/server-call.js';

class WebSocketRoom extends WebSocketServer{
    constructor (serverParams) {
        super(serverParams)
    }

    chat = []

    disconnect(ws) { // {"type":"logout"}
        ws.emit('close')
        ws.terminate()
    }

    handleMessage (author, message) {
        switch (message.type){
            case "chatMessage":
                if (message.text) {
                    message.author = author.id
                    this.broadcast(message)
                } else {
                    throw new Error('Invalid message')
                }
                break
            case "logout":
                this.disconnect(author)
                break
            default:  
                throw new Error('Invalid type of message')  
        }
        
    }

    broadcast (data) { // {"type":"chatMessage", "text":"penis"}
        console.log(data, JSON.toString(data))
        this.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(data), { binary: false });
            }
          });
    }

    getChatLog () {
        return this.chat
    }

    toString () {
        return `{
            "id":${this.id},
            "clients":${ this.clients.length}
        }`
    }
}

export default WebSocketRoom