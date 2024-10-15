
import { Response } from 'express';

const sendResponse = (res: Response, success: boolean, statusCode: number, message: string, data: any): void => {
    res.status(statusCode).json({ success, message, data });
}


export {
    sendResponse
}