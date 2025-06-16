import passport from "passport";
import { Strategy as GoogleStrategy} from "passport-google-oauth20";
import dotenv from 'dotenv';
import express from 'express';
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
    const user = {
        googleId: profile.id,
        email: profile.emails?.[0].value,
        name: profile.displayName
    };
    console.log(profile);
    console.log("====================")
    console.log(accessToken);
    done(null, user);
    return;
});

passport.use(googleStrategy);

