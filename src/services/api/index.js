import axios from 'axios';
import _ from 'lodash';

import * as sessionSelectors from '../session/selectors';
import apiConfig from './config';

axios.defaults.baseURL = apiConfig.url;

export const requestApi = (
  endpoint,
  payload = undefined,
  method = 'get',
  headers = {}
) => {
  const accessToken = sessionSelectors.get().token;

  const requestHeaders = _.pickBy(
    {
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...headers
    },
    item => !_.isEmpty(item)
  );

  return axios({
    url: `${endpoint}`,
    headers: requestHeaders,
    method,
    data: payload
  });
};
