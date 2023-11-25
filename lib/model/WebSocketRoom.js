import WebSocket, { WebSocketServer }  from 'ws';

class WebSocketRoom extends WebSocketServer{
    constructor (serverParams, params) {
        super(serverParams)
        this.id = params.id

        const room = this

        room.on('connection', (ws, request) => {
            ws.id = Date.now().toString().slice(-5)
            console.log(request)
            console.log(`Client ${ws.id} connected to room ${params.id}`)

            ws.on('message', (data, isBinary) => {    
                console.log(`User ${ws.id} sent a message to room ${room.id}: ${data}`)
                try {
                    let message = JSON.parse(data)
                    room.handleMessage(ws, message)
                } catch (e) {
                    ws.send(`An error occured while parsing WebSocket message: ${e}`)
                    console.log(`An error occured while parsing WebSocket message: ${e}, by user ${ws.id}`)
                }
            })

            ws.on('close', (code, reason) => {
                console.log(`User ${ws.id} left room ${room.id}`)
            })
        })
    }

    chat = []
    
    authUpgrade (request, socket, head) {
        this.handleUpgrade(request, socket, head, function done(ws) {
            targetRoom.emit('connection', ws, request);
        });
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
            default:  
                throw new Error('Invalid type of message')  
        }
        
    }

    broadcast (data) {
        this.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
              client.send(data, { binary: false });
            }
          });
    }
}

export default WebSocketRoom