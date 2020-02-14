import socketio from 'socket.io'
let io

export const sock = {
    init: httpServer => {
        io = socketio(httpServer)
        return io
    },
    getIo: () => {
        if(!io) {
            throw new Error('Socket.io no initialized')
        }

        return io
    }
}