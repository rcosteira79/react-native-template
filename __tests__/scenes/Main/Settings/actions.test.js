import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as actions from '../../../../src/scenes/Main/Settings/actions';
import { navigateToLogin } from '../../../../src/navigation/actions';
import { LOGOUT } from '../../../../src/store';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

let store;

describe('Settings actions', () => {
  beforeEach(() => {
    store = mockStore();
  });

  it('Creates action to logout', async () => {
    const expectedActions = [{ type: LOGOUT }, navigateToLogin(true)];

    await store.dispatch(actions.logoutUser());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
