import http from 'http'
import ffmpeg from 'fluent-ffmpeg'
import path from 'path';

function configureStream (server, roomService) {
   server.on('request', (req, res) => {
      const match = req.url.match(/^\/room\/(\d+)\/stream$/);

      if (!match) {
         res.writeHead(404);
         res.end();
         return
      }

       // Set the response header to audio/mpeg for MP3 files
       res.setHeader('Content-Type', 'audio/mpeg');
       
       let targetRoom = null;
       targetRoom = roomService.getRoomById(match[1])
      
       let player = targetRoom.player   
       if (player) {
         console.log("player: ", player)
         player.stream.pipe(res, { end: false });
         return
       }

       console.log('no stream in that room')
     });
}

export default configureStream