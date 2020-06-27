import User from 'src/models/user';

export default class UserService {
  fakeUsers: Array<User> = [
    {
      id: 1,
      username: 'admin',
      password: '1234',
      name: 'John Doe',
      email: 'john.doe@fake.com',
      creationDate: new Date(2020, 1, 1, 0, 0, 0, 0),
    },
  ];

  async findByUsernameAndPassword(
    username: string,
    password: string
  ): Promise<User> {
    return this.fakeUsers.find(
      (user) => user.username === username && user.password === password
    );
  }

  async findById(id: number): Promise<User> {
    return this.fakeUsers.find((user) => user.id === id);
  }
}
