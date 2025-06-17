import express from 'express'
import * as userServices from '../services/userService'
import * as authServices from '../services/authService'
import passport from '../auth/localStrategy';
import { Iuser, UserModel } from '../models/userModel';

export async function createUser(req: express.Request, res: express.Response){
    const email:string = req.body.email;
    const password:string = req.body.password;
    const username:string = req.body.username;
    const user_exits = await userServices.findUserByEmail(email);
    if(user_exits){
        res.status(409).json({
            msg: "A user with email exists try logging in"
        });
        return;
    }
    const userCreate: Partial<Iuser> = {
        email: email,
        password: password,
        username: username,
        googleID: null,
        githubID: null,
        creationDate: new Date()
    }
    const user = await userServices.CreateUser(userCreate);
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

export function destroyUserSession(req: express.Request, res: express.Response){
    req.session.destroy((err)=>{
        if(err){
            res.status(500).json({msg:"There was a issue destroying the session"})
        }
    });

    res.clearCookie('connect.sid');
    res.status(200).json({
        msg: "Logged out successfully"
    })

}

export async function resetPassword(req: express.Request, res: express.Response){
    const currentPassword = req.body.password;
    const newPassword = req.body.newPassword;
    const email = String(req.user);

    try{
        const user = await userServices.findUserByEmail(email);
        if(!user){
            res.status(404).json({
                msg:"User does not exist"
            })
            return;
        }
       
        if(await authServices.verifyPassword(user, currentPassword)){
            const newHashedPassword = await authServices.hash_password(newPassword);
            console.log(newHashedPassword)
            const updatedUser = await UserModel.findByIdAndUpdate(user._id, {
                password: newHashedPassword
            });
            res.status(200).json({
                msg: "password updated"
            });
            console.log(updatedUser);
            return
        
        }   

    }catch(e){
        res.status(500).json({
            msg:"There was an issue updating the password"
        });
    }
    

}

