import Room from '../model/Room.js'
import User from '../model/User.js'

class RoomService {
    rooms = new Map()

    constructor (WSFactory) {
        this.WSFactory = WSFactory;
    }
    
    createRoom (params) {
        // generate id
        let id = params.room.id ? params.room.id : Date.now().toString().slice(-5)

        let socket = this.WSFactory.createWebSocket({})

        let newRoom = new Room(id, socket)

        this.rooms.set(id, newRoom)

        return id;
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