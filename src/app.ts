import Koa from 'koa';
import HealthRouter from './routes/health';

const app: Koa = new Koa();
const healthRouter: HealthRouter = new HealthRouter();

app.use(healthRouter.getRoutes());

export default app;
