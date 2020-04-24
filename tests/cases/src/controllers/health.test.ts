import { Context } from 'koa';
import { createMockContext } from '@shopify/jest-koa-mocks';
import HealthController from 'src/controllers/health';
import healthInfoMatch from 'tests/schemas/health';
import healthServiceMock from 'tests/mocks/services/health';

describe('health controllers', (): void => {
  let spy: jest.SpyInstance;

  beforeAll((): void => {
    spy = healthServiceMock.getSpy();
  });

  afterAll((): void => {
    spy.mockRestore();
  });

  it('should return the health information', async (): Promise<void> => {
    const healthController: HealthController = new HealthController();
    const ctx: Context = createMockContext();

    await healthController.getHealthInfo(ctx);

    expect(ctx.body).toMatchObject(healthInfoMatch);
  });
});
