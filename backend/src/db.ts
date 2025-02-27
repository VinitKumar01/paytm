import mongoose, { Model } from "mongoose";
import { Schema } from "mongoose";


const userSchema = new Schema({
    firstname: String,
    lastname: String,
    username: String,
    email: String,
    password: String,
})

export const UserModel = new Model("User", userSchema);