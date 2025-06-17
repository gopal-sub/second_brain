import {model, Schema, Types} from 'mongoose';

export interface Iuser{
    _id: Types.ObjectId
    email: string,
    password: string,
    googleID: number | null,
    username: String,
    githubID: number | null,
    creationDate: Date
}
const UserSchema = new Schema<Iuser>({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    username: {type: String, required: true},
    googleID: {type: Number,  default: null},
    githubID: {type: Number, default: null},
    creationDate: {type: Date, default: new Date()}
});







export const UserModel = model("UserModel", UserSchema);



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
