import { StackNavigator, TabNavigator } from 'react-navigation';
import Splash from '../scenes/Splash';
import Login from '../scenes/Login';
import ActivityFeed from '../scenes/Main/ActivityFeed';
import Settings from '../scenes/Main/Settings';
import { NAVIGATION_SPLASH } from './actionTypes';

const MainNavigator = TabNavigator({
  ActivityFeed: {
    screen: ActivityFeed,
    navigationOptions: () => ({
      headerTitle: 'Activity feed'
    })
  },
  Settings: {
    screen: Settings,
    navigationOptions: () => ({
      headerTitle: 'Settings'
    })
  }
});

const AppNavigator = StackNavigator(
  {
    Splash: {
      screen: Splash,
      navigationOptions: () => ({
        header: null
      })
    },

    Login: {
      screen: Login,
      navigationOptions: () => ({
        header: null
      })
    },

    Main: {
      screen: MainNavigator
    }
  },
  {
    initialRouteName: NAVIGATION_SPLASH
  }
);

export default AppNavigator;
