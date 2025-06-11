"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserByEmail = findUserByEmail;
exports.CreateUser = CreateUser;
const userModel_1 = require("../models/userModel");
async function findUserByEmail(email) {
    try {
        const db_response = await userModel_1.UserModel.findOne({
            email: email
        });
        return db_response;
    }
    catch (e) {
        throw new Error(e.message || "Error fetching user by email");
    }
}
async function CreateUser(email, password) {
    try {
        const db_response = await userModel_1.UserModel.insertOne({
            email: email,
            password: password
        });
        console.log(db_response);
        return db_response;
    }
    catch (e) {
        throw new Error(e.message || "Error creating the user");
    }
}
