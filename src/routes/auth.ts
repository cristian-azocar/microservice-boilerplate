import Router from 'koa-router';
import { Middleware } from 'koa';
import AuthController from 'src/controllers/auth';
import AuthMiddleware from 'src/middlewares/auth';

function getRoutes(
  authController: AuthController,
  authMiddleware: AuthMiddleware
): Middleware {
  const router: Router = new Router();

  router.post(
    '/auth/login',
    authMiddleware.validateLogin,
    authController.login
  );

  return router.routes();
}

export default getRoutes;
