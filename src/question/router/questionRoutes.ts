import express, { Request, Response } from 'express';
import { add, addCategory, bulkuploadQsn, getCategory, getQsnAndCat, getQsnByCat, view } from '../controllers/questionControler';
import uploadCsv from '../../user/middlewares/uploadCsvMiddleware';

const questionRouter = express.Router();


questionRouter.get('/', [], view);
questionRouter.post('/add', [], add);
questionRouter.post('/', [], add);
questionRouter.get('/category', [], getCategory);
questionRouter.get('/qsnListByCategory', [], getQsnByCat);
questionRouter.get('/qsnList', [], getQsnAndCat);
questionRouter.post('/addCategory', [], addCategory);
questionRouter.post('/bulkupload', [uploadCsv.single("questionsFile")], bulkuploadQsn);


export { questionRouter };
