import { WebSocketServer }  from 'ws';

function configureSocket(wss){
    wss.on('connection', (ws) => {
        // Event listener for when a client connects
        console.log('Client connected ', wss);
      
        // Event listener for messages from the client
        ws.on('message', (message) => {
          console.log(`Received message: ${message}`);
      
          // Broadcast the message to all connected clients
          wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocketServer.OPEN) {
              client.send(message);
            }
          });
        });
      
        // Event listener for when a client disconnects
        ws.on('close', () => {
          console.log('Client disconnected');
        });
      });
}

export default configureSocket