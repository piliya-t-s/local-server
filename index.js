import grpc from '@grpc/grpc-js'
import path from 'path';
import http from 'http';
import RoomService from './lib/service/RoomService.js'
import conficonfigureServergureAuth from './lib/server/configureServer.js';
import GRPCService from './lib/service/GRPCService.js';
import 'dotenv/config'
import configureServer from './lib/server/configureServer.js';
import WebSocketRoomFactory from './lib/service/WebSocketRoomFactory.js';

const webSocketRoomFactory = new WebSocketRoomFactory()
const roomService = new RoomService(webSocketRoomFactory)
const server = http.createServer()
const grpcServer = new grpc.Server()



const grpcService = new GRPCService(grpcServer, {
    "protoFile": path.join(process.cwd(), "api.proto")
})

configureServer(server, roomService)

grpcServer.bindAsync(`localhost:${process.env.GRPC_PORT}`, grpc.ServerCredentials.createInsecure(), () => {
    grpcServer.start()
})

server.listen(80, () => {
  server.once('close', () => {
    console.log('HTTP server closed')
  });
});

console.log(roomService.createRoom({"id": "1000", isPublic: true}))