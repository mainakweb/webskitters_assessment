import mongoose, { Schema, Model, model , Document} from "mongoose";


interface IUserDocument extends Document {
    email: string;
    password: string;
    name: string,
    age: number,
    sex: string,
    profilePicture:string,
}
interface IUser {
    email: string;
    password: string;
    name: string,
    age: number,
    sex: string,
    profilePicture:string,
}

const userSchema = new Schema<IUser>({
    email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
    name: { type: String, required: true },
    age: { type: Number },
    sex: { type: String },
    profilePicture: { type: String },
    
});

const UserModel = model<IUser>("User", userSchema);

export {
    UserModel, IUserDocument, IUser
}