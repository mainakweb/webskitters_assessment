import { Request, Response, NextFunction } from 'express';
import { sendResponse } from '../../utils/utils';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return sendResponse(res, false, 401, "Authentication token is missing or invalid.", null);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.body.user = decoded;  // Assuming `decoded` contains user information
    next();
  } catch (error) {
     sendResponse(res, false, 401, "Authentication token is invalid.", null);
  }
};

export {
  authMiddleware
}
