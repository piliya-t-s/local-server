import grpc from '@grpc/grpc-js'
import protoLoader from '@grpc/proto-loader'
import WebSocket from 'ws';

class GRPCService {
    constructor (grpcServer, params) {
       
        const packageDef = protoLoader.loadSync(params.protoFile, {})
    const hostPackage = grpc.loadPackageDefinition(packageDef).hostApi
        
        grpcServer.addService(hostPackage.Host.service, {
            "createRoom": this.createRoom,
            "getRoom": this.getRoom
        })
    }

    createRoom(call, callback) {
        console.log(call)
        callback(null, call.request)
    }
    
    getRoom(call, callback) {
        console.log(call)
    }
}

export default GRPCService