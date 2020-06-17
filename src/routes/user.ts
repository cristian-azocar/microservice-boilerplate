import Router from 'koa-router';
import UserController from 'src/controllers/user';

const router: Router = new Router();
const controller: UserController = new UserController();

router.get('/user/:id', controller.getUserById);

export default router.routes();
