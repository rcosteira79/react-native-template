import AppNavigator from './routes';

import { NAVIGATION_SPLASH } from './actionTypes';

const initialState = AppNavigator.router.getStateForAction(
  AppNavigator.router.getActionForPathAndParams(NAVIGATION_SPLASH)
);

export const navigationReducer = (state = initialState, action) => {
  const newState = AppNavigator.router.getStateForAction(action, state);

  return newState || state;
};
