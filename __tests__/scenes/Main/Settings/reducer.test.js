import { initialState, settingsReducer } from '../../../../src/scenes/Main/Settings/reducer';
import { LOGOUT } from '../../../../src/store';

describe('Settings reducer', () => {
  it('Should return initial state', () => {
    expect(settingsReducer(undefined, {})).toEqual(initialState);
  });

  it('Should handle logout and clean session', () => {
    expect(
      settingsReducer(initialState, {
        type: LOGOUT
      })
    ).toEqual({
      ...initialState
    });
  });
});
