import {UserModel, Iuser} from '../models/userModel.ts'


export async function findUserByEmail(email: string){
    try{
        const db_response = await UserModel.findOne({
        email: email
         });
        if(db_response){
            return true
         }else{
            return false
        }

    }catch(e){
        return e;
    }
    
}

export async function CreateUser(email: string, password: string): Promise<Iuser> {
    try{
        const db_response = await UserModel.create({
        email: email,
        password: password
        });
        return db_response;

    }catch(e: any){
        throw new Error(e.message || "Error creating the user")
    }
    
}