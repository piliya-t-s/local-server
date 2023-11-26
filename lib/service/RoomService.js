import { registerChannelzChannel } from '@grpc/grpc-js/build/src/channelz.js';
import WebSocketRoom from '../model/WebSocketRoom.js'
import WebSocketRoomFactory from './WebSocketRoomFactory.js'

class RoomService {
    rooms = new Map()

    constructor (webSocketRoomFactory) {
        this.webSocketRoomFactory = webSocketRoomFactory;
    }
    
    createRoom (params) {
        console.log("new room" + params.id)
        if (this.rooms.has(params.id)) {
            throw new Error(`Room with UUID ${params.id} already exists on this server`)
        }

        let newRoom = this.webSocketRoomFactory.getRoom(params)

        this.rooms.set(newRoom.id, newRoom)

        return newRoom;
    }

    deleteRoom (id) {
        let room = this.getRoomById(id)

        room.disconnectAll()

        this.rooms.delete(id)
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