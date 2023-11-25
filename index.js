import grpc from '@grpc/grpc-js'
import http from 'http';
import RoomService from './lib/service/RoomService.js'
import WsServerFactory from './lib/service/WsServerFactory.js';
import configureServer from './lib/server/configureServer.js';
import configureGRPC from './lib/server/configureGRPC.js';
import 'dotenv/config'

const WSFactory = new WsServerFactory();
const roomService = new RoomService(WSFactory);
const server = http.createServer();
const grpcServer = new grpc.Server()

configureServer(server, roomService)
configureGRPC(grpcServer, {
    "protoFile": "api.proto", 
    "roomService": roomService
})

grpcServer.bindAsync(`localhost:${process.env.GRPC_PORT}`, grpc.ServerCredentials.createInsecure(), () => {
    grpcServer.start()
})

server.listen(80, () => {
  server.once('close', () => {
    console.log('HTTP server closed')
  });
});

console.log(roomService.createRoom({"id": "1000"}))