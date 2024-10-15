import mongoose, { Document, model } from 'mongoose';

export interface IQuestion extends Document {
  serialNo: string,
  questionText: string;
  categories: number[];
  marks?: number,
}

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  serialNo: { type: String, required: true },
  categories: [{ type: [Number], ref: 'Category' }],
  marks: { type: Number },
}, { timestamps: true });


const QuestionModel = model<IQuestion>("Question", questionSchema);

export {
  QuestionModel
}


