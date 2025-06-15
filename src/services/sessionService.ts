import express  from "express";

export function getUserIDFromSession(req: express.Request, res: express.Response){
    //@ts-ignore
    const userID = req.user._id;
    if(!userID){
        res.status(404).json({
            msg:"user id could not be found recreate session"
        });
        return;
    }
    return userID;
}