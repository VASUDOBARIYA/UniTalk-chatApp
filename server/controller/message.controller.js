import { Message } from "../models/message.model.js";
import { User } from "../models/user.model.js";
import cloudinary from "../config/cloudinary.js"
import { io,onlineUsers } from '../server.js'

//get all user expect logged in User
export const getUserForSidebar = async (req,res)=>{
    try {
        const userId = req.user._id;

        const fillterUser = await User.find({_id: {$ne: userId}}).select('-password');

        //count number of messages that are not seen
        const messages = {};
        const promises = fillterUser.map(async (user)=>{
            const msg = await Message.find({senderId : user._id, receiverId : userId, seen : false});

            if(msg.length > 0){
                messages[user._id] = msg.length;
            }
        })

        await Promise.all(promises)

        res.json({success : true, users : fillterUser, messages});
    } 
    catch (error) {
        //console.log(error.message)
        res.json({success : false, message:error.message})
    }
}

//get all messages for selected user
export const getMessage = async (req,res)=>{
    try {
        const userId = req.user._id;
        const {id : friendId} = req.params;
        
        const Chat = await Message.find({$or : [
            {senderId:userId, receiverId:friendId},
            {senderId:friendId, receiverId:userId}
        ]})

        await Message.updateMany({senderId:friendId, receiverId:userId},{seen:true});

        res.json({success:true, messages:Chat})

    } catch (error) {
        //console.log(error.message);
        res.json({success:false, message:error.message})
    }
}

//api to mark messages as seen using messages
export const markMessagesAsSeen = async (req,res)=>{
    try {
        const {id : msgId} = req.params;
    
        await Message.findByIdAndUpdate(msgId,{seen:true});
    
        res.json({success:true});
    } catch (error) {
        //console.log(error.message)
        res.json({success:false, message:error.message})
    }
}

//api to send a messages
export const sendMessages = async (req,res)=>{
    try {
        const {text, image} = req.body;
        const friendId = req.params.id;
        const userId = req.user._id;

        let imageurl; 

        if(image){
            //console.log("welcome cloudimage");
            const cloudinaryimg = await cloudinary.uploader.upload(image);
            imageurl = cloudinaryimg.secure_url;
        }
        //console.log("imageurl", imageurl)

        const newmsg =  await Message.create({senderId:userId, receiverId:friendId, text, image:imageurl})

        //emit new message to reciver socket
        const receiverSocketId = onlineUsers[friendId];

        if(receiverSocketId){
            io.to(receiverSocketId).emit('newMessage',newmsg);
        }

        res.json({success:true, message:"message send!", newmsg})

    } catch (error) {
        //console.log(error.message);
        res.json({success:false, message:error.message});   
    }
}