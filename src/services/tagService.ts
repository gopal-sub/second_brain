
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

export async function tagIDsAddToBrain(tags: string[]){

    const raw_clean_tags = cleanRawTags(tags); //all tags

    //tags that are present in db ||tags_present_in_db ⊆  raw_clean_tags 
    const tags_present_in_db = await getTagsPresent(raw_clean_tags); //tags in db
    const tag_name = tags_present_in_db.map(tag => tag.tag);

    
    //new_tags = raw_clean_tags - tags_present_in_db
    const new_tags = raw_clean_tags.filter(tag => !tag_name.includes(tag));
    
    
    const new_tags_db = await addTags(new_tags);
    console.log(new_tags_db);
    const tagIDs_in_brain: Types.ObjectId[] = [
        ...getTagIDs(tags_present_in_db), 
        ...getTagIDs(new_tags_db)
    ];

    return tagIDs_in_brain;
    
}