import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';
import React, { Component } from 'react';

import {
	View,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Text,
	StatusBar,
	ActivityIndicator,
} from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';

import * as session from '../../services/session';
import * as api from '../../services/api';

import { FloatingLabelInput } from '../../components';

class LoginForm extends Component {
	constructor(props) {
		super(props);

		this.initialState = {
			isLoading: false,
			error: null,
			email: '',
			password: '',
		};

		this.state = this.initialState;
	}

	onPressLogin() {
		this.setState({
			isLoading: true,
			error: '',
		});

		dismissKeyboard();
		session.login(this.state.email, this.state.password)
			.then(() => {
				console.log('authenticated');
			})
			.catch((exception) => {
				// Displays only the first error message
				const error = api.exceptionExtractError(exception);
				this.setState({
					isLoading: false,
					...(error ? { error } : {}),
				});

				if (!error) {
					throw exception;
				}
			});
	}

	setInputReference = (input) => { this.passwordInput = input; };
	handleEmailChange = (email) => this.setState({ email });
	handlePasswordChange = (password) => this.setState({ password });
	focusPassword = () => this.passwordInput.focus();

	render() {
		return (
			<TouchableWithoutFeedback
				onPress={dismissKeyboard}
			>
				<View style={styles.container}>
					<StatusBar hidden />

					<View style={styles.inputContainer}>
						<FloatingLabelInput
							autoCapitalize="none"
							autoCorrect={false}
							keyboardType="email-address"
							returnKeyType="next"
							label="Email"
							value={this.state.email}
							onChangeText={this.handleEmailChange}
							onSubmitEditing={this.focusPassword}
						/>
					</View>

					<View style={styles.inputContainer}>
						<FloatingLabelInput
							label="Password"
							secureTextEntry
							returnKeyType="go"
							value={this.state.password}
							ref={this.setInputReference}
							onChangeText={this.handlePasswordChange}
							onSubmitEditing={this.focusPassword}
						/>
					</View>

					{this.state.isLoading ? (
						<View style={styles.spinnerStyle}>
							<ActivityIndicator
								size={'large'}
								color={EStyleSheet.value('$colorPrimary')}
							/>
						</View>
					) : (
							<TouchableOpacity
								onPress={() => this.onPressLogin()}
								style={styles.loginButtonContainer}
							>
								<Text style={styles.loginButtonText}>
									LOGIN
								</Text>
							</TouchableOpacity>
						)}

					<TouchableOpacity style={styles.registerButtonContainer}>
						<Text style={styles.registerButtonText}>
							Register
						</Text>
					</TouchableOpacity>
				</View>
			</TouchableWithoutFeedback>
		);
	}
}

const styles = EStyleSheet.create({
	container: {
		paddingVertical: 70,
		paddingHorizontal: 70,
	},

	inputContainer: {
		flex: 1,
		marginBottom: 60,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	iconContainer: {
		flex: 1,
		marginRight: 20,
	},
	icon: {
		height: 40,
		width: 40,
		resizeMode: 'contain',
	},
	input: {
		flex: 4,
		height: 40,
		color: '$colorPrimary',
	},
	spinnerStyle: {
		marginTop: 40,
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 15,
	},
	loginButtonContainer: {
		marginTop: 40,
		backgroundColor: '$colorAccent',
		paddingVertical: 15,
	},
	loginButtonText: {
		fontSize: 18,
		textAlign: 'center',
		color: 'white',
		fontWeight: 'bold',
	},
	registerButtonContainer: {
		paddingVertical: 15,
	},
	registerButtonText: {
		fontSize: 18,
		textAlign: 'center',
		color: '$colorText',
		fontWeight: 'bold',
	},
});

export default LoginForm;
