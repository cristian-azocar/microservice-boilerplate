import { Context } from 'koa';
import HealthService from '../services/health';

export default class HealthController {
  healthService: HealthService = new HealthService();

  async getHealthInfo(ctx: Context): Promise<void> {
    ctx.body = await this.healthService.getHealthInfo();
  }
}