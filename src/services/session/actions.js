import { UPDATE_TOKEN, UPDATE_USER } from './actionTypes';

export const updateToken = token => {
  return {
    type: UPDATE_TOKEN,
    token
  };
};

export const updateUser = user => {
  return {
    type: UPDATE_USER,
    user
  };
};
