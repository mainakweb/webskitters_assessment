import { UpdateQuery, FilterQuery, QueryOptions } from 'mongoose';
import { IUser, UserModel } from '../models/userModels';

export function findUser(query: FilterQuery<IUser>, options: QueryOptions = { lean: true }) {
    return UserModel.find({})
}
export function createUser(input: IUser): Promise<IUser> {

    console.log("input", input);

    const user = new UserModel(input); // Create a new instance of the user
    return user.save(); // Save it to the database and return the result as a promise
}

export function findAndUpdate(query: FilterQuery<IUser>, update: UpdateQuery<IUser>, options: QueryOptions) {
    return UserModel.findOneAndUpdate(query, update, options)
}
