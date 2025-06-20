import express from 'express'
import {verifyJWT} from '../services/authService'

export function verifyToken(req: express.Request, res: express.Response, next: express.NextFunction){
    const token = req.headers.authorization;
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
            msg: "invalid token provided "
        })
        return;

    }
}

export function verifyCookie(req: express.Request, res: express.Response, next: express.NextFunction){
    console.log(req.user);
    console.log("================_");
    console.log(req.session);
    
    if(req.isAuthenticated()){
        next();
        return
    }else if(!req.user){
        
        res.status(401).json({
            msg: "no token provided"
        })
    }
    else{
        res.status(401).json({
            msg: "invalid token provided"
        })
        return;

    }

}