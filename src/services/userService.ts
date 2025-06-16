import {UserModel, Iuser} from '../models/userModel';
import {hash_password} from './authService';
import mongoose from 'mongoose';
import generator from 'generate-password'


export async function findUserByEmail(email: string | undefined): Promise<Iuser | null>{
    if(!email){
        return null;
    }
    try{
        const db_response = await UserModel.findOne({
        email: email
        });

        return db_response;

    }catch(e: any){
        throw new Error(e.message || "Error fetching user by email")
    }
    
}

export async function findUserByID(id: mongoose.Types.ObjectId): Promise<Iuser | null>{
    try{
        const db_response = await UserModel.findOne({
        _id: id
        });

        return db_response;

    }catch(e: any){
        throw new Error(e.message || "Error fetching user by id")
    }
}


export async function findUserId(email: string):Promise<mongoose.Types.ObjectId | null>{
    try{
        const user = await UserModel.findOne({
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

export async function CreateUser(email: string | undefined, password: string = generateRandomPassword()): Promise<Iuser | null> {
    
    if(email === undefined){
        return null;
    }
    try{
        console.log(password);
        
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

function generateRandomPassword(){
    const password = generator.generate({
        length: 10,
        numbers: true
    })
    return password;
}



