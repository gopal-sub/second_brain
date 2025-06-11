import {model, Schema} from 'mongoose';


const UserSchema = new Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    userID: {type: String, require: true, unique: true}
});







const UserModel = model("UserModel", UserSchema);

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
