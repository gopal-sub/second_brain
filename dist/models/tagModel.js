"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagModel = void 0;
const mongoose_1 = require("mongoose");
const TagSchema = new mongoose_1.Schema({
    tagID: { type: String, required: true, unique: true },
    tag: { type: String, unique: true }
});
exports.TagModel = (0, mongoose_1.model)("UserModel", TagSchema);
