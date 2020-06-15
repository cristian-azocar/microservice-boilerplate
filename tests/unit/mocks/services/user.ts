import UserService from 'src/services/user';
import User from 'src/models/user';
import users from 'tests/unit/fixtures/users';

function UserServiceMock(): Partial<UserService> {
  return {
    getUserByCredentials: (username: string, password: string): User => {
      const user = users.find(
        (u) => u.username === username && u.password === password
      );

      if (!user) {
        return null;
      }

      return user;
    },
  };
}

jest.mock('src/services/user', () => UserServiceMock);
