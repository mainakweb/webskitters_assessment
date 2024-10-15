import mongoose, { Document } from 'mongoose';

export interface IQuestion extends Document {
  questionText: string;
  categories: mongoose.Types.ObjectId[];
}

const QuestionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }]
}, { timestamps: true });

export default mongoose.model<IQuestion>('Question', QuestionSchema);
