// eslint-disable-next-line import/no-unresolved
// import mem from 'mem';
// eslint-disable-next-line import/no-named-as-default
import AxiosPublic from './AxiosPublic';

const RefreshToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');

  AxiosPublic.post('/token/refresh', {
    refresh_token: refreshToken,
  })
    .then((response) => {
      const newSession = response.data;
      // if (!newSession.token) {
      //   localStorage.removeItem('refreshToken');
      //   localStorage.removeItem('token');
      //   localStorage.removeItem('isLoggedIn');
      //   localStorage.removeItem('invitedUser');
      // }

      localStorage.setItem('refreshToken', newSession.refresh_token);
      localStorage.setItem('token', newSession.token);
      localStorage.setItem('isLoggedIn', true);
      localStorage.setItem('invitedUser', false);
    })
    .catch(() => {
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('token');
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('invitedUser');
    });
};

// const maxAge = 10000;

// const memoizedRefreshToken = mem(RefreshToken, {
//   maxAge,
// });

export default RefreshToken;
