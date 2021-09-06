import express, { Router } from 'express';
import HealthController from '../../controllers/HealthController';

const router: Router = express.Router();
const healthController: HealthController = new HealthController();

router.get('/health', healthController.getHealthInfo);

export default router;
