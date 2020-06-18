import compose from 'koa-compose';
import { Middleware } from 'koa';
import healthRoutes from 'src/routes/health';
import userRoutes from 'src/routes/user';
import authRoutes from 'src/routes/auth';
import apiDocsRoutes from 'src/routes/api-docs';
import AuthMiddleware from 'src/middlewares/auth';
import UserController from 'src/controllers/user';
import UserService from 'src/services/user';
import AuthService from 'src/services/auth';
import AuthController from 'src/controllers/auth';
import AuthValidator from 'src/validators/auth';
import HealthController from 'src/controllers/health';
import ApiDocsUtils from 'src/utils/api-docs';

const healthController: HealthController = new HealthController();
const authValidator: AuthValidator = new AuthValidator();
const userService: UserService = new UserService();
const authService: AuthService = new AuthService(userService);
const userController: UserController = new UserController(userService);
const authMiddleware: AuthMiddleware = new AuthMiddleware(
  authService,
  authValidator
);
const authController: AuthController = new AuthController(authService);
const apiDocsUtils: ApiDocsUtils = new ApiDocsUtils();

const publicRoutes: Middleware = compose([
  healthRoutes(healthController),
  authRoutes(authController, authMiddleware),
  apiDocsRoutes(apiDocsUtils),
]);

const protectedRoutes: Middleware = compose([
  authMiddleware.authorize,

  // Add any route that you want to protect below this line
  userRoutes(userController),
]);

export default { publicRoutes, protectedRoutes };
