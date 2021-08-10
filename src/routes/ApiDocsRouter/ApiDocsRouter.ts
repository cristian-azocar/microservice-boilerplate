import path from 'path';
import express, { Router } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const router: Router = express.Router();
const swaggerSpec = swaggerJSDoc({
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: process.env.SERVICE_NAME || '',
      version: '1.0.0',
    },
  },
  apis: [path.join(__dirname, '../../docs/*.yml')],
});

router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default router;
