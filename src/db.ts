import {model, Schema} from 'mongoose';


const UserSchema = new Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    userID: {type: String, require: true, unique: true}
});

const BrainSchema = new Schema({
    title: {type: String, required: true},
    text: {type: String},
    tags: [{type: Schema.Types.ObjectId, ref: 'TagSchema'}],// needs to ref tags table
    sharable: {type: Boolean, default: false},
    author: {type: Schema.Types.ObjectId, ref: 'UserSchema'},//this needs to ref to a userid
    dateCreated: {type: Date, required: true}


});


const TagSchema = new Schema({
    tadID: {type: String, required: true, unique: true},
    tag: {type: String, unique: true}
    
});


const UserModel = model("UserModel", UserSchema);
const BrainModel = model("UserModel", BrainSchema);
const TagModel = model("UserModel", TagSchema);
/*
user table{
    email,
    password -> hashed,
    userid
}
tags table{
    tagID,
    tag

}
brain table {
    brainID,
    title,
    text,
    tag array -> ids to tag table,
    shareable -> default false,
    author,
    date created,
}


*/
