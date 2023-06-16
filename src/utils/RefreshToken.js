// eslint-disable-next-line import/no-unresolved
import mem from 'mem';
import AxiosPublic from './AxiosPublic';

const RefreshToken = async () => {
  const refreshToken = JSON.parse(localStorage.getItem('refreshToken'));

  AxiosPublic.post('/token/refresh', {
    refresh_token: refreshToken,
  })
    .then((response) => {
      const newSession = response.data;
      if (!newSession.token) {
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('token');
      }

      localStorage.setItem('refreshToken', newSession.refresh_token);
      localStorage.setItem('token', newSession.token);
    })
    .catch(() => {
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('token');
    });
};

const maxAge = 10000;

const memoizedRefreshToken = mem(RefreshToken, {
  maxAge,
});

export default memoizedRefreshToken;
