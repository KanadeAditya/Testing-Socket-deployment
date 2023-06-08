const express = require("express");
const app = express();
const socket = require("socket.io");
const http = require("http");
const path = require('path');

app.use(express.static(path.join(__dirname,'public')))
const httpserver = http.createServer(app);

const io = socket(httpserver,{
    cors:{
        origin:"*"
    }
});

// const defult_NPS = io.of("/") ; 

const {userJoin, allusers,getcurrentUser,userleave} = require("./utils/users.js")
const {formatmsg} = require("./utils/message.js");


io.on("connection",(socket)=>{
    console.log("new client is connected");
    // console.log(socket.id)

    socket.on("joinroom",({username,room})=>{
        // console.log(data)
        const user = userJoin(socket.id,username,room)

        socket.join(user.room)

        socket.emit("message",formatmsg("Masai Server","welcome to masai server"));

        socket.broadcast.to(user.room).emit("message",formatmsg(username,`${username} has joined the chat`))

       
        io.to(room).emit("roomuser",{
            room:user.room,
            users:allusers(user.room)
        })
    })

    

    socket.on("chatmessage",(msg)=>{
        const user = getcurrentUser(socket.id);
    // console.log(msg)
        io.to(user.room).emit("message",formatmsg(user.username,msg))
    })

    socket.on("disconnect",()=>{
        console.log("One client disconnected")
        const user = userleave(socket.id);
        console.log(user)
        socket.broadcast.to(user.room).emit("message",formatmsg(user.username,`${user.username} has left the chat`))
    })
})

httpserver.listen(5050,()=>{
    console.log("Server is running")
})