import { Context } from 'koa';
import HealthService from 'src/services/health';

export default class HealthController {
  private healthService: HealthService = new HealthService();

  async getHealthInfo(ctx: Context): Promise<void> {
    ctx.body = await this.healthService.getHealthInfo();
  }
}
