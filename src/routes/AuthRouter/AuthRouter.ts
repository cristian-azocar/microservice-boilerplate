import express, { Router } from 'express';
import AuthController from '../../controllers/AuthController';
import ValidatorMiddleware from '../../middlewares/ValidatorMiddleware';
import loginSchema from '../../schemas/login';

const router: Router = express.Router();
const authController: AuthController = new AuthController();
const validatorMiddleware: ValidatorMiddleware = new ValidatorMiddleware();

router.post(
  '/auth/login',
  validatorMiddleware.validate(loginSchema),
  authController.login
);

export default router;
