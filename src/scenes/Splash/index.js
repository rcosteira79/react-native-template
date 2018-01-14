import React from 'react';
import { View, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import * as sessionSelectors from '../../services/session/selectors';
import { navigateToLogin, navigateToMain } from '../../navigation/actions';

class Splash extends React.Component {
  componentDidMount() {
    this.login();
  }

  login() {
    if (sessionSelectors.get().token !== '') {
      // TODO: This should obviously validate the token with the server
      this.props.navigation.dispatch(navigateToMain());
    } else {
      this.props.navigation.dispatch(navigateToLogin());
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '$colorPrimary'
  }
});

export default Splash;
