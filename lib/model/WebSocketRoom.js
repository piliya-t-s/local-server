import WebSocket, { WebSocketServer }  from 'ws';
import path from 'path'
import fs from 'node:fs/promises'

class WebSocketRoom extends WebSocketServer{
    constructor (serverParams) {
        super(serverParams)
    }

    player = null
    isPublic = true
    chat = []
    currentFileName = null

    getCurrentFileName() {
        return this.currentFileName
    }
    
    playFile (name) { // {"type":"playFile", "fileName":"sample1"}
        let mediaPath = path.join(process.cwd(), '/media/', `${this.id}_${name}.mp3`)

        console.log(`Trying to play ${mediaPath}`)
        fs.access(mediaPath, fs.constants.R_OK) 
        .then(() => { 
            this.player.streamFile(mediaPath, "mp3") 
            this.currentFileName = name
        }) 
        .catch((e) => console.error(`Error reading file for some reason${e}`));  
    }

    disconnect(ws) { // {"type":"logout"}
        ws.emit('close')
        ws.terminate()
    }

    disconnectAll() { 
        this.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.emit('close')
                client.terminate()
            }
        });
    }

    handleMessage (author, message) {
        let room = this
        switch (message.type){
            case "chatMessage":
                if (message.text) {
                    message.author = author.id
                    room.broadcast(message)
                } else {
                    throw new Error('Invalid message')
                }
                break
            case "logout":
                room.disconnect(author)
                break
            case "playFile":
                if (message.fileName) {
                    room.playFile(message.fileName)
                } else {
                    throw new Error('Invalid fileName')
                }
                break
            case "setRoom":
                for (let [key, value] of Object.entries(message.data))
                if (ws.isHost = true){
                    this[key] = value;
                }
                break
            case "getRoom":
                author.send(JSON.stringify({
                    "type": "getRoom",
                    "name": room.name,
                    "track": room.currentFileName
                }))
                break
            case "getClients":   
                let cl = []  

                room.clients.forEach(user => 
                    cl.push({
                    "nickname": user.nickname,
                    "id": user.id,
                    "isHost": user.isHost
                }))

                let res = JSON.stringify({
                    "type": "getClients",
                    "clients": JSON.stringify(cl)
                }) 
                      
                author.send(JSON.stringify(res))

                break
            default:  
                throw new Error('Invalid type of message')  
        }
        
    }

    broadcast (data) { // {"type":"chatMessage", "text":"test"}
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