import { Context } from 'koa';
import HealthController from 'src/controllers/health';

function HealthControllerMock(): Partial<HealthController> {
  return {
    getHealthInfo: (ctx: Context): Promise<void> => {
      ctx.body = {
        nodeVersion: 'v12.14.1',
        service: 'MS Test Boilerplate',
        memory: {
          rss: 51957760,
          heapTotal: 29876224,
          heapUsed: 10250344,
          external: 1294527,
          arrayBuffers: 0,
        },
        pid: 44617,
        uptime: 2.651281754,
        environment: 'development',
        package: {
          name: 'microservice-boilerplate',
          version: '1.0.0',
        },
      };

      return Promise.resolve();
    },
  };
}

jest.mock('src/controllers/health', () => HealthControllerMock);
