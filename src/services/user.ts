import User from 'src/models/user';
import LoginResponse from 'src/models/responses/login';
import AuthorizationService from 'src/services/authorization';
import UnauthorizedError from 'src/errors/unauthorized';

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

export default class UserService {
  authorizationService: AuthorizationService = new AuthorizationService();

  async findByUsernameAndPassword(
    username: string,
    password: string
  ): Promise<User> {
    return fakeUsers.find(
      (user) => user.username === username && user.password === password
    );
  }

  async login(username: string, password: string): Promise<LoginResponse> {
    const user: User = await this.findByUsernameAndPassword(username, password);

    if (!user) {
      throw new UnauthorizedError('Incorrect username or password');
    }

    const payload: object = { username: user.username };
    const token: string = this.authorizationService.createToken(payload);

    return {
      username: user.username,
      name: user.name,
      email: user.email,
      creationDate: user.creationDate,
      token,
    };
  }

  async findById(id: number): Promise<User> {
    return fakeUsers.find((user) => user.id === id);
  }
}
