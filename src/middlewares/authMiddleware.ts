import express from 'express'
import {verifyJWT} from '../services/authService'

export function verifyToken(req: express.Request, res: express.Response, next: express.NextFunction){
    const token = req.headers.authorization;
    console.log(token)
    if(!token){
        res.status(401).json({
            msg: "no token provided"
        })
        return;
    }
    const verify_user = verifyJWT(token);
    if(verify_user){
        req.body.user = verify_user
        next();
    }else{
        res.status(401).json({
            msg: "invalid token provided"
        })
        return;

    }
}