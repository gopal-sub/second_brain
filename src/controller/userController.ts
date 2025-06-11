import express from 'express'

export async function createUser(req: express.Request, res: express.Response){
    res.json({
        msg: "This is the create user route"
    });
    return;
}
export async function siginUser(req: express.Request, res: express.Response){
    res.json({
        msg: "This is the create user route"
    });
    return;
}

