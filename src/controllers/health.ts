import { Context } from 'koa';
import HealthService from 'src/services/health';

export default class HealthController {
  private healthService: HealthService = new HealthService();

  constructor() {
    this.getHealthInfo = this.getHealthInfo.bind(this);
  }

  async getHealthInfo(ctx: Context): Promise<void> {
    ctx.body = await this.healthService.getHealthInfo();
  }
}
