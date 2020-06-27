import 'tests/unit/matchers/to-be-types';

export default {
  username: expect.any(String),
  password: expect.any(String),
  name: expect.any(String),
  email: expect.any(String),
  creationDate: expect.toBeTypes([Date, String]),
};
