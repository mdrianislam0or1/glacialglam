import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import router from './app/routes';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api', router);

const getAController = (req: Request, res: Response) => {
  res.send(200).json({
    success: true,
    message: `'Welcome to the API!'`,
  });
};

app.get('/', getAController);

export default app;
