import * as session from '../../services/session';
import Locales from '../../resources/locales';

import { EMAIL_CHANGED, PASSWORD_CHANGED, LOGIN, LOGIN_FAIL, LOGIN_SUCCESS } from './actionTypes';
import { navigateToMain } from '../../navigation/actions';
import { emailRegex } from '../../services/helpers/index';

export const emailChanged = email => {
  return {
    type: EMAIL_CHANGED,
    payload: {
      email,
      validEmail: emailRegex.test(email),
      error: ''
    }
  };
};

export const passwordChanged = password => {
  return {
    type: PASSWORD_CHANGED,
    payload: {
      password,
      validPassword: password !== '',
      error: ''
    }
  };
};

export const loginUser = (email, password) => {
  return dispatch => {
    dispatch({ type: LOGIN });
    return session
      .authenticate(email, password)
      .then(() => {
        dispatch(loginSuccess());
        dispatch(navigateToMain());
      })
      .catch(error => {
        dispatch(loginFail(error));
      });
  };
};

const loginSuccess = () => {
  return {
    type: LOGIN_SUCCESS
  };
};

const loginFail = error => {
  const errorTextKey = getErrorMessage(error);

  return {
    type: LOGIN_FAIL,
    error: errorTextKey
  };
};

const getErrorMessage = error => {
  let errorTextKey;

  switch (error.response.status) {
    case 401:
      errorTextKey = Locales.login.error_invalid_email_password;
      break;

    default:
      errorTextKey = Locales.login.error_unknown;
      break;
  }

  return errorTextKey;
};
