import Router from 'koa-router';
import UserController from 'src/controllers/user';
import { Middleware } from 'koa';

function getRoutes(controller: UserController): Middleware {
  const router: Router = new Router();

  router.get('/user/:id', controller.getUserById);

  return router.routes();
}

export default getRoutes;
