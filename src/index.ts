import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import {userRouter} from './routes/userRoutes'
import { brainRouter } from './routes/brainRoutes';
import passport from './auth/localStrategy';
import session from 'express-session';
import MongoStore from 'connect-mongo';


dotenv.config();



const app = express();
app.use(express.json());

app.use(session({
    secret: "hithere",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_STORE_URL
    }),
    cookie: {
    secure: false,        
    httpOnly: true,
    sameSite: 'lax'
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/v1/user', userRouter);
app.use('/api/v1/brain', brainRouter);





async function main(){
    const MONGO_URL = process.env.MONGODB_URL;


    if(!MONGO_URL){
        throw new Error("Mongo URL could no be found")
    }
    await mongoose.connect(MONGO_URL);
    console.log("db connected");
    app.listen(3000, async ()=>{
    console.log("server running");
    
    
    }); 
}

main()

