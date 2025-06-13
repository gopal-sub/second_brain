import { Schema, model, Types } from 'mongoose'

export interface Itag {
    _id: Types.ObjectId,
    tag: string
}

const TagSchema = new Schema<Itag>({
    _id: {type: Schema.Types.ObjectId,default: () => new Types.ObjectId()},
    tag: {type: String, unique: true}
    
});

export const TagModel = model("TagModel", TagSchema);