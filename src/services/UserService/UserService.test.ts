import UserService from './UserService';

describe('UserService', (): void => {
  test('returns the user information when credentials are valid', async () => {
    const userService = new UserService();
    const user = await userService.findByUsernameAndPassword('admin', '1234');

    expect(user).toBeDefined();
  });

  test('returns undefined when credentials are invalid', async () => {
    const userService = new UserService();
    const user = await userService.findByUsernameAndPassword('admin', '4321');

    expect(user).toBeUndefined();
  });

  test('returns a user by ID', async () => {
    const userService = new UserService();
    const user = await userService.findById(1);

    expect(user).toBeDefined();
  });
});
