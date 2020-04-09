import HealthService from '../../src/services/health';
import HealthInfo from '../../src/models/health';
import healthMatch from '../../__matches__/health';

describe('health service', (): void => {
  it('should return the service health', async (): Promise<void> => {
    const healthService: HealthService = new HealthService();
    const healthInfo: HealthInfo = await healthService.getHealthInfo();

    expect(healthInfo).toMatchObject(healthMatch);
  });
});
