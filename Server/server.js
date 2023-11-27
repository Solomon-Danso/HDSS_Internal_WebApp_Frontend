const express = require('express');
const app = express();
const server = require('http').Server(app)
const cors = require('cors')

app.use(cors)

const io = require('socket.io')(server,{
    cors:{
        origin:"*",
        methods:["GET", "POST"]
    }
});
const {v4:uuidV4 } = require('uuid')





io.on("connection", socket =>{
   
    socket.on("join-room", (roomId, userId)=>{
        console.log("user joined room: " + roomId+" with id: " + userId)
        socket.join(roomId)
        socket.to(roomId).emit('user-connected',userId)
        socket.on('disconnect', ()=>{
            socket.to(roomId).emit('user-disconnected',userId)
        })

        socket.on('reload-page', () => {
            // Emit the 'reload-page' event to all connected clients in the room
            io.to(roomId).emit('reload-page');
        });

    })

})





server.listen(4000)