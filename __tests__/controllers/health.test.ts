import { Context } from 'koa';
import { createMockContext } from '@shopify/jest-koa-mocks';
import HealthController from '../../src/controllers/health';
import healthMatch from '../../__matches__/health';

describe('health controllers', (): void => {
  it('should set ctx body with health information', async (): Promise<void> => {
    const healthController: HealthController = new HealthController();
    const ctx: Context = createMockContext();

    await healthController.getHealthInfo(ctx);

    expect(ctx.body).toMatchObject(healthMatch);
  });
});
