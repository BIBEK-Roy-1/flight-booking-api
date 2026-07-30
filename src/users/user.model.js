import mongoose from "mongoose";
import userSchema from "./user.schema.js";

const UserModel=mongoose.model("User",userSchema);

export default UserModel;

