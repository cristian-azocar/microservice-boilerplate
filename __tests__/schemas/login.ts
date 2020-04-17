import '../matchers/to-be-types';

export default {
  username: expect.any(String),
  name: expect.any(String),
  lastName: expect.any(String),
  email: expect.any(String),
  createdAt: expect.toBeTypes([Date, String]),
};
