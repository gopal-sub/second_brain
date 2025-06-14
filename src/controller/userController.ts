import express from 'express'
import * as userServices from '../services/userService'
import * as authServices from '../services/authService'
import passport from '../auth/localStrategy';

export async function createUser(req: express.Request, res: express.Response){
    const email:string = req.body.email;
    const password:string = req.body.password;
    const user_exits = await userServices.findUserByEmail(email);
    if(user_exits){
        res.status(409).json({
            msg: "A user with email exists try logging in"
        });
        return;
    }
    const user = await userServices.CreateUser(email, password);
    res.status(200).json({
        msg: `User created with email ${user.email}` 
    })
    return;
    



}
export async function signinUser(req: express.Request, res: express.Response){
    //find if user and password match
    //if y make token and send
    const email:string = req.body.email;
    const password:string = req.body.password;


    const user = await userServices.findUserByEmail(email);
    if(!user){
        res.status(404).json({
            msg:"User does not exist"
        })
        return;
    }
    if(await authServices.verifyPassword(user, password)){
        const jwt_token = authServices.createJWT(user);
        res.json({
            msg:"you are signed in",
            jwt: jwt_token
        })
    }else{
        

        res.status(401).json({
            msg: "incorrect password",
        })
        return;
    }
    
}

export async function signinUser_passport(req: express.Request, res: express.Response, next: express.NextFunction){
    passport.authenticate('local', {
        successRedirect: 'http://localhost:3000/api/v1/brain/brains',
        failureRedirect: 'login'
    })(req, res, next)
}

