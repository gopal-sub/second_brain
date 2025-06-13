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

export async function getaBrain(brainID:mongoose.Types.ObjectId , userID:mongoose.Types.ObjectId): Promise<Ibrain | null>{
    try{
        console.log("hi there")
        const brain = await BrainModel.findOne({_id: brainID, author: userID});
        console.log("hi there")
        return brain
    }catch(e: any){
        throw new Error(e.message || "Error getting a brain")
    }
}

export async function updateBrain_db(brainID:mongoose.Types.ObjectId, updateBrain: Partial<Ibrain>): Promise<Ibrain | null> {
    try{
        const updatedBrain = await BrainModel.findByIdAndUpdate(brainID, updateBrain);
        return updatedBrain
    }catch(e: any){
        throw new Error(e.message || "Error updating the brain")
    }
}

export async function deleteBrain_db(brainID: mongoose.Types.ObjectId): Promise<Ibrain | null>{
    try{
        const deletedBrain = BrainModel.findByIdAndDelete({_id: brainID});
        return deletedBrain;
    }catch(e: any){
        throw new Error(e.message || "Error deleting the brain")
    }
}