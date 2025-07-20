import express from 'express'
import { 
    signup,
    login, 
    checkAuth,
    updateProfile
} from '../controller/user.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const userRouter = express.Router();

userRouter.post('/signup', signup);
userRouter.post('/login', login);
userRouter.get('/check', protectRoute, checkAuth);
userRouter.post('/update-profile', protectRoute, updateProfile);

export default userRouter;