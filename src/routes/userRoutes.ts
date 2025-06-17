import express from 'express';
import * as userController from '../controller/userController';
import {userValidatorInputCreateUser, userValidatorInputSession} from '../middlewares/userValidatorMiddleware';
import passport from 'passport';
import {verifyCookie} from '../middlewares/authMiddleware'



const Router = express.Router;
export const userRouter = Router();

userRouter.post('/signup', userValidatorInputCreateUser, userController.createUser);
userRouter.post('/login', userValidatorInputSession,userController.createUserSession);
userRouter.get('/logout',userController.destroyUserSession);
userRouter.put('/resetPassword',verifyCookie, userController.resetPassword);

userRouter.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

userRouter.get('/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login',
    successRedirect: 'http://localhost:3000/api/v1/brain/brains' 
  })
);

userRouter.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] 

}));

userRouter.get('/auth/github/callback', 
  passport.authenticate('github', { 
    failureRedirect: '/login',
    successRedirect: 'http://localhost:3000/api/v1/brain/brains'
}));
