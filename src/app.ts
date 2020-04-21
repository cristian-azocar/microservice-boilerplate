import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import HealthRouter from 'src/routes/health';
import LoginRouter from 'src/routes/login';

const app: Koa = new Koa();
const healthRouter: HealthRouter = new HealthRouter();
const loginRouter: LoginRouter = new LoginRouter();

app.use(logger());
app.use(bodyParser());
app.use(healthRouter.getRoutes());
app.use(loginRouter.getRoutes());

export default app;
