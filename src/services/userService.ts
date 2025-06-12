import {UserModel, Iuser} from '../models/userModel';
import { BrainModel } from '../models/brainModel';
import {hash_password} from './authService';
import mongoose from 'mongoose';


export async function findUserByEmail(email: string): Promise<Iuser | null>{
    try{
        const db_response = await UserModel.findOne({
        email: email
        });

        return db_response;

    }catch(e: any){
        throw new Error(e.message || "Error fetching user by email")
    }
    
}

export async function findUserId(email:string):Promise<mongoose.Types.ObjectId | null>{
    try{
        const user = await BrainModel.findOne({
            email: email
        });
        if(!user){
            return null
        }
        const userID = user._id;
        return userID
    }catch(e: any){
        throw new Error(e.message || "Error fetching user by email")
    }
    
}

export async function CreateUser(email: string, password: string): Promise<Iuser> {
    
    
    try{
        const hashed_password = await hash_password(password);
        const db_response = await UserModel.insertOne({
        email: email,
        password: hashed_password
        });
        return db_response;

    }catch(e: any){
        throw new Error(e.message || "Error creating the user")
    }
    
}

