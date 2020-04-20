import LoginService from 'src/services/login';

export interface MockOptions {
  simulateUserNotFound: boolean;
}

const defaultMockOptions: MockOptions = {
  simulateUserNotFound: false,
};

const getSpy = (options: MockOptions = defaultMockOptions): jest.SpyInstance =>
  jest
    .spyOn(LoginService.prototype, 'login')
    .mockImplementation((username: string) => {
      if (options.simulateUserNotFound) {
        return Promise.resolve(null);
      }

      return Promise.resolve({
        username,
        name: 'John',
        lastName: 'Doe',
        email: 'john.doe@fake.com',
        createdAt: new Date(),
      });
    });

export default {
  getSpy,
};
