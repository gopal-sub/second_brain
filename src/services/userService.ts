import {UserModel, Iuser} from '../models/userModel'


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
        const db_response = await UserModel.insertOne({
        email: email,
        password: password
        });
        console.log(db_response)
        return db_response;

    }catch(e: any){
        throw new Error(e.message || "Error creating the user")
    }
    
}