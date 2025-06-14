import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import * as userServices from '../services/userService';
import * as authServices from '../services/authService';
import { Iuser } from '../models/userModel';



const stdLoginStrategy = new LocalStrategy({ usernameField: 'email' },async (email: string,password: string, done: (error: any, user?: any, info?: any) => void)=>{
    
    const user = await userServices.findUserByEmail(email);
    if(!user){
        return done(null, false, {msg: "user does not exist"});
    }
    const isValid = await authServices.verifyPassword(user, password);

    if(isValid){
        return done(null, user);
    }else{
        return done(null, false, {msg: "incorrect password"});
    }
        
});

passport.use(stdLoginStrategy);

passport.serializeUser((user: any, done: (error: any, user?: any, info?: any) => void)=>{
    done(null, user.email);
});

passport.deserializeUser(async (email: string, done)=>{
    const user = await userServices.findUserByEmail(email);
    if(!user){
        done("user not found");
        return;
    }if (email === user.email) {
        done(null, user)
    }
});

export default passport;