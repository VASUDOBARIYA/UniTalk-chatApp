import mongoose from 'mongoose'

const connectDB = async ()=>{
    try {
        mongoose.connection.on('connected',()=>{
            console.log("Database connected successfully!")
        })
        await mongoose.connect(`${process.env.MONGO_URL}/chat-app`)
    } catch (error) {
        console.log("error in DBconnection",error);
    }
}

export default connectDB;