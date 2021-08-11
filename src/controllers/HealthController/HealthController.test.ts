import { getMockReq, getMockRes } from '@jest-mock/express';
import { mocked } from 'ts-jest/utils';
import HealthController from './HealthController';
import HealthService from '../../services/HealthService';

jest.mock('../../services/HealthService');

const req = getMockReq();
const { res } = getMockRes();
const mockedService = mocked(HealthService, true);

describe('Test HealthController', (): void => {
  afterEach((): void => {
    jest.clearAllMocks();
  });

  test('calls the health service', async (): Promise<void> => {
    const healthController = new HealthController();
    const serviceInstance = mockedService.mock.instances[0];

    await healthController.getHealthInfo(req, res);

    expect(serviceInstance.getHealthInfo).toHaveBeenCalledTimes(1);
  });

  test('sends a JSON response', async (): Promise<void> => {
    const healthController = new HealthController();

    await healthController.getHealthInfo(req, res);

    expect(res.json).toHaveBeenCalledTimes(1);
  });
});
