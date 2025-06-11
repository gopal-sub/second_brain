"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrainModel = void 0;
const mongoose_1 = require("mongoose");
const BrainSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    text: { type: String },
    tags: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'TagSchema' }], // needs to ref tags table
    sharable: { type: Boolean, default: false },
    author: { type: mongoose_1.Schema.Types.ObjectId, ref: 'UserSchema' }, //this needs to ref to a userid
    dateCreated: { type: Date, required: true }
});
exports.BrainModel = (0, mongoose_1.model)("UserModel", BrainSchema);
