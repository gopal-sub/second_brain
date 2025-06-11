import { Schema, model } from 'mongoose'

const TagSchema = new Schema({
    tadID: {type: String, required: true, unique: true},
    tag: {type: String, unique: true}
    
});

const TagModel = model("UserModel", TagSchema);