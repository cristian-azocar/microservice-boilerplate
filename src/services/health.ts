import HealthInfo from '../models/health';

export default class HealthService {
  async getHealthInfo(): Promise<HealthInfo> {
    return {
      nodeVersion: process.version,
      service: 'Demo OTT Microservice',
      memory: process.memoryUsage(),
      pid: process.pid,
      uptime: process.uptime(),
      environment: process.env.NODE_ENV,
      appPackage: process.env.npm_package_name,
      appVersionPackage: process.env.npm_package_version
    };
  }
}
