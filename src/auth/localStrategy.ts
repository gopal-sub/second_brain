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

passport.serializeUser((user: any, done: (error: any, user?: any, info?: any) => void)=>{
    done(null, user._id );
});


passport.deserializeUser(async (id: string, done)=>{
    try {
        if(!Types.ObjectId.isValid(id)){
            return done(null, false);
        }
        const userID: Types.ObjectId = new Types.ObjectId(id);
        
        const user = await userServices.findUserByID(userID);

        if (!user) {
            return done(null, false); 
        }
        done(null, user);// => req.user = Iuser
    }catch (err) {
        done(err);
    }
});

export default passport;