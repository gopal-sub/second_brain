
import {Types} from 'mongoose'
import {TagModel, Itag} from '../models/tagModel'


export async function getTagsPresent(tags: string[]): Promise<Itag[]>{
    try{
        const existing_tags = await TagModel.find({tag: {$in: tags}});
        return existing_tags;
    }catch(e: any){
        throw new Error(e.message || "Error fetching tags");
    }
    
}

export function cleanRawTags(tags: string[]): string[]{
    const cleantags = tags.map(tag => tag.toLowerCase().replace(/\s+/g, ""));
    return cleantags
}

export function getTagIDs(tags: Itag[]): Types.ObjectId[]{
    const tagIDs = tags.map(tag => tag._id);
    return tagIDs;
}

export async function addTags(tags: string[]): Promise<Itag[]>{
    try{
        const tagObjects = tags.map(t => ({tag: t}));

        
        const tagsInserted = await TagModel.insertMany(tagObjects, { ordered: false });
        return tagsInserted

    }catch(e: any){
        throw new Error(e.message || "Error inserting tags");
    }
}