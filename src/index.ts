import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import {userRouter} from './routes/userRoutes'
import { brainRouter } from './routes/brainRoutes';
dotenv.config();

const MONGO_URL = process.env.MONGODB_URL;
console.log(MONGO_URL);

if(!MONGO_URL){
    throw new Error("Mongo URL could no be found")
}

const app = express();


app.use(express.json());
app.use('/api/v1/user', userRouter);
app.use('/api/v1/brain', brainRouter);



app.listen(3000, async ()=>{
    console.log("server runnign");
    await mongoose.connect(MONGO_URL);
    console.log("db connected")
})


