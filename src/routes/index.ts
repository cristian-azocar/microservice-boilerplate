import compose from 'koa-compose';
import { Middleware } from 'koa';
import healthRouter from 'src/routes/health';
import userRouter from 'src/routes/user';
import authRouter from 'src/routes/auth';
import apiDocsRouter from 'src/routes/api-docs';
import authMiddleware from 'src/middlewares/auth';

const publicRoutes: Middleware = compose([
  healthRouter.routes(),
  authRouter.routes(),
  apiDocsRouter.routes(),
]);

const protectedRoutes: Middleware = compose([
  authMiddleware.authorize,
  // Add any route that you want to protect below this line
  userRouter.routes(),
]);

export default { publicRoutes, protectedRoutes };
