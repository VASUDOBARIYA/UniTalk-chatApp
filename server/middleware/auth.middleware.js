import jwt from 'jsonwebtoken'
import { User } from '../models/user.model.js';

export const protectRoute = async (req, res, next)=>{
    try {
        const token = req.headers.token;

        const decodedtoken = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decodedtoken)

        const user = await User.findById(decodedtoken.user_id).select("-password");
        console.log(user)

        if(!user){
            return res.json({success : false, message : "User not fonud"});
        }

        req.user = user;

        next();
        
    } catch (error) {
        console.log(error);

        res.json({success : false, message : error.message});
    }
}