import compose from 'koa-compose';
import { Middleware } from 'koa';
import HealthRouter from 'src/routes/health';
import LoginRouter from 'src/routes/login';
import ApiDocsRouter from 'src/routes/api-docs';
import TokenRouter from 'src/routes/token';
import AuthorizationMiddleware from 'src/middlewares/authorization';

const authorizationMiddleware: AuthorizationMiddleware = new AuthorizationMiddleware();

const publicRoutes: Middleware = compose([
  new HealthRouter().getRoutes(),
  new LoginRouter().getRoutes(),
  new ApiDocsRouter().getRoutes(),
]);

const protectedRoutes: Middleware = compose([
  authorizationMiddleware.handleErrors,
  authorizationMiddleware.authorize,

  // Add any route that you want to protect below this line
  new TokenRouter().getRoutes(),
]);

export default { publicRoutes, protectedRoutes };
