import compose from 'koa-compose';
import { Middleware } from 'koa';
import HealthRouter from 'src/routes/health';
import LoginRouter from 'src/routes/login';
import ApiDocsRouter from 'src/routes/api-docs';
import AuthorizationMiddleware from 'src/middlewares/authorization';
import userRoutes from 'src/routes/user';

const authorizationMiddleware: AuthorizationMiddleware = new AuthorizationMiddleware();

const publicRoutes: Middleware = compose([
  new HealthRouter().getRoutes(),
  new LoginRouter().getRoutes(),
  new ApiDocsRouter().getRoutes(),
]);

const protectedRoutes: Middleware = compose([
  authorizationMiddleware.authorize,

  // Add any route that you want to protect below this line
  userRoutes,
]);

export default { publicRoutes, protectedRoutes };
