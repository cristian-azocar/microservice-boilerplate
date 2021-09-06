import { getMockReq, getMockRes } from '@jest-mock/express';
import { mocked } from 'ts-jest/utils';
import HealthController from './HealthController';
import HealthService from '../../services/HealthService';

jest.mock('../../services/HealthService');

const mockHealthInfo = { service: 'Microservice' };
const req = getMockReq();
const { res } = getMockRes();
const mockedService = mocked(HealthService, true);

describe('Test HealthController', (): void => {
  afterEach((): void => {
    jest.clearAllMocks();
  });

  test('adds the health info to the response payload', async () => {
    const healthController = new HealthController();
    const serviceInstance = mockedService.mock.instances[0];

    serviceInstance.getHealthInfo = jest
      .fn()
      .mockImplementationOnce(() => mockHealthInfo);

    await healthController.getHealthInfo(req, res);

    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(mockHealthInfo);
  });
});
