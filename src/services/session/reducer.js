import { UPDATE_TOKEN, UPDATE_USER } from './actionTypes';
import { LOGOUT } from '../../store';

export const initialState = {
  token: '',
  user: null
};

export const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_TOKEN:
      return { ...state, token: action.token };

    case UPDATE_USER:
      return { ...state, user: action.user };

    case LOGOUT:
      return { ...state, ...initialState };

    default:
      return state;
  }
};
