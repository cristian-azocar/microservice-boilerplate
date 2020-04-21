declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Expect {
      toBeTypes: (expected: Array<any>) => CustomMatcherResult;
    }
  }
}

expect.extend({
  toBeTypes(received: any, expected: Array<any>): jest.CustomMatcherResult {
    const hasAnyExpectedType: boolean = expected.some(
      (type: any) =>
        typeof received === type.name.toLowerCase() || received instanceof type
    );

    if (!hasAnyExpectedType) {
      return {
        pass: false,
        message: (): string =>
          `expected ${received} to be one of the following types: ${expected.join(
            ', '
          )}`,
      };
    }

    return {
      pass: true,
      message: (): string => `Ok`,
    };
  },
});

export default undefined;
