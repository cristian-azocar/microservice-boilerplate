import HealthService from 'src/services/health';
import HealthInfo from 'src/models/responses/health';
import healthInfoMatch from '__tests__/schemas/health';

describe('health service', (): void => {
  it('should return the service health', async (): Promise<void> => {
    /* eslint-disable @typescript-eslint/camelcase */
    process.env.npm_package_name = 'foo';
    process.env.npm_package_version = 'bar';
    /* eslint-enable @typescript-eslint/camelcase */

    const healthService: HealthService = new HealthService();
    const healthInfo: HealthInfo = await healthService.getHealthInfo();

    expect(healthInfo).toMatchObject(healthInfoMatch);
  });
});
