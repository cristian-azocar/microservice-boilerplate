import { Context } from 'koa';
import { createMockContext } from '@shopify/jest-koa-mocks';
import HealthController from '../../src/controllers/health';
import healthInfoMatch from '../../__matches__/health';
import healthServiceMock from '../../__mocks__/services/health';

describe('health controllers', (): void => {
  let spy: jest.SpyInstance;

  beforeAll((): void => {
    spy = healthServiceMock.getSpy();
  });

  afterAll((): void => {
    spy.mockRestore();
  });

  it('should set ctx body with health information', async (): Promise<void> => {
    const healthController: HealthController = new HealthController();
    const ctx: Context = createMockContext();

    await healthController.getHealthInfo(ctx);

    expect(ctx.body).toMatchObject(healthInfoMatch);
  });
});
