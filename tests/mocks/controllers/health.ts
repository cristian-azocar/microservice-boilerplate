import { Context } from 'koa';
import HealthController from 'src/controllers/health';

const getSpy = (): jest.SpyInstance =>
  jest
    .spyOn(HealthController.prototype, 'getHealthInfo')
    .mockImplementation((ctx: Context) => {
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
        appPackage: 'ms-boilerplate',
        appVersionPackage: '1.0.0',
      };

      return Promise.resolve();
    });

export default {
  getSpy,
};
