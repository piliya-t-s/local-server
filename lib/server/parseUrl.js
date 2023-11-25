function parseRoomId (str) {
    const urlTemplate = '/room/:id';
    const urlRegex = new RegExp(`^${urlTemplate.replace(/:\w+/g, '([^\\/]+)')}$`);
    let match = str.match(urlRegex)
    if (match) {
        return match[1]
    } else {
        return null;
    }
}

export {parseRoomId}