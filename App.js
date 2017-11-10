import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';

import './src/resources/colors';
import store from './src/store';
import AppWithNavigationState from './src/navigation';

class App extends Component {
	render() {
		return (
			<View style={styles.container}>
				<Provider store={store}>
					<AppWithNavigationState />
				</Provider>
			</View>
		);
	}
}

const styles = EStyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '$colorWhite'
	}
});

export default App;
