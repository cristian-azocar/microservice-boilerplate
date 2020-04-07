import { ParameterizedContext } from 'koa';
import HealthService from '../services/health';

export default class HealthController {
  healthService: HealthService = new HealthService();

  async getHealthInfo(ctx: ParameterizedContext): Promise<void> {
    ctx.body = await this.healthService.getHealthInfo();
  }
}
