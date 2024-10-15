import express, { Request, Response } from 'express';
import { userLogin, allUsers, newUser, updateUser, viewProfile } from '../controllers/userControler';
// import multer from 'multer';
// const upload = multer({ dest: 'uploads/' });
import { upload } from '../middlewares/uploadMiddleware';


import { authMiddleware } from '../middlewares/authMiddleware';
const userRouter = express.Router();

userRouter.post('/login', userLogin);
userRouter.get("/", [], allUsers);
userRouter.post("/new", [upload.single('profilePicture')], newUser);
userRouter.post("/update", [upload.single('profilePicture'), authMiddleware], updateUser);
userRouter.get('/profile/', [authMiddleware], viewProfile);


export { userRouter };
