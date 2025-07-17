import { use } from "react";
import { generateToken } from "../config/util";
import { User } from "../models/user.model";
import bcrypt from 'bcryptjs';

export const signup = async (req, res)=>{
    const {name,email,password,bio} = req.body;
    try {
        if(!name || !email || !password || !bio){
            return res.json({success : false, message : "missing details"});
        }

        const user = await User.findOne({email});

        if(user){
            return res.json({success : false, message : "User already exist!"});
        }

        const salt = await bcrypt.genSalt(10);

        console.log(salt);

        const new_password = await bcrypt.hash(password,salt);

        const newUser = await User.create({email,name,password : new_password,bio});

        const token = generateToken(newUser._id);

        res.json({success : true, userdata : newUser, token, message : "User created"});

    } catch (error) {
        console.log(error.message);
        res.json({success : false , message : error.message});
    }
}

export const login = async (req, res)=>{
    try {
        const {email,password} = req.body;
    
        const user = await User.findOne({email});
    
        if(!user){
            return res.json({success : false, message : "User not exist"});
        }
    
        const ispasswordcorrect = await bcrypt.compare(password,user.password);
    
        if(!ispasswordcorrect){
            return res.json({success : false, message : "invalid credentials"})
        }
    
        const token = generateToken(user._id);
    
        res.json({success : true, userdata:user, token, message : "successfully login!"});

    } catch (error) {
        console.log(error);

        res.json({success : false, message : error.message});

    }
}

