import axios from 'axios';

import memoizedRefreshToken from './RefreshToken';

axios.defaults.baseURL = 'https://regalade.lesliecordier.fr/projet-o-lala-la-regalade-back/public/api';

axios.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      // eslint-disable-next-line no-param-reassign
      config.headers = {
        ...config.headers,
        authorization: `Bearer ${token}`,
      };
    }

    return config;
  },
  (error) => Promise.reject(error),
);

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error?.config;

    if (error?.response?.status === 401 && !config?.sent) {
      config.sent = true;

      const result = await memoizedRefreshToken();

      if (result?.token) {
        config.headers = {
          ...config.headers,
          authorization: `Bearer ${result?.token}`,
        };
      }

      return axios(config);
    }
    return Promise.reject(error);
  },
);

const AxiosPrivate = axios;

export default AxiosPrivate;
