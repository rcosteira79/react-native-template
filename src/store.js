import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import devTools from 'remote-redux-devtools';
import { localeReducer } from 'react-localize-redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { navigationReducer } from './navigation/reducer';
import { sessionReducer } from './services/session/reducer';
import { loginReducer } from './scenes/Login/reducer';
import { settingsReducer } from './scenes/Main/Settings/reducer';
import { GLOBAL } from './services/helpers/index';

const config = {
  key: 'root',
  storage,
  blacklist: ['navigation', 'locale']
};

const reducers = persistCombineReducers(config, {
  navigation: navigationReducer,
  session: sessionReducer,
  locale: localeReducer,
  login: loginReducer,
  settings: settingsReducer
});

const enhancer = compose(applyMiddleware(thunk), devTools({ realtime: GLOBAL.DEV }));

export const LOGOUT = 'LOGOUT';

export const store = createStore(reducers, enhancer);
export const persistor = persistStore(store);
