import express from 'express'
import { getMessage, getUserForSidebar, markMessagesAsSeen, sendMessages } from '../controller/message.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const messageRoute = express.Router();

messageRoute.get('/users',protectRoute, getUserForSidebar)
messageRoute.get('/:id',protectRoute, getMessage)
messageRoute.put('/markasseen/:id',protectRoute, markMessagesAsSeen)
messageRoute.post('/send/:id', protectRoute, sendMessages)

export default messageRoute