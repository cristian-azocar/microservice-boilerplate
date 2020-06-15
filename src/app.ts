import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import cors from '@koa/cors';
import routes from 'src/routes';

const app: Koa = new Koa();

app.use(logger());
app.use(bodyParser());
app.use(cors());
app.use(routes.publicRoutes);
app.use(routes.protectedRoutes);

export default app;
