import { Schema, model, Types } from 'mongoose'

export interface Ibrain {
    text: string,
    title: string,
    tags: Types.ObjectId[],
    sharable: boolean,
    author: Types.ObjectId,
    dateCreated: Date,
    
}
const BrainSchema = new Schema<Ibrain>({
    
    title: {type: String, required: true},
    text: {type: String},
    tags: [{type: Types.ObjectId, ref: 'TagModel'}],// needs to ref tags table
    sharable: {type: Boolean, default: false},
    author: {type: Schema.Types.ObjectId, ref: 'UserModel'},//this needs to ref to a userid
    dateCreated: {type: Date, required: true}


});

export const BrainModel = model("BrainModel ", BrainSchema);
