import express, { Request, Response } from 'express';
import { sendResponse } from '../../utils/utils';
import { UserModel } from '../models/userModels';
import { createUser, findAndUpdate } from '../services/userService';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();


// User login controller
const userLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body;
  
    try {
      const user = await UserModel.findOne({ email });
      if (!user) return sendResponse(res, false, 400, "Invalid Email.", null);
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return sendResponse(res, false, 400, "Invalid Password.", null);

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
      sendResponse(res, true, 200, "User Login successfully", {token});
    } catch (error) {
        sendResponse(res, false, 500, "somthing went wrong!", error);
    }
  };

const allUsers = async (req: Request, res: Response) => {

    let user = await UserModel.find({});
    sendResponse(res, true, 200, "Successfully fetched users", user);
}

const newUser = async (req: Request, res: Response) => {
    const {name, email, password, age, sex} = req.body;
    try {

        console.log("req.body)req.body)", req.body);

        // Check if the user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) return sendResponse(res, false, 400, "User already exists", null);

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Check if a file is uploaded
        const profilePicture = req.file ? req.file.path : "";

        const resp = await createUser({
            name,
            email,
            password: hashedPassword,
            age,
            sex,
            profilePicture,
          });
        sendResponse(res, true, 200, "User registered successfully", resp);

    } catch (error) {
        sendResponse(res, false, 200, "somthing went wrong!", error);

    }

}
const updateUser = async (req: Request, res: Response) => {
  const {email, name, age, sex } = req.body;
    try {

        console.log("req.body)req.body)", req.body);
        
        const {id} = req.body.user;
let updateData;
        //const updateData = req.file ? {email, name, age, sex, profilePicture : req.file.path}req.file.path : "";
        if(req.file) {
          updateData = {email, name, age, sex, profilePicture : req.file.path};
        } else {
          updateData = {email, name, age, sex};
        }
        const resp = await UserModel.findByIdAndUpdate(id, updateData , { new: true }); // Return updated document

        sendResponse(res, true, 200, "Successfully fetched users", resp);

    } catch (error) {
        sendResponse(res, false, 200, "fetched users error", error);

    }

}

// View user profile controller
const viewProfile = async (req: Request, res: Response) => {
    const {id} = req.body.user;
    try {
      const user = await UserModel.findById(id);
     if (!user) sendResponse(res, false, 200, "User not found", null);
     sendResponse(res, true, 200, "Successfully fetched users", user);
    } catch (error) {
      sendResponse(res, false, 500, "fetched user error", error);
    }
  };


export {
    userLogin,
    allUsers,
    newUser,
    updateUser,
    viewProfile
    
}