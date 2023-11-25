import grpc from '@grpc/grpc-js'
import path from 'path';
import http from 'http';
import RoomService from './lib/service/RoomService.js'
import GRPCController from './lib/service/GRPCController.js';
import 'dotenv/config'
import WebSocketRoomFactory from './lib/service/WebSocketRoomFactory.js';
import { parseRoomId  } from './lib/server/parseUrl.js';

const webSocketRoomFactory = new WebSocketRoomFactory()
const roomService = new RoomService(webSocketRoomFactory)
const server = http.createServer()
const grpcServer = new grpc.Server()


const gprcController = new GRPCController(grpcServer, roomService, {
    "protoFile": path.join(process.cwd(), "api.proto")
})

gprcController.start(process.env.GRPC_PORT)

server.on('upgrade', function upgrade(request, socket, head) {
    let id = parseRoomId(request.url)

    if (id == null) { // url did not match the room template at all
        socket.destroy();
        return
    } 
    
    let targetRoom = null;
    targetRoom = roomService.getRoomById(id)
    console.log(targetRoom)
    targetRoom.authUpgrade(request, socket, head)
})


server.listen(80, () => {
  server.once('close', () => {
    console.log('HTTP server closed')
  });
});
