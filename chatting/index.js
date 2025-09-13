const express = require('express');
const http = require('http');

const app = express();
const httpServer = http.createServer(app);
const { Server } = require('socket.io')

const io = new Server(httpServer);

//Socket.io
io.on("connection", (socket) => {
    socket.on("user-message", (message) => {
        console.log("message from user: ", message);
        io.emit("user-message", message);
    })
    console.log("a user connected", socket.id);
})

app.use(express.static('/public'));

app.get("/", (req,res) => {
    res.sendFile(__dirname + '/public/index.html');
})

httpServer.listen(9000, () => { console.log('Connect to chatting server at http://localhost:9000' ) });