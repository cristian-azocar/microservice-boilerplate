import User from 'src/models/user';

export default class UserService {
  private fakeUsers: Array<User> = [
    {
      username: 'admin',
      password: '1234',
      name: 'John Doe',
      email: 'john.doe@fake.com',
      creationDate: new Date(2020, 1, 1, 0, 0, 0, 0),
    },
  ];

  getUserByCredentials(username: string, password: string): User {
    const foundUser = this.fakeUsers.find(
      (user) => user.username === username && user.password === password
    );

    return foundUser;
  }
}
