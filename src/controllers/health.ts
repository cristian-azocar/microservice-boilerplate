import HealthInfo from '../models/health';
import HealthService from '../services/health';
import { ParameterizedContext } from 'koa';

export default class HealthController {
  healthService: HealthService = new HealthService();

  async getHealthInfo(ctx: ParameterizedContext): Promise<void> {
    ctx.body = await this.healthService.getHealthInfo();
  }
}
