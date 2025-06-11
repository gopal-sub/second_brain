import express from 'express'
import * as userServices from '../services/userService'

export async function createUser(req: express.Request, res: express.Response){
    const email:string = req.body.email;
    const password:string = req.body.password;
    const user_exits = await userServices.findUserByEmail(email);
    if(user_exits){
        res.json({
            msg: "A user with email exists try logging in"
        });
        return;
    }
    const user = await userServices.CreateUser(email, password);
    res.json({
        msg: "User created"
    })
    return;
    



}
export async function siginUser(req: express.Request, res: express.Response){
    res.json({
        msg: "This is the create user route"
    });
    return;
}

