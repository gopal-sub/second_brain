import passport from "passport";
import { Strategy as GoogleStrategy} from "passport-google-oauth20";
import dotenv from 'dotenv';
import express from 'express';
import {findUserByEmail} from '../services/userService';
import { CreateUser } from "../services/userService";
dotenv.config();

const googleStrategy = new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: "/auth/google/callback",
    passReqToCallback: true
    //@ts-ignore
}, async (req: express.Request, accessToken: string, refreshToken: string, profile, done)=>{
    //get email from google and see if exists in db
    // y -> user session exist and email does not match => req.user= jack@gmail.com, google -> john@gmail.com
    // if all good done(null, user)
    // useremail and google email match but google account not linked
    // n -> createuser
    try{
        const emailGoogle = profile.emails?.[0].value;
        const nameGoogle = profile.displayName;
        const googleId = profile.id;
        const userExists = await findUserByEmail(emailGoogle);
            
        if(userExists){
            //@ts-ignore
            if(req.user && req.user.email !== emailGoogle){
                done(null, false, {msg: "google account email does not match user account email"})
                return;
            }
            //link google to existing account
        
        }else{
            const userCreated = await CreateUser(emailGoogle) || undefined;
            console.log(userCreated);
            done(null, userCreated);
            return;
        }

    }catch(err){
        return done(null, false, { msg: err });
    }
    
});

passport.use(googleStrategy);

