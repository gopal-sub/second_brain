import passport from "passport";
import { Strategy as GitHubStrategy} from "passport-github2";
import express from 'express';
import { findUserByEmail, CreateUser} from "../services/userService";
import { Iuser } from "../models/userModel";


const githubStrategy = new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID!,
    clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    callbackURL: 'http://localhost:3000/api/v1/user/auth/github/callback',
    passReqToCallback: true,
    scope: ['user:email'],
    allRawEmails: true
    //@ts-ignore
  }, async (req, accessToken, refreshToken, profile: any, done)=> {
    try{
        const emailGithub = profile.emails[0].value;
        const githubId = profile.id;
        const usernameGithub = profile.username;

        const userExists = await findUserByEmail(emailGithub);
        if(userExists){
            // either link account to github or login
            return;
        }else{
            const userCreate: Partial<Iuser> = {
                email: emailGithub,
                username: usernameGithub,
                githubID: parseInt(githubId),
                creationDate: new Date()
            }
            const createdUser = await CreateUser(userCreate);
            done(null, createdUser);
        }

        //create user
        
    }catch(err){
        return done(null, false, { msg: err });
    }
})

passport.use(githubStrategy);