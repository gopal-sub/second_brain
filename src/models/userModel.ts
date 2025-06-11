import {model, Schema} from 'mongoose';

export interface Iuser{
    email: String,
    password: String
}
const UserSchema = new Schema<Iuser>({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
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
