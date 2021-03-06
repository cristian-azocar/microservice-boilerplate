import Router from 'koa-router';
import AuthController from 'src/controllers/auth';
import ValidatorMiddleware from 'src/middlewares/validator';
import loginSchema from 'src/validators/login';

const router: Router = new Router();
const authController: AuthController = new AuthController();
const validatorMiddleware: ValidatorMiddleware = new ValidatorMiddleware();

router.post(
  '/auth/login',
  validatorMiddleware.validate(loginSchema),
  authController.login
);

export default router;
