import HealthInfo from '../../models/HealthInfo';

export default class HealthService {
  async getHealthInfo(): Promise<HealthInfo> {
    return {
      nodeVersion: process.version,
      service: process.env.SERVICE_NAME || '',
      memory: process.memoryUsage(),
      pid: process.pid,
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || '',
    };
  }
}
