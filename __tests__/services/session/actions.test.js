import * as actions from '../../../src/services/session/actions';
import * as actionTypes from '../../../src/services/session/actionTypes';

describe('Session actions', () => {
  it('Create action to update token', () => {
    const token = 'token';
    const expectedAction = {
      type: actionTypes.UPDATE_TOKEN,
      token
    };

    expect(actions.updateToken(token)).toEqual(expectedAction);
  });

  it('Create action to update user', () => {
    const user = { name: 'user', email: 'user@email.com' };
    const expectedAction = {
      type: actionTypes.UPDATE_USER,
      user
    };

    expect(actions.updateUser(user)).toEqual(expectedAction);
  });
});
