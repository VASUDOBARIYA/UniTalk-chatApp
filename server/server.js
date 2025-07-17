import express from 'express';
import http from 'http';
import 'dotenv/config';
import cors from 'cors';
import connectDB from './config/db.js'

const app = express();
const server = http.createServer(app);

app.use(express.json({limit:'4mb'}));
app.use(cors());

await connectDB();

app.use("/api/status", (req, res)=>{
    res.send("Server is live");
})

const port = process.env.PORT || 5000;

server.on('error', (err) => 
    {console.error('Server error:', err);
});

server.listen(port, ()=>{
    console.log("server is running on :" + port);
})