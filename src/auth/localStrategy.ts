import passport, { use } from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import * as userServices from '../services/userService';
import * as authServices from '../services/authService';
import { Iuser } from '../models/userModel';
import { Types } from 'mongoose';
import './googleStrategy';



const localLoginStrategy = new LocalStrategy(
    { usernameField: 'email' },
    async (email: string,password: string, done: (error: any, user?: any, info?: any) => void)=>{
    const user = await userServices.findUserByEmail(email);
    
    if(!user){
        done(null, false, {msg: "user does not exist"});
        return;
    }
    const isValid = await authServices.verifyPassword(user, password);

    if(isValid){
        return done(null, user);
    }else{
        return done(null, false, {msg: "incorrect password"});
    }
        
});

passport.use(localLoginStrategy);


export default passport;