import UserService from 'src/services/user';
import User from 'src/models/user';
import userSchema from 'tests/schemas/user';
import usersFixture from 'tests/unit/fixtures/users';

describe('user service', (): void => {
  const userService: UserService = new UserService();

  beforeAll((): void => {
    userService.fakeUsers = usersFixture;
  });

  it('should return a user information when credentials are valid', async (): Promise<
    void
  > => {
    const user: User = await userService.findByUsernameAndPassword(
      'john.doe',
      'secretpassword'
    );

    expect(user).toMatchObject(userSchema);
  });

  it('should return undefined when credentials are invalid', async (): Promise<
    void
  > => {
    const user: User = await userService.findByUsernameAndPassword(
      'john.doe',
      'wrongpassword'
    );

    expect(user).toBeUndefined();
  });

  it('should return a user by ID', async (): Promise<void> => {
    const user: User = await userService.findById(1);

    expect(user).toBeDefined();
  });
});
