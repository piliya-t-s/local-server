import { PassThrough } from 'stream'
import duplexify from 'duplexify';
function configureStream (server, roomService) {
   server.on('request', (req, res) => {
      const match = req.url.match(/^\/room\/(\d+)\/stream$/);
      console.log('got a connect', req.url)
      if (!match) {
         res.writeHead(404);
         res.end();
         return
      }

       // Set the response header to audio/mpeg for MP3 files
       res.setHeader('Content-Type', 'audio/mpeg');
       
       let targetRoom = null;
       targetRoom = roomService.getRoomById(match[1])

       if(!targetRoom){
         return
       }

       let player = targetRoom.player   
       if (player) {
         console.log("player: ", player)
         
         let stream = player.getOutput()

         stream.pipe(res, {end: false})     
       }
     });
}

export default configureStream