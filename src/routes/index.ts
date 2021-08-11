import express, { Router } from 'express';
import HealthRouter from './HealthRouter';
import AuthRouter from './AuthRouter';
import ApiDocsRouter from './ApiDocsRouter';

const router: Router = express.Router();

router.use([HealthRouter, AuthRouter, ApiDocsRouter]);

export default router;
