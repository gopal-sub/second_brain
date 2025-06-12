import express from 'express';
import {user_schema} from '../validators/userValidator'
import errorMap from 'zod/dist/types/v3/locales/en';


export function userValidatorInput(req: express.Request, res: express.Response, next:  express.NextFunction){
    const result = user_schema.safeParse({
        email: req.body.email,
        password: req.body.password
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