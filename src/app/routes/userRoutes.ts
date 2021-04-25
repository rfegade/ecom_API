import { userController } from '../controllers/userController';
import * as express from 'express';
import { validateUser } from '../middleware/auth';

export const userRoute = express.Router();

userRoute.get('/', validateUser, userController.getProfile);
userRoute.post('/login', userController.login);
userRoute.post('/registration', userController.registration);
userRoute.put('/updateProfile', validateUser, userController.updateProfile);
