import { initialState, loginReducer } from '../../../src/scenes/Login/reducer';
import * as actionTypes from '../../../src/scenes/Login/actionTypes';
import { emailRegex } from '../../../src/services/helpers/index';

describe('Login reducer', () => {
  it('Should return initial state', () => {
    expect(loginReducer(undefined, {})).toEqual(initialState);
  });

  it('Should handle email updates', () => {
    const testEmail = 'email@';
    const anotherTestEmail = 'email@a.com';

    expect(
      loginReducer(initialState, {
        type: actionTypes.EMAIL_CHANGED,
        payload: {
          email: testEmail,
          validEmail: emailRegex.test(testEmail),
          error: ''
        }
      })
    ).toEqual({
      ...initialState,
      email: testEmail,
      validEmail: false,
      error: ''
    });

    expect(
      loginReducer(
        {
          ...initialState,
          email: testEmail,
          validEmail: false,
          error: ''
        },
        {
          type: actionTypes.EMAIL_CHANGED,
          payload: {
            email: anotherTestEmail,
            validEmail: emailRegex.test(anotherTestEmail),
            error: ''
          }
        }
      )
    ).toEqual({
      ...initialState,
      email: anotherTestEmail,
      validEmail: true,
      error: ''
    });
  });

  it('Should handle password updates', () => {
    const testPassword = '';
    const anotherTestPassword = 'p';

    expect(
      loginReducer(initialState, {
        type: actionTypes.EMAIL_CHANGED,
        payload: {
          password: testPassword,
          validPassword: testPassword !== '',
          error: ''
        }
      })
    ).toEqual({
      ...initialState,
      password: testPassword,
      validPassword: false,
      error: ''
    });

    expect(
      loginReducer(
        {
          ...initialState,
          password: testPassword,
          validPassword: false,
          error: ''
        },
        {
          type: actionTypes.EMAIL_CHANGED,
          payload: {
            password: anotherTestPassword,
            validPassword: anotherTestPassword !== '',
            error: ''
          }
        }
      )
    ).toEqual({
      ...initialState,
      password: anotherTestPassword,
      validPassword: true,
      error: ''
    });
  });

  it('Should handle login', () => {
    expect(
      loginReducer(initialState, {
        type: actionTypes.LOGIN
      })
    ).toEqual({
      ...initialState,
      isLoading: true
    });
  });

  it('Should handle login succcess', () => {
    expect(
      loginReducer(initialState, {
        type: actionTypes.LOGIN_SUCCESS
      })
    ).toEqual({
      ...initialState
    });
  });

  it('Should handle login failure', () => {
    const loginError = 'loginError';
    expect(
      loginReducer(initialState, {
        type: actionTypes.LOGIN_FAIL,
        error: loginError
      })
    ).toEqual({
      ...initialState,
      error: loginError,
      isLoading: false
    });
  });
});
