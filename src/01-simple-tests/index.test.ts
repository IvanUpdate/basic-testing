import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const answer = simpleCalculator({ a: 21, b: 12, action: Action.Add });
    expect(answer).toBe(33);
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator({ a: 21, b: 12, action: Action.Subtract });
    expect(result).toBe(9);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({ a: 21, b: 12, action: Action.Multiply });
    expect(result).toBe(252);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({ a: 21, b: 7, action: Action.Divide });
    expect(result).toBe(3);
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({ a: 2, b: 3, action: Action.Exponentiate });
    expect(result).toBe(8);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({ a: 21, b: 12, action: 'invalid action' });
    expect(result).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({ a: 21, b: undefined, action: Action.Multiply });
    expect(result).toBe(null);
  });
});
