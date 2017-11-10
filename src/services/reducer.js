import { combineReducers } from 'redux';
import { sessionReducer } from './session/reducer';
import { persistReducer } from './persist/reducer';

export const servicesReducer = combineReducers({
    session: sessionReducer,
    persist: persistReducer,
});
