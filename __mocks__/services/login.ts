import LoginService from 'src/services/login';

const getSpy = (): jest.SpyInstance =>
  jest
    .spyOn(LoginService.prototype, 'login')
    .mockImplementation((username: string) =>
      Promise.resolve({
        username,
        name: 'John',
        lastName: 'Doe',
        email: 'john.doe@fake.com',
        createdAt: new Date(),
      })
    );

export default {
  getSpy,
};
