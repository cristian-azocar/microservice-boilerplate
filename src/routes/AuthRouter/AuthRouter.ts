import express, { Router } from 'express';
import AuthController from '../../controllers/AuthController';
import ValidatorMiddleware from '../../middlewares/ValidatorMiddleware';
import AuthMiddleware from '../../middlewares/AuthMiddleware';
import loginSchema from '../../schemas/login';

const router: Router = express.Router();
const authController: AuthController = new AuthController();
const validatorMiddleware: ValidatorMiddleware = new ValidatorMiddleware();
const authMiddleware: AuthMiddleware = new AuthMiddleware();

router.post(
  '/login',
  validatorMiddleware.validate(loginSchema),
  authController.login
);

router.post('/logout', authMiddleware.authorize, authController.logout);

export default router;
