import express from 'express'
import { getMessage, getUserForSidebar, markMessagesAsSeen } from '../controller/message.controller';
import { protectRoute } from '../middleware/auth.middleware';

const messageRoute = express.Router();

messageRoute.get('/users',protectRoute,getUserForSidebar)
messageRoute.get('/:id',protectRoute,getMessage)
messageRoute.put('/markasseen/:id',markMessagesAsSeen)

export default messageRoute