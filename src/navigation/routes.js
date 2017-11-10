import Splash from '../scenes/Splash/Splash';
import Login from '../scenes/Login/Login';
import Main from '../scenes/Main/Main';

const Routes = {
	Splash: { screen: Splash, navigationOptions: () => ({ header: null }) },
	Login: { screen: Login, navigationOptions: () => ({ header: null }) },
	Main: { screen: Main }
};

export default Routes;
