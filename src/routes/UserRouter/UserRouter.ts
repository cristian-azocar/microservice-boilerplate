import express, { Router } from 'express';
import UserController from '../../controllers/UserController';
import AuthMiddleware from '../../middlewares/AuthMiddleware';

const router: Router = express.Router();
const userController: UserController = new UserController();
const authMiddleware: AuthMiddleware = new AuthMiddleware();

router.get('/user/:id', authMiddleware.authorize, userController.getUserById);

export default router;
