import _ from 'lodash';
import { store } from '../../store';
import * as api from './api';
import * as actionCreators from './actions';
import * as sessionSelectors from './selectors';

export const authenticate = (email, password) => {
  if (!_.isEmpty(sessionSelectors.get().token)) {
    return getUser();
  }

  return api
    .authenticate(email, password)
    .then(onAuthenticationSuccess)
    .catch(onRequestFail);
};

export const getUser = () => {
  return api
    .getUser()
    .then(response => {
      store.dispatch(actionCreators.updateUser(response.data));
    })
    .catch(onRequestFail);
};

const onAuthenticationSuccess = response => {
  store.dispatch(actionCreators.updateToken(response.data.token));
  getUser();
};

const onRequestFail = error => {
  throw error;
};
