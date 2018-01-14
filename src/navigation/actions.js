import { NavigationActions } from 'react-navigation';
import { NAVIGATION_LOGIN, NAVIGATION_MAIN } from './actionTypes';

export const navigateToLogin = (isLogout = false) => {
  const login = NavigationActions.navigate({ routeName: NAVIGATION_LOGIN });

  if (isLogout) {
    return NavigationActions.reset({
      index: 0,
      actions: [login]
    });
  }

  return login;
};

export const navigateToMain = () => {
  return NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: NAVIGATION_MAIN })]
  });
};
