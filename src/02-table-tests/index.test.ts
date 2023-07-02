import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: 3, b: 21, action: Action.Multiply, expected: 63 },
  { a: 4, b: 2, action: Action.Divide, expected: 2 },
];

describe('simpleCalculator', () => {
  testCases.forEach(({ a, b, action, expected }) => {
    test(`Result of ${action} with ${a} and {b} should be`, () => {
      const result = simpleCalculator({
        a,
        b,
        action,
      });
      if (expected === null) {
        expect(result).toBeNull();
      } else {
        expect(result).toEqual(expected);
      }
    });
  });
});
