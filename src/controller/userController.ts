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
    if(user === null){
        res.status(200).json({
        msg: `There was an issue with creating the user account ` 
    });
    return;
    }
    res.status(200).json({
        msg: `User created with email ${user.email}` 
    })
    return;
    



}
//===========================NOT USED METHOD=============================
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

export async function createUserSession(req: express.Request, res: express.Response, next: express.NextFunction){
     passport.authenticate(
    'local',
    (err: any, user: Express.User | false, info: { message?: string } | undefined) => {
        if (err) {
        next(err);
        return;
        }

        if (!user) {
        res.status(401).json({ message: info?.message || 'Login failed' });
        return;
        }

        req.logIn(user, (err: any) => {
            if (err) return next(err);
            res.status(200).json({ message: 'Logged in', user });
            return;
        });
    }
  )(req, res, next);
}

