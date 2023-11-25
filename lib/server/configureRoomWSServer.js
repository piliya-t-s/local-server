import { WebSocketServer }  from 'ws';

function configureRoomWSServer(room, wsServer, params){
  wsServer.on('connection', (ws) => {
    //  auth
    console.log('Client connected ', wsServer);

    room.addUser({"socket": ws})
 
  });
}

   // ws.on('message', (message) => {
    //   console.log(`Received message: ${message}`);
    //   try {
    //     message = JSON.parse(message)
    //     ws.send(message)
    //     console.log(message)
    //   } catch(e) {
    //     ws.send(e.message)
    //   }
    // });
  
    // ws.on('close', () => {
    //   console.log('Client WS disconnected');
    // });
    
export default configureRoomWSServer