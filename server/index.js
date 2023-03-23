const express = require('express')
const app = express()
const http = require('http')
const { Server } = require("socket.io")
const cors = require('cors')

app.use(cors())
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ['GET', 'POST']
    }
});

io.on('connection', (socket) => {
    console.log('user connected:', socket.id);

    // for room
    socket.on('join_room', (data) => {
        socket.join(data)
    })

    // for all
    socket.on("send_msg", (data) => {
        socket.broadcast.emit('receive_msg', data)
    })

    // for room
    socket.on("send_msg", (data) => {
        socket.to(data.room).emit('receive_msg', data)
    })
})



server.listen(8080, () => {
    console.log('server connected');
})