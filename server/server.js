import express from 'express';
import http from 'http';
import 'dotenv/config';
import cors from 'cors';
import connectDB from './config/db.js'
import userRouter from './routes/user.router.js';
import messageRoute from './routes/message.router.js';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);


//initianize socket.io server
export const io = new Server(server,{cors : {origin : "*"}});

//store online users
export const onlineUsers = {} // key->userId , value->socketId
 io.on("connection",(socket)=>{
    const userId = socket.handshake.query.userId;
    console.log("User connected -> ",userId);

    if(userId){
        onlineUsers[userId] = socket.id;
    }

    //emit online users to all connected client
    io.emit('getonlineusers',Object.keys(onlineUsers))

    socket.on('disconnect',()=>{
        console.log("User disconnect -> ",userId);
        delete onlineUsers[userId];

        io.emit('getonlineusers',Object.keys(onlineUsers))
    })
 })
 

           
app.use(express.json({limit:'4mb'}));
app.use(cors());

await connectDB();

// Router
app.use("/api/status", (req, res)=>{res.send("Server is live")});
app.use("/api/user", userRouter);
app.use("/api/messages", messageRoute);


server.on('error', (err) => 
    {console.error('Server error:', err);
});

if(process.env.NODE_ENV !== "production"){
    const port = process.env.PORT || 5000;

    server.listen(port, ()=>{
        console.log("server is running on :" + port);
    })
}

export default server;

