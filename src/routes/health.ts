import Router from 'koa-router';
import HealthController from 'src/controllers/health';

const router: Router = new Router();
const healthController: HealthController = new HealthController();

router.get('/health', healthController.getHealthInfo);

export default router;
