import LoginResponse from 'src/models/responses/login';

export default class LoginService {
  async login(username: string, password: string): Promise<LoginResponse> {
    return {
      username,
      name: 'John',
      lastName: 'Doe',
      email: 'john.doe@fake.com',
      createdAt: new Date(),
    };
  }
}
