import express from 'express'
import * as userController from '../controller/userController'
import {userValidatorInput} from '../middlewares/userValidatorMiddleware'



const Router = express.Router;
export const userRouter = Router();

userRouter.post('/signup', userValidatorInput, userController.createUser);
userRouter.post('/signin', userValidatorInput,userController.signinUser);