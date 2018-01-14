import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../../src/scenes/Login/actions';
import * as loginActionTypes from '../../../src/scenes/Login/actionTypes';
import * as navigationActions from '../../../src/navigation/actions';
import { setMockApi, testDoubles, restoreMockApi } from '../../../__mocks__/mockApi';
import * as loginReducer from '../../../src/scenes/Login/reducer';
import * as sessionReducer from '../../../src/services/session/reducer';
import localeKeys from '../../../src/resources/locales';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const { email, password } = testDoubles.credentials;

let store;

describe('async Login actions', () => {
  beforeEach(() => {
    setMockApi();
    store = mockStore({
      session: sessionReducer.initialState,
      login: loginReducer.initialState
    });
  });

  afterEach(() => {
    restoreMockApi();
  });

  it('Login user with success', () => {
    const expectedActions = [
      { type: loginActionTypes.LOGIN },
      { type: loginActionTypes.LOGIN_SUCCESS },
      navigationActions.navigateToMain()
    ];

    return store.dispatch(actions.loginUser(email, password)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('Login user without success', () => {
    const expectedActions = [
      { type: loginActionTypes.LOGIN },
      {
        type: loginActionTypes.LOGIN_FAIL,
        error: localeKeys.login.error_invalid_email_password
      }
    ];

    return store.dispatch(actions.loginUser(email, 'wrongPassword')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
