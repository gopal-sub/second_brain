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
    tags: [{type: Schema.Types.ObjectId, ref: 'TagSchema'}],// needs to ref tags table
    sharable: {type: Boolean, default: false},
    author: {type: Schema.Types.ObjectId, ref: 'UserSchema'},//this needs to ref to a userid
    dateCreated: {type: Date, required: true}


});

export const BrainModel = model("UserModel", BrainSchema);
