import User from 'src/models/user';

const fakeUsers: Array<User> = [
  {
    id: 1,
    username: 'admin',
    password: '1234',
    name: 'John Doe',
    email: 'john.doe@fake.com',
    creationDate: new Date(2020, 1, 1, 0, 0, 0, 0),
  },
];

class UserService {
  async findByUsernameAndPassword(
    username: string,
    password: string
  ): Promise<User> {
    return fakeUsers.find(
      (user) => user.username === username && user.password === password
    );
  }

  async findById(id: number): Promise<User> {
    return fakeUsers.find((user) => user.id === id);
  }
}

export default new UserService();
