import User from './User.js'

class Room {
    constructor (id, socket) {
        this.id = id
        this.socket = socket
    }

    users = []

    addUser (user) {
        this.users.append(user)
        this.connectUser(user)
    }

    kickUser (user) {
        // disconnect user

        const toRemove = this.users.indexOf(user);

        if (toRemove == -1){
            throw new Error(`No such user ${user.nickname} in room ${this.id}`)
        }

        this.users.splice(toRemove, 1) // deletes an element
    }

    reconnectUser (user) {
        
    }

    deleteRoom(params) {
        this.delete
    }
    
    getId () {
        return this.id
    }
}

export default Room