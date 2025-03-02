import mongoose, { Schema } from "mongoose";

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
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
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

export const UserModel = mongoose.model("User", userSchema);
export const AccountsModel = mongoose.model("Accounts", accountsSchema);
