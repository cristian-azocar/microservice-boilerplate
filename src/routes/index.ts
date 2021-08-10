import express, { Router } from 'express';
import HealthRouter from './HealthRouter';
import AuthRouter from './AuthRouter';
import UserRouter from './UserRouter';
import ApiDocsRouter from './ApiDocsRouter';

const router: Router = express.Router();

router.use([HealthRouter, AuthRouter, UserRouter, ApiDocsRouter]);

export default router;
