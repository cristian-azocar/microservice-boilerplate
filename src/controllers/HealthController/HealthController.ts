import { Request, Response } from 'express';
import HealthService from '../../services/HealthService';

export default class HealthController {
  private healthService: HealthService = new HealthService();

  constructor() {
    this.getHealthInfo = this.getHealthInfo.bind(this);
  }

  async getHealthInfo(req: Request, res: Response): Promise<void> {
    const healthInfo = await this.healthService.getHealthInfo();
    res.json(healthInfo);
  }
}
