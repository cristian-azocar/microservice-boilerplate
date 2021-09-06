import HealthService from './HealthService';

describe('HealthService', (): void => {
  test('returns the health information', async () => {
    const healthService = new HealthService();
    const healthInfo = await healthService.getHealthInfo();

    expect(healthInfo).toBeDefined();
  });
});
