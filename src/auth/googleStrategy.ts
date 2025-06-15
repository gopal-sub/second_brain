import passport from "passport";
import { Strategy as GoogleStrategy} from "passport-google-oauth20";
import dotenv from 'dotenv';
dotenv.config();

const googleStrategy = new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: "/auth/google/callback",
    passReqToCallback: true
    //@ts-ignore
}, async (req, accessToken, refreshToken, profile, done)=>{
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

