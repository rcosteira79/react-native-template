import axios from 'axios';
import { Buffer } from 'buffer';
import MockAdapter from 'axios-mock-adapter';

import * as sessionApi from '../src/services/session/api';

const mockApi = new MockAdapter(axios);

export const testDoubles = {
  credentials: {
    email: 'correct@credentials.com',
    password: '123456'
  },
  token: 'mockToken',
  user: {
    name: 'mockUser'
  }
};

export const setMockApi = () => {
  mockApi.onGet(sessionApi.endpoints.authenticate).reply(config => {
    const basicAuth = config.headers.Authorization;
    const { credentials, token } = testDoubles;
    const testBasicAuth = `Basic ${new Buffer(
      `${credentials.email}:${credentials.password}`
    ).toString('base64')}`;

    if (basicAuth === testBasicAuth) {
      return [200, { token: `${token}` }];
    }

    const response = {
      status: 401
    };
    const error = new Error('Bad credentials');
    error.response = response;

    throw error;
  });

  mockApi.onGet(sessionApi.endpoints.user).reply(config => {
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
