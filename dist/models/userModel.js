"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
});
exports.UserModel = (0, mongoose_1.model)("UserModel", UserSchema);
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
