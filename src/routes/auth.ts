import Router from 'koa-router';
import { Middleware } from 'koa';
import AuthController from 'src/controllers/auth';
import ValidatorMiddleware from 'src/middlewares/validator';
import loginSchema from 'src/validators/login';

function getRoutes(
  authController: AuthController,
  validatorMiddleware: ValidatorMiddleware
): Middleware {
  const router: Router = new Router();

  router.post(
    '/auth/login',
    validatorMiddleware.validate(loginSchema),
    authController.login
  );

  return router.routes();
}

export default getRoutes;
