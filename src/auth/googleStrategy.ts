import passport from "passport";
import { Strategy as GoogleStrategy} from "passport-google-oauth20";
import express from 'express';
import {findUserByEmail} from '../services/userService';
import { CreateUser } from "../services/userService";
import { Iuser } from "../models/userModel";


const googleStrategy = new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: "http://localhost:3000/api/v1/user/auth/google/callback",
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
            //try to link google account or login
            if(req.user && req.user.email !== emailGoogle){
                done(null, false, {msg: "google account email does not match user account email"})
                return;
            }
            if(!userExists.googleID){
                //link google to their account
                //update user details not implemented
                done(null, userExists);
                return;
            }else{
                done(null, userExists, {msg:"Account already linked to Google"});
                return;
            }
            
            //link google to existing account
        
        }else{
            //create a user with google cred
            const userCreate: Partial<Iuser> = {
                    email: emailGoogle,
                    username: nameGoogle,
                    googleID: parseInt(googleId),
                    creationDate: new Date()
            }
            const userCreated = await CreateUser(userCreate) || undefined;
            done(null, userCreated);
            return;
        }

    }catch(err){
        return done(null, false, { msg: err });
    }
    
});

passport.use(googleStrategy);

