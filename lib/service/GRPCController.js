import grpc from '@grpc/grpc-js'
import protoLoader from '@grpc/proto-loader'

class GRPCController {
    constructor (grpcServer, roomService, params) {
        this.grpcServer = grpcServer
        this.roomService = roomService
        const packageDef = protoLoader.loadSync(params.protoFile, {})
        const hostPackage = grpc.loadPackageDefinition(packageDef).hostApi
        
        this.grpcServer.addService(hostPackage.Host.service, {
            "createRoom": this.createRoom.bind(this),
            "getRoom": this.getRoom.bind(this)
        })
    }

    createRoom(call, callback) {
        let newRoom = this.roomService.createRoom(call.request)
        callback(null, {"id" : newRoom.id})
    }
    
    getRoom(call, callback) {
        console.log(call)
    }

    start (port) {
        this.grpcServer.bindAsync(`localhost:${port}`, grpc.ServerCredentials.createInsecure(), () => {
            this.grpcServer.start()
        })
    }
}

export default GRPCController