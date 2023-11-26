import Player from "../model/Player.js"
import WebSocketRoom from "../model/WebSocketRoom.js"
import {privateAuth, publicAuth} from "../server/configureAuth.js"
import configureHandlers from "../server/configureHandlers.js"

class WebSocketRoomFactory {
    constructor (player) {
        
    }

    getRoom (params) {
        let newRoom = new WebSocketRoom({ noServer: true })
        
        newRoom.id = params.id

        configureHandlers(newRoom)

        newRoom.player = new Player()

        if (params.isPublic) {
            publicAuth(newRoom)
        } else {
            privateAuth(newRoom)
        }

        return newRoom
    }
}

export default WebSocketRoomFactory