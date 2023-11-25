import grpc from '@grpc/grpc-js'
import protoLoader from '@grpc/proto-loader'
import http from 'http';
import path from 'path';
import RoomService from './lib/service/RoomService.js'
import WsServerFactory from './lib/service/WsServerFactory.js';
import configureServer from './lib/server/configureServer.js';

const packageDef = protoLoader.loadSync("api.proto", {})
const hostPackage = grpc.loadPackageDefinition(packageDef).hostApi
const grpcServer = new grpc.Server()



grpcServer.addService(hostPackage.Host.service, {
    "createRoom": createRoom,
    "getRoom": getRoom
})

function createRoom(call, callback) {
    console.log(call)
}

function getRoom(call, callback) {
    console.log(call)
}

grpcServer.bindAsync("localhost:9000", grpc.ServerCredentials.createInsecure(), () => {
    grpcServer.start()
})

// const server = http.createServer();
// const WSFactory = new WsServerFactory();
// const roomService = new RoomService(WSFactory);

// configureServer(server, roomService)
// // configureExpress(app, roomService)

// server.listen(80, () => {
//   const address = server.address();
//   console.log(address);

//   server.once('close', () => {
    
//   });
// });
