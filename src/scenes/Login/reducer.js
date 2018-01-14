import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAIL
} from './actionTypes';

export const initialState = {
  isLoading: false,
  email: '',
  password: '',
  validEmail: false,
  validPassword: false,
  error: ''
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case EMAIL_CHANGED:
    case PASSWORD_CHANGED:
      return { ...state, ...action.payload };
    case LOGIN:
      return { ...state, isLoading: true };
    case LOGIN_SUCCESS:
      return { ...state, ...initialState };
    case LOGIN_FAIL:
      return { ...state, error: action.error, isLoading: false };
    default:
      return state;
  }
};
