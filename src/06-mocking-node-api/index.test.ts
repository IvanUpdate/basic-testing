import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'path';
import fs from 'fs';
import fsAsync from 'fs/promises';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const timer = 1000;
    const spyTimeout = jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(callback, timer);
    expect(spyTimeout).toHaveBeenCalledWith(callback, timer);
    spyTimeout.mockRestore();
  });

  test('should call callback only after timeout', () => {
    const callBack = jest.fn();
    doStuffByTimeout(callBack, 1000);
    expect(callBack).not.toBeCalled();
    jest.runAllTimers();
    expect(callBack).toBeCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    const interval = 1000;
    jest.spyOn(global, 'setInterval');
    doStuffByInterval(callback, interval);
    expect(setInterval).toHaveBeenCalledWith(callback, interval);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const interval = 1000;
    doStuffByInterval(callback, interval);
    jest.advanceTimersByTime(2000);
    expect(callback).toHaveBeenCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const pathToFile = jest.spyOn(path, 'join');
    await readFileAsynchronously('test.txt');
    expect(pathToFile).toHaveBeenCalled();
  });

  test('should return null if file does not exist', async () => {
    const pathToFile = 'path/file.txt';
    const mockExistsSync = jest.spyOn(fs, 'existsSync');
    mockExistsSync.mockReturnValue(false);
    await expect(readFileAsynchronously(pathToFile)).resolves.toBeNull();
    mockExistsSync.mockRestore();
  });

  test('should return file content if file exists', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest
      .spyOn(fsAsync, 'readFile')
      .mockResolvedValue({ toString: () => '' } as Buffer);
    const content = await readFileAsynchronously('test.txt');
    expect(typeof content).toBe('string');
  });
});
