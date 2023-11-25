import WebSocketRoom from '../model/WebSocketRoom.js'
import configureRoomWSServer from '../server/configureRoomWSServer.js'

class RoomService {
    rooms = new Map()

    constructor () {

    }
    
    createRoom (params) {
        let newRoom = new WebSocketRoom({ noServer: true }, params)

        this.rooms.set(newRoom.id, newRoom)

        return newRoom.id;
    }

    getRoomById (id) {
        if (!this.rooms.has(id)) {
            throw new Error("Could not find the room with id " + id)
        }

        return this.rooms.get(id)
    }

    getAllRooms () {
        return this.rooms
    }
}

export default RoomService