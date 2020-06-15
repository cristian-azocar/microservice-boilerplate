import UserService from 'src/services/user';
import User from 'src/models/user';
import userSchema from 'tests/schemas/user';
import usersFixture from 'tests/unit/fixtures/users';

describe('user service', (): void => {
  const userService: UserService = new UserService();

  afterEach((): void => {
    jest.restoreAllMocks();
  });

  it('should return a user information when credentials are valid', (): void => {
    jest.spyOn(userService, 'getAllUsers').mockReturnValue(usersFixture);

    const user: User = userService.getUserByCredentials(
      'john.doe',
      'secretpassword'
    );

    expect(user).toMatchObject(userSchema);
  });

  it('should return undefined when credentials are invalid', (): void => {
    jest.spyOn(userService, 'getAllUsers').mockReturnValue(usersFixture);

    const user: User = userService.getUserByCredentials(
      'john.doe',
      'wrongpassword'
    );

    expect(user).toBeUndefined();
  });

  it('should return an array of users', (): void => {
    const users: Array<User> = userService.getAllUsers();

    expect(users).toBeDefined();
  });
});
