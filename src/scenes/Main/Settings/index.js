import React from 'react';
import { View, Button } from 'react-native';
import { connect } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import { hook } from 'cavy';

import { logoutUser } from './actions';

import TestKeys from '../../../../specs/itKeys';
import { GLOBAL } from '../../../services/helpers';

class Settings extends React.Component {
  onLogoutButtonPress() {
    this.props.logoutUser();
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
          title="Logout"
          ref={GLOBAL.DEV ? this.props.generateTestHook(TestKeys.settings.logoutButton) : null}
          onPress={this.onLogoutButtonPress.bind(this)}
        />
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const mapStateToProps = ({ settings }) => {
  return settings;
};

export default connect(mapStateToProps, { logoutUser })(hook(Settings, GLOBAL.DEV));
