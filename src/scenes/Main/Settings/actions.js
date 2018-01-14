import { LOGOUT, persistor } from '../../../store';
import { navigateToLogin } from '../../../navigation/actions';

export const logoutUser = () => {
  return dispatch => {
    persistor.purge();

    dispatch({ type: LOGOUT });
    dispatch(navigateToLogin(true));
  };
};
