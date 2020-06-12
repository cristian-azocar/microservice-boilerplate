import HealthInfo from 'src/models/responses/health';
import nconf from 'nconf';
import pkg from 'package.json';

export default class HealthService {
  async getHealthInfo(): Promise<HealthInfo> {
    return {
      nodeVersion: process.version,
      service: nconf.get('SERVICE_NAME'),
      memory: process.memoryUsage(),
      pid: process.pid,
      uptime: process.uptime(),
      environment: process.env.NODE_ENV,
      package: {
        name: pkg.name,
        version: pkg.version,
      },
    };
  }
}
