import express from 'express';
import 'express-async-errors';
import cors, { CorsOptions } from 'cors';
import morgan from 'morgan';
import routes from './routes';
import ErrorHandlerMiddleware from './middlewares/ErrorHandlerMiddleware';

const app: express.Application = express();
const errorHandler: ErrorHandlerMiddleware = new ErrorHandlerMiddleware();
const corsOptions: CorsOptions = {
  origin: process.env.CORS_WHITELIST?.split(','),
};

app.use(morgan('combined'));
app.use(cors(corsOptions));
app.use(express.json());
app.use('/api', routes);
app.use(errorHandler.handleErrors);

export default app;
