import React from 'react';
import { View, Image } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import * as session from '../../services/session';
import store from '../../store';

const logo = require('../../resources/images/react-native-symbol.png');

class Splash extends React.Component {

	componentDidMount() {
		const unsubscribe = store.subscribe(() => {
			if (store.getState().services.persist.isHydrated) {
				unsubscribe();
				this.autoLogin();
			}
		});
	}

	autoLogin() {
		session.refreshToken()
			.then(() => {
				this.props.navigation.dispatch({ type: 'Main' });
			}).catch(() => {
				this.props.navigation.dispatch({ type: 'Login' });
			});
	}

	render() {
		return (
			<View style={styles.layout}>
				<Image
					style={styles.logoContainer}
					resizeMode="contain"
					source={logo} 
				/>
			</View>
		);
	}
}

const styles = EStyleSheet.create({
	layout: {
		backgroundColor: '$colorWhite',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	logoContainer: {
		flex: 1,
		width: 300,
		height: 300,
	},
	title: {
		color: '$colorText',
		fontSize: 42,
		fontWeight: 'bold',
	},
});

export default Splash;
