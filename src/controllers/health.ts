import { Context } from 'koa';
import healthService from 'src/services/health';

export default class HealthController {
  constructor() {
    this.getHealthInfo = this.getHealthInfo.bind(this);
  }

  async getHealthInfo(ctx: Context): Promise<void> {
    ctx.body = await healthService.getHealthInfo();
  }
}
