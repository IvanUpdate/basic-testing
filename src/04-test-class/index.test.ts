import lodash from 'lodash';
import { InsufficientFundsError, SynchronizationFailedError, TransferFailedError, getBankAccount } from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const account = getBankAccount(200);
    expect(account.getBalance()).toBe(200);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(200);
    expect(() => account.withdraw(300)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const account = getBankAccount(200);
    const account_2 = getBankAccount(300);
    expect(() => account.transfer(500, account_2)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(200);
    expect(() => account.transfer(500, account)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const account = getBankAccount(200);
    expect(account.deposit(300).getBalance()).toEqual(500);
  });

  test('should withdraw money', () => {
    const account = getBankAccount(200);
    expect(account.withdraw(100).getBalance()).toEqual(100);
  });

  test('should transfer money', () => {
    const account = getBankAccount(200);
    const account_2 = getBankAccount(300);
    account.transfer(100, account_2);
    expect(account.getBalance()).toEqual(100);
    expect(account_2.getBalance()).toEqual(400);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(200);
    lodash.random = jest.fn(() => 2);
    const result = await account.fetchBalance();
    expect(result).toEqual(2);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const fetchedBalance = 200;
    const account = getBankAccount(100);
    account.fetchBalance = jest.fn(async () => fetchedBalance);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(fetchedBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(100);
    account.fetchBalance = jest.fn(async () => null);
    await expect(() => account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
