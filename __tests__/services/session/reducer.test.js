import {
  initialState,
  sessionReducer
} from '../../../src/services/session/reducer';
import * as actionTypes from '../../../src/services/session/actionTypes';
import { LOGOUT } from '../../../src/store';

describe('Session reducer', () => {
  it('Should return initial state', () => {
    expect(sessionReducer(undefined, {})).toEqual(initialState);
  });

  it('Should handle token update', () => {
    const testToken = 'testToken';
    const anotherTestToken = 'anotherTestToken';
    expect(
      sessionReducer(initialState, {
        type: actionTypes.UPDATE_TOKEN,
        token: testToken
      })
    ).toEqual({
      token: testToken,
      user: null
    });

    expect(
      sessionReducer(
        {
          token: testToken,
          user: null
        },
        {
          type: actionTypes.UPDATE_TOKEN,
          token: anotherTestToken
        }
      )
    ).toEqual({
      token: anotherTestToken,
      user: null
    });
  });

  it('Should handle user update', () => {
    const testUser = { name: 'testUser', email: 'test@email.com' };
    const anotherTestUser = {
      name: 'anotherTestUser',
      email: 'anotherTest@email.com'
    };
    expect(
      sessionReducer(initialState, {
        type: actionTypes.UPDATE_USER,
        user: testUser
      })
    ).toEqual({
      token: '',
      user: testUser
    });

    expect(
      sessionReducer(
        {
          token: '',
          user: testUser
        },
        {
          type: actionTypes.UPDATE_USER,
          user: anotherTestUser
        }
      )
    ).toEqual({
      token: '',
      user: anotherTestUser
    });
  });

  it('Should handle logout', () => {
    expect(
      sessionReducer(initialState, {
        type: LOGOUT
      })
    ).toEqual({
      token: '',
      user: null
    });
  });
});
