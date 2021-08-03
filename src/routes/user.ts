import Router from 'koa-router';
import UserController from 'src/controllers/user';

const router: Router = new Router({ prefix: '/api' });
const userController: UserController = new UserController();

router.get('/user/:id', userController.getUserById);

export default router;
