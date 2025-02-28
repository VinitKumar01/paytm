import { Schema, Model } from "mongoose";

const userSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const accountsSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  balance: {
    type: Number,
    required: true
  }
});

export const UserModel = new Model("User", userSchema);
export const AccountsModel = new Model("Accounts", accountsSchema);
