import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import * as sessionApi from '../src/services/session/api';

const mockApi = new MockAdapter(axios);

export const testDoubles = {
  credentials: {
    email: 'caregiver@a.com',
    password: '123456'
  },
  token: 'mockToken',
  user: {
    name: 'mockUser'
  }
};

export const setMockApi = () => {
  mockApi.onPost(sessionApi.endpoints.authenticate).reply(config => {
    const { email, password } = JSON.parse(config.data);
    const { credentials, token } = testDoubles;
    if (credentials.email === email && credentials.password === password) {
      return [200, { token: `${token}` }];
    }

    const response = {
      status: 401
    };
    const error = new Error('Bad credentials');
    error.response = response;

    throw error;
  });

  mockApi.onGet(sessionApi.endpoints.me).reply(config => {
    if (config.headers.Authorization === `Bearer ${testDoubles.token}`) {
      return [200, testDoubles.user];
    }

    const response = {
      status: 401
    };
    const error = new Error('Bad token');
    error.response = response;

    throw error;
  });
};

export const restoreMockApi = () => {
  mockApi.restore();
};
