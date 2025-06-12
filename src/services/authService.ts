import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {Iuser} from '../models/userModel'




export function createJWT(user: Iuser){
    const JWT_SECRET: string | undefined = process.env.JWT_SECRET;
    if(!JWT_SECRET){
    throw new Error("JWT_SECRET not found")
}   
    const payload: Pick<Iuser, 'email'> = {
        email: user.email
    }
    const token = jwt.sign(payload, JWT_SECRET!);

    return token;

}

export function verifyJWT(token: string){
    try{
        const jwt_secret = process.env.JWT_SECRET;
        if(!jwt_secret){
            throw new Error("jwt secret missing")
        }
        const verified_user = jwt.verify(token, jwt_secret);
        if(verified_user){
            return true;
        }

    }catch(e){
        return false
    }
    
}

export async function verifyPassword(user:Iuser, user_password: string ): Promise<boolean>{

    const password_valid = await bcrypt.compare(user_password, user.password);
    return password_valid;
}

export async function hash_password(password: string){
    if(!process.env.SALT_ROUNT){
        throw new Error("Salt round is missing");
        return;
    }
    const salt_round = parseInt(process.env.SALT_ROUNT);
    const hashed_password = await bcrypt.hash(password,salt_round);
    return hashed_password;
}