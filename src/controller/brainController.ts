import express from 'express';
import { findUserId } from '../services/userService';
import  {getBrainsAll} from '../services/brainService';
import mongoose from 'mongoose';

export async function getBrains(req: express.Request, res: express.Response){
    const userEmail = req.body.user.email;
    const userID:mongoose.Types.ObjectId | null = await findUserId(userEmail);
    if(!userID){
        res.status(404).json({
            msg:"User does not exist"
        });
        return;
    }
    const brains = await getBrainsAll(userID);
    res.status(200).json(brains);
    return;



}
export function updateBrain(req: express.Request, res: express.Response){

}
export function createBrain(req: express.Request, res: express.Response){

}
export function deleteBrain(req: express.Request, res: express.Response){

}