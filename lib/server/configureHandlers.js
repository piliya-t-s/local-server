function configureHandlers(room) {
    room.on('connection', (ws, request) => {
        ws.id = Date.now().toString().slice(-5)
        console.log(request)
        console.log(`Client ${ws.id} connected to room ${room.id}`)

        ws.on('message', (data, isBinary) => {    
            console.log(`User ${ws.id} sent a message to room ${room.id}: ${data}`)
            let message = null

            try {
                message = JSON.parse(data)
            } catch (e) {
                ws.send(`An error occured while parsing WebSocket message: ${e}`)
                console.log(`An error occured while parsing WebSocket message: ${e}, by user ${ws.id}`)
                return
            }

            try {
                room.handleMessage(ws, message)
            } catch (e) {
                ws.send(`An error occured while handling WebSocket message: ${e}`)
                console.log(`An error occured while handling WebSocket message: ${e}, by user ${ws.id}`)
                return
            }       
        })

        ws.on('close', (code, reason) => {
            console.log(`User ${ws.id} left room ${room.id}`)
        })
    })
}

export default configureHandlers