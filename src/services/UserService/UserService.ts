import User from '../../models/User';

export default class UserService {
  private fakeUsers: User[] = [
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
  ): Promise<User | undefined> {
    return this.fakeUsers.find(
      (user) => user.username === username && user.password === password
    );
  }

  async findById(id: number): Promise<User | undefined> {
    return this.fakeUsers.find((user) => user.id === id);
  }
}
