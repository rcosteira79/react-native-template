import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StackNavigator, addNavigationHelpers } from 'react-navigation';
import Routes from './routes';

export const AppNavigator = StackNavigator(Routes);

const AppWithNavigationState = ({ dispatch, navigation }) => {
	return (
		<AppNavigator
			navigation={addNavigationHelpers({
				dispatch,
				state: navigation,
			})}
		/>
	);
};

AppWithNavigationState.propTypes = {
	dispatch: PropTypes.func.isRequired,
	navigation: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	navigation: state.navigation,
});

export default connect(mapStateToProps)(AppWithNavigationState);
