import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { throttledGetDataFromApi } from './index';

const mock = new MockAdapter(axios);

describe('throttledGetDataFromApi', () => {
  afterEach(() => {
    mock.reset();
  });

  test('should create instance with provided base url', async () => {
    const baseURL = 'https://jsonplaceholder.typicode.com';

    await throttledGetDataFromApi('/posts');

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: baseURL,
    });
  });

  test('should perform request to correct provided url', async () => {
    const relativePath = '/posts';
    const responseData = 'dummyData';

    // Mock the axios request using axios-mock-adapter
    mock.onGet(relativePath).reply(200, { data: responseData });

    const result = await throttledGetDataFromApi(relativePath);

    expect(result).toEqual(responseData);

    expect((mock.history.get[0] as { url: string }).url).toBe(relativePath);
  });
});

