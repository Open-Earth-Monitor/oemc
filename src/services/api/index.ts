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

export const APIOpenStreetMapLocation = axios.create({
  baseURL: 'https://nominatim.openstreetmap.org',
  headers: {},
});

export const APIZenodo = axios.create({
  baseURL: 'https://zenodo.org/api',
  headers: {},
});

// Public group libraries are readable anonymously. The API version is pinned via
// the `v` query param rather than the `Zotero-API-Version` header: a custom header
// would turn every call into a CORS preflight for no benefit.
export const APIZotero = axios.create({
  baseURL: 'https://api.zotero.org',
  headers: {},
});

export default API;
