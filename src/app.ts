import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import cors from '@koa/cors';
import HealthRouter from 'src/routes/health';
import LoginRouter from 'src/routes/login';
import ApiDocsRouter from 'src/routes/api-docs';

const app: Koa = new Koa();
const healthRouter: HealthRouter = new HealthRouter();
const loginRouter: LoginRouter = new LoginRouter();
const apiDocsRouter: ApiDocsRouter = new ApiDocsRouter();

app.use(logger());
app.use(bodyParser());
app.use(cors());
app.use(healthRouter.getRoutes());
app.use(loginRouter.getRoutes());
app.use(apiDocsRouter.getRoutes());

export default app;
