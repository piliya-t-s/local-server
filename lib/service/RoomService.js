import WebSocketRoom from '../model/WebSocketRoom.js'
import WebSocketRoomFactory from './WebSocketRoomFactory.js'

class RoomService {
    rooms = new Map()

    constructor (webSocketRoomFactory) {
        this.webSocketRoomFactory = webSocketRoomFactory;
    }
    
    createRoom (params) {
        let newRoom = this.webSocketRoomFactory.getRoom(params)

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