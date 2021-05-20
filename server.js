const express = require('express')
var cors = require('cors')
const app = express()
const http = require("http")
app.use(cors())
const server = http.createServer(app)
var io = require('socket.io')(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

io.on('connection', socket => {
    debugger;
    socket.emit('me', socket.id);

    socket.on('disconnect', () => {
        console.log('Disconnected')
        socket.broadcast.emit("callEnded")
    })

    socket.on('callUser', (data) => {
        debugger
        io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name }) // this data will come from the front end 
    })

    socket.on('answerCall', (data) => {
        io.to(data.to).emit("callAccepted", data.signal)
    })

    socket.on('pageload', (data) => {
        io.to(data.to).emit("callAccepted", data.signal)
    })
});
server.listen(5000, () => console.log("Server is running on port 5000...!!"))