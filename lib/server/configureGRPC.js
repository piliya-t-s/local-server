import grpc from '@grpc/grpc-js'
import protoLoader from '@grpc/proto-loader'

function configureGRPC (grpcServer, params) {
    const packageDef = protoLoader.loadSync(params.protoFile, {})
    const hostPackage = grpc.loadPackageDefinition(packageDef).hostApi
    
    grpcServer.addService(hostPackage.Host.service, {
        "createRoom": createRoom,
        "getRoom": getRoom
    })
    
    function createRoom(call, callback) {
        console.log(call)
        callback(null, call.request)
    }
    
    function getRoom(call, callback) {
        console.log(call)
    }
    
}

export default configureGRPC