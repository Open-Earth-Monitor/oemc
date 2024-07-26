import axios, { AxiosError } from 'axios';

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {},
});

API.interceptors.response.use(
  (response) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (response.data?.status === 400) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
      throw new AxiosError(response.data?.message, '400');
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const APISocialMedia = axios.create({
  baseURL: 'https://fosstodon.org/api/v1',
  headers: {},
});

export default API;
