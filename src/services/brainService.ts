import { BrainModel } from "../models/brainModel";
import mongoose from "mongoose";

export async function getBrainsAll(userID: mongoose.Types.ObjectId){
    try{
        const brains = await BrainModel.find({author: userID});
        return brains;
    }catch(e: any){
        throw new Error(e.message || "Error fetching brains")
    }
}