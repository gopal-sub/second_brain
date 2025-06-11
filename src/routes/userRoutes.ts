import express from 'express'
import * as userController from '../controller/userController'


const Router = express.Router;
export const userRouter = Router();

userRouter.post('/signup', userController.createUser);
userRouter.post('/signin', userController.siginUser);