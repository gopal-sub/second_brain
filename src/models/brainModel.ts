import { Schema, model } from 'mongoose'


const BrainSchema = new Schema({
    
    title: {type: String, required: true},
    text: {type: String},
    tags: [{type: Schema.Types.ObjectId, ref: 'TagSchema'}],// needs to ref tags table
    sharable: {type: Boolean, default: false},
    author: {type: Schema.Types.ObjectId, ref: 'UserSchema'},//this needs to ref to a userid
    dateCreated: {type: Date, required: true}


});

const BrainModel = model("UserModel", BrainSchema);
