import { BrainModel } from "../models/brainModel";
import mongoose from "mongoose";
import { Ibrain } from "../models/brainModel";

export async function getBrainsAll(userID: mongoose.Types.ObjectId): Promise<Ibrain[]>{
    try{
        const brains = await BrainModel.find({author: userID}).populate('author','email');
        return brains;
    }catch(e: any){
        throw new Error(e.message || "Error fetching brains")
    }
}

export async function createNewBrain(brain: Ibrain): Promise<Ibrain> {
    try{
        const db_response = await BrainModel.insertOne(brain);
        return db_response;
    }catch(e: any){
        throw new Error(e.message || "Error creating a new brain")
    }
}