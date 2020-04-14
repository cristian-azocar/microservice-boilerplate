import HealthService from '../../src/services/health';

const getSpy = (): jest.SpyInstance =>
  jest.spyOn(HealthService.prototype, 'getHealthInfo').mockImplementation(() =>
    Promise.resolve({
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
    })
  );

export default {
  getSpy,
};
