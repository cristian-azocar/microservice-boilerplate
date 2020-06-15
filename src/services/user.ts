import User from 'src/models/user';

export default class UserService {
  getAllUsers(): Array<User> {
    return [
      {
        username: 'admin',
        password: '1234',
        name: 'John Doe',
        email: 'john.doe@fake.com',
        creationDate: new Date(2020, 1, 1, 0, 0, 0, 0),
      },
    ];
  }

  getUserByCredentials(username: string, password: string): User {
    return this.getAllUsers().find(
      (user) => user.username === username && user.password === password
    );
  }
}
