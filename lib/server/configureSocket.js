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
        roomService.getAllRooms().forEach( (room) => {
            if (id === room.id) {
                targetRoom = room
            }
        })
        
        if (!targetRoom) { // didnt find such a room
            socket.destroy();
            return
        }

        targetRoom.socket.handleUpgrade(request, socket, head, function done(ws) {
            targetRoom.socket.emit('connection', ws, request);
        });
    });
}

export default configureServer