
function parseCookies(request) {
    const list = {};
    const cookieHeader = request.headers?.cookie;
    if (!cookieHeader) return list;
 
    cookieHeader.split(`;`).forEach(function(cookie) {
        let [ name, ...rest] = cookie.split(`=`);
        name = name?.trim();
        if (!name) return;
        const value = rest.join(`=`).trim();
        if (!value) return;
        list[name] = decodeURIComponent(value);
    });
 
    return list;
 }


function privateAuth (room) {

}

function publicAuth (room) {
    room.authUpgrade = (request, socket, head) => {
        room.handleUpgrade(request, socket, head, function done(ws) {
            room.emit('connection', ws, request);
        });
    }
}

export { privateAuth, publicAuth }