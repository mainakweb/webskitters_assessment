import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const URI = process.env.MONGO_URI as string; //"mongodb+srv://mainakdutta16:A6JBaMSeHuPWheES@mongocluster.prmjy.mongodb.net/";

const connect = async (): Promise<void> => {
  try {
    await mongoose.connect(URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit process with failure
  }
};

export default connect;
