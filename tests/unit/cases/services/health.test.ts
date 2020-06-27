import 'src/settings/load';
import HealthService from 'src/services/health';
import HealthInfo from 'src/models/responses/health';
import healthInfoSchema from 'tests/schemas/health';

describe('health service', (): void => {
  it('should return the service health', async (): Promise<void> => {
    const healthService: HealthService = new HealthService();
    const healthInfo: HealthInfo = await healthService.getHealthInfo();

    expect(healthInfo).toMatchObject(healthInfoSchema);
  });
});
