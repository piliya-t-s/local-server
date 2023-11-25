import { WebSocketServer }  from 'ws';

function configureSocket(wsServer, params){
  wsServer.on('connection', (ws) => {
    console.log('Client connected ', wsServer);
  
    ws.on('message', (message) => {
      console.log(`Received message: ${message}`);
      try {
        message = JSON.parse(message)
        ws.send(message)
        console.log(message)
      } catch(e) {
        ws.send(e.message)
      }
    });
  
    ws.on('close', () => {
      console.log('Client WS disconnected');
    });
  });
}

// wsServer.clients.forEach((client) => {
//   if (client !== ws && client.readyState === WebSocketServer.OPEN) {
//     client.send(message);
//   }
// });

export default configureSocket