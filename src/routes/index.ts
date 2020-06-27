import compose from 'koa-compose';
import { Middleware } from 'koa';
import healthRouter from 'src/routes/health';
import userRouter from 'src/routes/user';
import authRouter from 'src/routes/auth';
import apiDocsRouter from 'src/routes/api-docs';
import AuthMiddleware from 'src/middlewares/auth';
import ErrorHandlerMiddleware from 'src/middlewares/error-handler';

const authMiddleware: AuthMiddleware = new AuthMiddleware();
const errorHandlerMiddleware: ErrorHandlerMiddleware = new ErrorHandlerMiddleware();

// Routes that doesn't require authorization goes here
const publicRoutes: Middleware = compose([
  healthRouter.routes(),
  authRouter.routes(),
  apiDocsRouter.routes(),
]);

// Routes that requires authorization goes here
const protectedRoutes: Middleware = compose([
  authMiddleware.authorize,
  userRouter.routes(),
]);

const allRoutes: Middleware = compose([
  errorHandlerMiddleware.handleErrors,
  publicRoutes,
  protectedRoutes,
]);

export default allRoutes;
