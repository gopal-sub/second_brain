import express  from "express";

export function getUserIDFromSession(req: express.Request, res: express.Response){
    //@ts-ignore
    const userID = req.session.passport.user;
    if(!userID){
        return;
    }
    return userID;
}