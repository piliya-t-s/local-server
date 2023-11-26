import grpc from '@grpc/grpc-js'
import path from 'path';
import http from 'http';
import RoomService from './lib/service/RoomService.js'
import GRPCController from './lib/service/GRPCController.js';
import 'dotenv/config'
import WebSocketRoomFactory from './lib/service/WebSocketRoomFactory.js';
import configureUpgrade from './lib/server/configureUpgrade.js';
import configureStream from './lib/server/configureStream.js';

const webSocketRoomFactory = new WebSocketRoomFactory()
const roomService = new RoomService(webSocketRoomFactory)
const server = http.createServer()
const grpcServer = new grpc.Server()

const gprcController = new GRPCController(grpcServer, roomService, {
    "protoFile": path.join(process.cwd(), "api.proto")
})

configureUpgrade(server, roomService)
configureStream(server, roomService)
gprcController.start(process.env.GRPC_PORT)

server.listen(80, () => {
  server.once('close', () => {
    console.log('HTTP server closed')
  });
});

roomService.createRoom({"id":"123", "isPublic": true})