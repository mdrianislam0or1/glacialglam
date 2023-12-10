import { Application, Request, Response } from 'express';
import express from 'express';
import cors from 'cors';
import router from './app/routes';
import cookieParser from 'cookie-parser';

// import notFound from './middlewares/notFound';
// import globalErrorHandler from './middlewares/globalErrorHandler';

const app: Application = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use('/api', router);
// app.use('/api/v1',globalRoute);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to Tour App API',
  });
});

// app.use(notFound);
// app.use(globalErrorHandler);

export default app;
