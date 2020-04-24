import compose from 'koa-compose';
import { Middleware } from 'koa';
import HealthRouter from 'src/routes/health';
import LoginRouter from 'src/routes/login';
import ApiDocsRouter from 'src/routes/api-docs';

const healthRouter: HealthRouter = new HealthRouter();
const loginRouter: LoginRouter = new LoginRouter();
const apiDocsRouter: ApiDocsRouter = new ApiDocsRouter();

const routes: Middleware = compose([
  healthRouter.getRoutes(),
  loginRouter.getRoutes(),
  apiDocsRouter.getRoutes(),
]);

export default routes;
