import { IUser } from "../interfaces/user.interface";
import { model, Schema } from "mongoose";

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true }
});

export const User = model<IUser>("User", userSchema);