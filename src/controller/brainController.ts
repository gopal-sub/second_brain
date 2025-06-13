import express from 'express';
import { findUserId } from '../services/userService';
import  {getBrainsAll, createNewBrain} from '../services/brainService';
import { Types } from 'mongoose';
import { Ibrain } from '../models/brainModel';
import { Itag} from '../models/tagModel';
import { cleanRawTags, getTagsPresent, addTags, getTagIDs} from '../services/tagService';

export async function getBrains(req: express.Request, res: express.Response){
    const userEmail = req.body.user.email;
    const userID:Types.ObjectId | null = await findUserId(userEmail);
    if(!userID){
        res.status(404).json({
            msg:"User does not exist"
        });
        return;
    }
    const brains = await getBrainsAll(userID);
    res.status(200).json(brains);
    return;



}
export function updateBrain(req: express.Request, res: express.Response){

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
    //put tag array and see if the tag are there in the db 
    // the ones that are there -> get id and create array 
    // one that are not there not  there -> create entry and push the _id to array
    const raw_tags: string[] = req.body.tags;
    const raw_clean_tags = cleanRawTags(raw_tags); //all tags
    const tags_present_in_db = await getTagsPresent(raw_clean_tags); //tags in db
    if(tags_present_in_db.length !=0){
        const tag_name = tags_present_in_db.map(tag => tag.tag);
    }
    const new_tags = raw_clean_tags.filter(tag => !tag_name.includes(tag));
    const new_tags_db = await addTags(new_tags);

    const tagIDs_in_brain: Types.ObjectId[] = [...getTagIDs(tags_present_in_db), ...getTagIDs(new_tags_db)];










    


    const brain: Ibrain= {
        title: req.body.title,
        text: req.body.text,
        tags: tagIDs_in_brain,
        sharable: req.body.sharable,
        dateCreated: req.body.dateCreated,
        author: userID
    };
    console.log(brain);

    const createdBrain = await createNewBrain(brain);
    res.status(200).json({
        msg: `brain -> ${createdBrain.title} created`
    })
    



    
}
export function deleteBrain(req: express.Request, res: express.Response){

}