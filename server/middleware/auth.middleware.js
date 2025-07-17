import jwt from 'jsonwebtoken'
import { User } from '../models/user.model';


export const protectRoute = (req, res, next)=>{
    try {
        const token = req.headers.token;

        const decodedtoken = jwt.verify(token,process.env.JWT_SECRET);

        const user = User.findById(decodedtoken.userId).select("-password");

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