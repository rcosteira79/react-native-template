import { NavigationActions } from 'react-navigation';
import * as actions from '../../src/navigation/actions';
import * as actionTypes from '../../src/navigation/actionTypes';

describe('Navigation actions', () => {
  it('Create action to navigate to login', () => {
    const expectedAction = NavigationActions.navigate({
      routeName: actionTypes.NAVIGATION_LOGIN
    });

    expect(actions.navigateToLogin()).toEqual(expectedAction);
  });

  it('Create action to navigate to main', () => {
    const expectedAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: actionTypes.NAVIGATION_MAIN })
      ]
    });

    expect(actions.navigateToMain()).toEqual(expectedAction);
  });
});
