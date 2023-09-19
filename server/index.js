const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        origin: "*",  // Adjust according to your needs
    }
});

io.on('connection', (socket) => {
    console.log('User connected');

    socket.on('audioBlob', (audioData) => {
        // Broadcast audioBlob to all connected clients
        socket.broadcast.emit('audioBlob', audioData);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const port = 4000;
server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
