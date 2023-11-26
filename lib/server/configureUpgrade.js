import { parseRoomId  } from './parseUrl.js';

function configureUpgrade(server, roomService) {
    server.on('upgrade', function upgrade(request, socket, head) {
  
        let id = parseRoomId(request.url)
        console.log(id)
        if (id == null) { // url did not match the room template at all
            socket.destroy();
            return
        } 
        let targetRoom = null;
        targetRoom = roomService.getRoomById(id)
        if(targetRoom){
            targetRoom.authUpgrade(request, socket, head)
        } else {
            socket.destroy()
        }
    })
    
}

export default configureUpgrade