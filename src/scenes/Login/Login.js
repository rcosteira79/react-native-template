import React from 'react';
import { View, Text, Image } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import LoginForm from './LoginForm';

const logo = require('../../resources/images/react-native-symbol.png');

const login = () => {
	return (
		<View style={styles.layout}>
			<View style={styles.header}>
				<Text style={styles.title}>
					Hello
				</Text>
				<View>
					<Image
						source={logo}
						style={styles.picture}
					/>
				</View>
			</View>
			<View style={styles.loginForm}>
				<LoginForm />
			</View>
		</View>
	);
};

const styles = EStyleSheet.create({
	layout: {
		backgroundColor: 'white',
		flex: 1,
	},
	header: {
		backgroundColor: '$colorAccent',
		flex: 2,
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		color: 'white',
		fontSize: 32,
		fontWeight: 'bold',
	},
	picture: {
		marginTop: 10,
		width: 150,
		height: 150,
	},
	loginForm: {
		flex: 3,
	},
});

export default login;
