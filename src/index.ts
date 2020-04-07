import Koa from 'koa';
import HealthRouter from './routes/health';

const app: Koa = new Koa();
const healthRouter: HealthRouter = new HealthRouter();
const port: number = +process.env.PORT || 3000;

app.use(healthRouter.getRoutes());

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${port}`);
});
