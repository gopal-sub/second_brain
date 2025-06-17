import express from 'express';
import {user_schema_createUser, user_schema_loginUser} from '../validators/userValidator'
import errorMap from 'zod/dist/types/v3/locales/en';


export function userValidatorInputCreateUser(req: express.Request, res: express.Response, next:  express.NextFunction){
    const result = user_schema_createUser.safeParse({
        email: req.body.email,
        password: req.body.password,
        username: req.body.username
    })

    if(!result.success){
        res.status(400).json({
            msg: "Invalid input",
            errors: result.error.flatten().fieldErrors
        })
        return;
    }
    next();
} 

export function userValidatorInputSession(req: express.Request, res: express.Response, next:  express.NextFunction){
    const result = user_schema_loginUser.safeParse({
        email: req.body.email,
        password: req.body.password
    });

    if(!result.success){
        res.status(400).json({
            msg: "Invalid input",
            errors: result.error.flatten().fieldErrors
        })
        return;
    }
    next();
}