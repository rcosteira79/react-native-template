import { NavigationActions } from 'react-navigation';
import { AppNavigator } from '../navigation';

export const initialState = AppNavigator.router.getStateForAction(
	AppNavigator.router.getActionForPathAndParams('Splash')
);

export const navigationReducer = (state = initialState, action) => {
	let newState;
	switch (action.type) {
		case 'Login':
			newState = AppNavigator.router.getStateForAction(
				NavigationActions.navigate({ routeName: 'Login' }),
				state
			);
			break;
		case 'Main':
			newState = AppNavigator.router.getStateForAction(
				NavigationActions.navigate({ routeName: 'Main' }),
				state
			);
			break;
		default:
			newState = AppNavigator.router.getStateForAction(action, state);
			break;
	}

	return newState || state;
};
