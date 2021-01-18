import dotenv from 'dotenv';
import cors from 'cors';
import express, { Response, Request } from 'express';
import {connect, set as setMongooseConfig } from 'mongoose';
import {createServer} from 'http';
import { authRouter, userRouter, conversationRouter } from './routes';
import { authMiddleware } from './middleware';

dotenv.config();

const app = express();
const httpServer = createServer(app);

app.use(cors());
app.use(express.json());

app.get('/', (_:Request, res: Response) => {
    res.json({message: 'hello'});
});

app.use('/api/auth', authRouter);
app.use('/api/users', authMiddleware, userRouter);
app.use('/api/conversations', authMiddleware, conversationRouter)


setMongooseConfig('useCreateIndex', true);
connect(
  process.env.DB_URL!,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
).then(() => {
  console.log('Database connected successfully 🚀');

  httpServer.listen(process.env.PORT, () => {
    console.log(`Server started successfully on port ${process.env.PORT}. 🚀'`);
  });
});
