import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';

import AppNavigator from './routes';

const AppWithNavigationState = ({ dispatch, navigation }) => {
  return (
    <AppNavigator
      navigation={addNavigationHelpers({
        dispatch,
        state: navigation
      })}
    />
  );
};

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired
};

const mapStateToProps = ({ navigation }) => ({
  navigation
});

export default connect(mapStateToProps)(AppWithNavigationState);
