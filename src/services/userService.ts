import {UserModel, Iuser} from '../models/userModel'
import {hash_password} from './authService'


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

