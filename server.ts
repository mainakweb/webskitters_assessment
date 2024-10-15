import express, { Request, Response } from 'express';
import { userRouter } from './src/user/router/userRoutes';
import connect from './src/config/db';
import { questionRouter } from './src/question/router/questionRoutes';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT as string;

app.use(express.json());
// USER ROUTES
app.use("/api/user", userRouter );
app.use("/api/qsn", questionRouter );


// SERVER PING TEST
app.get("/api/ping", (req: Request, res: Response) => {
    res.json({ message: "Server is running" });
})



// DB Connection
connect();
app.listen(PORT, (): void => {
    console.log(`server is running on ${PORT}`);
})

