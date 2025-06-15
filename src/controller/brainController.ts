import express from 'express';
import { findUserId } from '../services/userService';
import  {getBrainsAll, createNewBrain, getaBrain, updateBrain_db, deleteBrain_db} from '../services/brainService';
import { Types } from 'mongoose';
import { Ibrain } from '../models/brainModel';
import { Itag} from '../models/tagModel';
import { tagIDsAddToBrain } from '../services/tagService';

export async function getBrains(req: express.Request, res: express.Response){
    // @ts-ignore
    const userID = req.user._id;
    if(!userID){
        res.status(404).json({
            msg:"user id could not be found recreate session"
        });
        return;
    }
    const brains = await getBrainsAll(userID);
    res.status(200).json(brains);
    return;



}
export async function updateBrain(req: express.Request, res: express.Response){
    //get the id of the and update
    //make sure person owns the brain
    
    let id: string = req.body.id;
    if(!Types.ObjectId.isValid(id)){
        res.status(400).json({ msg: "Invalid brain ID format" });
        return;
    }
    const brainID: Types.ObjectId = new Types.ObjectId(req.body.id);
    
    
    const userEmail = req.body.user.email;
    const userID:Types.ObjectId | null = await findUserId(userEmail);
    if(!userID){
        res.status(404).json({
            msg:"User does not exist"
        });
        return;
    }

    const brainPresent = await getaBrain(brainID, userID);
    if(!brainPresent){
        res.status(404).json({
            msg: `brain with id ${brainID}`
        })
        return;
    }
    const raw_tags: string[] = req.body.tags;

    
    const tagIDs_in_brain: Types.ObjectId[] = await tagIDsAddToBrain(raw_tags);

    const brain:Partial<Ibrain> = {
        title: req.body.title,
        text: req.body.text,
        sharable: req.body.sharable,
        dateCreated: req.body.dateCreated,
        tags: tagIDs_in_brain
    };
    const updatedBrain = await updateBrain_db(brainID, brain);

    res.status(200).json(updatedBrain)
    return;


}
export async function createBrain(req: express.Request, res: express.Response){
    const userEmail = req.body.user.email;
    const userID:Types.ObjectId | null = await findUserId(userEmail);
    if(!userID){
        res.status(404).json({
            msg:"User does not exist"
        });
        return;
    }
    
    const raw_tags: string[] = req.body.tags;

    
    const tagIDs_in_brain: Types.ObjectId[] = await tagIDsAddToBrain(raw_tags);

    const brain: Ibrain= {
        title: req.body.title,
        text: req.body.text,
        tags: tagIDs_in_brain,
        sharable: req.body.sharable,
        dateCreated: req.body.dateCreated,
        author: userID
    };
    

    const createdBrain = await createNewBrain(brain);
    res.status(200).json({
        msg: `brain -> ${createdBrain.title} created`
    })
    



    
}
export async function deleteBrain(req: express.Request, res: express.Response){
    let id: string = req.body.id;
    if(!Types.ObjectId.isValid(id)){
        res.status(400).json({ msg: "Invalid brain ID format" });
        return;
    }
    const brainID: Types.ObjectId = new Types.ObjectId(req.body.id);
    
    
    const userEmail = req.body.user.email;
    const userID:Types.ObjectId | null = await findUserId(userEmail);
    if(!userID){
        res.status(404).json({
            msg:"User does not exist"
        });
        return;
    }

    const brainPresent = await getaBrain(brainID, userID);
    if(!brainPresent){
        res.status(404).json({
            msg: `brain with id ${brainID}`
        })
        return;
    }
    const deleted_brain = await deleteBrain_db(brainID)
    res.status(200).json(deleted_brain);
    return;


}