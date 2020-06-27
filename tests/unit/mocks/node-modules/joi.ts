class Joi {
  keys: any;

  object(schema: any): Joi {
    this.keys = {};

    Object.keys(schema).forEach((key: string) => {
      this.keys[key] = schema[key];
    });

    return this;
  }

  string(): Joi {
    return this;
  }

  required(): Joi {
    return this;
  }

  validate(value: any): object {
    try {
      Object.keys(this.keys).forEach((key): void => {
        if (!value[key]) {
          throw new Error('Missing parameters');
        }
      });
    } catch (e) {
      return { error: { message: e.message } };
    }

    return {};
  }
}

jest.mock('@hapi/joi', () => ({
  __esModule: true,
  default: new Joi(),
}));
