import { Schema, model } from 'mongoose'

export interface Itag {
    tagID: string,
    tag: string
}

const TagSchema = new Schema<Itag>({
    tagID: {type: String, required: true, unique: true},
    tag: {type: String, unique: true}
    
});

export const TagModel = model("UserModel", TagSchema);