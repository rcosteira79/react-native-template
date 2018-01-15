import { Buffer } from 'buffer';
import { requestApi } from '../api';

export const endpoints = {
  authenticate: 'authenticate',
  user: 'user'
};

export const authenticate = (email, password) => {
  requestApi(endpoints.authenticate, undefined, 'get', {
    Authorization: `Basic ${new Buffer(`${email}:${password}`).toString('base64')}`
  });
};
export const getUser = () => requestApi(endpoints.user);
