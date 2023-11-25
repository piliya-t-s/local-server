function parseRoomId (str) {
    const urlTemplate = '/room/:id';
    const urlRegex = new RegExp(`^${urlTemplate.replace(/:\w+/g, '([^\\/]+)')}$`);
    let match = str.match(urlRegex)
    if (match) {
        return match[1]
    } else {
        return null;
    }
}

function configureServer(server, roomService){
    server.on('upgrade', function upgrade(request, socket, head) {
        let id = parseRoomId(request.url)

        if (id == null) { // url did not match the room template at all
            socket.destroy();
            return
        } 
        
        let targetRoom = null;
        try {
            targetRoom = this.roomService.getRoomById(id)
        } catch (e) {
            throw new Error("Could not find the room with id " + id)
        }

        targetRoom.socket.handleUpgrade(request, socket, head, function done(ws) {
            targetRoom.socket.emit('connection', ws, request);
        });
    });
}

export default configureServer