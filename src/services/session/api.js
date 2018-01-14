import { requestApi } from '../api';

export const endpoints = {
  authenticate: 'auth',
  me: 'me'
};

export const authenticate = (email, password) =>
  requestApi(
    endpoints.authenticate,
    {
      email,
      password
    },
    'post'
  );

export const getUser = () => requestApi(endpoints.me);
