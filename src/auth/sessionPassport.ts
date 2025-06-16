import passport, { use } from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import * as userServices from '../services/userService';
import * as authServices from '../services/authService';
import { Iuser } from '../models/userModel';
import { Types } from 'mongoose';


passport.serializeUser((user: any, done: (error: any, user?: any, info?: any) => void)=>{
    console.log("hi sere");
    console.log(user._id);
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