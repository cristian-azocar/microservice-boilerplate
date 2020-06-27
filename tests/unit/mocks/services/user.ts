import UserService from 'src/services/user';
import User from 'src/models/user';
import users from 'tests/unit/fixtures/users';

function UserServiceMock(): Partial<UserService> {
  return {
    findByUsernameAndPassword: async (
      username: string,
      password: string
    ): Promise<User> => {
      return users.find(
        (u) => u.username === username && u.password === password
      );
    },
    findById: async (id: number): Promise<User> => {
      return users.find((u) => u.id === id);
    },
  };
}

jest.mock('src/services/user', () => UserServiceMock);
